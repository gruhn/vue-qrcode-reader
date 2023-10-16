<template>
  <div>
    <p>
      Pick camera:
      <select v-model="selected">
        <option
          v-for="device in devices"
          :key="device.label"
          :value="device"
        >
          {{ device.label }}
        </option>
      </select>
    </p>

    <p
      v-if="torchNotSupported"
      class="error"
    >
      Torch not supported for active camera
    </p>

    <qrcode-stream
      :torch="torchActive"
      :constraints="{ deviceId: selected.deviceId }"
      v-if="selected !== null"
      @error="console.error"
      @camera-on="onCameraOn"
      v-memo="[torchActive, selected.deviceId]"
    >
      <button
        @click="torchActive = !torchActive"
        :disabled="torchNotSupported"
      >
        <img
          :src="withBase(icon)"
          alt="toggle torch"
        />
      </button>
    </qrcode-stream>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { withBase } from 'vitepress'
import { QrcodeStream } from '../../../../src'

const selected = ref(null as MediaDeviceInfo | null)
const devices = ref([] as MediaDeviceInfo[])

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === 'videoinput'
  )

  if (devices.value.length > 0) {
    selected.value = devices.value[0]
  }
})

const torchActive = ref(false)
const torchNotSupported = ref(false)

const icon = computed(() => {
  if (torchActive.value) {
    return '/flash-off.svg'
  } else {
    return '/flash-on.svg'
  }
})

function onCameraOn(capabilities) {
  console.log(capabilities)
  torchNotSupported.value = !capabilities.torch
}

function onError(err) {
  console.error(err)
}
</script>

<style scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
}
button img {
  width: 50px;
  height: 50px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
