# Scan Same QR Code More Than Once

You might have noticed that scanning the same QR code again doesn't work.
The thing is when a QR code is in the view of your the camera it's decoded multiple times a second.
You don't want to be flooded with decode events that often though.
That's why the last decoded QR code is "cached" and an event is only emitted, when the decoded content changes.

However this cache is reset when you change the `camera` prop.
We can exploit that to scan same QR codes multiple times in a row.

<ClientOnly>
  <DemoWrapper component="ScanSameQrcodeMoreThanOnce" />
</ClientOnly>

### Source

<<< @/docs/.vuepress/components/demos/ScanSameQrcodeMoreThanOnce.vue
