# Visual Tracking with Formats

Hold a Barcode / QR code into view of the camera.
It should be visually highlighted in real-time.
Use the format function select below to change the format.
Use the track function select below to change the flavor.

<ClientOnly>
  <DemoWrapper :component="CustomTrackingWithFormats" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import CustomTrackingWithFormats from '@/components/demos/CustomTrackingWithFormats.vue'
</script>

### Source

<<< @/.vitepress/components/demos/CustomTrackingWithFormats.vue
