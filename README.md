<p align="center">  
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/logo.png" alt="Logo" width="240" height="240" style="max-width: 100%;">
  
  <br>
  <br>
  
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" alt="for Vue.js 2">
  </a>

  <a href="https://www.npmjs.com/package/vue-qrcode-reader">
    <img src="https://img.shields.io/npm/dm/vue-qrcode-reader.svg" alt="npm monthly downloads">
  </a>
  
  <a href="https://travis-ci.org/gruhn/vue-qrcode-reader">
    <img src="https://travis-ci.org/gruhn/vue-qrcode-reader.svg?branch=master" alt="Travis CI: build status">
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
  
  <a href="https://www.npmjs.com/package/vue-qrcode-reader">
    <img src="https://img.shields.io/npm/v/vue-qrcode-reader.svg" alt="npm current version">
  </a>
  
  <br>
    
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="uses semantic release">
  </a>
  
  <br>
  <br>
  <a href="https://gruhn.github.io/vue-qrcode-reader/api/QrcodeStream.html">documentation</a> |
  <a href="https://gruhn.github.io/vue-qrcode-reader/demos/DecodeAll.html">live demos</a>
</p>

A set of Vue.js components, allowing you to detect and decode QR codes, without leaving the browser.

* :movie_camera: `QrcodeStream` accesses the device camera and continuously scans incoming frames.
* :put_litter_in_its_place: `QrcodeDropZone` renders to an empty region where you can drag-and-drop images to be decoded. 
* :open_file_folder: `QrcodeCapture` is a classic file upload field, instantly scanning all files you select.

All components are responsive. Beyond that, close to zero styling. Make them fit your layout. Usage is simple and straight forward:

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
### Screenshots

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

* Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see _Troubleshooting_ for help)
* Safari also requires HTTPS **even** on localhost (see [#48](../../issues/48))
* on iOS it **only** works with Safari
  * *Chrome for iOS*, *Firefox for iOS* and so on are not supported (see [#29](../../issues/29))
  * even web apps added to home screen are not supported (see [#76](../../issues/76))
  
#### `QrcodeDropZone` and `QrcodeCapture`

The newest API these components depend on is the [FileReader API](https://caniuse.com/#feat=filereader).

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
|:--:|:---:|:---:|:---:|:---:|
| 10+ | Yes | Yes | Yes | Yes |

* Drag-and-drop is not supported on mobile

# Troubleshooting

* I don't see the camera when using `QrcodeStream`.
  * Check if it works on the demo page. Especially the [Decode All](https://gruhn.github.io/vue-qrcode-reader/demos/DecodeAll.html) demo, since it renders error messages. If you see errors, consult the docs to understand their meaning.
     * Demo works but not locally: Listen for the `init` event to investigate errors.
     * Demo doesn't work: Carefully review the Browser Support section above. Maybe your device is just not supported.
* I'm running a dev server on localhost. How to test on my mobile device without HTTPS?
  * If your setup is Desktop Chrome + Android Chrome, use [Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/) which allows your Android device to [access your local server as localhost](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server).
  * Otherwise use a reverse proxy like [ngrok](https://ngrok.com/) or [serveo](https://serveo.net/) to temporarily make your local server publicly available with HTTPS.

# Installation

```bash
npm install vue-qrcode-reader
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

> All the examples on the demo page utilize [single-file components](https://vuejs.org/v2/guide/single-file-components.html). To use them in your project you need a build tool like webpack. Check out [this fiddle](https://jsfiddle.net/2bfohnax/) for a simpler example you can use right in the browser.

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
