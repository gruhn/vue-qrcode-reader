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
    "revision": "6fc0779b45e327f4abd6a80609c4416c"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "4f61db3b5f059cc921c87fdb0cd4c1f4"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "3cf1f9b0a297f308870d2813c491c158"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "02f3ced42f35b9d973f542db58124634"
  }, {
    "url": "assets/api_QrcodeCapture.md.CLytv12W.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.CLytv12W.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.6Vhi9BoD.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.6Vhi9BoD.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.6U_wzjIZ.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.6U_wzjIZ.lean.js",
    "revision": null
  }, {
    "url": "assets/app.XL8Z-4aO.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.uOxXtlza.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.k0qov-UY.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.lXWH-C-d.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.M0FehY61.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.51RuvN-X.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.hsU9LcJz.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.pKahbeZR.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.pKahbeZR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.hnclp-Su.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.hnclp-Su.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.rVl0DQdx.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.rVl0DQdx.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md._gfElcQN.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md._gfElcQN.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.XGhy0WtB.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.XGhy0WtB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.1VshYyx0.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.1VshYyx0.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.cHlgHu4J.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.cHlgHu4J.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.8UFlvoqz.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.8UFlvoqz.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.4cV7tPYv.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.4cV7tPYv.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.mZSvWK2M.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.mZSvWK2M.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.P29hKITW.js",
    "revision": null
  }, {
    "url": "assets/index.md.P29hKITW.lean.js",
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
    "url": "assets/style.Kol-L_f3.css",
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
    "revision": "8e79702f0d7358001157ff86c21cfa8d"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "96fd31effa519227decbb13a061e8a89"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "31576015af40c074d6103a9fb8a102d3"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "063f15f4b5a72b33c12c87ed1aca4afe"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "a955d942980f1845061693ae2e7e8ce1"
  }, {
    "url": "demos/Simple.html",
    "revision": "f60eb758c464b8e1e023863c2eb04d7e"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "4baac321b09621466d95922ec99a77a0"
  }, {
    "url": "demos/Torch.html",
    "revision": "ba2d41d8a1c465d60d8a1e57b9b3ed83"
  }, {
    "url": "demos/Upload.html",
    "revision": "e5d0b58901345873b452d7456ba3521c"
  }, {
    "url": "demos/Validate.html",
    "revision": "16348f6bf08faeed65b715e06596cbae"
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
    "revision": "ec97aebcc9364921c6766a0eb87131a7"
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
    "revision": "72884b16aa414b658a3a60e5f8f433a6"
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
    "revision": "7e1dcbc08715b726c14aa0a02a815ca0"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
