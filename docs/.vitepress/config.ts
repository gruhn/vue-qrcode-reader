import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

if (process.env.VITEPRESS_BASE === undefined) {
  console.warn('env var VITEPRESS_BASE is undefined. Defaulting to: /vue-qrcode-reader/')
}
const { VITEPRESS_BASE = '/vue-qrcode-reader/' } = process.env

export default withPwa(
  defineConfig({
    description: 'A set of Vue.js components for detecting and decoding QR codes.',
    lang: 'en-US',
    lastUpdated: true,
    base: VITEPRESS_BASE,
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/gruhn/vue-qrcode-reader/edit/main/docs/:path'
      },
      footer: {
        message: 'Released under the MIT License.'
      },
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Live Demos', link: '/demos/FullDemo' },
        { text: 'API Reference', link: '/api/QrcodeStream' }
      ],
      search: {
        provider: 'local'
      },
      sidebar: {
        '/demos/': [
          {
            text: 'Full Demo',
            link: '/demos/FullDemo'
          },
          {
            text: 'Simple',
            link: '/demos/Simple'
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
          }
        ],
        '/api/': [
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
          }
        ]
      },
      socialLinks: [{ icon: 'github', link: 'https://github.com/gruhn/vue-qrcode-reader' }]
    },
    title: 'Vue Qrcode Reader',
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
          '@': __dirname
        }
      }
    },
    pwa: {
      mode: 'development',
      base: VITEPRESS_BASE,
      scope: VITEPRESS_BASE,
      registerType: 'autoUpdate',
      // injectRegister: 'inline',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Vue Qrcode Reader',
        short_name: 'Vue QR',
        theme_color: '#10b981',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}']
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: '/'
      }
    }
  })
)
