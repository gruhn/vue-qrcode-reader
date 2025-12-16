# QrcodeCapture

## Browser Support

The newest API this component depend on is the [FileReader API](https://caniuse.com/#feat=filereader). Vue Native is not supported (see [#206](https://github.com/gruhn/vue-qrcode-reader/issues/206)).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :----------------------------------: | :---------------------------: | :-----------------------------: | :---------------------------: | :---------------------------: |
|                 10+                  |              Yes              |               Yes               |              Yes              |             Yes¹              |

1. It doesn't work in web apps added to home screen (PWA mode) on iOS prior to 11.3 (see [this StackOverflow question](https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app))

## Events

### `detect`

- **Payload Type:** `DetectedBarcode[]`

The component renders to a simple file picker `input` element.
Clicking opens a file dialog.
On supporting mobile devices the camera is started to take a picture.
The selected images are directly scanned and positive results are indicated by the `detect` event.
You can also select multiple images at the same time (still one event per image though).
If no QR code can be recognized an empty array is emitted.

The structure of the event payload is the same as for the `detect` event on `QrcodeStream`.

### `decode` <Badge text="removed in v5.0.0" type="danger" />

Use `detect` instead. TODO: link old docs.

## Props

### `formats` <Badge text="since v5.3.0" type="info" />

- **Payload Type:** `BarcodeDetectorOptions['formats']`
- **Default:** `['qr_code']`

The `formats` prop defines which barcode formats are detected.
[Supported Formats](https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector).

```html
<qrcode-capture :formats="['qr_code', 'code_128']"></qrcode-capture>
```

### `disabled`, `capture`, `multiple`, ...

Technically, `QrcodeCapture` does not explicitly define any other props.
But checkout the components template:

```html
<template>
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple
  />
</template>
```

Because the `input` element is the root element of the component and because Vue components accept [fallthrough attributes](https://vuejs.org/guide/components/attrs.html#fallthrough-attributes) you can make use of any valid `input` attribute:

```html
<qrcode-capture disabled />
```

You can also override attributes.
To remove attributes, set them to `null`:

```html
<qrcode-capture :capture="null" />
```

## Slots

> no slots
