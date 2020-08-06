# QrcodeStream

## Browser Support

This component fundamentally depends on the [Stream API](https://caniuse.com/#feat=stream).

| ![Internet Explorer](./ie_32x32.png) | ![Edge](./edge2019_32x32.png) | ![Firefox](./firefox_32x32.png) | ![Chrome](./chrome_32x32.png) | ![Safari](./safari_32x32.png) |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
|                                                     No                                                      |                                               Yes                                                |                                                  Yes                                                   |                                                 Yes¹                                                 |                                                 Yes²                                                  |

1. Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see _Troubleshooting_ for help)
2. Safari also requires HTTPS **even** on localhost (see [#48](https://github.com/gruhn/vue-qrcode-reader/issues/48)). It also won't work in:
   - _Chrome for iOS_, _Firefox for iOS_, ... (see [#29](https://github.com/gruhn/vue-qrcode-reader/issues/29))
   - WkWebView component of native iOS apps
   - web apps added to home screen (PWA mode) **prior to iOS 13.4** (see [#76](https://github.com/gruhn/vue-qrcode-reader/issues/76))


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
* gives you the unprocessed raw image data
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
        imageData,    // raw image data of image/frame
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
* **Input Type:** `Boolean`, `Function`
* **Default:** `true`

By default detected QR codes are visually highlighted. A transparent canvas overlays the camera stream. When a QR code is detected, its location is painted to the canvas. You can enable/disable this feature by passing `true`/`false` via the `track` prop. If tracking is disabled the camera stream is scanned much less frequently. So if you encounter performance problems on your target device, this might help.

You can also pass a function with `track` to customize the way the location is painted. This function is called to produce each frame. It receives the location object as the first argument and a `CanvasRenderingContext2D` instance as the second argument.

::: danger
Avoid access to reactive properties in this function (like stuff in `data`, `computed` or your Vuex store). The function is called several times a second and might cause memory leaks. To be safe don't access `this` at all.
:::

Say you want to paint in a different color that better fits your overall page theme.

```html
<qrcode-stream :track="repaint"></qrcode-stream>
```
```javascript
methods: {
  repaint (location, ctx) {
    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
      // topLeftFinderPattern,
      // topRightFinderPattern,
      // bottomLeftFinderPattern
    } = location

    ctx.strokeStyle = 'blue' // instead of red

    ctx.beginPath()
    ctx.moveTo(topLeftCorner.x, topLeftCorner.y)
    ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y)
    ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y)
    ctx.lineTo(topRightCorner.x, topRightCorner.y)
    ctx.lineTo(topLeftCorner.x, topLeftCorner.y)
    ctx.closePath()

    ctx.stroke()
  }
}
```

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

### `worker` <Badge text="experimental" type="error" />

::: tip
So far *vue-qrcode-reader* could only process QR codes.
However, many people requested support for different code types
(bar codes, data matrix, color inverted QR codes, ...) though.
With this prop we try to meet these demands.

Please share your successful or unsuccessful implementation attempts at
[#109](https://github.com/gruhn/vue-qrcode-reader/issues/109).
Your feedback is greatly appreciated.
:::

By default, *QrcodeStream* will only detect QR codes.
Processing image data is expensive so a web worker is doing the heavy lifting.
Because the worker is the only QR code specific part of the library though,
you can replace the default worker and get a component that can scan whatever you want.

First of all you need to create a custom worker class:

```js
class MyWorkerClass extends Worker {
  constructor() {
    super("path/to/worker.js")
  }
}
```
(Internally, *vue-qrcode-reader* leverages [worker-loader](https://github.com/webpack-contrib/worker-loader)
to makes this slightly more convenient)

To get your `worker.js` right, check out [the default implementation](https://github.com/gruhn/vue-qrcode-reader/blob/91ee3fc8bf2f7fab96ac3f0a5d84d2d4c09b012f/src/worker/jsqr.js).

Now, pass the worker class via the `worker` prop.
Don't pass a class instance, we need the class itself!

```html
<qrcode-stream :worker="Worker"></qrcode-stream>
```
```js
data() {
  return {
    Worker: MyWorkerClass // Don't do: new MyWorkerClass()
  }
}
```

:::tip
`QrcodeCapture` and `QrcodeDropZone` too expose the `worker` prop.
Dedicated API documentation is missing so far but usage should be similar.
:::

## Slots

### default

Any distributed content overlays the camera stream, wrapped in a `position: absolute` container.

```html
<qrcode-stream>
  <b>stuff here overlays the camera stream</b>
</qrcode-stream>
```
