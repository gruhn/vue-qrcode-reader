# Visual Tracking

Hold a QR code into view of the camera.
It should be visually highlighted in real-time.
Use the track function select below to change the flavor.

<ClientOnly>
  <DemoWrapper :component="CustomTracking" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import CustomTracking from '@/components/demos/CustomTracking.vue'
</script>

### Source

<<< @/.vitepress/components/demos/CustomTracking.vue
