<template>
  <div :class="{ 'fullscreen': fullscreen }" ref="wrapper">
    <qrcode-stream @init="logErrors">
      <button @click="toggleFullscreen()" class="fullscreen-button">
        TOGGLE FULLSCREEN
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream },

  data () {
    return {
      fullscreen: false
    }
  },

  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    },

    logErrors (promise) {
      promise.catch(console.error)
    }
  },

  watch: {
    fullscreen(enterFullscreen) {
      // NOTE: calling `requestFullscreen` will prompt the user with the
      // fullscreen-permission-dialog. You already asked for camera access
      // permission so this is a pretty invasive move.
      //
      // Even without calling `requestFullscreen` the entire viewport is covered
      // by the camera stream. On mobile, only the address bar is still visible.
      // So consider removing this part in your implementation.

      if (enterFullscreen) {
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
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    }
  }

}
</script>

<style scoped>
.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.fullscreen-button {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
}
</style>
