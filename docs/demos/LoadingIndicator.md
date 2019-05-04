# Show Loading Indicator

There is some delay between mounting the component and the camera stream
becoming visible. Listen for the `init` event to show a loading indicator.

Push the button below to force destroy and re-create the component.

<ClientOnly>
  <DemoWrapper component="LoadingIndicator" />
</ClientOnly>

### Source

<<< @/docs/.vuepress/components/demos/LoadingIndicator.vue
