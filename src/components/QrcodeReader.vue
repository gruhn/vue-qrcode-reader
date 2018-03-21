<template lang="html">
  <div class="qrcode-reader">
    <video
      ref="video"
      class="qrcode-reader__camera"
    ></video>

    <div class="qrcode-reader__overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import isBoolean from 'lodash/isBoolean'
import {
  streamTo,
  imageDataFromVideo,
  scanImageData,
} from '../helpers'

const NO_LOCATION = [] // use specific array instance to guarantee equality ([] !== [] but NO_LOCATION === NO_LOCATION)
const SCAN_INTERVAL = 100

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
      // current video stream instance returned by `getUserMedia`
      stream: null,

      // most recent decoded QR code content.
      // Is only null after unpause or before init, otherwise string.
      decodeResult: null,

      // array of most recent detected QR code corner coordinates
      locateResult: NO_LOCATION,
    }
  },

  computed: {
    /**
     * Conditions applying for both locating and decoding, joined in a single
     * computed property.
     */
    shouldScan () {
      return !this.paused && this.stream !== null
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
          width: { min: 360, ideal: 1280, max: 1920 },
          height: { min: 240, ideal: 720, max: 1080 },
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
     * Starts continuous decoding process as soon as conditions for that are
     * fullfilled. The process stops itself automatically when the conditions
     * are not fullfilled anymore.
     */
    shouldDecode (shouldDecode) {
      if (shouldDecode) {
        this.keepDecoding()
      }
    },

    /**
     * Starts continuous locating process as soon as conditions for that are
     * fullfilled. The process stops itself automatically when the conditions
     * are not fullfilled anymore.
     */
    shouldLocate (shouldLocate) {
      if (shouldLocate) {
        this.keepLocating()
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

    /**
     * When constraints for the used camera change, a new stream has to be
     * requested. This bootstraps the hole init process again.
     */
    constraints: {
      deep: true,

      handler () {
        this.$emit('init', this.startCamera())
      },
    },
  },

  /**
   * Instanly requests a stream from the users camera as soon as the component
   * is mounted. This can't be done in earlier livecycle hooks because it
   * requires the video and canvas element to be rendered already.
   */
  mounted () {
    this.$emit('init', this.startCamera())
  },

  /**
   * If the camera is not released before the component is destroyed, browsers
   * will indicate that it's still in use and it might be blocked for other
   * applications.
   */
  beforeDestroy () {
    this.stopCamera()
  },

  methods: {
    /**
     * Requests a camera stream using the Stream API and based on
     * `this.constraints`. Then connects the stream to the video element and
     * waits for it to load. The promise returned here is the payload for the
     * `init` event. Any error here leads to this promises rejection.
     */
    async startCamera () {
      // check if browser is support first
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        throw new Error('WebRTC API not supported in this browser')
      }

      this.stopCamera()

      const video = this.$refs.video
      video.playsInline = true

      this.stream = await streamTo(video, this.constraints)
    },

    /**
     * Releases the current camera stream and resets related instance properties.
     */
    stopCamera () {
      if (this.stream !== null) {
        this.stream.getTracks().forEach(
          track => track.stop()
        )

        this.stream = null
      }
    },

    /**
     * Update `this.decodeResult` and `this.locateResult`.
     *
     * Location coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    updateResults ({ data, location }) {
      this.decodeResult = data || this.decodeResult

      if (location === null) {
        this.locateResult = NO_LOCATION
      } else {
        const video = this.$refs.video

        const widthRatio = video.offsetWidth / video.videoWidth
        const heightRatio = video.offsetHeight / video.videoHeight

        const locationArray = [
          location.topLeftCorner,
          location.topRightCorner,
          location.bottomRightCorner,
          location.bottomLeftCorner,
        ]

        this.locateResult = locationArray.map(({ x, y }) => ({
          x: x * widthRatio,
          y: y * heightRatio,
        }))
      }
    },

    /**
     * Continuously extracts and scans frames from camera stream.
     */
    keepScanning () {
      if (this.shouldScan) {
        const imageData = imageDataFromVideo(this.$refs.video)

        window.requestAnimationFrame(() => {
          const results = scanImageData(imageData)

          this.updateResults(results)

          setTimeout(() => this.keepScanning(), SCAN_INTERVAL)
        })
      }
    },

  },
}
</script>

<style lang="css">
.qrcode-reader {
  position: relative;
  display: block;
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
