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
define(['./workbox-86c9b217'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "2c84ab7824d369be73d7cc119a6ce07a"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "238b7a3f225655171329910904aa7226"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "aeee77ed386370399591c7f3790dfe9e"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "f5368cb75cc483718f520e72a7b1cd90"
  }, {
    "url": "assets/api_QrcodeCapture.md.B5QU-yV0.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.B5QU-yV0.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.DcShioG4.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.DcShioG4.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.9CJzVv4z.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.9CJzVv4z.lean.js",
    "revision": null
  }, {
    "url": "assets/app.BmUUpjO_.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BiSJWzvQ.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.G18_pu39.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BZTtPEZj.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.CHykGdh_.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.Dca_P1w6.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.CdDc-K49.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BtW0kG8T.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.BtW0kG8T.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DKjhHndD.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DKjhHndD.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.DED6G_j1.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.DED6G_j1.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.CO1FFjPb.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.CO1FFjPb.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BLMMumUu.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BLMMumUu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.pOZZvrwC.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.pOZZvrwC.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CSsbqGtI.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CSsbqGtI.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.Cvr7XDCv.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.Cvr7XDCv.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.GtJLLTJq.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.GtJLLTJq.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.e3yinIpP.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.e3yinIpP.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.BaqeBjf0.js",
    "revision": null
  }, {
    "url": "assets/index.md.BaqeBjf0.lean.js",
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
    "url": "assets/style.CAqy5f8a.css",
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
    "revision": "2fb465faf3e614d8117dfb111becbb26"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "6d3dc44b06ac43997195eb88bcc8b1cf"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "dd9f9b57e79f5458f1973694d253dc8e"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "21b3335a3329d730945b9497aa740d1c"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "e3abd4fc75bda94f0404ec7ccc2f5a21"
  }, {
    "url": "demos/Simple.html",
    "revision": "d2000ab67d0083bf36a6a30108ea5948"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "6f9744a15787e9de2bf9a3566a1cd99c"
  }, {
    "url": "demos/Torch.html",
    "revision": "a9f6a2e1a17b7e67b0a572200d3f4d90"
  }, {
    "url": "demos/Upload.html",
    "revision": "3ce69085195f42354557c7a76defe598"
  }, {
    "url": "demos/Validate.html",
    "revision": "4a9eef3876a15320e1debe2057d207d3"
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
    "revision": "d3be8f8b78251459499fcdf84e7dfbed"
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
    "revision": "e40b1de2aafd101d16ea152bd4d3e544"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
