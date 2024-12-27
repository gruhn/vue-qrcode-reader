<template>
  <div
    @drop.prevent.stop="onDrop"
    @dragenter.prevent.stop="onDragOver(true)"
    @dragleave.prevent.stop="onDragOver(false)"
    @dragover.prevent.stop
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { processFile, processUrl } from '../misc/scanner'
import { type BarcodeFormat, type DetectedBarcode } from 'barcode-detector/pure'
import type { EmittedError } from '@/misc/errors'

export interface QrcodeDropZoneProps {
  formats?: BarcodeFormat[]
}

const props = withDefaults(defineProps<QrcodeDropZoneProps>(), {
  formats: () => ['qr_code']
})

const emit = defineEmits<{
  (e: 'detect', detectedCodes: DetectedBarcode[]): void
  (e: 'dragover', isDraggingOver: boolean): void
  (e: 'error', error: EmittedError): void
}>()

// methods
const onDetect = async (promise: Promise<any>) => {
  try {
    const detectedCodes = await promise
    emit('detect', detectedCodes)
  } catch (error) {
    emit('error', error as EmittedError)
  }
}

const onDragOver = (isDraggingOver: boolean) => {
  emit('dragover', isDraggingOver)
}

const onDrop = ({ dataTransfer }: DragEvent) => {
  if (!dataTransfer) return

  onDragOver(false)

  const droppedFiles = [...Array.from(dataTransfer.files)]
  const droppedUrl = dataTransfer.getData('text/uri-list')

  droppedFiles.forEach((file: File) => {
    onDetect(processFile(file, props.formats))
  })

  if (droppedUrl !== '') {
    onDetect(processUrl(droppedUrl, props.formats))
  }
}
</script>
