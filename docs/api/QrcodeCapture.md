# QrcodeCapture

## Browser Support

The newest API this component depend on is the [FileReader API](https://caniuse.com/#feat=filereader). Vue Native is not supported (see [#206](https://github.com/gruhn/vue-qrcode-reader/issues/206)).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
|                                                     10+                                                     |                                               Yes                                                |                                                  Yes                                                   |                                                 Yes                                                  |                                                 Yes¹                                                 |

1. It doesn't work in web apps added to home screen (PWA mode) on iOS prior to 11.3 (see [this StackOverflow question](https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app))

## Events

### `decode`
* **Payload Type:** `String`

The component renders to a simple file picker `input` element. Clicking opens a file dialog. On supporting mobile devices the camera is started to take a picture. The selected images are directly scanned and positive results are indicated by the `decode` event. You can also select multiple images at the same time (still one event per image though).

However, if no QR code is pictured or an error occurs, `decode` silently fails.

```html
<qrcode-capture @decode="onDecode" />
```
```javascript
methods: {
  onDecode (decodedString) {
    // ...
  }
}
```

### `detect`
* **Payload Type:** `Promise<Object>`

The `detect` event is basically a verbose version of `decode`. `detect` is emitted as soon as you confirm your file selection or the foto you took with your camera. `detect` carries a Promise which resolves when scanning the images has finished. The Promise rejects in case of errors. Additionally, `detect` gives you the unprocessed raw image data and the coordinates of the QR code in the image.

```html
<qrcode-capture @detect="onDetect" />
```
```javascript
methods: {
  async onDetect (promise) {
    try {
      const {
        imageData,    // raw image data of image/frame
        content,      // decoded String or null
        location      // QR code coordinates or null
      } = await promise

      if (content === null) {
         // decoded nothing
      } else {
         // ...
      }
    } catch (error) {
      // ...
    }
  }
}
```

## Props

`QrcodeCapture` has no explicitly defined props.
However, checkout the components template:

```html
<template lang="html">
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

Because the `input` element is the root element of the component and because Vue components accept [non-prop attributes](https://vuejs.org/v2/guide/components-props.html#Non-Prop-Attributes) you can make use of any valid `input` attribute:

```html
<qrcode-capture disabled />
```

You can even remove or replace already defined attributes:

```html
<qrcode-capture :multiple="false" capture="user" />
```

## Slots

> no slots
