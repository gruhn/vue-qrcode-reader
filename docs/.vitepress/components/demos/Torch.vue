<template>
  <div>
    <p v-if="torchNotSupported" class="error">Torch not supported for active camera</p>

    <qrcode-stream :torch="torchActive" @camera-on="onCameraOn" @error="onError">
      <button @click="torchActive = !torchActive" :disabled="torchNotSupported">
        <img :src="withBase(icon)" alt="toggle torch" />
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
      torchActive: false,
      torchNotSupported: false
    }
  },

  computed: {
    icon() {
      if (this.torchActive) return '/flash-off.svg'
      else return '/flash-on.svg'
    }
  },

  methods: {
    onCameraOn(capabilities) {
      console.log(capabilities)
      this.torchNotSupported = !capabilities.torch
    },

    onError: console.error,

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
