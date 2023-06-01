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
import { useCommonApi } from '../composables/useCommonApi'

const emit = defineEmits(['detect', 'decode'])

const { onDetect } = useCommonApi(emit)

// methods
const onChangeInput = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.files) return
  const files = [...event.target.files]
  const resultPromises = files.map(processFile)

  resultPromises.forEach(onDetect)
}
</script>
