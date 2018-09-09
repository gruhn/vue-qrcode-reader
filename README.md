<p align="center">

  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/logo.png" alt="Logo" width="240" height="240" style="max-width: 100%;">

  <br>
  <br>

  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" alt="for Vue.js 2">
  </a>

  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="uses semantic release">
  </a>

  <a href="https://www.npmjs.com/package/vue-qrcode-reader">
    <img src="https://img.shields.io/npm/dm/vue-qrcode-reader.svg" alt="npm monthly downloads">
    <img src="https://img.shields.io/npm/v/vue-qrcode-reader.svg" alt="npm current version">
  </a>

  <br>

  <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="is maintained? yes">

  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/Naereen/StrapDown.js.svg" alt="licence: MIT">
  </a>

  <a href="https://github.com/Naereen/badges">
    <img src="https://img.shields.io/badge/badges-awesome-green.svg" alt="badges = awesome">
  </a>
</p>

A Vue.js 2 component, accessing the device camera and allowing users to read QR codes, within the browser.

* read camera stream and/or drag-and-dropped images
* customizable visual tracking of QR codes
* responsive and layout agnostic

### [Demos](https://gruhn.github.io/vue-qrcode-reader/)

<p align="center">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot1.png" height="500" alt="Screenshot 1">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot2.png" height="500" alt="Screenshot 2">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot3.png" height="500" alt="Screenshot 3">
</p>

# Browser support

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
|:--:|:---:|:---:|:---:|:---:|
| No | Yes | Yes | Yes | 11+ |

* Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see [#38](../../issues/38) for help)
* Safari also requires HTTPS **even** on localhost (see [#48](../../issues/48))
* on iOS it **only** works with Safari. Chrome or Firefox for iOS are not supported (see [#29](../../issues/29))
* more details on [Caniuse](https://caniuse.com/#feat=stream)

# Usage

### `decode` event
Once a stream from the users camera is loaded, it is displayed and continuously scanned for QR codes. Results are indicated by the `decode` event. This also accounts for decoded images drag-and-dropped in the area the component occupies.

```html
<qrcode-reader @decode="onDecode"></qrcode-reader>
```
```javascript
methods: {
  onDecode (decodedString) {
    // ...
  }
}
```

> You might notice that when you scan the same QR code multiple times in a row, `decode` is still only emitted once. When you hold a QR code in the camera, frames are actually decoded multiple times a second but you don't want to be flooded with `decode` events that often. That's why the last decoded QR code is always cached and only new results are propagated. However, you can clear this internal cache by setting the `paused` prop to true.

### `detect` event
The `detect` event is quite similar to `decode` but it provides more details. `decode` only gives you the string encoded by QR codes. `detect` additionally

* tells you where results came from (i.e. a camera stream, a drag-and-dropped file or url)
* gives you the unprocessed raw image data
* the coordinates of the QR code in the image/camera frame

In case of errors `decode` also silently fails. For example when a non-image file is drag-and-dropped.

```html
<qrcode-reader @detect="onDetect"></qrcode-reader>
```
```javascript
methods: {
  async onDetect (promise) {
    try {
      const {
        source,       // 'file', 'url' or 'stream'
        imageData,    // raw image data of image/frame
        content,      // decoded String
        location      // QR code coordinates
      } = await promise

      // ...
    } catch (error) {
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
}
```

### `init` event
It might take a while before the component is ready and the scanning process starts. The user has to be asked for camera access permission first and the camera stream has to be loaded.

If you want to show a loading indicator, you can listen for the `init` event. It's emitted as soon as the component is mounted and carries a promise which resolves when everything is ready. The promise is rejected if initialization fails. This can have [a couple of reasons](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions).

> In Chrome you can't prompt users for permissions a second time. Once denied, users can only manually grant them. Make sure your users understand why you need access to their camera **before** you mount this component. Otherwise they might panic and deny and then get frustrated because they don't know how to change their decision.

```html
<qrcode-reader @init="onInit"></qrcode-reader>
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
      } else {
        // browser might be lacking features (WebRTC, ...)
      }
    } finally {
      // hide loading indicator
    }
  }
}
```
### `track` prop

By default detected QR codes are visually highlighted. A transparent canvas overlays the camera stream. When a QR code is detected, its location is painted to the canvas. You can enable/disable this feature by passing `true`/`false` via the `track` prop. If tracking is disabled the camera stream is scanned much less frequently. So if you encounter performance problems on your target device, this might help.

You can also pass a function with `track` to customize the way the location is painted. This function is called to produce each frame. It receives the location object as the first argument and a `CanvasRenderingContext2D` instance as the second argument.

> Avoid access to reactive properties in this function (like stuff in `data`, `computed` or your Vuex store). The function is called several times a second and might cause memory leaks. If you want to be save don't access `this` at all.

Say you want to paint in a different color that better fits your overall page theme.

```html
<qrcode-reader :track="repaintLocation"></qrcode-reader>
```
```javascript
methods: {
  repaintLocation (location, ctx) {
    if (location !== null) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner,
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
}
```

### default slot

Distributed content will overlay the camera stream, wrapped in a `position: absolute` container.

```html
<qrcode-reader>
  <b>stuff here overlays the camera stream</b>
</qrcode-reader>
```

### `paused` prop

With the `paused` prop you can prevent further `decode` propagation. Functions passed via `track` are also stopped being called. Useful for example if you want to validate results one at a time.

> When the component is paused the camera stream freezes but is actually still running in the background. The browser will tell you that the camera is still in use. If you want to kill the stream completely you can pass `false` to the `camera` prop.

```html
<qrcode-reader @decode="onDecode" :paused="paused"></qrcode-reader>
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

### `camera` prop

With the `camera` prop you can filter the set of cameras installed on a client device. For example, if you want to access the front camera instead of the rear camera, pass this:

```html
<qrcode-reader :camera="{ facingMode: 'user' }"></qrcode-reader>
```

This component uses [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to request camera streams. This method accepts [a constraints object](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#Properties_of_video_tracks). By default this component passes this:

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

> If you change this property after initialization, a new camera stream has to be requested and the `init` event will be emitted again.


# Installation

```bash
yarn add vue-qrcode-reader
```
or using NPM:

```bash
npm install --save vue-qrcode-reader
```

## Default import

Register component globally:

```javascript
import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
```

Register locally in other components scope:

```javascript
import Vue from 'vue'
import { QrcodeReader } from 'vue-qrcode-reader'

Vue.component('my-component', {
  components: { QrcodeReader },

  // ...
)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Browser

You need to include a script and CSS file. You can pull both from [unpkg.com](https://unpkg.com). Make sure to replace `[VERSION]` with the version you need (for example `1.0.1`):

```html
<link rel="stylesheet" href="https://unpkg.com/vue-qrcode-reader@[VERSION]/dist/vue-qrcode-reader.css"/>

<script src="vue.js"></script>
<script src="https://unpkg.com/vue-qrcode-reader@[VERSION]/dist/vue-qrcode-reader.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually.

Register component globally:

```javascript
Vue.use(VueQrcodeReader)
```

Register locally in other components scope:

```javascript
Vue.component('my-component', {
  components: {
    'qrcode-reader': VueQrcodeReader.QrcodeReader
  },

  // ...
)
```
