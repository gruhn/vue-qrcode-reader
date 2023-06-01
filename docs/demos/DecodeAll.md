# Decode Continuously

Hold a QR code in the camera and see what happens. Note, you can't scan the same
QR code multiple time in a row.

<ClientOnly>
  <DemoWrapper :component="DecodeAll" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import DecodeAll from '@/components/demos/DecodeAll.vue'
</script>

### Source

<<< @/.vitepress/components/demos/DecodeAll.vue
