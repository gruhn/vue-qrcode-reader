# Decode by Upload

Finally, with `QrcodeCapture` comes another component which allows image scanning via classic file upload.
Nothing is actually uploaded. Everything is happening client-side.

If you are on mobile and your browser supports it,
you are not prompted with a file dialog but with your camera.
So you can directly take the picture to be uploaded.
Adjust this behavior with the following dropdown:

<ClientOnly>
  <DemoWrapper :component="Upload" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import Upload from '@/components/demos/Upload.vue'
</script>

### Source

<<< @/.vitepress/components/demos/Upload.vue
