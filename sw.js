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
    "revision": "b74b59d248b3f3a7fd444a12c83c65ed"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "6639ae0a1a8daf0a51d027962cb0ae8a"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "c308ec7bf5267aeb3a91fd209ebe636b"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "582fd730ce93fc4a583cddc82267b090"
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
    "url": "assets/app.4MlHmAg2.js",
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
    "url": "assets/chunks/theme.TxNFPanC.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.DUe8aDgT.js",
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
    "url": "assets/style._o-JA5m5.css",
    "revision": null
  }, {
    "url": "barcode-detector-test.html",
    "revision": "c6ab43ddd912cedd13ceae46427c275d"
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
    "revision": "78719fa896c1334ef5e8988313af4b09"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "c9d13fb770f2adbdf3de954ff43cbf25"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "96d988f3710a0bc233b0dd23f35c425d"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "774ef66c6dbdf62edc8c4941fc9c2afe"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "816d5a966a40e0c47c79a7d7565b1eae"
  }, {
    "url": "demos/Simple.html",
    "revision": "4b7a40f7efaf1325333d44734eeb352f"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "149a1d5b462aa4558123ec10c00dcd39"
  }, {
    "url": "demos/Torch.html",
    "revision": "5a4251bbc95418bdc2092da2e27f384d"
  }, {
    "url": "demos/Upload.html",
    "revision": "ff34910141f1910bbe64dfa6a97b4715"
  }, {
    "url": "demos/Validate.html",
    "revision": "a4046345d8050d7d034188e6b1d01480"
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
    "revision": "359183b4d59528bfff13e681a6387a02"
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
