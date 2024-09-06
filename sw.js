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
    "revision": "65385983a18c2ceaa705a073cefd4cdc"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "310539ff229f4f6d70726178f0f45ea9"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "7bf5d228dcf01a27514339e3fffe49fc"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "5b5d2dcd2f1952f5a62121cb928a065d"
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
    "url": "assets/app.M3x9aKvg.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.DBcb1Hh6.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.DE4cteSh.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.BwCxet3-.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.DspH0Vrb.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.Bkuv9jEj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.s67tei5V.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.Ci3nu08r.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.KueMX9qx.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.KueMX9qx.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.dj7uxa22.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.dj7uxa22.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.D5kCBhsJ.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.D5kCBhsJ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BPlhc5KO.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.BPlhc5KO.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.Brm_Gomp.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.Brm_Gomp.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.BCBYY3fY.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CAvxezaF.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.CAvxezaF.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.kskOygTt.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.kskOygTt.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.Dx4hnZdl.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.Dx4hnZdl.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.hjIDCaLb.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.hjIDCaLb.lean.js",
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
    "url": "assets/style.DPXyhsKt.css",
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
    "revision": "fb027ef29737d0c11b563824bf5bb8bd"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "49e07f83498c9ea905203ddab5c5b407"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "eb8c5ce049e22fdd9eae9f4a99bc7758"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "efd5e7a831ae849226d7ebde5a5edefc"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "671ae000ebdd76dbb2f96f5ef5f30eea"
  }, {
    "url": "demos/Simple.html",
    "revision": "15a91e7b813a826c45bce29daa021171"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "ec7874588c5c9bad5a1993d360408ad9"
  }, {
    "url": "demos/Torch.html",
    "revision": "24c2ba1cc3de272b4156cabb69c43b73"
  }, {
    "url": "demos/Upload.html",
    "revision": "805be3f5cbc91ca2f03b6d56c6fafbf7"
  }, {
    "url": "demos/Validate.html",
    "revision": "73f90716de62449dfa0f16a21071f6ff"
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
    "revision": "c438332fe3ac73e3d0950579f6cbc4a5"
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
