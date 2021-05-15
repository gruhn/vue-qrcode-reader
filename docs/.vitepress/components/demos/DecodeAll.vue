<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { QrcodeStream } from '../../../../src'

// data
const result = ref('')
const error = ref('')

// methods
const onDecode = (data) => (result.value = data)

const onInit = async (promise) => {
  try {
    await promise
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      error.value = 'ERROR: you need to grant camera access permission'
    } else if (error.name === 'NotFoundError') {
      error.value = 'ERROR: no camera on this device'
    } else if (error.name === 'NotSupportedError') {
      error.value = 'ERROR: secure context required (HTTPS, localhost)'
    } else if (error.name === 'NotReadableError') {
      error.value = 'ERROR: is the camera already in use?'
    } else if (error.name === 'OverconstrainedError') {
      error.value = 'ERROR: installed cameras are not suitable'
    } else if (error.name === 'StreamApiNotSupportedError') {
      error.value = 'ERROR: Stream API is not supported in this browser'
    } else if (error.name === 'InsecureContextError') {
      error.value =
        'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      error.value = `ERROR: Camera error (${error.name})`
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
