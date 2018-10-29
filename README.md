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

  <br>

  <a href="https://bundlephobia.com/result?p=vue-qrcode-reader">
    <img src="https://badgen.net/bundlephobia/minzip/vue-qrcode-reader" alt="size minified + gzipped">
  </a>
</p>

A set of Vue.js components, allowing you to detect and decode QR codes, without leaving the browser.

* `QrcodeStream` accesses the device camera and continuously scans the incoming frames.
* `QrcodeDropZone` renders to an empty region where you can drag-and-drop images to be decoded.
* `QrcodeCapture` is a classic file upload field, instantly scanning all files you select.

All components are responsive. What doesn't fit your layout can be customized.

You also get simple elegant APIs:

```html
<qrcode-stream @decode="onDecode"></qrcode-stream>
```
```js
methods: {
  onDecode (decodedString) {
    // ...
  }
}
```

### [Demos](https://gruhn.github.io/vue-qrcode-reader/) | [Docu](https://github.com/gruhn/vue-qrcode-reader/wiki)

<p align="center">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot1.png" height="500" alt="Screenshot 1">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot2.png" height="500" alt="Screenshot 2">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/screenshot3.png" height="500" alt="Screenshot 3">
</p>

# Browser support

#### `QrcodeStream`

This component fundamentally depends on the [Stream API](https://caniuse.com/#feat=stream).

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
|:--:|:---:|:---:|:---:|:---:|
| No | Yes | Yes | Yes | 11+ |

* Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see [#38](../../issues/38) for help)
* Safari also requires HTTPS **even** on localhost (see [#48](../../issues/48))
* on iOS it **only** works with Safari. Chrome or Firefox for iOS are not supported (see [#29](../../issues/29))

#### `QrcodeDropZone` and `QrcodeCapture`

The newest API these components depend on is the [FileReader API](https://caniuse.com/#feat=filereader).

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
|:--:|:---:|:---:|:---:|:---:|
| 10+ | Yes | Yes | Yes | Yes |

* Drag-and-drop is not supported on mobile

# Installation

```bash
npm install --save vue-qrcode-reader
```
or with Yarn:

```bash
yarn add vue-qrcode-reader
```

## Default import

You can either import the components independantly and register them in another
components scope:

```javascript
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

Vue.component('my-component', {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },

  // ...
))
```

Or alternatively register all of them globally right away:

```javascript
import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Browser

> All the examples on the demo page utilize [single-file components](https://vuejs.org/v2/guide/single-file-components.html). To use them in your project you need a build tool like webpack. Check out [#35](../../issues/35) for a simpler example you can use right in the browser.

Besides Vue you need to include the following CSS and JS file:
 * `<link href="`[vue-qrcode-reader.css](https://unpkg.com/vue-qrcode-reader/dist/vue-qrcode-reader.css)`"  rel="stylesheet">`
 * `<script src="`[vue-qrcode-reader.browser.js](https://unpkg.com/vue-qrcode-reader/dist/vue-qrcode-reader.browser.js)`"></script>`

The global variable `window.VueQrcodeReader` should now be available.

All components should be automatically registered globally. If not, you can do it like this:

```javascript
Vue.use(VueQrcodeReader)
```

You can also register specific components locally, in one of your components:

```javascript
Vue.component('my-component', {
  components: {
    'qrcode-stream': VueQrcodeReader.QrcodeStream,
    'qrcode-drop-zone': VueQrcodeReader.QrcodeDropZone,
    'qrcode-capture': VueQrcodeReader.QrcodeCapture
  },

  // ...
)
```
