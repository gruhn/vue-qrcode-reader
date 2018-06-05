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
const SCAN_INTERVAL = 40 // milliseconds

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
      // most recent decoded QR code content.
      // Is only null after unpause or before init, otherwise string.
      decodeResult: null,

      // array of most recent detected QR code corner coordinates
      locateResult: NO_LOCATION,

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
          // width: { min: 360, ideal: 1280, max: 1920 },
          // height: { min: 240, ideal: 720, max: 1080 },
          width: { ideal: 360 },
          height: { ideal: 240 },
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
     * Propagate new decoding results to parent component. Since holding a
     * camera for a few seconds over a QR code, produces the same result
     * multiple times in a row, an event is only emitted when the result
     * value actually changes. To allow re-scanning after the component is
     * un-paused, decodeResult is set to null (see #8). Null values are never
     * emitted though.
     */
    decodeResult (newValue) {
      if (newValue !== null) {
        this.$emit('decode', newValue)
      }
    },

    /**
     * Propagates location of QR code when it changes. Just like with decoding
     * results, this event is only emitted when the detected location changes.
     *
     * While a QR code is actually in sight, position changes are detected
     * nearly each scanned frame anyway. While no QR code is detected though,
     * this makes sure that empty results are only emitted once.
     */
    locateResult (newValue) {
      this.$emit('locate', newValue)
    },

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
        this.keepScanning()
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

    /**
     * Continuously extracts frames from camera stream and tries to decode
     * potentially pictured QR codes.
     */
    keepScanning () {
      if (this.shouldScan) {
        const imageData = this.camera.captureFrame()

        window.requestAnimationFrame(() => {
          const result = Scanner.scan(imageData)

          if (result !== null) {
            this.decodeResult = result.data

            const locationArray = [
              result.location.topLeftCorner,
              result.location.topRightCorner,
              result.location.bottomRightCorner,
              result.location.bottomLeftCorner,
            ]

            this.locateResult = this.normalizeLocation(locationArray)
          } else {
            this.locateResult = NO_LOCATION
          }

          window.setTimeout(this.keepScanning, SCAN_INTERVAL)
        })
      }
    },

    /**
     * The coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    normalizeLocation (locationArray) {
      const video = this.$refs.video

      const widthRatio = video.offsetWidth / video.videoWidth
      const heightRatio = video.offsetHeight / video.videoHeight

      return locationArray.map(({ x, y }) => ({
        x: x * widthRatio,
        y: y * heightRatio,
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
