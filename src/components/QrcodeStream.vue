<template lang="html">
  <div class="qrcode-stream">
    <div class="qrcode-stream__inner-wrapper">
      <video
        ref="video"
        v-show="shouldScan"
        class="qrcode-stream__camera"
        autoplay
        muted
        playsinline
      ></video>

      <canvas
        ref="pauseFrame"
        v-show="!shouldScan"
        class="qrcode-stream__pause-frame"
      ></canvas>

      <canvas
        ref="trackingLayer"
        class="qrcode-stream__tracking-layer"
      ></canvas>

      <div class="qrcode-stream__overlay">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { keepScanning } from '../misc/scanner.js'
import Camera from '../misc/camera.js'
import { isBoolean, emptyObject } from '../misc/util.js'
import CommonAPI from '../mixins/CommonAPI.vue'

export default {

  mixins: [ CommonAPI ],

  props: {
    paused: {
      type: Boolean,
      default: false,
    },

    camera: {
      type: [Object, Boolean],
      default: emptyObject,
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

    shouldStream () {
      return this.paused === false &&
        this.destroyed === false &&
        this.constraints.video !== false
    },

    shouldScan () {
      return this.shouldStream === true &&
        this.cameraInstance !== null
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
      if (isBoolean(this.camera)) {
        return {
          audio: false,
          video: this.camera,
        }
      } else {
        return {
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { min: 360, ideal: 640, max: 1920 },
            height: { min: 240, ideal: 480, max: 1080 },

            ...this.camera,
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

    shouldStream (shouldStream) {
      if (!shouldStream) {
        const frame = this.cameraInstance.captureFrame()
        this.paintPauseFrame(frame)
      }
    },

    shouldScan (shouldScan) {
      if (shouldScan) {
        this.clearPauseFrame()
        this.clearTrackingLayer()
        this.startScanning()
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
      }
    },

    startScanning () {
      const detectHandler = result => {
        this.onDetect(
          Promise.resolve({ source: 'stream', ...result })
        )
      }

      keepScanning(this.cameraInstance, {
        detectHandler,
        locateHandler: this.onLocate,
        shouldContinue: () => this.shouldScan,
        minDelay: this.scanInterval,
      })
    },

    beforeResetCamera () {
      if (this.cameraInstance !== null) {
        this.cameraInstance.stop()
        this.cameraInstance = null
      }
    },

    onLocate (location) {
      if (this.trackRepaintFunction !== null) {
        if (location === null) {
          this.clearTrackingLayer()
        } else {
          this.repaintTrackingLayer(location)
        }
      }
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

    repaintTrackingLayer (location) {
      const video = this.$refs.video
      const canvas = this.$refs.trackingLayer
      const ctx = canvas.getContext('2d')

      const displayWidth = video.offsetWidth
      const displayHeight = video.offsetWidth
      const resolutionWidth = video.videoWidth
      const resolutionHeight = video.videoHeight

      window.requestAnimationFrame(() => {
        canvas.width = displayWidth
        canvas.height = displayHeight

        const widthRatio = displayWidth / resolutionWidth
        const heightRatio = displayHeight / resolutionHeight

        location = this.normalizeLocation(widthRatio, heightRatio, location)

        this.trackRepaintFunction(location, ctx)
      })
    },

    clearTrackingLayer () {
      const canvas = this.$refs.trackingLayer
      const ctx = canvas.getContext('2d')

      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      })
    },

    paintPauseFrame (imageData) {
      const canvas = this.$refs.pauseFrame
      const ctx = canvas.getContext('2d')

      window.requestAnimationFrame(() => {
        canvas.width = imageData.width
        canvas.height = imageData.height

        ctx.putImageData(imageData, 0, 0)
      })
    },

    clearPauseFrame () {
      const canvas = this.$refs.pauseFrame
      const ctx = canvas.getContext('2d')

      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      })
    },

  },
}
</script>

<style lang="css">
.qrcode-stream {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

.qrcode-stream__inner-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  z-index: 0;
}

.qrcode-stream__overlay,
.qrcode-stream__tracking-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.qrcode-stream__camera,
.qrcode-stream__pause-frame {
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
