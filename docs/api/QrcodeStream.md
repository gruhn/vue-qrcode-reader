# QrcodeStream

## Browser Support

This component fundamentally depends on the [Stream API](https://caniuse.com/#feat=stream).
Vue Native is not supported (see [#206](https://github.com/gruhn/vue-qrcode-reader/issues/206)).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
|                                                     No                                                      |                                               Yes                                                |                                                  Yes                                                   |                                                 Yes¹                                                 |                                                 Yes²                                                  |

1. Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see _Troubleshooting_ for help)
2. Safari also requires HTTPS **even** on localhost (see [#48](https://github.com/gruhn/vue-qrcode-reader/issues/48)). Support is limited for:
   - web apps added to home screen (PWA mode): at least **iOS 13.4** (see [#76](https://github.com/gruhn/vue-qrcode-reader/issues/76))
   - iOS browsers other than Safari (_Chrome for iOS_, _Firefox for iOS_, ...): at least **iOS 14.3** (see [#29](https://github.com/gruhn/vue-qrcode-reader/issues/29))
   - WkWebView component in native iOS apps: at least **iOS 14.3** (see [#29](https://github.com/gruhn/vue-qrcode-reader/issues/29))


## Events

### `decode`
* **Payload Type:** `String`

Once a stream from the users camera is loaded, it's displayed and continuously scanned for QR codes. Results are indicated by the `decode` event.

```html
<qrcode-stream @decode="onDecode"></qrcode-stream>
```
```javascript
methods: {
  onDecode (decodedString) {
    // ...
  }
}
```

::: tip
If you scan the same QR code multiple times in a row, `decode` is still only emitted once. When you hold a QR code in the camera, frames are actually decoded multiple times a second but you don't want to be flooded with `decode` events that often. That's why the last decoded QR code is always cached and only new results are propagated. However changing the value of `camera` resets this internal cache.
:::

### `detect`
* **Payload Type:** `Promise<Object>`

The `detect` event is basically a verbose version of `decode`. `decode` only gives you the string encoded by QR codes. `detect` on the other hand ...

* is always emitted before `decode`
* gives you the coordinates of the QR code in the camera frame
* does NOT silently fail in case of errors

```html
<qrcode-stream @detect="onDetect"></qrcode-stream>
```
```javascript
methods: {
  async onDetect (promise) {
    try {
      const {
        content,      // decoded String
        location      // QR code coordinates
      } = await promise

      // ...
    } catch (error) {
      // ...
    }
  }
}
```

### `init`
* **Payload Type:** `Promise<MediaTrackCapabilities>`

It might take a while before the component is ready and the scanning process starts. The user has to be asked for camera access permission first and the camera stream has to be loaded.

If you want to show a loading indicator, you can listen for the `init` event. It's emitted as soon as the component is mounted. It carries a promise which resolves with the cameras [MediaTrackCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities) when everything is ready. The promise is rejected if initialization fails. This can have [a couple of reasons](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions).

::: warning
In Chrome you can't prompt users for permissions a second time. Once denied, users can only manually grant them. Make sure your users understand why you need access to their camera **before** you mount this component. Otherwise they might panic and deny and then get frustrated because they don't know how to change their decision.
:::

```html
<qrcode-stream @init="onInit"></qrcode-stream>
```
```javascript
methods: {
  async onInit (promise) {
    // show loading indicator

    try {
      const { capabilities } = await promise

      // successfully initialized
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        // user denied camera access permisson
      } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
      } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
      } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
      } else if (error.name === 'OverconstrainedError') {
        // did you requested the front camera although there is none?
      } else if (error.name === 'StreamApiNotSupportedError') {
        // browser seems to be lacking features
      }
    } finally {
      // hide loading indicator
    }
  }
}
```

## Props

### `track`
* **Input Type:** `Function`
* **Default:** `undefined`

You can visually highlight detected QR codes in real-time.
A transparent canvas overlays the camera stream.
When a QR code is detected, its location is painted to the canvas.

To enable this feature, pass a function to `track` that defines how this should look like.
This function is called to produce each frame.
It receives the location object as the first argument and a `CanvasRenderingContext2D` instance as the second argument.

For example check out the [Custom Tracking Demo](../demos/CustomTracking.md)

Note that this scanning frequency has to be increased.
So if you want to go easy on your target device you might not want to enable tracking.

::: danger
Avoid access to reactive properties in this function (like stuff in `data`, `computed` or your Vuex store). The function is called several times a second and might cause memory leaks. To be safe don't access `this` at all.
:::


### `camera`
* **Input Type:** `String`
* **Default:** `auto`
* **Valid Inputs:** `auto`, `rear`, `front`, `off`

With the `camera` prop you can control which camera to access on the users device.

 * Use `front` or `rear` to force request the front or rear camera respectively.
 * If you choose `auto` the rear camera is requested by default.
But if a device like a laptop has only a front camera installed, `auto` will fallback to that.
 * Use `off` to not request a camera at all or in other words: turn the camera off.

Every time the camera prop is modified, a new camera stream is requested so the `init` event is emitted again.
That way you can catch errors.
For example when the front camera is requested on a device that doesn't have one.

```html
<qrcode-stream :camera="camera" @init="onCameraChange"></qrcode-stream>
```
```js
data () {
  return {
    camera: 'auto'
  }
},

methods: {
  startFrontCamera () {
    this.camera = 'front'
  },

  onCameraChange (promise) {
    promise.catch(error => {
      const cameraMissingError = error.name === 'OverconstrainedError'
      const triedFrontCamera = this.camera === 'front'

      if (triedFrontCamera && cameraMissingError) {
        // no front camera on this device
      }
    })
  }
}
```

### `torch`
* **Input Type:** `Boolean`
* **Default:** `false`

With the `torch` prop you can turn a devices flashlight on/off.
This is not consistently supported by all devices and browsers.
Support can even vary on the same device with the same browser.
For example the rear camera often has a flashlight but the front camera doesn't.
We can only tell if flashlight control is supported once the camera is loaded and the `init` event has been emitted.
At the moment, `torch` silently fails on unsupported devices.
But from the `init` events payload you can access the [MediaTrackCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities) object.
This will tell you whether or not `torch` is supported.

Due to API limitations the camera stream must be reloaded when turning the torch on/off.
That means the `init` event will be emitted again.


```html
<qrcode-stream :torch="true" @init="onInit"></qrcode-stream>
```
```js
methods: {
  async onInit (promise) {
    const { capabilities } = await promise

    const TORCH_IS_SUPPORTED = !!capabilities.torch
  }
}
```

### `worker` <Badge text="removed in v3.0.0" type="error" />

[old documentation](https://github.com/gruhn/vue-qrcode-reader/blob/3608e0e04b0fbc8d2b57a5713fef92eef1e84c41/docs/api/QrcodeStream.md#worker-)

## Slots

### default

Any distributed content overlays the camera stream, wrapped in a `position: absolute` container.

```html
<qrcode-stream>
  <b>stuff here overlays the camera stream</b>
</qrcode-stream>
```
