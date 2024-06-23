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
    "revision": "35cce10acf31ba09f31ebd17cfe86d95"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "fa9defdfb7abfd7c1fd13e4de47423d7"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "0bcc48564ba5f8f45911f1137b15a675"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "1e9ee3d95ec9e86f5bf92b245a36522c"
  }, {
    "url": "assets/api_QrcodeCapture.md.C5q2UvZC.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.C5q2UvZC.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.K_aTyQYs.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.K_aTyQYs.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.cIDVoRJV.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.cIDVoRJV.lean.js",
    "revision": null
  }, {
    "url": "assets/app.oREZ2QLs.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.CeRGjzp_.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.QKifeCSe.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.rBy9wODq.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.OWkKyuz3.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.3p6tMIl3.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.u9goymmH.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.3HR46TiN.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.3HR46TiN.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.mSoukILO.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.mSoukILO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.zurg6YI1.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.zurg6YI1.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.JgAty-PO.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.JgAty-PO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.F1bv8hlY.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.F1bv8hlY.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.nnDd_6N9.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.nnDd_6N9.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.uF0uPY9v.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.uF0uPY9v.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.fiIpFmbj.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.fiIpFmbj.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.urbDVvTO.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.urbDVvTO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.jGbKwRnC.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.jGbKwRnC.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.aqtOoVWU.js",
    "revision": null
  }, {
    "url": "assets/index.md.aqtOoVWU.lean.js",
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
    "url": "assets/style.odlcA_fI.css",
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
    "revision": "756ca4977ee1052279282e84b4b89d20"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "f5d4402dd242fecd2965f5fb151ecb57"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "196222cd3bc5a7322d39f42063dc2da4"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "d07c44e4927ada7dda12e6a54ec2cc57"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "f4128ead5dfc7fb90b39535246e78600"
  }, {
    "url": "demos/Simple.html",
    "revision": "e96cb328423a698f508b014b2f63a208"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "0984dc45bd6cfc314caf7d71ec9d8661"
  }, {
    "url": "demos/Torch.html",
    "revision": "789492ba4cabcd9ec82a3fc96d73862b"
  }, {
    "url": "demos/Upload.html",
    "revision": "966d66a97d344a0a7462ed9d5a594993"
  }, {
    "url": "demos/Validate.html",
    "revision": "43a984c8e120a6c2c29d54093db69e03"
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
    "revision": "6d88bae088e3859d03e79ea68dbffee6"
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
    "revision": "a26d0c4dc9a2b5e4fe9e04a521c0e70d"
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
    "revision": "00511e71868d596b81297433e69badf1"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
