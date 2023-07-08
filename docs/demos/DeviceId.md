# Enumerate Cameras

Modern mobile phones often have a variety of different cameras installed (e.g. front, rear, wide-angle, infrared, desk-view).
The one picked by default is sometimes not the best choice.
If you want fine-grained control, which camera is used, you can enumerate all installed cameras and then pick the one you need based on it's device ID.

<ClientOnly>
  <DemoWrapper :component="DeviceId" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import DeviceId from '@/components/demos/DeviceId.vue'
</script>

### Source

<<< @/.vitepress/components/demos/DeviceId.vue
