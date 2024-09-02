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
define(['./workbox-5199072c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "43008b4425f7e92bd26876d63ba6c2b8"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "86fcc28ed937dbf17c402d9f0ab54c5e"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "9062e80175cddeabc3be1b298b6d2af3"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "8448e204e55143f16ff5f5e5cad9c0be"
  }, {
    "url": "assets/api_QrcodeCapture.md.BVomH-fp.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.BVomH-fp.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CqxuZhVd.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CqxuZhVd.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.CGQgF4oK.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.CGQgF4oK.lean.js",
    "revision": null
  }, {
    "url": "assets/app.DzN9cVpk.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BQqEPrZR.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.DhcMeik-.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BtL3uYYi.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.GbEf4hK0.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.C1T0t5Zq.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.BPLfKR6Q.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.cTRAHQaD.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.cTRAHQaD.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.CRrzANCR.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.CRrzANCR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.h2cqoaSc.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.h2cqoaSc.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.CPwUJoov.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.CPwUJoov.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.kZa9Btsu.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.kZa9Btsu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CWiqK3J_.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CWiqK3J_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CydEbheE.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CydEbheE.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.bksnySAD.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.bksnySAD.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CnQDh4cA.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.CnQDh4cA.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.DtHqSbkl.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.DtHqSbkl.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.DnOK2cmZ.js",
    "revision": null
  }, {
    "url": "assets/index.md.DnOK2cmZ.lean.js",
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
    "url": "assets/style.DtBLy4Td.css",
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
    "revision": "576a8c1bbc084eaa0bd917b48e60f312"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "d6a512f5351f0bb18dd19e2d37696abf"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "0bbc5a1f60ce010203544e0dfcb7abea"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "d784e0f71eabb6e1a892226b1bc6f9ca"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "072016fe3316b06cab2c2cd887d2afb0"
  }, {
    "url": "demos/Simple.html",
    "revision": "791e0184990b76ae88ce936f50d452db"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "3d5b75e4d96a874a7c2d53e23066fcfe"
  }, {
    "url": "demos/Torch.html",
    "revision": "5697401390a683ef670d63a7df7cc073"
  }, {
    "url": "demos/Upload.html",
    "revision": "c90cd27826a9a841e71f633ca5f69bf6"
  }, {
    "url": "demos/Validate.html",
    "revision": "f2be4195a70db767586110d3024e8b32"
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
    "revision": "4e42fd44c6bf24e28d24b06d6d9419d9"
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
    "revision": "cb826733d1228e0f33c8117077d32d72"
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
    "revision": "cdc5a0b0c58ffb38b8b281141584d834"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
