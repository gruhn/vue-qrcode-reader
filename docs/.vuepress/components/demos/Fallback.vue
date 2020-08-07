<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-drop-zone @decode="onDecode" @init="logErrors">
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </qrcode-drop-zone>

    <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from '../../../../src'

export default {

  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },

  data () {
    return {
      result: '',
      noStreamApiSupport: false
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }
      }
    }
  }
}
</script>
