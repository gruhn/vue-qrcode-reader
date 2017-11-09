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

const LOCATE_INTERVAL = 40 // 1000ms / 40ms = 25fps
const DECODE_INTERVAL = 400
const CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: 'environment', // back camera
    width: { min: 360, ideal: 1280, max: 1920 },
    height: { min: 240, ideal: 720, max: 1080 },
  },
}

export default {
  props: {
    paused: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      decodeIntervalID: -1,
      locateIntervalID: -1,

      initReject: null,
      initResolve: null,

      stream: null,
      streamWidth: null,
      streamHeight: null,

      content: null,
      location: null,
    }
  },

  computed: {
    /*
     * If stream resolution is greater than available space
     * the video is scaled down. Detected QR code location is
     * based on the original resolution though. This difference
     * is compansated here.
     */
    locationArray () {
      if (this.location === null) {
        return []
      } else {
        const video = this.$refs.video

        const widthRatio = video.offsetWidth / this.streamWidth
        const heightRatio = video.offsetHeight / this.streamHeight

        const locationArray = [
          this.location.bottomLeft,
          this.location.topLeft,
          this.location.topRight,
        ]

        return locationArray.map(({ x, y }) => ({
          x: x * widthRatio,
          y: y * heightRatio,
        }))
      }
    },
  },

  watch: {
    paused (newValue) {
      if (newValue === true) {
        this.stopScanning()
      } else {
        this.startScanning()
      }
    },

    content (newValue) {
      this.$emit('decode', newValue)
    },

    locationArray (newValue) {
      this.$emit('locate', newValue)
    },
  },

  mounted () {
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

  beforeDestroy () {
    this.stopCamera()
    this.stopScanning()
  },

  methods: {
    async startCamera () {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS)
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

    startScanning () {
      this.stopScanning()
      this.$refs.video.play()

      this.decodeIntervalID = window.setInterval(() => {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          this.content = decode(imageData) || this.content
        })
      }, DECODE_INTERVAL)

      this.locateIntervalID = window.setInterval(() => {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          this.location = locate(imageData)
        })
      }, LOCATE_INTERVAL)
    },

    stopScanning () {
      this.$refs.video.pause()

      window.clearInterval(this.decodeIntervalID)
      window.clearInterval(this.locateIntervalID)

      this.decodeIntervalID = -1
      this.locateIntervalID = -1
    },

    onStreamLoaded (event) { // first frame finished loading
      const video = event.target

      this.streamWidth = video.videoWidth
      this.streamHeight = video.videoHeight

      this.initResolve()
      this.startScanning()
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
