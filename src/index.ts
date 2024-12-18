import type { App, Plugin } from 'vue'

import QrcodeStream, { type QrcodeStreamProps } from './components/QrcodeStream.vue'
import QrcodeCapture, { type QrcodeCaptureProps } from './components/QrcodeCapture.vue'
import QrcodeDropZone, { type QrcodeDropZoneProps } from './components/QrcodeDropZone.vue'

// Install the components
export function install(app: App) {
  app.component('qrcode-stream', QrcodeStream)
  app.component('qrcode-capture', QrcodeCapture)
  app.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components:
export { 
  QrcodeStream, 
  QrcodeCapture, 
  QrcodeDropZone,
  type QrcodeStreamProps,
  type QrcodeCaptureProps,
  type QrcodeDropZoneProps,
}

// Expose some exports from "barcode-detector"
export { 
  setZXingModuleOverrides, 
  type BarcodeFormat,
  type DetectedBarcode
} from 'barcode-detector/pure'

// Plugin definition
const plugin: Plugin = { install }

export { plugin as VueQrcodeReader }
