# Show Loading Indicator

There is some delay between mounting the component and the camera stream
becoming visible. Listen for the `camera-on` event to show a loading indicator.

Push the button below to force destroy and re-create the component.

<ClientOnly>
  <DemoWrapper :component="LoadingIndicator" />
</ClientOnly>

<script setup lang="ts">
import DemoWrapper from '@/components/DemoWrapper.vue'
import LoadingIndicator from '@/components/demos/LoadingIndicator.vue'
</script>

### Source

<<< @/.vitepress/components/demos/LoadingIndicator.vue
