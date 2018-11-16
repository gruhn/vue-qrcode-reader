<template>
  <component :is="currentDemo" @init="" />
</template>

<script>
import Vue from 'vue'

import CustomTracking from './demos/CustomTracking.vue'
import DecodeAll from './demos/DecodeAll.vue'
import SwitchCamera from './demos/SwitchCamera.vue'
import NoTracking from './demos/NoTracking.vue'
import DragDrop from './demos/DragDrop.vue'
import Upload from './demos/Upload.vue'
import Fallback from './demos/Fallback.vue'
import LoadingIndicator from './demos/LoadingIndicator.vue'
import ValidateHard from './demos/ValidateHard.vue'
import ValidateSoft from './demos/ValidateSoft.vue'

export default {

  props: {
    component: String
  },

  data () {
    return {
      currentDemo: null
    }
  },

  async mounted () {
    const VueQrcodeReader = await import('vue-qrcode-reader/dist/vue-qrcode-reader.browser.js')

    Vue.use(VueQrcodeReader)

    Vue.component('CustomTracking', CustomTracking)
    Vue.component('DecodeAll', DecodeAll)
    Vue.component('SwitchCamera', SwitchCamera)
    Vue.component('NoTracking', NoTracking)
    Vue.component('DragDrop', DragDrop)
    Vue.component('Upload', Upload)
    Vue.component('Fallback', Fallback)
    Vue.component('LoadingIndicator', LoadingIndicator)
    Vue.component('ValidateHard', ValidateHard)
    Vue.component('ValidateSoft', ValidateSoft)

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
