<template lang="html">
  <div class="qrcode-reader">
    <video
      ref="video"
      class="qrcode-reader__camera"
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

    videoConstraints: {
      type: [Object, Boolean],
      default: () => ({}), // empty object
    },
  },

  data () {
    return {
      stream: null,
      streamWidth: null,
      streamHeight: null,
      streamLoaded: false,

      decodeResult: null,
      locateResult: NO_LOCATION,
    }
  },

  computed: {
    shouldScan () {
      return !this.paused && this.streamLoaded
    },

    shouldDecode () {
      return this.shouldScan && this.$listeners.decode !== undefined
    },

    shouldLocate () {
      return this.shouldScan && this.$listeners.locate !== undefined
    },

    constraints () {
      let defaultConstraints = {
        audio: false,
        video: {
          facingMode: { ideal: 'environment' },
          width: { min: 360, ideal: 1280, max: 1920 },
          height: { min: 240, ideal: 720, max: 1080 },
        },
      }

      if (isBoolean(this.videoConstraints)) {
        defaultConstraints.video = this.videoConstraints
      } else if (isObject(this.videoConstraints)) {
        defaultConstraints.video = {
          ...defaultConstraints.video,
          ...this.videoConstraints,
        }
      }

      return defaultConstraints
    },
  },

  watch: {
    decodeResult (newValue) {
      if (newValue !== null) {
        this.$emit('decode', newValue)
      }
    },

    locateResult (newValue) {
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
        setTimeout(() => { this.decodeResult = null }, DECODE_INTERVAL)
      }
    },

    constraints: {
      deep: true,

      handler () {
        this.$emit('init', this.startCamera())
      },
    },
  },

  mounted () {
    this.$emit('init', this.startCamera())
  },

  beforeDestroy () {
    this.stopCamera()
  },

  methods: {
    async startCamera () {
      // check browser support
      const canvas = this.$refs.canvas
      if (!(canvas.getContext && canvas.getContext('2d'))) {
        throw new Error('HTML5 Canvas not supported in this browser.')
      } else if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
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

      this.streamWidth = video.videoWidth
      this.streamHeight = video.videoHeight
      this.streamLoaded = true
    },

    stopCamera () {
      this.streamLoaded = false

      if (this.stream !== null) {
        this.stream.getTracks().forEach(
          track => track.stop()
        )

        this.stream = null
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
          this.decodeResult = decode(imageData) || this.decodeResult
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
            this.locateResult = NO_LOCATION
          } else {
            /*
             * If stream resolution is greater than available space
             * the video is scaled down. Detected QR code locateResult is
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
