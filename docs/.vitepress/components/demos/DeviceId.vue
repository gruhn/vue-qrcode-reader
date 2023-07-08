<template>
  <div>
    <p>
      <select v-model="selected">
        <option v-for="device in devices" :key="device.label" :value="device">
          {{ device.label }}
        </option>
      </select>
    </p>

		<div>
	    <qrcode-stream :constraints="{ deviceId: selected.deviceId }" @error="console.error" v-if="selected !== null" />
			<p v-else class="error">No cameras on this device</p>
		</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QrcodeStream } from '../../../../src'

const selected = ref(null)
const devices = ref([])

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices())
    .filter(({ kind }) => kind === 'videoinput')

	if (devices.value.length > 0) {
		selected.value = devices.value[0]	
	}
})
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
