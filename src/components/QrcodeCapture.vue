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
import { type BarcodeFormat } from 'barcode-detector/pure'

const props = defineProps({
  formats: {
    type: Array as PropType<BarcodeFormat[]>,
    default: () => ['qr_code'] as BarcodeFormat[]
  }
})

const emit = defineEmits(['detect'])

// methods
const onChangeInput = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.files) return

  for (const file of Array.from(event.target.files)) {
    processFile(file, props.formats).then((detectedCodes) => {
      emit('detect', detectedCodes)
    })
  }
}
</script>
