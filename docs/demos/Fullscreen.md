# Fullscreen

`QrcodeStream` always covers the entire space available.
Not more, not less.
So to go fullscreen, simply put the component in a wrapper element that occupies the entire screen.

<ClientOnly>
  <DemoWrapper :component="Fullscreen" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import Fullscreen from '@/components/demos/Fullscreen.vue'
</script>

### Source

<<< @/.vitepress/components/demos/Fullscreen.vue
