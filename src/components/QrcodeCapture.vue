<template lang="html">
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple>
</template>

<script>
import { scan } from '../misc/scanner.js'
import { imageDataFromFile } from '../misc/image-data.js'
import CommonAPI from '../mixins/CommonAPI.vue'

export default {

  mixins: [ CommonAPI ],

  methods: {
    onChangeInput (event) {
      const files = [...event.target.files]
      const resultPromises = files.map(this.processFile)

      resultPromises.forEach(this.onDetect)

      console.log(Promise.all(resultPromises))
    },

    async processFile (file) {
      const imageData = await imageDataFromFile(file)
      const scanResult = await scan(imageData)

      return { source: 'file', ...scanResult }
    },
  },

}
</script>
