import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/vue-qrcode-reader/",
  description:
    "A set of Vue.js components for detecting and decoding QR codes.",
    lang: "en-US",
  lastUpdated: true,
  themeConfig: {
    editLink: {
      pattern:
        "https://github.com/gruhn/vue-qrcode-reader/edit/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Jonas Thelemann",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Live Demos", link: "/demos/CustomTracking" },
      { text: "API Reference", link: "/api/QrcodeStream" },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/demos/": [
        {
          text: 'Simple',
          link: '/demos/Simple'
        },
        {
          text: 'Decode Continuously',
          link: '/demos/DecodeAll'
        },
        {
          text: 'Visual Tracking',
          link: '/demos/CustomTracking'
        },
        {
          text: 'Show Loading Indicator',
          link: '/demos/LoadingIndicator'
        },
        {
          text: 'Scan Same Qrcode More Than Once',
          link: '/demos/ScanSameQrcodeMoreThanOnce'
        },
        {
          text: 'Pause & Validate',
          link: '/demos/Validate'
        },
        {
          text: 'Switch to Front Camera',
          link: '/demos/SwitchCamera'
        },
        {
          text: 'Fullscreen',
          link: '/demos/Fullscreen'
        },
        {
          text: 'Torch (Flashlight)',
          link: '/demos/Torch'
        },
        {
          text: 'Decode by Drag&Drop',
          link: '/demos/DragDrop'
        },
        {
          text: 'Decode by Upload',
          link: '/demos/Upload'
        },
      ],
      "/api/": [
        {
          text: 'QrcodeStream',
          link: '/api/QrcodeStream'
        },
        {
          text: 'QrcodeDropZone',
          link: '/api/QrcodeDropZone'
        },
        {
          text: 'QrcodeCapture',
          link: '/api/QrcodeCapture'
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/gruhn/vue-qrcode-reader" },
    ],
  },
  title: "Vue Qrcode Reader",
  vite: {
    // build: {
    //   rollupOptions: {
    //     external: ["vue"],
    //     output: {
    //       globals: {
    //         vue: "Vue",
    //       },
    //     },
    //   },
    // },
    resolve: {
      alias: {
        "@": __dirname,
      },
    },
  }
});
