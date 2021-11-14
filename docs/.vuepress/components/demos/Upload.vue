<template>
  <div>
    <p>
      Capture:
      <select v-model="selected">
        <option v-for="option in options" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select>
    </p>

    <hr/>

    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-capture @decode="onDecode" :capture="selected.value" />
  </div>
</template>

<script>
import { QrcodeCapture } from '../../../../src'

export default {

  components: { QrcodeCapture },

  data () {
    const options = [
      { text: "rear camera (default)", value: "environment" },
      { text: "front camera", value: "user" },
      { text: "force file dialog", value: false },
    ]

    return {
      result: '',
      options,
      selected: options[0]
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    }
  }
}
</script>
