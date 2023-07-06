# Torch (Flashlight)

In low-light conditions you might want to make use of the cameras flashlight.
Using the `torch` prop, you can turn the flashlight on/off.
Note that support is inconsistent across devices and browers.

Feature sponsored by [aeschbacher.ch](https://aeschbacher.ch)

<ClientOnly>
  <DemoWrapper :component="Torch" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import Torch from '@/components/demos/Torch.vue'
</script>

### Source

<<< @/.vitepress/components/demos/Torch.vue
