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
    "revision": "799ee4cd270b67097953e1ebc4fa7408"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "989866eb193837961cbd3bd5d7208201"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "c110c4befa1a335e7518f1b84496819a"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "e55732939fd21cf772a2d2605d9f773e"
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
    "url": "assets/app.zmHxi-U0.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.JYvf7NlC.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.SWNaE5zx.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.x2t6Mwc1.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.i0_Gl9oH.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.x9CcnlqH.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.KhVulbmi.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.cNURwhLn.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.cNURwhLn.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.YuSEDb2V.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.YuSEDb2V.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md._2SKOeqT.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md._2SKOeqT.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.XaawJ4vY.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.XaawJ4vY.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.9m7CwmGE.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.9m7CwmGE.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.k6Yj_n1R.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.RILmJMVB.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.RILmJMVB.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.UXQkbXsx.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.UXQkbXsx.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.ZUQBn8gA.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.ZUQBn8gA.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.UrBOXebz.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.UrBOXebz.lean.js",
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
    "url": "assets/style.T7K3q-aP.css",
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
    "revision": "35e6a9e851fc261483ed17cc0228a731"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "6ceaf9b3c4db26405136ab9c6757976a"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "0e2e6fedd6ca86c116edd768b34a54d2"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "9f8b203e39c0461f6362e21f05911f65"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "a8cbff364b559c9bc557d4847a0787d0"
  }, {
    "url": "demos/Simple.html",
    "revision": "c3f9ee6754aa6fcbd6676ca98d1866f2"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "87db480eb9bb3a2a34fab61e84d92642"
  }, {
    "url": "demos/Torch.html",
    "revision": "748b4235c7c27a183a5181027a8391c0"
  }, {
    "url": "demos/Upload.html",
    "revision": "76a652df1453148ed066e071a8a3ad8c"
  }, {
    "url": "demos/Validate.html",
    "revision": "42a6069c8c59b1ff703dfc1fd6fcb83f"
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
    "revision": "83da61ba74719b50579ac73e8121c7bb"
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
