<template>
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple
  />
</template>

<script setup lang="ts">
import { processFile } from '../misc/scanner'

const emit = defineEmits(['detect'])

// methods
const onDetect = async promise => {
  // FIXME: why await twice here???
  const detectedCodes = await (await promise)
  emit('detect', detectedCodes)
}

const onChangeInput = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.files) return

  const files = [...Array.from(event.target.files)]

  for (const promise of files.map(processFile)) {
    onDetect(promise)
  }
}
</script>
