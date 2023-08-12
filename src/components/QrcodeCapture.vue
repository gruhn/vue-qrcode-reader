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
import { type PropType } from 'vue'
import { processFile } from '../misc/scanner'
import { type BarcodeFormat } from '@sec-ant/barcode-detector/pure'

const props = defineProps({
  formats: {
    type: Array as PropType<BarcodeFormat[]>,
    default: () => ['qr_code'] as BarcodeFormat[]
  }
})

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

  for (const promise of files.map(file => processFile(file, props.formats))) {
    onDetect(promise)
  }
}
</script>
