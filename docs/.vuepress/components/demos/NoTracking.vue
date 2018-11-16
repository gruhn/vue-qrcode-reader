<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-stream :track="false" @decode="onDecode" @init="$emit('init', $event)" />
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
    }
  }
}
</script>
