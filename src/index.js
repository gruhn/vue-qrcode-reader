import 'webrtc-adapter'
import QrcodeReader from './components/QrcodeReader.vue'

// Install the components
export function install (Vue) {
  Vue.component('qrcode-reader', QrcodeReader)
}

// Expose the components
export { QrcodeReader }

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install,
}

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
