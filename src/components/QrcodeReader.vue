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

      <video
        ref="video"
        class="qrcode-reader__camera-layer"
      ></video>
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
      readyAfterPause: true,
    }
  },

  computed: {

    shouldScan () {
      return this.paused === false &&
        this.cameraInstance !== null &&
        this.destroyed === false &&
        this.readyAfterPause
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
          if (location !== null) {
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
      const video = this.$refs.video

      if (paused) {
        video.pause()

        this.readyAfterPause = false
      } else {
        video.play()

        video.addEventListener(
          'timeupdate',
          () => { this.readyAfterPause = true },
          { once: true }
        )
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
    if (this.cameraInstance !== null) {
      this.cameraInstance.stop()
    }

    this.destroyed = true
  },

  methods: {

    async init () {
      if (this.cameraInstance !== null) {
        this.cameraInstance.stop()
      }

      if (this.videoConstraints === false) {
        this.cameraInstance = null
      } else {
        this.cameraInstance = await Camera(this.constraints, this.$refs.video)
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
    normalizeLocation (location) {
      if (location === null) {
        return null
      } else {
        const widthRatio = this.cameraInstance.displayWidth / this.cameraInstance.resolutionWidth
        const heightRatio = this.cameraInstance.displayHeight / this.cameraInstance.resolutionHeight

        const normalizeEntry = ({ x, y }) => ({
          x: Math.floor(x * widthRatio),
          y: Math.floor(y * heightRatio),
        })

        const joinObjects = (objA, objB) => ({ ...objA, ...objB })

        return Object.entries(location)
          .map(([ key, val ]) => ({ [key]: normalizeEntry(val) }))
          .reduce(joinObjects, {})
      }
    },

    repaintTrack (location) {
      location = this.normalizeLocation(location)

      const canvas = this.$refs.trackingLayer
      const ctx = canvas.getContext('2d')

      canvas.width = this.cameraInstance.displayWidth
      canvas.height = this.cameraInstance.displayHeight

      window.requestAnimationFrame(
        () => this.trackRepaintFunction(location, ctx)
      )
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
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  z-index: 10;
}

.qrcode-reader__overlay,
.qrcode-reader__tracking-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.qrcode-reader__overlay {
  z-index: 30;
}

.qrcode-reader__tracking-layer {
  z-index: 20;
}
</style>
