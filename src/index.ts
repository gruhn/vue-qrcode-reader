import type { App, Plugin } from 'vue'

import QrcodeCapture from './components/QrcodeCapture.vue'
import QrcodeDropZone from './components/QrcodeDropZone.vue'
import QrcodeStream from './components/QrcodeStream.vue'

// Install the components
export function install(app: App) {
  app.component('qrcode-stream', QrcodeStream)
  app.component('qrcode-capture', QrcodeCapture)
  app.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components
export { QrcodeCapture, QrcodeDropZone, QrcodeStream }

// Expose some exports from "barcode-detector"
export { setZXingModuleOverrides, type BarcodeFormat } from 'barcode-detector'

// Plugin definition
const plugin: Plugin = { install }

export { plugin as VueQrcodeReader }
