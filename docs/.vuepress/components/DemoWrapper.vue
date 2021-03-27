<template>
  <component :is="currentDemo" />
</template>

<script>
import CustomTracking from './demos/CustomTracking.vue'
import DecodeAll from './demos/DecodeAll.vue'
import SwitchCamera from './demos/SwitchCamera.vue'
import DragDrop from './demos/DragDrop.vue'
import Upload from './demos/Upload.vue'
import Fullscreen from './demos/Fullscreen.vue'
import LoadingIndicator from './demos/LoadingIndicator.vue'
import Torch from './demos/Torch.vue'
import Validate from './demos/Validate.vue'
import ScanSameQrcodeMoreThanOnce from './demos/ScanSameQrcodeMoreThanOnce.vue'

export default {
  components: {
    DecodeAll,
    CustomTracking,
    SwitchCamera,
    DragDrop,
    Upload,
    Fullscreen,
    LoadingIndicator,
    Torch,
    Validate,
    ScanSameQrcodeMoreThanOnce
  },

  props: {
    component: String
  },

  data () {
    return {
      currentDemo: null
    }
  },

  mounted () {
    this.currentDemo = this.component
  }

}
</script>

<style>
.decode-result {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
