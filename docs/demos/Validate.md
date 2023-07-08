# Pause & Validate

By pausing you can process each scanned QR-code one at a time.
The last received frame is still displayed so it just looks like the stream is
paused.

<ClientOnly>
  <DemoWrapper :component="Validate" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import Validate from '@/components/demos/Validate.vue'
</script>

### Source

<<< @/.vitepress/components/demos/Validate.vue
