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
import Scanner from '../scanner.js'

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
      ready: false,
    }
  },

  computed: {
    shouldScan () {
      return this.ready && !this.paused
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

    shouldScan (newValue) {
      if (this.ready) {
        if (newValue === true) {
          Scanner.start()
        } else {
          Scanner.stop()
        }
      }
    },

    paused (nowPaused) {
      if (this.ready && nowPaused === false) {
        Scanner.clearCache()
      }
    },

    /**
     * When constraints for the used camera change, a new stream has to be
     * requested. This bootstraps the hole init process again.
     */
    videoConstraints: {
      deep: true,

      handler () {
        this.$emit('init', this.init())
      },
    },

  },

  /**
   * Instanly requests a stream from the users camera as soon as the component
   * is mounted. This can't be done in earlier livecycle hooks because it
   * requires the video and canvas element to be rendered already.
   */
  mounted () {
    this.$emit('init', this.init())
  },

  /**
   * If the camera is not released before the component is destroyed, browsers
   * will indicate that it's still in use and it might be blocked for other
   * applications.
   */
  beforeDestroy () {
    if (this.ready) {
      this.ready = false
      Scanner.reset()
    }
  },

  methods: {

    async init () {
      this.ready = false

      await Scanner.init(this.$refs.video, this.videoConstraints)

      Scanner.onDecode(result => {
        this.$emit('decode', result)
      })

      Scanner.onLocate(result => {
        this.$emit('locate', result)
      })

      this.ready = true
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
