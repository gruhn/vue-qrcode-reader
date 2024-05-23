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
    "revision": "423be37ab7f81a5ca4b6b3440ae125bf"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "7fe1163406eae655dfed24912989b491"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "744fa88f74ace9257e8f7bf9a049aa3e"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "e747561b7cf6dc0b4c9a26206d709868"
  }, {
    "url": "assets/api_QrcodeCapture.md.sR1mAq-a.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.sR1mAq-a.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.D1zfaQTS.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.D1zfaQTS.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.FBB5XLYT.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.FBB5XLYT.lean.js",
    "revision": null
  }, {
    "url": "assets/app.mG-UXtyz.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.uExXiyF-.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.C_CT0OCu.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.x2t6Mwc1.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.o6Pqnnr5.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.O00lm7U1.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.S58zDlPv.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.nfFegZ5t.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.nfFegZ5t.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.-B0HWJY-.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.-B0HWJY-.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.FTQ89c31.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.FTQ89c31.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.E9FPZ-Hz.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.E9FPZ-Hz.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.o9vGiY18.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.o9vGiY18.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CgA9h4Ej.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CgA9h4Ej.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.DOZq7-7A.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.DOZq7-7A.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.gDoyH4YK.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.gDoyH4YK.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.8A_dxuye.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.8A_dxuye.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.Dn-jsskv.js",
    "revision": null
  }, {
    "url": "assets/index.md.Dn-jsskv.lean.js",
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
    "url": "assets/style.MbpX481q.css",
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
    "revision": "bd56d3ee872c52d5fa063a9d67d78afe"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "54fae39fa374f4550120d7df9b82d785"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "45886a337eda3bac0bc74337e8f7cef6"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "a4fe6737e009c003dbe0a94cde9cac1e"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "4927ac99671c1f445b85d8cf2696e473"
  }, {
    "url": "demos/Simple.html",
    "revision": "ff360f11946d29a1e1a451f2a17331ef"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "478a83bd6422ad739691e1966a1c765b"
  }, {
    "url": "demos/Torch.html",
    "revision": "281a97ab07aa5dd1b4bc1e702e6ced65"
  }, {
    "url": "demos/Upload.html",
    "revision": "d1772632ca432dc188834e3cfefa1815"
  }, {
    "url": "demos/Validate.html",
    "revision": "96d1bdf0fbaefbdaf7d6f5ea223a0720"
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
    "revision": "e8aa354f66caad9d8e496b30ef80ac25"
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
