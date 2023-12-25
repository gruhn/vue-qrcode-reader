<template>
  <div>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream
      :paused="paused"
      @detect="onDetect"
      @error="onError"
      @camera-on="resetValidationState"
    >
      <div
        v-if="validationSuccess"
        class="validation-success"
      >
        This is a URL
      </div>

      <div
        v-if="validationFailure"
        class="validation-failure"
      >
        This is NOT a URL!
      </div>

      <div
        v-if="validationPending"
        class="validation-pending"
      >
        Long validation in progress...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {
  components: { QrcodeStream },

  data() {
    return {
      isValid: undefined,
      paused: false,
      result: null
    }
  },

  computed: {
    validationPending() {
      return this.isValid === undefined && this.paused
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    }
  },

  methods: {
    onError: console.error,

    resetValidationState() {
      this.isValid = undefined
    },

    async onDetect([firstDetectedCode]) {
      this.result = firstDetectedCode.rawValue
      this.paused = true

      // pretend it's taking really long
      await this.timeout(3000)
      this.isValid = this.result.startsWith('http')

      // some more delay, so users have time to read the message
      await this.timeout(2000)
      this.paused = false
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
