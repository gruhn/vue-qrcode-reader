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
import jsQR from 'jsqr'
import isBoolean from 'lodash/isBoolean'

const NO_LOCATION = [] // use specific array instance to guarantee equality ([] !== [] but NO_LOCATION === NO_LOCATION)
const LOCATE_INTERVAL = 40 // milliseconds
const DECODE_INTERVAL = 400 // milliseconds

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

      // absolute resolution of the current video stream
      streamWidth: null,
      streamHeight: null,

      // whether or not first frame of current video stream has loaded yet
      streamLoaded: false,

      // most recent decoded QR code content.
      // Is only null after unpause or before init, otherwise string.
      decodeResult: null,

      // array of most recent detected QR code corner coordinates
      locateResult: NO_LOCATION,

      // canvas 2D rendering context to capture stream frames with
      canvasContext: null,
    }
  },

  computed: {
    /**
     * Conditions applying for both locating and decoding, joined in a single
     * computed property.
     */
    shouldScan () {
      return !this.paused && this.streamLoaded
    },

    /**
     * QR codes should only be actively decoded if the parent component has an
     * event listener registered. Otherwise the rather expensive decoding
     * operation is continuously executed for nothing.
     */
    shouldDecode () {
      return this.shouldScan && this.$listeners.decode !== undefined
    },

    /**
     * Just like with `this.shouldDecode`, locating is not allowed when the
     * parent component has no event listener registered.
     */
    shouldLocate () {
      return this.shouldScan && this.$listeners.locate !== undefined
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

    /**
     * Joins stream resolution information in a single array. Some canvas API
     * methods expect parameters in this form and order. This is a nice little
     * helper to pass those values with the spread operator.
     */
    streamBounds () {
      return [0, 0, this.streamWidth, this.streamHeight]
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

      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints)

      const video = this.$refs.video

      const streamLoadedPromise = new Promise((resolve, reject) => {
        video.addEventListener('loadeddata', resolve, { once: true })
        video.addEventListener('error', reject, { once: true })
      })

      if (video.srcObject !== undefined) {
        video.srcObject = this.stream
      } else if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = this.stream
      } else if (window.URL.createObjectURL) {
        video.src = window.URL.createObjectURL(this.stream)
      } else if (window.webkitURL) {
        video.src = window.webkitURL.createObjectURL(this.stream)
      } else {
        video.src = this.stream
      }

      video.playsInline = true
      video.play() // firefox does not emit `loadeddata` if video not playing

      await streamLoadedPromise

      this.streamLoaded = true
      this.streamWidth = video.videoWidth
      this.streamHeight = video.videoHeight

      const canvas = document.createElement('canvas')
      canvas.width = this.streamWidth
      canvas.height = this.streamHeight

      this.canvasContext = canvas.getContext('2d')
    },

    /**
     * Releases the current camera stream and resets related instance properties.
     */
    stopCamera () {
      this.streamLoaded = false

      if (this.stream !== null) {
        this.stream.getTracks().forEach(
          track => track.stop()
        )

        this.stream = null
        this.streamWidth = null
        this.streamHeight = null
      }
    },

    /**
     * Captures a frame from video stream and draws it to canvas. Then reads
     * image data from canvas and returns it for further analysis. This extra
     * step is necessary because it's not possible to read image data from a
     * video element directly.
     */
    captureFrame () {
      this.canvasContext.drawImage(this.$refs.video, ...this.streamBounds)

      return this.canvasContext.getImageData(...this.streamBounds)
    },

    /**
     * Continuously extracts frames from camera stream and tries to decode
     * potentially pictured QR codes.
     */
    keepDecoding () {
      if (this.shouldDecode) {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          const { data, width, height } = imageData
          const result = jsQR(data, width, height)

          if (result !== null) {
            this.decodeResult = result.data
          }

          window.setTimeout(this.keepDecoding, DECODE_INTERVAL)
        })
      }
    },

    /**
     * Continuously extracts frames from camera stream and tries to locate
     * potentially pictured QR codes.
     *
     * The coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    keepLocating () {
      if (this.shouldLocate) {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          const { data, width, height } = imageData
          const result = jsQR(data, width, height)

          if (result === null) {
            this.locateResult = NO_LOCATION
          } else {
            const video = this.$refs.video

            const widthRatio = video.offsetWidth / this.streamWidth
            const heightRatio = video.offsetHeight / this.streamHeight

            const locationArray = [
              result.location.topLeftCorner,
              result.location.topRightCorner,
              result.location.bottomRightCorner,
              result.location.bottomLeftCorner,
            ]

            this.locateResult = locationArray.map(({ x, y }) => ({
              x: x * widthRatio,
              y: y * heightRatio,
            }))
          }

          window.setTimeout(this.keepLocating, LOCATE_INTERVAL)
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
