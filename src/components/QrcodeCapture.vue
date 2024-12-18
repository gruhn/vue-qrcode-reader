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
import { type BarcodeFormat, type DetectedBarcode } from 'barcode-detector/pure'

export interface QrcodeCaptureProps {
  formats?: BarcodeFormat[]
}

const props = withDefaults(defineProps<QrcodeCaptureProps>(), {
  formats: () => ['qr_code']
})

const emit = defineEmits<{
  (e: 'detect', detectedCodes: DetectedBarcode[]): void
}>()

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
