<template>
  <div :class="{ 'fullscreen': fullscreen }" ref="wrapper" @fullscreenchange="onFullscreenChange">
    <qrcode-stream @init="logErrors">
      <button @click="fullscreen = !fullscreen" class="fullscreen-button">
        <img :src="$withBase(fullscreenIcon)" alt="toggle fullscreen" />
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

// NOTE: calling `requestFullscreen` might prompt the user with another
// permission dialog. You already asked for camera access permission so this is
// a rather invasive move.
//
// Even without calling `requestFullscreen` the entire viewport is covered
// by the camera stream. So consider skipping `requestFullscreen` in your
// implementation.

export default {

  components: { QrcodeStream },

  data () {
    return {
      fullscreen: false
    }
  },

  computed: {
    fullscreenIcon() {
      if (this.fullscreen) {
        return "/fullscreen-exit.svg"
      } else {
        return "/fullscreen.svg"
      }
    }
  },

  watch: {
    fullscreen(enterFullscreen) {
      if (enterFullscreen) {
        this.requestFullscreen()
      } else {
        this.exitFullscreen()
      }
    }
  },

  methods: {
    onFullscreenChange(event) {
      // This becomes important when the user doesn't use the button to exit
      // fullscreen but hits ESC on desktop, pushes a physical back button on
      // mobile etc.

      this.fullscreen = document.fullscreenElement !== null
    },

    requestFullscreen() {
      const elem = this.$refs.wrapper

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    }
  }

}
</script>

<style scoped>
.fullscreen {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.fullscreen-button {
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
}
.fullscreen-button img {
  width: 2rem;
}
</style>
