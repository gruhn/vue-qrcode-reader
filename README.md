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
  <a href="https://gruhn.github.io/vue-qrcode-reader/api/QrcodeStream.html">documentation</a> |
  <a href="https://gruhn.github.io/vue-qrcode-reader/demos/DecodeAll.html">live demos</a>
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

# Browser support :chart_with_upwards_trend:

#### `QrcodeStream`

This component fundamentally depends on the [Stream API](https://caniuse.com/#feat=stream).

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
|                                                     No                                                      |                                               Yes                                                |                                                  Yes                                                   |                                                 Yes                                                  |                                                 11+                                                  |

- Chrome requires [HTTPS or localhost](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) (see _Troubleshooting_ for help)
- Safari also requires HTTPS **even** on localhost (see [#48](../../issues/48))
- on iOS it **really only** works with Safari. It won't work in
  - _Chrome for iOS_, _Firefox for iOS_, ... (see [#29](../../issues/29))
  - a WebView component of your native iOS App
  - web apps added to home screen (see [#76](../../issues/76))

#### `QrcodeDropZone` and `QrcodeCapture`

The newest API these components depend on is the [FileReader API](https://caniuse.com/#feat=filereader).

| ![Internet Explorer](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/ie_32x32.png) | ![Edge](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/edge_32x32.png) | ![Firefox](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/firefox_32x32.png) | ![Chrome](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/chrome_32x32.png) | ![Safari](https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/safari_32x32.png) |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
|                                                     10+                                                     |                                               Yes                                                |                                                  Yes                                                   |                                                 Yes                                                  |                                                 Yes                                                  |

- Drag-and-drop is not supported on mobile
- Home screen web apps on iOS prior to 11.3 don't support `QrcodeCapture` (see [this StackOverflow question](https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app))

# Installation :package:

## Module import

Run:

```bash
npm install vue-qrcode-reader
```

Either import the components independantly for local registration:

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

Or register all of them globally right away:

```javascript
import Vue from "vue";
import VueQrcodeReader from "vue-qrcode-reader";

Vue.use(VueQrcodeReader);
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Classic import

Vue itself must be included first. Then add the following CSS and JS file:

- `<link href="`[vue-qrcode-reader.css](https://unpkg.com/vue-qrcode-reader/dist/vue-qrcode-reader.css)`" rel="stylesheet">`
- `<script src="`[vue-qrcode-reader.browser.js](https://unpkg.com/vue-qrcode-reader/dist/vue-qrcode-reader.browser.js)`"></script>`

All components are automatically registered globally.
Use kebab-case to reference them in your templates:

```html
<qrcode-stream></qrcode-stream>
<qrcode-drop-zone></qrcode-drop-zone>
<qrcode-capture></qrcode-capture>
```

# Troubleshooting :zap:

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
<span>&emsp;&emsp;</span>
<a href="https://travis-ci.org">
  <img height="38" src="https://raw.githubusercontent.com/gruhn/vue-qrcode-reader/master/.github/travis-logo.png" alt="Travis-CI Logo">
</a>
