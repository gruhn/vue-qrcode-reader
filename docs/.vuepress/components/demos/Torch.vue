<template>
  <div>
    <qrcode-stream :torch="torchActive" @init="logErrors">
      <button @click="torchActive = !torchActive">
        <img :src="$withBase(icon)" alt="toggle torch">
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
      torchActive: true
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
    logErrors (promise) {
      promise.catch(console.error)
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
</style>
