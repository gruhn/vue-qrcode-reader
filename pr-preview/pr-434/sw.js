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
    "revision": "5dd264f1477ae6302d46067860b31714"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "26c75844fc2c7bc5e9e8fb7455238be5"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "fea65981337c5c59c2dba6223db8ac71"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "fbbec9f2ef2bd457f3a30f0f3d314ac2"
  }, {
    "url": "assets/api_QrcodeCapture.md.K8nQxfcl.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.K8nQxfcl.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Yjyg1M45.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.Yjyg1M45.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.9pj1-1Le.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.9pj1-1Le.lean.js",
    "revision": null
  }, {
    "url": "assets/app.5KyQpN7e.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.vfdG9mSG.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.3ic2P8Pl.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.ctPiCF1N.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.KpjZyW4K.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.5DzwVrUI.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.2MkrhxI8.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.LmTPQeej.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.LmTPQeej.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.HXnQTtY_.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.HXnQTtY_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.fWtnCPrq.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.fWtnCPrq.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.QJQjP4Yy.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.QJQjP4Yy.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.ZlDZktoy.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.ZlDZktoy.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.G5leIBhb.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.G5leIBhb.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.vOCtSeZG.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.vOCtSeZG.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.lxrZjMFQ.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.lxrZjMFQ.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.y6jgHxmF.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.y6jgHxmF.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.-_ik5zSk.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.-_ik5zSk.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.jzshRCit.js",
    "revision": null
  }, {
    "url": "assets/index.md.jzshRCit.lean.js",
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
    "url": "assets/style.x4FbZIEs.css",
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
    "revision": "120c005e9c683198ebcb655d0333ec74"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "1e485e214c61a72e76759b221152474d"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "f502e6814f00d7cd1c53016006814ddb"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "68b3b0295e7599d90342fbe8505d78b8"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "80196062e773876d3fc269ce8891f9f7"
  }, {
    "url": "demos/Simple.html",
    "revision": "e5310f6cb30aa4ea7d35f8441e8f3f02"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "f98e51e1311bfad1ddee826758657837"
  }, {
    "url": "demos/Torch.html",
    "revision": "5fac6cbcf0cfa9faec20a0e76b82e9a5"
  }, {
    "url": "demos/Upload.html",
    "revision": "7f33b8e0bb4494bd7d1b899547ad08fd"
  }, {
    "url": "demos/Validate.html",
    "revision": "23c7a0bb5a1853a4974e1638e32be409"
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
    "revision": "2d69a76f8bde2e183bb3ad23ee9edc79"
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
    "revision": "f0d5b77e0a7157a61fe28a1e42fe2c01"
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
    "revision": "e673ab514851fda01313f8b94fc6e8f0"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
