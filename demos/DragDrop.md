# Decode by Drag&Drop

With the `QrcodeDropZone` component you can also drag-and-drop images that
should be scanned. Use it as a standalone feature or as a fallback for desktop
users.

<ClientOnly>
  <DemoWrapper :component="DragDrop" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import DragDrop from '@/components/demos/DragDrop.vue'
</script>

### Source

<<< @/.vitepress/components/demos/DragDrop.vue
