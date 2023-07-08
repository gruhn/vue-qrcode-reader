<template>
  <div>
    <p class="error" v-if="noFrontCamera">You don't seem to have a front camera on your device</p>

    <p class="error" v-if="noRearCamera">You don't seem to have a rear camera on your device</p>

    <qrcode-stream :constraints="{ facingMode }" @error="onError">
      <button @click="switchCamera">
        <img :src="withBase('/camera-switch.svg')" alt="switch camera" />
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
import { withBase } from 'vitepress'

import { QrcodeStream } from '../../../../src'

export default {
  components: { QrcodeStream },

  data() {
    return {
      facingMode: 'environment',  
      noRearCamera: false,
      noFrontCamera: false
    }
  },

  methods: {
    switchCamera() {
      switch (this.facingMode) {
        case 'environment':
          this.facingMode = 'user'
          break
        case 'user':
          this.facingMode = 'environment'
          break
      }
    },

    onError(error) {
      const triedFrontCamera = this.facingMode === 'user'
      const triedRearCamera = this.facingMode === 'environment'

      const cameraMissingError = error.name === 'OverconstrainedError'

      if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true
      }

      if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true
      }

      console.error(error)
    },

    withBase
  }
}
</script>

<style scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
}
button img {
  with: 50px;
  height: 50px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
