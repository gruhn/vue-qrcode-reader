# Handle Errors

Hold a QR code in the camera and see what happens. Note, you can't scan the same
QR code multiple time in a row.

<ClientOnly>
  <DemoWrapper :component="HandleErrors" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import HandleErrors from '@/components/demos/HandleErrors.vue'
</script>

### Source

<<< @/.vitepress/components/demos/HandleErrors.vue
