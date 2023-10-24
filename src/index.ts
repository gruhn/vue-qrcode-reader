import type { App, Plugin } from 'vue'

import QrcodeStream from './components/QrcodeStream.vue'
import QrcodeCapture from './components/QrcodeCapture.vue'
import QrcodeDropZone from './components/QrcodeDropZone.vue'

// Install the components
export function install(app: App) {
  app.component('qrcode-stream', QrcodeStream)
  app.component('qrcode-capture', QrcodeCapture)
  app.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components
export { QrcodeStream, QrcodeCapture, QrcodeDropZone }

// Expose some exports from "barcode-detector"
export { setZXingModuleOverrides, type BarcodeFormat } from 'barcode-detector/pure'

// Plugin definition
const plugin: Plugin = { install }

export { plugin as VueQrcodeReader }
