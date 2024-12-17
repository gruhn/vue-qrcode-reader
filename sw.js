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
    "revision": "560993b877c4c9a6ae56ebaf08b282f4"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "cf611f519ea19228b39b6f98cb02869c"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "00ad56cd26003771cc3cd0aa824d2718"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "bb0c31814cb089bcd5cf874b59c30d26"
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
    "url": "assets/api_QrcodeStream.md.P3i2WWbk.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.P3i2WWbk.lean.js",
    "revision": null
  }, {
    "url": "assets/app.CMq4myxa.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.C9dE4YuA.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.D9-V0Y9a.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BeH60Y6U.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.C97pHDhd.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.C8UVLHxp.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.Czqvq3Gp.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.D5p3TnMP.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.D5p3TnMP.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.C9xTxej_.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.C9xTxej_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.BOC-KDvu.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.BOC-KDvu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.C4l13ZG5.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.C4l13ZG5.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DOEf_HkZ.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.DOEf_HkZ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CjVnN3WB.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CjVnN3WB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.DdzfUcLa.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.DdzfUcLa.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.uwsnwgUy.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.uwsnwgUy.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DrQJwL_i.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.DrQJwL_i.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.BzRPZwjw.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.BzRPZwjw.lean.js",
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
    "url": "assets/style.DBNrZm1J.css",
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
    "revision": "f9b7fd0ccc99b8878ec885abd853bedb"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "7fb7f80935d036a202176c2096dea32c"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "b358166c6ee6a29393876ecb8694d324"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "a4aa41313a25304d40b88a968c6f6238"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "d5baacee80066b01843e172e631a31f3"
  }, {
    "url": "demos/Simple.html",
    "revision": "152a61e099f5120f7ad086ebc1cb79fb"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "0966b6373c766dfefce046f8de2afe03"
  }, {
    "url": "demos/Torch.html",
    "revision": "9daabcbdf9f5e89cdc82e20cc48187e1"
  }, {
    "url": "demos/Upload.html",
    "revision": "93e8a7f423b01b03205052ccb6231e0f"
  }, {
    "url": "demos/Validate.html",
    "revision": "ba780e27c75148b749568def850ecf89"
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
    "revision": "f6a54fe8bf550c371f79da1b3c4745d5"
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
