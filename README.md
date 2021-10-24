<p align="center">
  <img src="https://gruhn.github.io/vue-qrcode-reader/logo.png" alt="Logo" width="240" height="240" style="max-width: 100%;">

  <br>
  <br>

  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" alt="for Vue.js 2">
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
  <a href="https://gruhn.github.io/vue-qrcode-reader/demos/DecodeAll.html">live demos</a> |
  <a href="https://gruhn.github.io/vue-qrcode-reader/api/QrcodeStream.html">api reference</a>
</p>

A set of Vue.js components, allowing you to detect and decode QR codes, without leaving the browser.

- :movie_camera: `QrcodeStream` accesses the device camera and continuously scans incoming frames.
- :put_litter_in_its_place: `QrcodeDropZone` renders to an empty region where you can drag-and-drop images to be decoded.
- :open_file_folder: `QrcodeCapture` is a classic file upload field, instantly scanning all files you select.

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

https://unpkg.com/vue-qrcode-reader/dist/VueQrcodeReader.umd.min.js

Make sure to include it after Vue:

```html
<script src="./vue.js"></script>
<script src="./VueQrcodeReader.umd.min.js"></script>
```

All components are automatically registered globally.
Use kebab-case to reference them in your templates:

```html
<qrcode-stream></qrcode-stream>
<qrcode-drop-zone></qrcode-drop-zone>
<qrcode-capture></qrcode-capture>
```

# Troubleshooting :zap:

### The wrong camera is picked by default. Can I set it explicitly?

Modern devices sometimes have multiple rear cameras.
Not all are optimal for scanning QR codes.
For example wide angle, infrared and virtual cameras.
With the current web API it's hard to pick the right camera automatically.
It's technically possible to let the user make that decision.
For example by displaying list of installed cameras and letting the user select the right one.
However, this is a user experience trade-off.
Native QR code reader applications don't face this trade-off.
That's why we want to find a different solution.

Please create a GitHub issue from the [wrong camera selected](https://github.com/gruhn/vue-qrcode-reader/issues/new?assignees=&labels=&template=wrong_camera.md&title=) template and follow the instructions in the text.
#### I don't see the camera when using `QrcodeStream`.

- Check if it works on the demo page. Especially the [Decode All](https://gruhn.github.io/vue-qrcode-reader/demos/DecodeAll.html) demo, since it renders error messages. If you see errors, consult the docs to understand their meaning.
  - The demo works but it doesn't work in my project: Listen for the `init` event to investigate errors.
  - The demo doesn't work: Carefully review the Browser Support section above. Maybe your device is just not supported.

#### I'm running a dev server on localhost. How to test on my mobile device without HTTPS?

- If your setup is Desktop Chrome + Android Chrome, use [Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/) which allows your Android device to [access your local server as localhost](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server).
- Otherwise use a reverse proxy like [ngrok](https://ngrok.com/) or [serveo](https://serveo.net/) to temporarily make your local server publicly available with HTTPS.
- There are also loads of serverless/static hosting services that have HTTPS enabled by default and where you can deploy your web app for free (e.g. *GitHub Pages*, *GitLab Pages*, *Google Firebase*, *Netlify*, *Heroku*, *ZEIT Now*, ...)

#### Some of my QR codes are not being detected.

- Make sure, there is some white border around the QR code.
- Color inverted QR codes are not supported (dark background, light foreground).
- [Model 1 QR codes](https://en.wikipedia.org/wiki/QR_code#Model_1) are also not supported.

# Thanks :pray:

<a href="https://browserstack.com">
  <img height="38" src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/browserstack-logo.png" alt="BrowserStack Logo">
</a>
