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
    "revision": "11c8199d791bdc4d4430d673ab8e0fce"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "a0b32c96c81eff40321bd5c098f2580a"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "12abea9e266e0cac28d6902a5ffbe9b8"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "aa4654fd6a52a838a072e564f79565f7"
  }, {
    "url": "assets/api_QrcodeCapture.md.Egaf3aHn.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.Egaf3aHn.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.RZaTpAht.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.RZaTpAht.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.d2QHW_9e.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.d2QHW_9e.lean.js",
    "revision": null
  }, {
    "url": "assets/app.bUkGuHA5.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.748jUh2u.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.jeIBinSR.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.2GglNXtw.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.uVx9MQPb.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.ZrwA-cXr.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.qgh4LXwp.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.WBxihuK-.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.WBxihuK-.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.eCsXriV-.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.eCsXriV-.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.4gau2WE9.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.4gau2WE9.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.DN8GGil5.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.DN8GGil5.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.4a7PKj6f.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.4a7PKj6f.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CRbwIQnW.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.CRbwIQnW.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.Colj5zat.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.Colj5zat.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.W5G05QiE.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.W5G05QiE.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.ds_dkvJd.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.ds_dkvJd.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.wN4nGZxQ.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.wN4nGZxQ.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.0FaKfDce.js",
    "revision": null
  }, {
    "url": "assets/index.md.0FaKfDce.lean.js",
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
    "url": "assets/style.3o0ORmIR.css",
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
    "revision": "b6be98db2fed7802d4df3422a528a1fe"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "80fa9369d1735c92855ec54b6a544bea"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "b537a3bd6ac1a2a5d7802164143e3e18"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "9252a1900f1a8a668de369b9a766c32b"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "9cf3308f96ea81099b3922e456efa2bc"
  }, {
    "url": "demos/Simple.html",
    "revision": "f97397fe1597dca01b4175b0ba77681c"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "222ca221adcd825e572311fe83e47b5b"
  }, {
    "url": "demos/Torch.html",
    "revision": "6dfdc25cbada0f9ebcc3cfe1ee1faf49"
  }, {
    "url": "demos/Upload.html",
    "revision": "4810502b01e1b48e70f4ccdcd84e9e4c"
  }, {
    "url": "demos/Validate.html",
    "revision": "b0ff83b71fca116525967bd42df444dd"
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
    "revision": "f62d56f5b0beaed3a4d173b242ce5e50"
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
    "revision": "5d015b614202b7ab58afdced580c509d"
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
    "revision": "1d4d4857c61f8030b8d96a42785fb349"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
