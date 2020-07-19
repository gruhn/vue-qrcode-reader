<template>
  <div>
    <p class="error" v-if="noFrontCamera">
      You don't seem to have a front camera on your device
    </p>

    <p class="error" v-if="noRearCamera">
      You don't seem to have a rear camera on your device
    </p>

    <qrcode-stream :camera="camera" @init="onInit">
      <button @click="switchCamera">
        <img :src="$withBase('/camera-switch.svg')" alt="switch camera">
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {

  components: { QrcodeStream },

  data () {
    return {
      camera: 'rear',

      noRearCamera: false,
      noFrontCamera: false
    }
  },

  methods: {
    switchCamera () {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear'
          break
        case 'rear':
          this.camera = 'front'
          break
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        const triedFrontCamera = this.camera === 'front'
        const triedRearCamera = this.camera === 'rear'

        const cameraMissingError = error.name === 'OverconstrainedError'

        if (triedRearCamera && cameraMissingError) {
          this.noRearCamera = true
        }

        if (triedFrontCamera && cameraMissingError) {
          this.noFrontCamera = true
        }

        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
