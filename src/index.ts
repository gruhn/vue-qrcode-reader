import type { App, Plugin } from 'vue'

import QrcodeStream from './components/QrcodeStream.vue'
import QrcodeCapture from './components/QrcodeCapture.vue'
import QrcodeDropZone from './components/QrcodeDropZone.vue'

import { setZXingModuleOverrides } from 'barcode-detector/pure'

// Install the components
export function install(app: App) {
  app.component('qrcode-stream', QrcodeStream)
  app.component('qrcode-capture', QrcodeCapture)
  app.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components
export { QrcodeStream, QrcodeCapture, QrcodeDropZone, setZXingModuleOverrides }

// Plugin definition
const plugin: Plugin = { install }

export { plugin as VueQrcodeReader }

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  // @ts-ignore
  GlobalVue = window.Vue
  // @ts-ignore
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
