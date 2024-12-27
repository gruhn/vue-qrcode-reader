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
    "revision": "09b6000ec347df4a126f09705e05b952"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "44bfad457452a74a7a8d8db2af0252a9"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "1e58941e1edbda9503f124265e0e7170"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "40ebac8149a69e3108867d535eda07c5"
  }, {
    "url": "assets/api_QrcodeCapture.md.pRQZbi1Y.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.pRQZbi1Y.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Cu2lV0vM.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Cu2lV0vM.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.CTYs1BfR.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.CTYs1BfR.lean.js",
    "revision": null
  }, {
    "url": "assets/app.BIV7YYZn.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BiSJWzvQ.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.CxigVlA0.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.CI0_Jyb9.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.Cwkfaxch.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.CbsQzOZw.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.BMUz8lFT.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.CkcaAhH3.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.CkcaAhH3.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.TpVXO8LI.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.TpVXO8LI.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.c9El6HkA.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.c9El6HkA.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.bsE4qADJ.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.bsE4qADJ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.CmXUVIPu.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.CmXUVIPu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.D2sCwcUO.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.D2sCwcUO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.DCAo7XCR.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.DCAo7XCR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CX9c8yCy.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.CX9c8yCy.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DQRAcZba.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DQRAcZba.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.D-dkzNgN.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.D-dkzNgN.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.DKqtwxLE.js",
    "revision": null
  }, {
    "url": "assets/index.md.DKqtwxLE.lean.js",
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
    "url": "assets/style.DdhQUwfb.css",
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
    "revision": "976ca640e58dbdaf91b5837bf85c92f9"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "d6a6880df14b62d8366bc548fdd94ee3"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "9bad368bc7580dd3b3a6963f727877b6"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "e7c8fac25485ecdab66fd1fe3ba34f45"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "4baa225eecaa7749e8093a71563cc099"
  }, {
    "url": "demos/Simple.html",
    "revision": "f378aa20c51c0ff11768be11d8438770"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "b6c2ff3b96b10d2d39356f3d5e606430"
  }, {
    "url": "demos/Torch.html",
    "revision": "490fcd685562132a631c3ce41455f336"
  }, {
    "url": "demos/Upload.html",
    "revision": "9cc35e1bf42138fc95f104d14f18a4c2"
  }, {
    "url": "demos/Validate.html",
    "revision": "35c86917af4d597e1bc3590383587038"
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
    "revision": "44cd60767012584eb8b343f6e21f96c4"
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
