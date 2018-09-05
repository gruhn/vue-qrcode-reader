<template lang="html">
  <div class="qrcode-reader">
    <div class="qrcode-reader__inner-wrapper">
      <div
        class="qrcode-reader__overlay"
        @drop.prevent.stop="onDrop"
        @dragover.prevent.stop
        @dragenter.prevent.stop
        @dragleave.prevent.stop
      >
        <slot></slot>
      </div>

      <canvas
        ref="trackingLayer"
        class="qrcode-reader__tracking-layer"
      ></canvas>

      <div class="qrcode-reader__camera-layer" ref="videoWrapper">
        <canvas ref="pauseFrame"></canvas>
        <video ref="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
import * as Scanner from '../misc/scanner.js'
import Camera from '../misc/camera.js'
import { imageDataFromFile, imageDataFromUrl } from '../misc/image-data.js'
import isBoolean from 'lodash/isBoolean'

export default {

  props: {
    paused: {
      type: Boolean,
      default: false,
    },

    /** deprecated in favor of `camera` **/
    videoConstraints: {
      type: [Object, Boolean],
      default: undefined,
    },

    camera: {
      type: [Object, Boolean],
      // default: () => ({}) // empty object
      default: undefined,
    },

    track: {
      type: [Function, Boolean],
      default: true,
    },
  },

  data () {
    return {
      cameraInstance: null,
      destroyed: false,
    }
  },

  computed: {

    shouldScan () {
      return this.paused === false &&
        this.cameraInstance !== null &&
        this.destroyed === false
    },

    /**
     * Minimum delay in milliseconds between frames to be scanned. Don't scan
     * so often when visual tracking is disabled to improve performance.
     */
    scanInterval () {
      if (this.track === false) {
        return 500
      } else {
        return 40 // ~ 25fps
      }
    },

    /**
     * Full constraints object which is passed to `getUserMedia` to request a
     * camera stream. Properties define if a certain camera is adequate or not.
     */
    constraints () {
      let videoConstraints = {}

      if (this.camera !== undefined) {
        videoConstraints = this.camera
      } else if (this.videoConstraints !== undefined) {
        console.warn('The `video-constraints` prop is deprecated. Use `camera` instead.')
        videoConstraints = this.videoConstraints
      }

      if (isBoolean(videoConstraints)) {
        return {
          audio: false,
          video: videoConstraints,
        }
      } else {
        return {
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { min: 360, ideal: 640, max: 1920 },
            height: { min: 240, ideal: 480, max: 1080 },

            ...videoConstraints,
          },
        }
      }
    },

    trackRepaintFunction () {
      if (this.track === true) {
        return function (location, ctx) {
          const {
            topLeftCorner,
            topRightCorner,
            bottomLeftCorner,
            bottomRightCorner,
          } = location

          ctx.strokeStyle = 'red'

          ctx.beginPath()
          ctx.moveTo(topLeftCorner.x, topLeftCorner.y)
          ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y)
          ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y)
          ctx.lineTo(topRightCorner.x, topRightCorner.y)
          ctx.lineTo(topLeftCorner.x, topLeftCorner.y)
          ctx.closePath()

          ctx.stroke()
        }
      } else if (this.track === false) {
        return null
      } else {
        return this.track
      }
    },

  },

  watch: {
    /**
     * Starts continuous scanning process as soon as conditions for that are
     * fullfilled. The process stops itself automatically when the conditions
     * are not fullfilled anymore.
     */
    shouldScan (shouldScan) {
      if (shouldScan) {
        this.startScanning()
      }
    },

    paused (paused) {
      if (paused) {
        this.stopPlayback()
      } else {
        this.startPlayback()
      }
    },

    constraints: {
      deep: true,

      handler () {
        this.$emit('init', this.init())
      },
    },
  },

  mounted () {
    this.$emit('init', this.init())
  },

  beforeDestroy () {
    this.beforeResetCamera()
    this.destroyed = true
  },

  methods: {

    async init () {
      this.beforeResetCamera()

      if (this.constraints.video === false) {
        this.cameraInstance = null
      } else {
        this.cameraInstance = await Camera(this.constraints, this.$refs.video)
        this.startPlayback()
      }
    },

    startScanning () {
      Scanner.keepScanning(this.cameraInstance, {
        locateHandler: this.onLocate,
        detectHandler: scanResult => this.onDetect('stream', scanResult),
        shouldContinue: () => this.shouldScan,
        minDelay: this.scanInterval,
      })
    },

    beforeResetCamera () {
      if (this.cameraInstance !== null) {
        this.stopPlayback()
        this.cameraInstance.stop()
        this.cameraInstance = null
      }
    },

    onLocate (location) {
      if (this.trackRepaintFunction !== null) {
        this.repaintTrack(location)
      }
    },

    async onDetect (source, promise) {
      this.$emit('detect', (async () => {
        const data = await promise

        return { source, ...data }
      })())

      try {
        const { content } = await promise

        if (content !== null) {
          this.$emit('decode', content)
        }
      } catch (error) {
        // fail silently
      }
    },

    onDrop ({ dataTransfer }) {
      const droppedFiles = [...dataTransfer.files]

      droppedFiles.forEach(this.onDropFile)

      const droppedUrl = dataTransfer.getData('text')

      if (droppedUrl !== '') {
        this.onDropUrl(droppedUrl)
      }
    },

    async onDropFile (file) {
      this.onDetect('file', (async () => {
        const imageData = await imageDataFromFile(file)
        const scanResult = Scanner.scan(imageData)

        return scanResult
      })())
    },

    async onDropUrl (url) {
      this.onDetect('url', (async () => {
        const imageData = await imageDataFromUrl(url)
        const scanResult = Scanner.scan(imageData)

        return scanResult
      })())
    },

    /**
     * The coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    normalizeLocation (widthRatio, heightRatio, location) {
      const normalized = {}

      for (const key in location) {
        normalized[key] = {
          x: Math.floor(location[key].x * widthRatio),
          y: Math.floor(location[key].y * heightRatio),
        }
      }

      return normalized
    },

    repaintTrack (location) {
      const canvas = this.$refs.trackingLayer
      const ctx = canvas.getContext('2d')
      const cameraInstance = this.cameraInstance

      window.requestAnimationFrame(() => {
        if (location === null) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        } else {
          const displayWidth = cameraInstance.displayWidth
          const displayHeight = cameraInstance.displayHeight

          canvas.width = displayWidth
          canvas.height = displayHeight

          const widthRatio = displayWidth / cameraInstance.resolutionWidth
          const heightRatio = displayHeight / cameraInstance.resolutionHeight

          location = this.normalizeLocation(widthRatio, heightRatio, location)

          this.trackRepaintFunction(location, ctx)
        }
      })
    },

    startPlayback () {
      this.unlockCameraLayerSize()
      this.repaintTrack(null)

      const pauseFrame = this.$refs.pauseFrame
      const ctx = pauseFrame.getContext('2d')

      ctx.clearRect(0, 0, pauseFrame.width, pauseFrame.height)
    },

    stopPlayback () {
      this.lockCameraLayerSize()

      const pauseFrame = this.$refs.pauseFrame
      const ctx = pauseFrame.getContext('2d')
      const cameraInstance = this.cameraInstance

      const displayWidth = cameraInstance.displayWidth
      const displayHeight = cameraInstance.displayHeight

      pauseFrame.width = displayWidth
      pauseFrame.height = displayHeight

      ctx.drawImage(this.$refs.video, 0, 0, displayWidth, displayHeight)
    },

    /*
     * When a new stream is requested, the video element looses its width and
     * height, causing the component to collapse until the new stream is loaded.
     * Copying the size from the video element to its wrapper div compensates
     * for this effect.
     */
    lockCameraLayerSize () {
      const videoWrapper = this.$refs.videoWrapper
      const cameraInstance = this.cameraInstance

      if (cameraInstance !== null) {
        const displayWidth = cameraInstance.displayWidth
        const displayHeight = cameraInstance.displayHeight

        videoWrapper.style.width = displayWidth + 'px'
        videoWrapper.style.height = displayHeight + 'px'
      }
    },

    /**
     * The video elements wrapper div should not have a fixed size all the so
     * it can be responsive.
     */
    unlockCameraLayerSize () {
      const videoWrapper = this.$refs.videoWrapper

      videoWrapper.style.width = ''
      videoWrapper.style.height = ''
    },

  },
}
</script>

<style lang="css">
.qrcode-reader {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

.qrcode-reader__inner-wrapper {
  position: relative;
}

.qrcode-reader__camera-layer {
  position: relative;
  z-index: 10;
}

.qrcode-reader__camera-layer > video {
  display: block;
  object-fit: contain;
}

.qrcode-reader__inner-wrapper,
.qrcode-reader__camera-layer,
.qrcode-reader__camera-layer > video {
  max-width: 100%;
  max-height: 100%;
}

.qrcode-reader__overlay,
.qrcode-reader__camera-layer > canvas,
.qrcode-reader__tracking-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.qrcode-reader__overlay {
  z-index: 30;
}

.qrcode-reader__tracking-layer {
  z-index: 20;
}
</style>
