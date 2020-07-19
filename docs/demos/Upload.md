# Decode by Upload

Finally, with `QrcodeCapture` comes another component which allows image scanning via classic file upload.
If you are on mobile and your browser supports it,
your are not prompted with a file dialog but with your camera.
So you can directly take the picture to be uploaded.

Note that nothing is actually uploaded. Everything is happening client-side.

<ClientOnly>
  <DemoWrapper component="Upload" />
</ClientOnly>

### Source

<<< @/docs/.vuepress/components/demos/Upload.vue
