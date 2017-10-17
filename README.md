# vue-qrcode-reader

[![npm](https://img.shields.io/npm/v/vue-qrcode-reader.svg) ![npm](https://img.shields.io/npm/dm/vue-qrcode-reader.svg)](https://www.npmjs.com/package/vue-qrcode-reader)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component, accessing the device camera and allowing users to read QR-Codes, within the browser. It utilizes WebRTC, which only works in secure context (i.e. **HTTPS**). 

# Usage

As soon as it's mounted, this component will ask the user for permisson to access his device camera (back camera if available). The video stream is displayed and continuously scanned for QR-Codes. Results are indicated by the `capture` event.

```html
<qrcode-reader @capture="onCapture"></qrcode-reader>
```
```javascript
methods: {
  onCapture (event) {
    if (event === null) {
      // no QR-Code dected since last capture
    } else {
      event.result // string of read data 
      event.points // array of QR-Code module positions 
    }
  }
}
```
If the user denies camera access, the `permission-deny` event is fired. This permisson can't be requested a second time (at least in Chrome), so you should visually make clear why you are asking for it.

Distributed content will overlay the camera stream, wrapped in a `position: absolute;` container. You can use this for example to highlight the detected position of QR-Code modules. 

```html
<qrcode-reader>
  <b>stuff here is above the camera stream</b>
</qrcode-reader>
```

With the `paused` prop you can prevent further `capture` propagation. Useful for exampe if you're only interested in the first result.
```html
<qrcode-reader @capture="onCapture" :paused="paused"></qrcode-reader>
```
```javascript
data () {
  return {
    paused: false
  }
},

methods: { 
  onCapture (event) {
    this.paused = true
    // ...
  }
}
```
There is also a `no-support` event which is fired when the users browser lacks features, this component depends on (Canvas, WebRTC). Since iOS 11 release, all major browsers support WebRTC. However, you probably want to install a shim like [webrtc-adapter](https://github.com/webrtc/adapter) anyway.

Furthermore, there is an `error` event. If you catch it, something probably went wrong during camera initilization. 

`permission-deny`, `no-support` and `error` only carry static string error messages.


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

## License

[MIT](http://opensource.org/licenses/MIT)
