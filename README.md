# vue-qrcode-reader

[![npm](https://img.shields.io/npm/v/vue-qrcode-reader.svg) ![npm](https://img.shields.io/npm/dm/vue-qrcode-reader.svg)](https://www.npmjs.com/package/vue-qrcode-reader)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component, accessing the device camera and allowing users to read QR codes, within the browser. Make sure to use it secure context (i.e. **HTTPS**).

[Demo](https://gruhn.github.io/vue-qrcode-reader-demo) | [Source](https://github.com/gruhn/vue-qrcode-reader-demo/blob/master/src/components/TheQrcodeReaderDemo.vue)

# Usage

As soon as it's mounted, this component will ask the user for permisson to access his device camera (back camera if available). If the user denies camera access, the `permission-deny` event is fired. You can't really ask for permissons twice so you should tell the user why you need it.

Even if the user granted permission earlier, some time might pass between mounting and the moment the camera stream is loaded. Until then you might want to show a preloader. Just listen to the `stream-loaded` event.

Once the stream is loaded, it is displayed and continuously scanned for QR codes. Results are indicated by the `decode` event.

```html
<qrcode-reader @decode="onDecode"></qrcode-reader>
```
```javascript
methods: {
  onDecode (content) {
    // ...
  }
}
```
`decode` only carries the string, encoded by the QR code. If you also want to track the QR codes position, listen for the `locate` event. It is fired whenever QR code modules are detected at certain positions and when those positions change. It's payload contains an array of coordinates (in the form of `{ x: 278, y: 346 }`) for each detected module. Or an empty array if nothing is detected anymore.

Distributed content will overlay the camera stream, wrapped in a `position: absolute` container. You can use this for example to highlight the detected position of QR codes.

```html
<qrcode-reader>
  <b>stuff here overlays the camera stream</b>
</qrcode-reader>
```

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
There is also a `no-support` event which is fired when the users browser lacks support for Canvas, WebRTC or if the page is not served over HTTPS. Since iOS 11 release, WebRTC is finally even supported in Safari. However, to optimize browser support you should install the [webrtc-adapter](https://github.com/webrtc/adapter) shim.

# Installation

```
yarn add vue-qrcode-reader webrtc-adapter
# or
npm install --save vue-qrcode-reader webrtc-adapter
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

# Contributing

All contributions are welcome. If you wish to contribution code, make sure your editor has editorconfig installed.

# License

[MIT](http://opensource.org/licenses/MIT)
