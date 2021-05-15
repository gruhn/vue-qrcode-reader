<template>
  <component :is="currentDemo" />
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from 'vue'

const props = defineProps({
  component: Object
})

// data
const currentDemo = ref()

onMounted(() => {
  if (props.component) {
    currentDemo.value = markRaw(props.component)
  }
})
</script>

<style>
.decode-result {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
