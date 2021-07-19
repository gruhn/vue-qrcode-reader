<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-capture @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeCapture } from '../../../../src'

export default {

  components: { QrcodeCapture },

  data () {
    return {
      result: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    }
  }
}
</script>
