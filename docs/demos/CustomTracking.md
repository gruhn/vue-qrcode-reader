<script setup>
import DemoWrapper from '../.vitepress/components/DemoWrapper.vue'
</script>

# Visual Tracking

Hold a QR code into view of the camera.
It should be visually highlighted in real-time.
Use the track function select below to change the flavor.

<ClientOnly>
  <DemoWrapper component="CustomTracking" />
</ClientOnly>

### Source

<<< @/.vitepress/components/demos/CustomTracking.vue
