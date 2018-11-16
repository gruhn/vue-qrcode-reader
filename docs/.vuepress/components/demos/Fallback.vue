<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-drop-zone @decode="onDecode">
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </qrcode-drop-zone>

    <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
  </div>
</template>

<script>
export default {
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
