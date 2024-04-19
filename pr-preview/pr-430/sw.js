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
    "revision": "ad7027ab8922ec772eafe428f6ad1890"
  }, {
    "url": "api/QrcodeCapture.html",
    "revision": "83c7980df7dd6b39e9131499237d09b3"
  }, {
    "url": "api/QrcodeDropZone.html",
    "revision": "40e2ab5b652714042d322d89346a4197"
  }, {
    "url": "api/QrcodeStream.html",
    "revision": "fbed26ef722d584382605b57f4ee67f3"
  }, {
    "url": "assets/api_QrcodeCapture.md.ER_KlBKX.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeCapture.md.ER_KlBKX.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.7CKtkJ9M.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeDropZone.md.7CKtkJ9M.lean.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.JdWO2mgr.js",
    "revision": null
  }, {
    "url": "assets/api_QrcodeStream.md.JdWO2mgr.lean.js",
    "revision": null
  }, {
    "url": "assets/app.S3RuXCsw.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.7pNXdj7N.js",
    "revision": null
  }, {
    "url": "assets/chunks/camera.nF_4Nzq3.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.yCGwB_uK.js",
    "revision": null
  }, {
    "url": "assets/chunks/QrcodeStream.vue_vue_type_script_setup_true_lang.r9Roo5WC.js",
    "revision": null
  }, {
    "url": "assets/chunks/safari_32x32.yJUh4Fxj.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.GVl-WfcP.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.HktJh-rb.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.8ZF3LLbT.js",
    "revision": null
  }, {
    "url": "assets/demos_DragDrop.md.8ZF3LLbT.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.uroIlpR2.js",
    "revision": null
  }, {
    "url": "assets/demos_FullDemo.md.uroIlpR2.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.HBNmkMB_.js",
    "revision": null
  }, {
    "url": "assets/demos_Fullscreen.md.HBNmkMB_.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.7nfd9aL7.js",
    "revision": null
  }, {
    "url": "assets/demos_LoadingIndicator.md.7nfd9aL7.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.FTzeO5dd.js",
    "revision": null
  }, {
    "url": "assets/demos_ScanSameQrcodeMoreThanOnce.md.FTzeO5dd.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.sJ7qbYj3.js",
    "revision": null
  }, {
    "url": "assets/demos_Simple.md.sJ7qbYj3.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.c5ua2Msu.js",
    "revision": null
  }, {
    "url": "assets/demos_SwitchCamera.md.c5ua2Msu.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.hbOlRKcr.js",
    "revision": null
  }, {
    "url": "assets/demos_Torch.md.hbOlRKcr.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.n9qrvmJ8.js",
    "revision": null
  }, {
    "url": "assets/demos_Upload.md.n9qrvmJ8.lean.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.WjfSQald.js",
    "revision": null
  }, {
    "url": "assets/demos_Validate.md.WjfSQald.lean.js",
    "revision": null
  }, {
    "url": "assets/index.md.wNQkERMy.js",
    "revision": null
  }, {
    "url": "assets/index.md.wNQkERMy.lean.js",
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
    "url": "assets/style.XPTNyNVl.css",
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
    "revision": "428d679377203ad7da292a7e371b93de"
  }, {
    "url": "demos/FullDemo.html",
    "revision": "2847b9057e74f135dec074649189127f"
  }, {
    "url": "demos/Fullscreen.html",
    "revision": "2af4603d656a7ac75c39eb0ccccbe83b"
  }, {
    "url": "demos/LoadingIndicator.html",
    "revision": "99abc3d050cbfab8a4b4628de0e789ae"
  }, {
    "url": "demos/ScanSameQrcodeMoreThanOnce.html",
    "revision": "a9ee298f36dde307088e7e13003513b1"
  }, {
    "url": "demos/Simple.html",
    "revision": "b072d9b3bde870834a4de11a7c1e7dee"
  }, {
    "url": "demos/SwitchCamera.html",
    "revision": "2b0feda27e22555b26139dca5b4e6f63"
  }, {
    "url": "demos/Torch.html",
    "revision": "109c38d2457b6fba926c643d748e3dc6"
  }, {
    "url": "demos/Upload.html",
    "revision": "bdbdd0101478d62f40ec6764f569f297"
  }, {
    "url": "demos/Validate.html",
    "revision": "bd36da947ba2662fdff6cca49e84dd33"
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
    "revision": "7720c76028cfbb73eca2343951834502"
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
    "revision": "7181a2856006d1e75413a0df37c2d86c"
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
    "revision": "1a48941b8b6e6b34245a51ee10573475"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
