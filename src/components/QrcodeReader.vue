<template lang="html">
  <div class="qrcode-reader">
    <div class="qrcode-reader__inner-wrapper">
      <video
        ref="video"
        class="qrcode-reader__camera"
      ></video>

      <div class="qrcode-reader__overlay">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import * as Scanner from '../misc/Scanner.js'
import Camera from '../misc/Camera.js'
import isBoolean from 'lodash/isBoolean'

const NO_LOCATION = [] // use specific array instance to guarantee equality ([] !== [] but NO_LOCATION === NO_LOCATION)

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
  },

  data () {
    return {
      camera: null,
      destroyed: false,
    }
  },

  computed: {

    shouldScan () {
      return !this.paused && this.camera !== null && !this.destroyed
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
          width: { min: 360, ideal: 680, max: 1920 },
          height: { min: 240, ideal: 480, max: 1080 },
          ...this.videoConstraints,
        }
      }

      return {
        audio: false,
        video: withDefaults,
      }
    },

  },

  watch: {
    /**
     * Automatically freezes the video stream when conditions for the scanning
     * process are not fullfilled anymore.
     *
     * Starts continuous scanning process as soon as conditions for that are
     * fullfilled. The process stops itself automatically when the conditions
     * are not fullfilled anymore.
     */
    shouldScan (shouldScan) {
      if (shouldScan) {
        this.$refs.video.play()
        this.startScanning()
      } else {
        this.$refs.video.pause()
      }
    },

    /**
     * Resets decodeResult when component is un-paused. This way one QR code
     * can be decoded twice in a row (see #8). Waits though until video is
     * actually not frozen anymore. Otherwise the last frame from before
     * pausing would be rescanned.
     */
    paused (newValue) {
      if (newValue === false) {
        const resetDecodeResult = () => { this.decodeResult = null }
        const video = this.$refs.video

        video.addEventListener(
          'timeupdate',
          resetDecodeResult,
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
      this.camera = await Camera(this.constraints, this.$refs.video)
    },

    startScanning () {
      Scanner.keepScanning(this.camera, {
        decodeHandler: this.onDecode,
        locateHandler: this.onLocate,
        shouldContinue: () => this.shouldScan,
      })
    },

    onDecode (content) {
      this.$emit('decode', content)
    },

    onLocate (location) {
      if (location === null) {
        this.$emit('locate', NO_LOCATION)
      } else {
        const locationArray = this.normalizeLocation([
          location.topLeftCorner,
          location.topRightCorner,
          location.bottomRightCorner,
          location.bottomLeftCorner,
        ])

        this.$emit('locate', locationArray)
      }
    },

    /**
     * The coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    normalizeLocation (locationArray) {
      const widthRatio = this.camera.displayWidth / this.camera.resolutionWidth
      const heightRatio = this.camera.displayHeight / this.camera.resolutionHeight

      return locationArray.map(({ x, y }) => ({
        x: Math.floor(x * widthRatio),
        y: Math.floor(y * heightRatio),
      }))
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
}

.qrcode-reader__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
