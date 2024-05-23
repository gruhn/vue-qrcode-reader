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
    "revision": "3c5c5f69745c304053bcdba776cc7656"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "cd74a11ba9333e4600a52efda60e4810"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "5e53df2a7d4de689b75389686a2e3072"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "260b16bb6a2785343df373171bc9d240"
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
    "revision": "0dd679df9508ca6e28099871ccd16e2d"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "4dc04a2e4d17f7e3789cebe8ef0a2832"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "6d3eceea41b06217152643e3a5351eb8"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "d3dbe327a9fefe4c83885a3f0584280e"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "875993a72f8bbe15530c5e489b8f3c12"
  }, {
    "url": "demos/Simple.html",
    "revision": "7be50c6b6f91a44d3e121a7a8443c53d"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "3e3b09460c7fdd0417106933bc442056"
  }, {
    "url": "demos/Torch.html",
    "revision": "ae4cbc612c21e6a488d60468e3706800"
  }, {
    "url": "demos/Upload.html",
    "revision": "8c2da28bde850141ab06e8eeacb87e17"
  }, {
    "url": "demos/Validate.html",
    "revision": "dd079402f9e098213aac31bfb7ac1ca5"
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
    "revision": "aeee00424c75ea6819503adfec959ed8"
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
