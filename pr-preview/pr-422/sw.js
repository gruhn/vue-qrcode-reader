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
    "revision": "29becc9bb75b82185b8cb3b2eba0d98a"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "363bc9bffd7f37d7d4a958378297a61d"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "fb0f5c0acb03af7bcf96380113921e57"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "0292a38a0c61e0d2d9483bcc6396a79b"
  }, {
    "url": "assets/api_QrcodeCapture.md.VX4ntMzB.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.VX4ntMzB.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.giGbkAL0.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.giGbkAL0.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md._mH69Ev_.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md._mH69Ev_.lean.js",
    "revision": null
  }, {
    "url": "assets/app.En2T7Ato.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.ge5Zq5Ec.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.KdSkzQu2.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework._N5kwV4S.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.zhbQDEE4.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.5Jss6XjQ.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.TX-ldkIC.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.PO7_y903.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.PO7_y903.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.cZ3OQBfX.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.cZ3OQBfX.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.cywroYtF.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.cywroYtF.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.iwejuMV3.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.iwejuMV3.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.btHdYA4g.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.btHdYA4g.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.nPEbgfr1.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.nPEbgfr1.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.l2frfJin.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.l2frfJin.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.6tMIcC16.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.6tMIcC16.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.P6BVbAAx.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.P6BVbAAx.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.2OXJqjra.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.2OXJqjra.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.-LW_roOb.js",
    "revision": null
  }, {
    "url": "assets/index.md.-LW_roOb.lean.js",
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
    "url": "assets/style.99LliokR.css",
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
    "revision": "6c392b333613b38a85b1d797183ff22f"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "437506c0f74299e830f6af7c995fd238"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "d74bbaf9a50e4b0dd9fc23e3c8002152"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "10b8533baa5adbd5fb852d2b0a51ffb9"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "215e3c4a1337bd9a2094247f661887e5"
  }, {
    "url": "demos/Simple.html",
    "revision": "63c749dcf5130df239dc49d0a1de135b"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "66624a67cd3cc82054259702eaece12b"
  }, {
    "url": "demos/Torch.html",
    "revision": "c8fc9c60e0593d13641c546c2375112a"
  }, {
    "url": "demos/Upload.html",
    "revision": "5a599b97721aefe2a4bb141cb3b03609"
  }, {
    "url": "demos/Validate.html",
    "revision": "a790a63c1db35b37fbd2eacae5231727"
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
    "revision": "a1321442c74c12aa7860ab1d3c81cd63"
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
    "revision": "2b7964fade6660b89d7cbcc5bf7011b3"
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
    "revision": "3b42acbc14121abc1d32cb50c8e77c28"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
