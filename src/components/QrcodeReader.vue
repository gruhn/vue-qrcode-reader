<template lang="html">
  <div class="qrcode-reader">
    <div class="qrcode-reader__inner-wrapper">
      <div class="qrcode-reader__overlay">
        <slot></slot>
      </div>

      <canvas
        ref="trackingLayer"
        class="qrcode-reader__tracking-layer"
      ></canvas>

      <video
        ref="video"
        class="qrcode-reader__camera"
      ></video>
    </div>
  </div>
</template>

<script>
import * as Scanner from '../misc/Scanner.js'
import Camera from '../misc/Camera.js'
import isBoolean from 'lodash/isBoolean'

export default {
  props: {
    paused: {
      type: Boolean,
      default: false,
    },

    videoConstraints: {
      type: [Object, Boolean],
      default: () => ({}), // empty object
    },

    track: {
      type: [Function, Boolean],
      default: true,
    },
  },

  data () {
    return {
      camera: null,
      destroyed: false,
      readyAfterPause: true,
    }
  },

  computed: {

    shouldScan () {
      return this.paused === false &&
        this.camera !== null &&
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
      let withDefaults

      if (isBoolean(this.videoConstraints)) {
        withDefaults = this.videoConstraints
      } else {
        withDefaults = {
          facingMode: { ideal: 'environment' },
          width: { min: 360, ideal: 640, max: 1920 },
          height: { min: 240, ideal: 480, max: 1080 },

          ...this.videoConstraints,
        }
      }

      return {
        audio: false,
        video: withDefaults,
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
    this.camera.stop()
    this.destroyed = true
  },

  methods: {

    async init () {
      if (this.camera !== null) {
        this.camera.stop()
      }

      this.camera = await Camera(this.constraints, this.$refs.video)
    },

    startScanning () {
      Scanner.keepScanning(this.camera, {
        decodeHandler: this.onDecode,
        locateHandler: this.onLocate,
        shouldContinue: () => this.shouldScan,
        minDelay: this.scanInterval,
      })
    },

    onDecode (content) {
      this.$emit('decode', content)
    },

    onLocate (location) {
      if (this.trackRepaintFunction !== null) {
        this.repaintTrack(location)
      }
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
        const widthRatio = this.camera.displayWidth / this.camera.resolutionWidth
        const heightRatio = this.camera.displayHeight / this.camera.resolutionHeight

        Object.keys(location).forEach(key => {
          const { x, y } = location[key]

          location[key].x = Math.floor(x * widthRatio)
          location[key].y = Math.floor(y * heightRatio)
        })

        return location
      }
    },

    repaintTrack (location) {
      location = this.normalizeLocation(location)

      const canvas = this.$refs.trackingLayer
      const ctx = canvas.getContext('2d')

      canvas.width = this.camera.displayWidth
      canvas.height = this.camera.displayHeight

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
  display: inline-block;
  position: relative;
}

.qrcode-reader__camera {
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
