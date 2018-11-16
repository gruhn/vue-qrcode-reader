# QrcodeStream

## Events

### `decode`
* **Payload Type:** `String`

Once a stream from the users camera is loaded, it is displayed and continuously scanned for QR codes. Results are indicated by the `decode` event. This also accounts for decoded images drag-and-dropped in the area the component occupies.

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

::: warning
You might notice that when you scan the same QR code multiple times in a row, `decode` is still only emitted once. When you hold a QR code in the camera, frames are actually decoded multiple times a second but you don't want to be flooded with `decode` events that often. That's why the last decoded QR code is always cached and only new results are propagated. However when you activate `paused` or modify the `camera` prop, this internal cache is cleared.
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
* **Payload Type:** `Promise<void>`

It might take a while before the component is ready and the scanning process starts. The user has to be asked for camera access permission first and the camera stream has to be loaded.

If you want to show a loading indicator, you can listen for the `init` event. It's emitted as soon as the component is mounted and carries a promise which resolves when everything is ready. The promise is rejected if initialization fails. This can have [a couple of reasons](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions).

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
      await promise

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
        // passed constraints don't match any camera.
        // Did you requested the front camera although there is none?
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

### `paused`
* **Input Type:** `Boolean`
* **Default:** `false`

With the `paused` prop you can prevent further `decode` and `detect` propagation. Functions passed via `track` are also not called anymore. Useful for example if you want to validate results one at a time.

::: tip
When the component is paused the camera stream freezes but is actually still running in the background. The browser will tell you that the camera is still in use. If you want to kill the stream completely you can pass `false` to the `camera` prop.
:::

```html
<qrcode-stream @decode="onDecode" :paused="paused"></qrcode-stream>
```
```javascript
data () {
  return {
    paused: false
  }
},

methods: {
  onDecode (content) {
    this.paused = true
    // ...
  }
}
```

### `track`
* **Input Type:** `Boolean`, `Function`
* **Default:** `true`

By default detected QR codes are visually highlighted. A transparent canvas overlays the camera stream. When a QR code is detected, its location is painted to the canvas. You can enable/disable this feature by passing `true`/`false` via the `track` prop. If tracking is disabled the camera stream is scanned much less frequently. So if you encounter performance problems on your target device, this might help.

You can also pass a function with `track` to customize the way the location is painted. This function is called to produce each frame. It receives the location object as the first argument and a `CanvasRenderingContext2D` instance as the second argument.

::: danger
Avoid access to reactive properties in this function (like stuff in `data`, `computed` or your Vuex store). The function is called several times a second and might cause memory leaks. If you want to be safe don't access `this` at all.
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
* **Input Type:** `Boolean`, `Object`
* **Default:** see below

The clients device can have arbitrarily many cameras installed. Which one is picked when the component is mounted? This decision is left to the device itself so it's basically random. However, with the `camera` prop you can pass some constraints to filter what kind of cameras you what to allow. For example, if you want to access a front camera instead of a rear cameras, pass this:

```html
<qrcode-stream :camera="{ facingMode: 'user' }"></qrcode-stream>
```

This component uses [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to request camera streams. This method accepts [a constraints object](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#Properties_of_video_tracks). This is passed by default:

```javascript
{
  audio: false, // don't request microphone access
  video: {
    facingMode: { ideal: 'environment' }, // use rear camera if available
    width: { min: 360, ideal: 680, max: 1920 }, // constrain video width resolution
    height: { min: 240, ideal: 480, max: 1080 }, // constrain video height resolution
  }
}
```

This `video` part in this object is essentially what you can change using the `camera` prop. Note that you only have to pass properties you want to override. All the other default properties on the first depth level are preserved. Here are a few examples:

`camera="{ facingMode: 'user' }"`: the `facingMode` property is passed and is the only property that changes. `width` and `height` are still the default value.

`camera="false"`: overrides ALL default properties. No camera can match those constraints so no camera is request in the first place. You can use this to turn of the camera at runtime.

`camera="{}"`: since an empty object does not contain properties that could override something, this is just like falling back to the default. The same as not using the `camera` prop at all or passing `undefined`/`null`.

`camera="true"`: overrides ALL default properties. You will accept any camera type there is. Not recommended though as iOS seems to have trouble when the `height` and `width` constraints are missing.

::: warning
If you change this property after initialization, a new camera stream has to be requested and the `init` event will be emitted again.
:::


## Slots

### default

Any distributed content overlays the camera stream, wrapped in a `position: absolute` container.

```html
<qrcode-stream>
  <b>stuff here overlays the camera stream</b>
</qrcode-stream>
```
