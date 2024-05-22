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
define(['./workbox-ab7aa862'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "1bf0bf3e9e8d7afe3dabc25c51ef4729"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "cecf2c354a19b21531c22c9fb601ccdf"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "838dcf466c845dda12c8d4387130129d"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "7bee6c8cfac2085e8325c87f0688ad43"
  }, {
    "url": "assets/api_QrcodeCapture.md.Egaf3aHn.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.Egaf3aHn.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.RZaTpAht.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.RZaTpAht.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.d2QHW_9e.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.d2QHW_9e.lean.js",
    "revision": null
  }, {
    "url": "assets/app.iyBLz6DL.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.SWrjF3Ss.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.XOBbqUY0.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.2GglNXtw.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.v7MirhyE.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.gNN0lGKf.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.6gTd6fZw.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.7uQZD0Gt.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.7uQZD0Gt.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.ibnYCnVM.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.ibnYCnVM.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.4LU_t3G0.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.4LU_t3G0.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.wDmGpibh.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.wDmGpibh.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BZr5kHaN.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.BZr5kHaN.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CRbwIQnW.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CRbwIQnW.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.XWG8lfXD.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.XWG8lfXD.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.Bw2MIkLt.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.Bw2MIkLt.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.kGUh4XAH.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.kGUh4XAH.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.i7rHjGaX.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.i7rHjGaX.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.0FaKfDce.js",
    "revision": null
  }, {
    "url": "assets/index.md.0FaKfDce.lean.js",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic-ext.OVycGSDq.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic.-nLMcIwj.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek-ext.hznxWNZO.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek.PSfer2Kc.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin-ext.RnFly65-.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin.27E69YJn.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-vietnamese.xzQHe1q1.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic-ext.8T9wMG5w.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic.jIZ9REo5.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek-ext.9JiNzaSO.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek.Cb5wWeGA.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin-ext.GZWE-KO4.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin.bvIUbFQP.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-vietnamese.paY3CzEB.woff2",
    "revision": null
  }, {
    "url": "assets/style.97GEYqhv.css",
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
    "revision": "4c0c4f13cbdb66bf67fc60a561643479"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "7268dacf5c6bdd2ea5367296873a66cd"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "ae6f3b5a91d19c19da4e5b6c34b1e8d4"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "424bde0780b3311e9bfe2a40b5514bb3"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "cdd9bdd02f1a1c29177d9a4f95d0f5e7"
  }, {
    "url": "demos/Simple.html",
    "revision": "a5519008c33ed7580787dec854c1587a"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "476318c5b679bff40e21b7c674f71011"
  }, {
    "url": "demos/Torch.html",
    "revision": "cc3b111857ce530406b9de1d563d0b2b"
  }, {
    "url": "demos/Upload.html",
    "revision": "779d43ffae5fc2c6db3dd3ad1a4009a1"
  }, {
    "url": "demos/Validate.html",
    "revision": "418d0007acc12406446a194385854209"
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
    "revision": "afc2348d5b73b045fbc18b520dfb61ed"
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
    "revision": "5d015b614202b7ab58afdced580c509d"
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
    "revision": "1d4d4857c61f8030b8d96a42785fb349"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
