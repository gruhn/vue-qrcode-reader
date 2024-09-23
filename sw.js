/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5199072c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "8e8780a70e751801d8d4a913b8f47973"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "9b324dc98f9e83173e06db35e9714d95"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "589f5ab86b51fae053272e1629671703"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "168d8bb8d1fe3332e1a177953096fd42"
  }, {
    "url": "assets/api_QrcodeCapture.md.C7iqouC7.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.C7iqouC7.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CZZURXxz.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CZZURXxz.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.BJpDv_io.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.BJpDv_io.lean.js",
    "revision": null
  }, {
    "url": "assets/app.B_J4-B3K.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.ZwSxP_J3.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.Y0ohPhsl.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BwCxet3-.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.CsTXXFWV.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.BmAq5g-P.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.nORtJpYz.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.Bh461sua.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.Bh461sua.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.CIVJitcX.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.CIVJitcX.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.CLu4sVrH.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.CLu4sVrH.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.Buy1_mkp.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.Buy1_mkp.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BV5sETMA.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BV5sETMA.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BFfRluhH.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.BFfRluhH.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CgwwvdjK.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CgwwvdjK.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.C66hzNE9.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.C66hzNE9.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.zHsMF7yf.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.zHsMF7yf.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.HnahRfcr.js",
    "revision": null
  }, {
    "url": "assets/index.md.HnahRfcr.lean.js",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic-ext.5XJwZIOp.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic.D6csxwjC.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek-ext.CHOfFY1k.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek.9J96vYpw.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin-ext.BGcWXLrn.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin.DbsTr1gm.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-vietnamese.DHNAd7Wr.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic-ext.DxP3Awbn.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic.CMhn1ESj.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek-ext.D0mI3NpI.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek.JvnBZ4YD.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin-ext.ZlYT4o7i.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin.Bu8hRsVA.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-vietnamese.ClpjcLMQ.woff2",
    "revision": null
  }, {
    "url": "assets/style.DdV8lNrB.css",
    "revision": null
  }, {
    "url": "camera-switch.svg",
    "revision": "c966900237eef848d4aeb18b0ad64371"
  }, {
    "url": "checkmark.svg",
    "revision": "398fc16c5cbd6c20b529b76742c33942"
  }, {
    "url": "debug-memory-leak.html",
    "revision": "baffbefe1bde1d10f0c089b20f0cb9ed"
  }, {
    "url": "demos/DragDrop.html",
    "revision": "4bf2633ad780d6d962b47023de0ea6ee"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "13faffa8e508462c65af0216c445b509"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "20f45e5f2dd454ce8aab5df2c31822a0"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "4c53985bbf555f21d28617d836c395ca"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "8939e6e78724b08d819d3e5bd0777513"
  }, {
    "url": "demos/Simple.html",
    "revision": "31bde0400159af9a7db08743a8d70b2d"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "f445920bfba1d583463c84360832e86f"
  }, {
    "url": "demos/Torch.html",
    "revision": "a5906a81220cae8a840f586ab46d7fbb"
  }, {
    "url": "demos/Upload.html",
    "revision": "ecdab037d82fd059d6ae24b785aefa70"
  }, {
    "url": "demos/Validate.html",
    "revision": "23ee79040ad4ca2af413b7d7290c2eaa"
  }, {
    "url": "flash-off.svg",
    "revision": "8b05f5dcd6712992a544b34520ec7262"
  }, {
    "url": "flash-on.svg",
    "revision": "23580871877110ec5e7dcd41efdbd07b"
  }, {
    "url": "fullscreen-exit.svg",
    "revision": "77f8bddd41a7894d1a00324ed9dcb8f9"
  }, {
    "url": "fullscreen.svg",
    "revision": "432c44f09de0b4e0f9e236fad9b8c7f9"
  }, {
    "url": "index.html",
    "revision": "564fde757f25dfdc69757afc410ca839"
  }, {
    "url": "logo.png",
    "revision": "5f0c1d6358641bc48207acb9fa0b6182"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05431c417219f6c247a23488366a2b41"
  }, {
    "url": "pwa-512x512.png",
    "revision": "5e0a4893ebdd02af95cf73c7b7759ddd"
  }, {
    "url": "registerSW.js",
    "revision": "2acda7f8afc7fc2d992b71c201491acd"
  }, {
    "url": "select-camera-demo.html",
    "revision": "caa12e13f97000bc06e565e64bb8bd0f"
  }, {
    "url": "simple-demo.html",
    "revision": "d2e0337bc830c36ac24089933500e897"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05431c417219f6c247a23488366a2b41"
  }, {
    "url": "pwa-512x512.png",
    "revision": "5e0a4893ebdd02af95cf73c7b7759ddd"
  }, {
    "url": "manifest.webmanifest",
    "revision": "102717d43422a64c9903adda0fdce9f5"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
