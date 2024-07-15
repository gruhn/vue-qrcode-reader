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
    "revision": "7b6481d899107c341b917ec217474895"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "9f10870480eabe1521996ed93a4e5f72"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "e7ab1955ff0ce94847d03edfb6aa632e"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "21573588c9793f252e678eb21741556a"
  }, {
    "url": "assets/api_QrcodeCapture.md.C7iqouC7.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.C7iqouC7.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CZZURXxz.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.CZZURXxz.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.DnuBzp6K.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.DnuBzp6K.lean.js",
    "revision": null
  }, {
    "url": "assets/app.Dfu3t2eG.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.DBcb1Hh6.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.C5yEuDPB.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BwCxet3-.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.DEKLPwsC.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.DxuAWb2U.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.Dk2OJKTE.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.fcrZg2Fe.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.fcrZg2Fe.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.jmkwVxvJ.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.jmkwVxvJ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.sCAwa0lj.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.sCAwa0lj.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BqFycQZ_.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BqFycQZ_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.D7rzlybC.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.D7rzlybC.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.QGG2W18j.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.QGG2W18j.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.R6bRlqfK.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.R6bRlqfK.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.BO0OFwB_.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.BO0OFwB_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.DC1csbFk.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.DC1csbFk.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.HnahRfcr.js",
    "revision": null
  }, {
    "url": "assets/index.md.HnahRfcr.lean.js",
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
    "url": "assets/style.CPAitQMZ.css",
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
    "revision": "ca4d05534049cf34b9c35328f1ab0fe7"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "30245539ecbd635eec2f8ca6a5855519"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "2b3f478174bbde73bb2ccddfc8e4f924"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "d2f3a85fdb951be9b1e496f54eb9e17e"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "91c5318e8e52d4c70587ccc4bfcd81aa"
  }, {
    "url": "demos/Simple.html",
    "revision": "cf5f7105156180dbd770ae9a8afa9988"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "e08e3f4b75fb425be3f714bf79f458e1"
  }, {
    "url": "demos/Torch.html",
    "revision": "c68b37334fc15120fd245794f6fbae33"
  }, {
    "url": "demos/Upload.html",
    "revision": "38bc583d6ecb14545017bb256459eb9c"
  }, {
    "url": "demos/Validate.html",
    "revision": "789a1345c19c5f71faada7079227e908"
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
    "revision": "f09cf2e01fe391e283471767fb75ede0"
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
