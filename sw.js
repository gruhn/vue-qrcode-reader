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
    "revision": "c93422d68cb167fa3d9fdf327bc3b660"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "0cb8b26c486d7b8a70565aa166dbdf3c"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "dfa82a16ca4d7f2e8291ae06ab844db6"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "ce1cf85044ad37e3de6f2b58e469f6de"
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
    "revision": "a98501ee087a48beb767390fe2309b64"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "fd58453ce1a22a442cf6bc02b27aa97b"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "2fc52d1ef4a1d2a53fea44a8dbfb89a5"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "0f2def479608b284a87b2d07cc38375c"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "714e71238fdc8f3132d92ca27f01eb2b"
  }, {
    "url": "demos/Simple.html",
    "revision": "7ce0409fc0740cd60a86a522d13997db"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "3db3423aff28baa50a733d1d2fa1eda2"
  }, {
    "url": "demos/Torch.html",
    "revision": "6b73cb12ce62383cfb1487babcb5d51e"
  }, {
    "url": "demos/Upload.html",
    "revision": "e208465900da0a574777a8b63d2eabad"
  }, {
    "url": "demos/Validate.html",
    "revision": "4af7ca325b63fcb4b282871636414b14"
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
    "revision": "c4fc8e70451f76ba154717ca2040a091"
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
