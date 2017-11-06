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
    ></canvas>

    <div class="qrcode-reader__overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { scan } from '../scanner.js'

const SCAN_INTERVAL = 40 // 1000ms / 40ms = 25fps
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
      scanLoop: -1,

      initReject: null,
      initResolve: null,

      stream: null,

      content: null,
      location: null,
    }
  },

  computed: {
    points () {
      if (this.location === null) {
        return []
      } else {
        const video = this.$refs.video

        const widthRatio = video.offsetWidth / video.videoWidth
        const heightRatio = video.offsetHeight / video.videoHeight

        const points = [
          this.location.bottomLeft,
          this.location.topLeft,
          this.location.topRight,
        ]

        return points.map(({ x, y }) => ({
          x: x * widthRatio,
          y: y * heightRatio,
        }))
      }
    },
  },

  watch: {
    paused (newValue) {
      if (newValue === true) {
        this.$refs.video.pause()
        this.stopScanning()
      } else {
        this.$refs.video.play()
        this.startScanning()
      }
    },

    content (newValue) {
      this.$emit('decode', newValue)
    },

    points (newValue) {
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

    if (canvas.getContext === undefined || canvas.getContext('2d') === undefined) {
      this.initReject(new Error('HTML5 Canvas not supported in this browser.'))
    } else if (navigator.mediaDevices.getUserMedia === undefined) {
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
        video.play()
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

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      const bounds = [0, 0, canvas.width, canvas.height]

      ctx.drawImage(video, ...bounds)

      return ctx.getImageData(...bounds)
    },

    startScanning () {
      this.stopScanning()

      this.scanLoop = window.setInterval(() => {
        const imageData = this.captureFrame()

        window.requestAnimationFrame(() => {
          const { content, location } = scan(imageData)

          if (content !== null) {
            this.content = content
          }

          this.location = location
        })
      }, SCAN_INTERVAL)
    },

    stopScanning () {
      window.clearInterval(this.scanLoop)
    },

    onStreamLoaded () { // first frame finished loading
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
