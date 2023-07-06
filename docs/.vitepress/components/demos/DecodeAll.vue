<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream @detect="onDetect" @error="onError" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { QrcodeStream } from '../../../../src'

// data
const result = ref('')
const error = ref('')

// methods
const onDetect = detectedCodes => {
  console.log(detectedCodes)

  const [ firstCode ] = detectedCodes
  result.value = firstCode.rawValue
}

const onError = err => {
  if (err.name === 'NotAllowedError') {
    error.value = 'ERROR: you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value = 'ERROR: no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value = 'ERROR: secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value = 'ERROR: is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value = 'ERROR: installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value = 'ERROR: Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value =
      'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value = `ERROR: Camera error (${err.name})`
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
