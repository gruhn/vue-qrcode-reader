<template>
  <div>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream :camera="camera" @decode="onDecode" @camera-on="onCameraOn" @camera-off="onCameraOff" @error="onError">
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <img :src="withBase('/checkmark.svg')" alt="Checkmark" width="128" />
      </div>
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
      camera: 'auto',
      result: null,
      showScanConfirmation: false
    }
  },

  methods: {
    onCameraOn() {
      this.showScanConfirmation = false
    },

    onCameraOff() {
      this.showScanConfirmation = true
    },

    onError: console.error,

    async onDecode(content) {
      this.result = content

      this.pause()
      await this.timeout(500)
      this.unpause()
    },

    unpause() {
      this.camera = 'auto'
    },

    pause() {
      this.camera = 'off'
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },

    withBase
  }
}
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
