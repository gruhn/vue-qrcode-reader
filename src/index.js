/* DEPRECATED: QrcodeReader renamed to QrcodeStream */
import QrcodeReader from './components/QrcodeReader.vue'

import QrcodeStream from './components/QrcodeStream.vue'
import QrcodeCapture from './components/QrcodeCapture.vue'
import QrcodeDropZone from './components/QrcodeDropZone.vue'

// Install the components
export function install (Vue) {
  /* DEPRECATED: QrcodeReader renamed to QrcodeStream */
  Vue.component('qrcode-reader', QrcodeReader)

  Vue.component('qrcode-stream', QrcodeStream)
  Vue.component('qrcode-capture', QrcodeCapture)
  Vue.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components
export {
  QrcodeReader, /* DEPRECATED: QrcodeReader renamed to QrcodeStream */
  QrcodeStream,
  QrcodeCapture,
  QrcodeDropZone,
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = { install }

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
