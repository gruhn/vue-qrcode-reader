<template>
  <div>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream
      :paused="paused"
      @detect="onDetect"
      @camera-on="onCameraOn"
      @camera-off="onCameraOff"
      @error="onError"
    >
      <div
        v-show="showScanConfirmation"
        class="scan-confirmation"
      >
        <img
          :src="withBase('/checkmark.svg')"
          alt="Checkmark"
          width="128"
        />
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
      paused: false,
      result: '',
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

    async onDetect(detectedCodes) {
      this.result = JSON.stringify(detectedCodes.map((code) => code.rawValue))

      this.paused = true
      await this.timeout(500)
      this.paused = false
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
