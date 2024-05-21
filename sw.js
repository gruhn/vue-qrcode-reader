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
    "revision": "812d7cfc4dea1dcff14700683420706e"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "e569d974d162a706a3e28027e1f744ea"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "e57dd1d2d4ce21d80be803b895613cd5"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "2ce47d4541c4148ebe0df56ef1f45e69"
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
    "url": "assets/app.kTha1KBI.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.0F7olETa.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.7H6pCU6j.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.x2t6Mwc1.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.ASY9PUSs.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.sFzRUwr3.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.gdhIRKzw.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.28T7o0M0.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.28T7o0M0.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.vVEqI4_n.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.vVEqI4_n.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.dP3i9oUh.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.dP3i9oUh.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.GOCEVPQj.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.GOCEVPQj.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.7Mvle9Hf.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.7Mvle9Hf.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.W-BLt3Pb.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.W-BLt3Pb.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.g4ertLnf.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.g4ertLnf.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.Qr8MQZh4.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.Qr8MQZh4.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.ahxoL0L0.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.ahxoL0L0.lean.js",
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
    "url": "assets/style.wrf49MtE.css",
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
    "revision": "74ae3a9052b0aacc17ff5ad682e716b1"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "e9809b6b3f765fcecfdf28ce00ef1e10"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "1227f20d50d224d3bd6e4608edde1237"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "92910e085c8b1ea8aba35aabca6ea099"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "81a64839ccb43abb1c08a0197ba6bee6"
  }, {
    "url": "demos/Simple.html",
    "revision": "cce6ff8542db02bd89ffe8a35fccf15f"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "fd24dc79331969c03dcb8881948066d0"
  }, {
    "url": "demos/Torch.html",
    "revision": "a2a1247a1bd408236da08b3ea83bd73f"
  }, {
    "url": "demos/Upload.html",
    "revision": "1b2710b50d33805e3978ea78d4a26c57"
  }, {
    "url": "demos/Validate.html",
    "revision": "b2f399402cad11339555969592a564bc"
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
    "revision": "6aca733127dc0f642f911fd9a0b673e5"
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
