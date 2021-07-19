<template>
  <div>
    <p v-if="torchNotSupported" class="error">
      Torch not supported for active camera
    </p>

    <qrcode-stream :torch="torchActive" @init="onInit">
      <button @click="torchActive = !torchActive" :disabled="torchNotSupported">
        <img :src="$withBase(icon)" alt="toggle torch">
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
      torchActive: false,
      torchNotSupported: false
    }
  },

  computed: {
    icon() {
      if (this.torchActive)
        return '/flash-off.svg'
      else
        return '/flash-on.svg'
    }
  },

  methods: {
    async onInit (promise) {
      try {
        const { capabilities } = await promise

        console.log(capabilities);

        this.torchNotSupported = !capabilities.torch
      } catch (error) {
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
