# QrcodeStream

## Browser Support

This component fundamentally depends on the [Stream API](https://caniuse.com/#feat=stream).
Vue Native is not supported (see [#206](https://github.com/gruhn/vue-qrcode-reader/issues/206)).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :----------------------------------: | :---------------------------: | :-----------------------------: | :---------------------------: | :---------------------------: |
|                  No                  |              Yes              |               Yes               |             Yes¹              |             Yes²              |

1. Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see _Troubleshooting_ for help)
2. Safari also requires HTTPS **even** on localhost (see [#48](https://github.com/gruhn/vue-qrcode-reader/issues/48)). Support is limited for:
   - web apps added to home screen (PWA mode): at least **iOS 13.4** (see [#76](https://github.com/gruhn/vue-qrcode-reader/issues/76))
   - iOS browsers other than Safari (_Chrome for iOS_, _Firefox for iOS_, ...): at least **iOS 14.3** (see [#29](https://github.com/gruhn/vue-qrcode-reader/issues/29))
   - WkWebView component in native iOS apps: at least **iOS 14.3** (see [#29](https://github.com/gruhn/vue-qrcode-reader/issues/29))

## Events

### `detect`

- **Payload Type:** `DetectedBarcode[]`

Once a stream from the users camera is loaded, it's displayed and continuously scanned for QR codes.
Results are indicated by the `detect` event.

```html
<qrcode-stream @detect="onDetect"></qrcode-stream>
```

```javascript
methods: {
  onDetect (detectedCodes) {
    // ...
  }
}
```

The payload is an array of **one or multiple** detected codes (only QR codes supported at the moment).
The structure of the array items is accroding to the [Barcode Detection API spec](https://wicg.github.io/shape-detection-api/#detectedbarcode-section).
Here is an example:

```json
[
  {
    "boundingBox": {
      "x": 82,
      "y": 70,
      "width": 178,
      "height": 188,
      "top": 70,
      "right": 260,
      "bottom": 258,
      "left": 82
    },
    "rawValue": "https://wikipedia.org",
    "format": "qr_code",
    "cornerPoints": [
      { "x": 82, "y": 91 },
      { "x": 244, "y": 70 },
      { "x": 260, "y": 240 },
      { "x": 94, "y": 258 }
    ]
  },
  {
    "boundingBox": {
      "x": 322,
      "y": 135,
      "width": 244,
      "height": 240,
      "top": 135,
      "right": 566,
      "bottom": 375,
      "left": 322
    },
    "rawValue": "Hello, world!",
    "format": "qr_code",
    "cornerPoints": [
      { "x": 322, "y": 160 },
      { "x": 542, "y": 135 },
      { "x": 566, "y": 359 },
      { "x": 342, "y": 375 }
    ]
  }
]
```

::: tip
If you scan the same QR code multiple times in a row, `detect` is still only emitted once.
When you hold a QR code in the camera, frames are actually decoded multiple times a second but you don't want to be flooded with `detect` events that often.
That's why the last decoded QR code is always cached and only new results are propagated.
However changing the value of `paused` resets this internal cache.
:::

### `formats` <Badge text="since v5.3.0" type="info" />

- **Payload Type:** `BarcodeDetectorOptions['formats']`
- **Default:** `['qr_code']`

The `formats` prop defines which barcode formats are detected.
By default, only QR codes are selected, 
so if you want to scan other barcode formats, 
you have to modify this prop.
See: [supported formats](https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector).

```html
<qrcode-stream :formats="['qr_code', 'code_128']"></qrcode-stream>
```

::: warning
Don't select more barcode formats than needed. 
Scanning becomes more expensive the more formats you select.
:::

Under the hood, we use the standard 
[`BarcodeDetector`](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) 
browser API.
Support varies across devices, operating systems and browsers.
The component will prefer to use the native implementation if available and otherwise falls back to a polyfill implementation.
Note that even if the native implementation is availabe,  
the component still might use the polyfill.
For example, if the native implementation only supports the 
format `'qr_code'` but the you select the formats `['qr_code', 'aztec']`.

### `camera-on` <Badge text="since v5.0.0" type="info" />

- **Payload Type:** `Promise<MediaTrackCapabilities>`

It might take a while before the component is ready and the scanning process starts.
The user has to be asked for camera access permission first and the camera stream has to be loaded.

If you want to show a loading indicator, you can listen for the `camera-on` event.
It's emitted as soon as the camera start streaming.

It carries a promise which resolves with the cameras [MediaTrackCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities) when everything is ready.

```html
<qrcode-stream @camera-on="onReady"></qrcode-stream>
```

```javascript
methods: {
  onReady(capabilities) {
    // hide loading indicator
  }
}
```

::: warning
In Chrome you can't prompt users for permissions a second time.
Once denied, users can only manually grant them.
Make sure your users understand why you need access to their camera **before** you mount this component.
Otherwise they might panic and deny and then get frustrated because they don't know how to change their decision.
:::

### `camera-off` <Badge text="since v5.0.0" type="info" />

- **Payload Type:** `void`

Emitted whenever the camera is turned off.
This happens whenever the camera constraints are modified and the camera has to be restarted or a different camera is started.
For example when switching between front and rear camera.

### `error` <Badge text="since v5.0.0" type="info" />

- **Payload Type:** `Error`

Error events are emitted in particular when camera initialization fails.
This can happen [a couple of reasons](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions).

```html
<qrcode-stream @error="onError"></qrcode-stream>
```

```javascript
methods: {
  onError(error) {
    if (error.name === 'NotAllowedError') {
      // user denied camera access permission
    } else if (error.name === 'NotFoundError') {
      // no suitable camera device installed
    } else if (error.name === 'NotSupportedError') {
      // page is not served over HTTPS (or localhost)
    } else if (error.name === 'NotReadableError') {
      // maybe camera is already in use
    } else if (error.name === 'OverconstrainedError') {
      // did you request the front camera although there is none?
    } else if (error.name === 'StreamApiNotSupportedError') {
      // browser seems to be lacking features
    }
  }
}
```

### `decode` <Badge text="removed in v5.0.0" type="danger" />

Use `detect` instead.

[docs for v4.0.0](https://github.com/gruhn/vue-qrcode-reader/blob/781484fccd186e8e30c6191f85beec3bd174ef59/docs/api/QrcodeStream.md)

### `init` <Badge text="removed in v5.0.0" type="danger" />

Use `camera-on`/`error` instead.

[docs for v4.0.0](https://github.com/gruhn/vue-qrcode-reader/blob/781484fccd186e8e30c6191f85beec3bd174ef59/docs/api/QrcodeStream.md)

### `camera` <Badge text="removed in v5.0.0" type="danger" />

Use `constraints` instead.

[docs for v4.0.0](https://github.com/gruhn/vue-qrcode-reader/blob/781484fccd186e8e30c6191f85beec3bd174ef59/docs/api/QrcodeStream.md)

## Props

### `paused` <Badge text="since v5.0.0" type="info" />

- **Input Type:** `Boolean`
- **Default:** `false`

Setting this prop to `true` freezes the camera.
Useful if you want to show some microinteraction after successful scans.
When you unpause the camera is restarted so the `camera-on` event is emitted again.

### `track`

- **Input Type:** `Function`
- **Default:** `undefined`

You can visually highlight detected QR codes in real-time.
A transparent canvas overlays the camera stream.
When a QR code is detected, its location is painted to the canvas.

To enable this feature, pass a function to `track` that defines how this should look like.
This function is called to produce each frame.
It receives the location object as the first argument and a `CanvasRenderingContext2D` instance as the second argument.

For example check out [this demo](../demos/FullDemo.md).

Note that this scanning frequency has to be increased.
So if you want to go easy on your target device you might not want to enable tracking.

::: danger
Avoid access to reactive properties in this function (like stuff in `data`, `computed` or your Vuex store). The function is called several times a second and might cause memory leaks. To be safe don't access `this` at all.
:::

### `constraints`

- **Input Type:** `MediaTrackConstraints`
- **Default:** `{ facingMode: "environment" }`

With this prop you can pass an object with various camera configuration options.
For example whether to use front- or rear camera.

The object must be of type [`MediaTrackConstriants`](https://w3c.github.io/mediacapture-main/#dom-mediatrackconstraints).

The object is passed as-is to `getUserMedia`, which is the API call for requesting a camera stream:

```js
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: the_constraint_object_you_provide
})
```

Every time the prop is modified, a new camera stream is requested so the `camera-on` event is emitted again.
You can catch errors with the `error` event.
An error can occur for example when you try to use the front camera on a device that doesn't have one.

```html
<qrcode-stream
  :constraints="{ facingMode }"
  @error="onError"
></qrcode-stream>
```

```js
data () {
  return {
    facingMode: 'environment'
  }
},

methods: {
  startFrontCamera () {
    this.facingMode = 'user'
  },

  onError (error) {
    const cameraMissingError = error.name === 'OverconstrainedError'
    const triedFrontCamera = this.facingMode === 'user'

    if (triedFrontCamera && cameraMissingError) {
      // no front camera on this device
    }
  }
}
```

### `torch`

- **Input Type:** `Boolean`
- **Default:** `false`

With the `torch` prop you can turn a devices flashlight on/off.
This is not consistently supported by all devices and browsers.
Support can even vary on the same device with the same browser.
For example the rear camera often has a flashlight but the front camera doesn't.
We can only tell if flashlight control is supported once the camera is loaded and the `camera-on` event has been emitted.
At the moment, `torch` silently fails on unsupported devices.
But from the `camera-on` events payload you can access the [MediaTrackCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities) object.
This will tell you whether or not `torch` is supported.

Due to API limitations the camera stream must be reloaded when turning the torch on/off.
That means the `camera-on` event will be emitted again.

```html
<qrcode-stream
  :torch="true"
  @camera-on="onInit"
></qrcode-stream>
```

```js
methods: {
  onInit (capabilities) {
    const TORCH_IS_SUPPORTED = !!capabilities.torch
  }
}
```

## Slots

### default

Any distributed content overlays the camera stream, wrapped in a `position: absolute` container.

```html
<qrcode-stream>
  <b>stuff here overlays the camera stream</b>
</qrcode-stream>
```
