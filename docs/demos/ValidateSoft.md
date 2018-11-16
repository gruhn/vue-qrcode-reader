# Validation (soft)

With the `paused` prop you can process each scanned QR-code before
you let the user continue to scan stuff.

Notice how in the camera is actually still active in the background even
when the stream is paused? On mobile you might be able to tell from the
notification section. On desktop Chrome the current tab will have a
little red circular icon.

<DemoWrapper component="ValidateSoft" />

### Source

<<< @/docs/.vuepress/components/demos/ValidateSoft.vue
