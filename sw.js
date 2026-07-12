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
define(['./workbox-54d0af47'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "68bd6812007dc3b3c2f4d3b16a3642ca"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "201a62a824daf2367b425266840fda19"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "fcb060337c4d19c567dd47871f4994a7"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "c20655fa802a66c843851a096fe8f8f9"
  }, {
    "url": "assets/api_QrcodeCapture.md.GlYdj7pr.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.GlYdj7pr.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.DTUFZSpV.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.DTUFZSpV.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.e6-rDy8q.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.e6-rDy8q.lean.js",
    "revision": null
  }, {
    "url": "assets/app.BJdyCSXh.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BiSJWzvQ.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.CwhHtNAy.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BeH60Y6U.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.CIrupPw5.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.RcbcSpSe.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.BrDeeKTn.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.D6AEaaQa.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.D6AEaaQa.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DZImdcgE.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.DZImdcgE.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.8EmgaMEB.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.8EmgaMEB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BdjqIO3m.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BdjqIO3m.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DqemeZ9k.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DqemeZ9k.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CjVnN3WB.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CjVnN3WB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.C5J_H1vX.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.C5J_H1vX.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.DFu6zFiR.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.DFu6zFiR.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.BRamHkYZ.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.BRamHkYZ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CCFFvrlb.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.CCFFvrlb.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.LZGnsC_L.js",
    "revision": null
  }, {
    "url": "assets/index.md.LZGnsC_L.lean.js",
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
    "url": "assets/style.C-SzwJ09.css",
    "revision": null
  }, {
    "url": "barcode-detector-test.html",
    "revision": "d3fa8717d9a9cab29cff47f304467f1f"
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
    "revision": "df779f0cea5fb99c686791c3f0e5d6e0"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "d7094caa32c95f8686ef5240d931b032"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "6781780d6fbe70c728376d48231d82ec"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "f9eabe239dceee2b6f0961bf31c555d2"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "cdf27d1e38adac4f7a17db9848186a3a"
  }, {
    "url": "demos/Simple.html",
    "revision": "f9e49d38ff5b9569ea30f5a3e289db39"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "c61be493b33b0b76a89c31aab0877213"
  }, {
    "url": "demos/Torch.html",
    "revision": "e320f8d9de024543dc61f61b82a59f07"
  }, {
    "url": "demos/Upload.html",
    "revision": "4e98c8bd8c8a7d1b64f8c8d73c617723"
  }, {
    "url": "demos/Validate.html",
    "revision": "1c2d1c98869e5d07a3aca23a0e46e947"
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
    "revision": "f88c9357651f959cafd82f877684e2b2"
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
