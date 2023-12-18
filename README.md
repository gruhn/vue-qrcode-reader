<p align="center">
  <img src="https://vue-qrcode-reader.netlify.app/logo.png" alt="Logo" width="240" height="240" style="max-width: 100%;">

  <br>
  <br>

  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-3-brightgreen.svg" alt="for Vue 3">
  </a>

  <a href="https://www.npmjs.com/package/vue-qrcode-reader">
    <img src="https://img.shields.io/npm/dm/vue-qrcode-reader.svg" alt="npm monthly downloads">
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

  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="uses semantic release">
  </a>

  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier">
  </a>

  <br>

  <a href="https://bundlephobia.com/result?p=vue-qrcode-reader">
    <img src="https://badgen.net/bundlephobia/minzip/vue-qrcode-reader" alt="size minified + gzipped">
  </a>

  <a href="https://www.npmjs.com/package/vue-qrcode-reader">
    <img src="https://img.shields.io/npm/v/vue-qrcode-reader.svg" alt="npm current version">
  </a>


  <br>

  <a href="https://github.com/vuejs/awesome-vue">
    <img src="https://awesome.re/mentioned-badge.svg" alt="Mentioned in Awesome Vue">
  </a>

  <br>
  <br>
  <a href="https://vue-qrcode-reader.netlify.app/demos/CustomTracking.html">live demos</a> |
  <a href="https://vue-qrcode-reader.netlify.app/api/QrcodeStream.html">api reference</a>
</p>

A set of Vue.js components for detecting QR codes and [various other barcode formats](https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector) right in the browser:

- :movie_camera: `QrcodeStream` continuously scans frames from a camera stream.
- :put_litter_in_its_place: `QrcodeDropZone` is an empty region where you can drag-and-drop images to be decoded.
- :open_file_folder: `QrcodeCapture` is a classic file upload field, instantly scanning all files you select.

All components are responsive. 
Beyond that, close to zero styling. 
Make them fit your layout. 
Usage is simple and straight forward:

```html
<qrcode-stream @detect="onDetect"></qrcode-stream>
```

```js
methods: {
  onDetect (detectedCodes) {
    // ...
  }
}
```

### Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/preview1.gif" width="280" alt="preview screencast 1" />
  <img src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/preview2.gif" width="280" alt="preview screencast 2" />
</p>

# Installation :package:

## With NPM

Run

```bash
npm install vue-qrcode-reader
```

You can import the components independantly

```javascript
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

const MyComponent = {

  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },

  // ...
))
```

or register all of them globally right away

```javascript
import Vue from "vue";
import VueQrcodeReader from "vue-qrcode-reader";

Vue.use(VueQrcodeReader);
```

## Without NPM

Include the following JS file:

https://unpkg.com/vue-qrcode-reader/dist/vue-qrcode-reader.umd.cjs

Make sure to include it after Vue:

```html
<script src="./vue.js"></script>
<script src="./vue-qrcode-reader.umd.cjs"></script>
```

All components are automatically registered globally.
Use kebab-case to reference them in your templates:

```html
<qrcode-stream></qrcode-stream>
<qrcode-drop-zone></qrcode-drop-zone>
<qrcode-capture></qrcode-capture>
```

# Troubleshooting :zap:

#### I don't see the camera when using `QrcodeStream`.

- Check if it works on the demo page. Especially the [Handle Errors](https://vue-qrcode-reader.netlify.app/demos/HandleErrors.html) demo, 
  since it renders error messages. 
  - The demo works but it doesn't work in my project: Listen for the `error` event to investigate errors.
  - The demo doesn't work: Carefully review the Browser Support section above. 
    Maybe your device is just not supported.

#### I'm running a dev server on localhost. How to test on my mobile device without HTTPS?

- If your setup is Desktop Chrome + Android Chrome, use [Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/) which allows your Android device to [access your local server as localhost](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server).
- Otherwise use a reverse proxy like [ngrok](https://ngrok.com/) or [serveo](https://serveo.net/) to temporarily make your local server publicly available with HTTPS.
- There are also loads of serverless/static hosting services that have HTTPS enabled by default and where you can deploy your web app for free (e.g. *GitHub Pages*, *GitLab Pages*, *Google Firebase*, *Netlify*, *Heroku*, *ZEIT Now*, ...)

#### Some of my QR codes are not being detected.

- Make sure, there is some white border around the QR code.
- Test your QR codes in the upstream packages: [`barcode-detector`](https://github.com/Sec-ant/barcode-detector) -> [`zxing-wasm`](https://github.com/Sec-ant/zxing-wasm) -> [`zxing-cpp`](https://github.com/zxing-cpp/zxing-cpp), and file detection issues in the highest-level repository where the problem first occurs.

#### How to make it work with Vue 2?

Support is dropped but you can downgrade to vue-qrcode-reader v3.* or lower.

#### I get a "Failed to fetch" error at runtime for some Wasm file.

That Wasm file implements the QR code detector. 
Unfortunately, it's not very convenient to bundle this file with the package.
So by default we fetch it at runtime from a CDN.
That's an issue for offline applications or applications that run in a network with strict CSP policy. 
For a workaround see: https://github.com/gruhn/vue-qrcode-reader/issues/354
