# vue-qrcode-reader

[![npm](https://img.shields.io/npm/v/vue-qrcode-reader.svg) ![npm](https://img.shields.io/npm/dm/vue-qrcode-reader.svg)](https://www.npmjs.com/package/vue-qrcode-reader)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component, accessing the device camera and allowing users to read QR codes, within the browser.

:point_right: In Chrome this component [only works with HTTPS](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (or localhost)

### [Demos](https://gruhn.github.io/vue-qrcode-reader/)

# Usage

### `@decode` and `@locate`
Once a stream from the users camera is loaded, it is displayed and continuously scanned for QR codes. Results are indicated by the `decode` event.

`decode` only carries the string, encoded by the QR code. If you also want to track the QR codes position, listen for the `locate` event. Its payload is an array of coordinates (for example `{ x: 278, y: 346 }`) of the QR codes corners, relative to the components position and size. The event is emitted whenever the coordinates change or no QR code is detected anymore, resulting in an empty array payload.

```html
<qrcode-reader @decode="onDecode" @locate="onLocate"></qrcode-reader>
```
```javascript
methods: {
  onDecode (content) {
    // ...
  },

  onLocate (points) {
    // ...
  }
}
```

### `@init`

It might take a while before the component is ready and the scanning process starts. The user has to be asked for camera access permission first and the camera stream has to be loaded.

If you want to show a loading indicator, you can listen for the `init` event. It's emitted as soon as the component is mounted and carries a promise which resolves when everything is ready. The promise is rejected if initialization fails. This can have [a couple of reasons](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Exceptions).

:point_right: Camera access permission can't really be requested a second time. Once denied, it can only be re-granted in the browser settings. So to avoid panic and frustration, make sure your users understand why you need this permisson.

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
        // passed constraints don't match any camera. Did you requested the front camera although there is none?
      } else {
        // browser is probably lacking features (WebRTC, Canvas)
      }
    } finally {
      // hide loading indicator
    }
  }
}
```

### Distributed content

Distributed content will overlay the camera stream, wrapped in a `position: absolute` container. You can use this for example to highlight the detected position of QR codes.

```html
<qrcode-reader>
  <b>stuff here overlays the camera stream</b>
</qrcode-reader>
```

### `:paused`

With the `paused` prop you can prevent further `decode` and `locate` propagation. Useful for example if you're only interested in the first result. This will also freeze the camera stream.

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

### `:constraints`

This component uses [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to request a camera stream. This method accepts a constraints object to configure for example if front or rear camera should be accessed. You can pass this object using the `constraints` prop. If you don't pass it, it will default to:

```javascript
{
  audio: false, // don't request audio stream
  video: {
    facingMode: { ideal: 'environment' }, // use rear camera if available
    width: { min: 360, ideal: 1280, max: 1920 }, // constrain video width resolution
    height: { min: 240, ideal: 720, max: 1080 } // constrain video height resolution
  },
}
```
:point_right: If you change this property after initialization, a new camera stream will be requested and the `init` event will be emitted again.

Note that your passed object and the default object are merged two levels deep. That means you only have to pass properties, you want to override. If you want to use the front camera for example, do it like this:

```html
<qrcode-reader :constraints="constraints"></qrcode-reader>
```
```javascript
data () {
  return {
    constraints: {
      video: {
        facingMode: { ideal: 'user' }
      }
    }
  }
}
```

**BUT** if you want to change a single property on the third depth level you have to pass the hole object. For example this:
```javascript
{
  video: {
    width: { max: 1440 }
  }
}
```
Would result in this:
```javascript
{
  audio: false,
  video: {
    facingMode: { ideal: 'environment' },
    width: { max: 1440 }, // width property full replaced
    height: { min: 240, ideal: 720, max: 1080 }
  }
}
```
So if you want to keep the other properties, pass this:
```javascript
{
  video: {
    width: { min: 360, ideal: 1280, max: 1440 }
  }
}
```


# Installation

```
yarn add vue-qrcode-reader
# or
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
  // ...
  components: {
    // ...
    'qrcode-reader': QrcodeReader
  },
  // ...
)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Register component globally:

```javascript
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
import VueQrcodeReader from 'vue-qrcode-reader/dist/vue-qrcode-reader.common'

Vue.use(VueQrcodeReader)
```

Register locally in other components scope:

```javascript
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
import { QrcodeReader } from 'vue-qrcode-reader/dist/vue-qrcode-reader.common'

Vue.component('my-component', {
  // ...
  components: {
    // ...
    'qrcode-reader': QrcodeReader
  },
  // ...
)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="vue-qrcode-reader/dist/vue-qrcode-reader.css"/>

<script src="vue.js"></script>
<script src="vue-qrcode-reader/dist/vue-qrcode-reader.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Register component globally:

```javascript
Vue.use(VueQrcodeReader)
```

Register locally in other components scope:

```javascript
Vue.component('my-component', {
  // ...
  components: {
    // ...
    'qrcode-reader': VueQrcodeReader.QrcodeReader
  },
  // ...
)
```

## Source import

Register component globally:

```javascript
import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader/src'

Vue.use(VueQrcodeReader)
```

Register locally in other components scope:

```javascript
import Vue from 'vue'
import { QrcodeReader } from 'vue-qrcode-reader/src'

Vue.component('my-component', {
  // ...
  components: {
    // ...
    'qrcode-reader': QrcodeReader
  },
  // ...
)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

---

# License

[MIT](http://opensource.org/licenses/MIT)
