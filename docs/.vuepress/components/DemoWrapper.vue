<template>
  <component :is="currentDemo" />
</template>

<script>
import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader/dist/vue-qrcode-reader.browser.js'

import CustomTracking from './demos/CustomTracking.vue'
import DecodeAll from './demos/DecodeAll.vue'
import SwitchCamera from './demos/SwitchCamera.vue'
import NoTracking from './demos/NoTracking.vue'
import DragDrop from './demos/DragDrop.vue'
import Upload from './demos/Upload.vue'
import Fallback from './demos/Fallback.vue'
import LoadingIndicator from './demos/LoadingIndicator.vue'
import Validate from './demos/Validate.vue'

export default {

  components: {
    DecodeAll
  },

  props: {
    component: String
  },

  data () {
    return {
      currentDemo: null
    }
  },

  async mounted () {
    Vue.use(window.VueQrcodeReader)

    Vue.component('CustomTracking', CustomTracking)
    Vue.component('DecodeAll', DecodeAll)
    Vue.component('SwitchCamera', SwitchCamera)
    Vue.component('NoTracking', NoTracking)
    Vue.component('DragDrop', DragDrop)
    Vue.component('Upload', Upload)
    Vue.component('Fallback', Fallback)
    Vue.component('LoadingIndicator', LoadingIndicator)
    Vue.component('Validate', Validate)

    this.currentDemo = this.component
  }

}
</script>

<style>
@import "~vue-qrcode-reader/dist/vue-qrcode-reader.css";

.decode-result {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
