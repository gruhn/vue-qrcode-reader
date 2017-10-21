<template lang="html">
  <div class="qrcode-reader">
    <video
      ref="video"
      class="qrcode-reader__camera"
      autoplay
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
      isDestroyed: false,
      streamReady: false,

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
      } else {
        this.$refs.video.play()
        this.loopScan()
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
    if (this.checkBrowserSupport()) {
      this.startCamera()
    }
  },

  beforeDestroy () {
    this.stopCamera()
    this.isDestroyed = true
  },

  methods: {
    startCamera: async function () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS)
        const video = this.$refs.video

        if (video.srcObject !== undefined) {
          video.srcObject = stream
        } else if (video.mozSrcObject !== undefined) {
          video.mozSrcObject = stream
        } else if (window.URL.createObjectURL) {
          video.src = window.URL.createObjectURL(stream)
        } else if (window.webkitURL) {
          video.src = window.webkitURL.createObjectURL(stream)
        } else {
          video.src = stream
        }
      } catch (e) {
        if (e.name === 'PermissionDeniedError' || e.name === 'NotAllowedError') {
          this.$emit('permission-deny', 'User denied camera access permission.')
        } else if (e.name === 'NotSupportedError') {
          this.$emit('no-support', e.message)
        } else {
          throw e
        }
      }
    },

    stopCamera () {
      if (this.$refs.video.srcObject !== null) {
        this.$refs.video.srcObject.getTracks().forEach(
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

      ctx.clearRect(...bounds)
      ctx.drawImage(video, ...bounds)

      return ctx.getImageData(...bounds)
    },

    loopScan () {
      if (this.paused || this.isDestroyed) {
        return
      }

      window.requestAnimationFrame(() => {
        const imageData = this.captureFrame()
        const { content, location } = scan(imageData)

        if (content !== null) {
          this.content = content
        }

        this.location = location
      })

      window.setTimeout(this.loopScan, SCAN_INTERVAL)
    },

    checkBrowserSupport () {
      const canvas = this.$refs.canvas

      if (canvas.getContext === undefined || canvas.getContext('2d') === undefined) {
        this.$emit('no-support', 'HTML5 Canvas not supported in this browser.')
      } else if (navigator.mediaDevices.getUserMedia === undefined) {
        this.$emit('no-support', 'WebRTC API not supported in this browser')
      } else {
        return true
      }

      return false
    },

    onStreamLoaded () { // first frame finished loading
      this.$emit('stream-loaded')
      this.loopScan()
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
