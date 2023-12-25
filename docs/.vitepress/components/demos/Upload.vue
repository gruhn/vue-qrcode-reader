<template>
  <div>
    <p>
      Capture:
      <select v-model="selected">
        <option
          v-for="option in options"
          :key="option.text"
          :value="option"
        >
          {{ option.text }}
        </option>
      </select>
    </p>

    <hr />

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-capture
      @detect="onDetect"
      :capture="selected.value"
    />
  </div>
</template>

<script>
import { QrcodeCapture } from '../../../../src'

export default {
  components: { QrcodeCapture },

  data() {
    const options = [
      { text: 'rear camera (default)', value: 'environment' },
      { text: 'front camera', value: 'user' },
      { text: 'force file dialog', value: null }
    ]

    return {
      result: '',
      options,
      selected: options[0]
    }
  },

  methods: {
    onDetect(detectedCodes) {
      console.log(detectedCodes)

      this.result = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    }
  }
}
</script>
