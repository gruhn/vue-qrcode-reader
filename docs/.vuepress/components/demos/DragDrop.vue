<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <p v-if="error !== null" class="drop-error">
      {{ error }}
    </p>

    <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver" @init="logErrors">
      <div class="drop-area" :class="{ 'dragover': dragover }">
        DROP SOME IMAGES HERE
      </div>
    </qrcode-drop-zone>
  </div>
</template>

<script>
import { QrcodeDropZone } from '../../../../src'

export default {

  components: { QrcodeDropZone },

  data () {
    return {
      result: null,
      error: null,
      dragover: false
    }
  },

  methods: {
    async onDetect (promise) {
      try {
        const { content } = await promise

        this.result = content
        this.error = null
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'Sorry, you can\'t load cross-origin images :/'
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Ok, that\'s not an image. That can\'t be decoded.'
        } else {
          this.error = 'Ups, what kind of error is this?! ' + error.message
        }
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    onDragOver (isDraggingOver) {
      this.dragover = isDraggingOver
    }
  }
}
</script>

<style>
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0,0,0,.5);
}

.dragover {
  background-color: rgba(0,0,0,.8);
}

.drop-error {
  color: red;
  font-weight: bold;
}
</style>
