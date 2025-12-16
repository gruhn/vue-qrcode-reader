# QrcodeDropZone

## Browser Support

The newest API this component depend on is the [FileReader API](https://caniuse.com/#feat=filereader).
Vue Native is not supported (see [#206](https://github.com/gruhn/vue-qrcode-reader/issues/206)).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :----------------------------------: | :---------------------------: | :-----------------------------: | :---------------------------: | :---------------------------: |
|                 10+                  |              Yes              |               Yes               |              Yes              |              Yes              |

## Events

### `detect`

- **Payload Type:** `DetectedBarcode[]`

You can drag-and-drop image files from your desktop or images embedded into other web pages anywhere in the area the component occupies.
The images are directly scanned and positive results are indicated by the `detect` event.
You can also drop multiple images at the same time (still one event per image though).
If no QR code can be recognized an empty array is emitted.

The structure of the event payload is the same as for the `detect` event on `QrcodeStream`.

### `error` <Badge text="new in v5.0.0" type="info" />

Error events are emitted when a dropped url can't be fetched due to CORS or a dropped file has an unsupported file type.

```html
<qrcode-drop-zone @detect="onDetect">
  <!-- ... -->
</qrcode-drop-zone>
```

```javascript
methods: {
  onError (error) {
    if (error.name === 'DropImageFetchError') {
      // drag-and-dropped URL (probably just an <img> element) from different
      // domain without CORS header caused same-origin-policy violation
    } else if (error.name === 'DropImageDecodeError') {
      // drag-and-dropped file is not of type image and can't be decoded
    } else {
      // idk, open an issue ¯\_(ツ)_/¯
    }
  }
}
```

### `formats` <Badge text="since v5.3.0" type="info" />

- **Payload Type:** `BarcodeDetectorOptions['formats']`
- **Default:** `['qr_code']`

The `formats` prop defines which barcode formats are detected.
[Supported Formats](https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector).

```html
<qrcode-drop-zone :formats="['qr_code', 'code_128']"></qrcode-drop-zone>
```

### `dragover`

- **Payload Type:** `Boolean`

When the user is dragging something over the the component you might want to apply some emphasizing styling. Do that by reacting to the `dragover` event.

```html
<qrcode-drop-zone @dragover="onDragOver">
  <div :class="{ highlight: draggingOver }">
    <!-- ... -->
  </div>
</qrcode-drop-zone>
```

```javascript
data () {
  return {
    draggingOver: false
  }
},

methods: {
  onDragOver (draggingOver) {
    this.draggingOver = draggingOver
  }
}
```

::: warning
This is a custom event not to be confused with [native `dragover`](https://developer.mozilla.org/en-US/docs/Web/Events/dragover). If you really need to listen for the DOM event instead, use [Vues `native` event modifier](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components).
:::

### `decode` <Badge text="removed in v5.0.0" type="danger" />

Use `detect` instead.

[docs for v4.0.0](https://github.com/gruhn/vue-qrcode-reader/blob/781484fccd186e8e30c6191f85beec3bd174ef59/docs/api/QrcodeStream.md)

## Props

> no props

## Slots

### default

This component merely renders a wrapper `div`. Its height is defined by the content inside so it will have zero height if you don't provide any content.

```html
<qrcode-drop-zone>
  <b>put anything here</b>
</qrcode-drop-zone>
```
