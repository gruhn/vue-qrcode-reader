# vue-qrcode-reader

[![npm](https://img.shields.io/npm/v/vue-qrcode-reader.svg) ![npm](https://img.shields.io/npm/dm/vue-qrcode-reader.svg)](https://www.npmjs.com/package/vue-qrcode-reader)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component, accessing the device camera and allowing users to read QR-Codes, within the browser. Sadly [Browser support](http://caniuse.com/#search=getUserMedia) is not so good yet. Also make sure to use this component in with **HTTPS**. 

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
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

# Usage

### Props

Name | Type | Default | Description
---- | ---- | ------- | -----------
active | `Boolean` | `true` | Whether or not the componet shall scan frames for QR-Codes or not. If false, no `capture` events will be fired.
scan-interval | `Number` | `100` | Number of milliseconds to wait before scanning the next frame. 
constraints | `Object` | `{ video: { facingMode: 'environment' }, audio: false }` | Additional options, which will be passed as is to a [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) call.

### Events

Name | Arguments | Description
---- | --------- | -----------
capture | `payload` | Fired when a QR-Code is found. `payload.result` contains the data, `payload.points` the module coordinates.
no-support | `reason` | This is event is fired, when the users browsers doesn't support one of the required features (WebRTC, Canvas).
permission-deny | - | Users are asked for permission to access their devices camera. This event is fired, when the user denys this permission.
error | `error` | Fired during camera stream initilization, if any exceptions occur.

### Slot

Distributed content is displayed as overlay.

```html
<qrcode-reader>I'M ABOVE</qrcode-reader>
```

# Example

Template: 
```html
<qrcode-reader :active="stillActive" @capture="onCapture">
  {{ readData }}
</qrcode-reader>
```

Script:
```javascript
data () {
  return {
    stillActive: true,
    readData: ""
  }
},

methods: {
  onCapture (payload) {
    this.readData = payload.result  
    this.stillActive = false
  }
},
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
