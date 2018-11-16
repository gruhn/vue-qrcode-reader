<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-stream :track="false" @decode="onDecode" @init="logErrors" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    },

    logErrors (promise) {
      promise.catch(console.error)
    }
  }
}
</script>
