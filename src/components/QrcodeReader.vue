<template lang="html">
  <div class="qrcode-reader">
    <video
      class="qrcode-reader__camera"
      @loadeddata="onStreamLoaded"
      ref="video"
      autoplay
    ></video>

    <canvas
      class="qrcode-reader__snapshot"
      :class="{ 'qrcode-reader__snapshot--hidden': !paused }"
      ref="canvas"
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
  video: { facingMode: 'environment' }, // back camera
  audio: false,
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

    location (newValue) {
      this.$emit('locate', newValue)
    },
  },

  methods: {
    startCamera: async function () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS)
        const video = this.$refs.video

        video.srcObject = stream
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

      requestAnimationFrame(() => {
        const imageData = this.captureFrame()
        const { content, location } = scan(imageData)

        if (content !== null) {
          this.content = content
        }

        this.location = location
      })

      setTimeout(this.loopScan, SCAN_INTERVAL)
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

  mounted () {
    if (this.checkBrowserSupport()) {
      this.startCamera()
    }
  },

  beforeDestroy () {
    this.stopCamera()
    this.isDestroyed = true
  },
}
</script>

<style lang="scss" scoped>
.qrcode-reader {
  position: relative;
  display: inline-block;
  overflow: hidden;

  .qrcode-reader__camera {
    z-index: 10;
    max-width: 100%;
    max-height: 100%;
  }

  .qrcode-reader__snapshot {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;

    .qrcode-reader__snapshot--hidden {
      visibility: hidden;
    }
  }

  .qrcode-reader__overlay {
    z-index: 30;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
