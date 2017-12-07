<template lang="html">
  <div class="qrcode-reader">
    <video
      ref="video"
      class="qrcode-reader__camera"
      @loadeddata="onStreamLoaded"
    ></video>

    <canvas
      ref="canvas"
      class="qrcode-reader__snapshot"
      :width="streamWidth"
      :height="streamHeight"
    ></canvas>

    <div class="qrcode-reader__overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { decode, locate } from '../scanner.js'
import isObject from 'lodash/isObject'
import isBoolean from 'lodash/isBoolean'

const NO_LOCATION = [] // use specific array instance to guarantee equality ([] !== [] but NO_LOCATION === NO_LOCATION)
const LOCATE_INTERVAL = 40 // 1000ms / 40ms = 25fps
const DECODE_INTERVAL = 400

export default {
  props: {
    paused: {
      type: Boolean,
      default: false,
    },

    constraints: {
      type: Object,
      default: () => ({}), // empty object
    },
  },

  data () {
    return {
      initReject: null,
      initResolve: null,

      stream: null,
      streamWidth: null,
      streamHeight: null,

      content: null,
      location: NO_LOCATION,

      destroyed: false,
      streamLoaded: false,
    }
  },

  computed: {
    shouldScan () {
      return !this.paused && !this.destroyed && this.streamLoaded
    },

    shouldDecode () {
      return this.shouldScan && this.$listeners.decode !== undefined
    },

    shouldLocate () {
      return this.shouldScan && this.$listeners.locate !== undefined
    },

    constraintsNormalized () {
      let defaultConstraints = {
        audio: false,
        video: {
          facingMode: { ideal: 'environment' },
          width: { min: 360, ideal: 1280, max: 1920 },
          height: { min: 240, ideal: 720, max: 1080 },
        },
      }

      if (this.constraints.audio !== undefined) {
        defaultConstraints.audio = this.constraints.audio
      }

      if (isObject(this.constraints.video)) {
        defaultConstraints.video = {
          ...defaultConstraints.video,
          ...this.constraints.video,
        }
      } else if (isBoolean(this.constraints.video)) {
        defaultConstraints.video = this.constraints.video
      }

      return defaultConstraints
    },
  },

  watch: {
    content (newValue) {
      if (newValue !== null) {
        this.$emit('decode', newValue)
      }
    },

    location (newValue) {
      this.$emit('locate', newValue)
    },

    shouldScan (shouldScan) {
      if (shouldScan) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },

    shouldDecode (shouldDecode) {
      if (shouldDecode) {
        this.keepDecoding()
      }
    },

    shouldLocate (shouldLocate) {
      if (shouldLocate) {
        this.keepLocating()
      }
    },

    paused (newValue) {
      if (!newValue) {
        setTimeout(() => { this.content = null }, DECODE_INTERVAL)
      }
    },

    constraintsNormalized: {
      deep: true,

      handler () {
        this.stopCamera()
        this.init()
      },
    },
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    this.destroyed = true
    this.stopCamera()
  },

  methods: {
    init () {
      const initPromise = new Promise(
        (resolve, reject) => {
          this.initResolve = resolve
          this.initReject = reject
        }
      )

      this.$emit('init', initPromise)

      // check browser support
      const canvas = this.$refs.canvas

      if (!(canvas.getContext && canvas.getContext('2d'))) {
        this.initReject(new Error('HTML5 Canvas not supported in this browser.'))
      } else if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        this.initReject(new Error('WebRTC API not supported in this browser'))
      } else {
        this.startCamera()
      }
    },

    async startCamera () {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(this.constraintsNormalized)
        const video = this.$refs.video

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
        video.play() // `loadeddata` event not emitted when video not playing in Firefox
      } catch (e) {
        // NotAllowedError, NotSupportedError, NotFoundError
        this.initReject(e)
      }
    },

    stopCamera () {
      if (this.stream !== null) {
        this.stream.getTracks().forEach(
          track => track.stop()
        )
      }
    },

    captureFrame () {
      const video = this.$refs.video
      const canvas = this.$refs.canvas

      const ctx = canvas.getContext('2d')
      const bounds = [0, 0, this.streamWidth, this.streamHeight]

      ctx.drawImage(video, ...bounds)

      return ctx.getImageData(...bounds)
    },

    keepDecoding () {
      if (this.shouldDecode) {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          this.content = decode(imageData) || this.content
          window.setTimeout(this.keepDecoding, DECODE_INTERVAL)
        })
      }
    },

    keepLocating () {
      if (this.shouldLocate) {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          const locationObject = locate(imageData)

          if (locationObject === null) {
            this.location = NO_LOCATION
          } else {
            /*
             * If stream resolution is greater than available space
             * the video is scaled down. Detected QR code location is
             * based on the original resolution though. This difference
             * is compansated here.
             */

            const video = this.$refs.video

            const widthRatio = video.offsetWidth / this.streamWidth
            const heightRatio = video.offsetHeight / this.streamHeight

            const locationArray = [
              locationObject.bottomLeft,
              locationObject.topLeft,
              locationObject.topRight,
            ]

            this.location = locationArray.map(({ x, y }) => ({
              x: x * widthRatio,
              y: y * heightRatio,
            }))
          }

          window.setTimeout(this.keepLocating, LOCATE_INTERVAL)
        })
      }
    },

    onStreamLoaded (event) { // first frame finished loading
      const video = event.target

      this.streamWidth = video.videoWidth
      this.streamHeight = video.videoHeight

      this.initResolve()
      this.streamLoaded = true
    },
  },
}
</script>

<style lang="scss">
.qrcode-reader {
  position: relative;
  display: block;

  .qrcode-reader__camera {
    display: block;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }

  .qrcode-reader__snapshot {
    display: none;
  }

  .qrcode-reader__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
