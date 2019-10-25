<template lang="html">
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple
  />
</template>

<script>
import { scan } from "../misc/scanner.js";
import { imageDataFromFile } from "../misc/image-data.js";
import CommonAPI from "../mixins/CommonAPI.vue";
import Worker from "../worker/jsqr.js";

export default {
  name: "qrcode-capture",

  mixins: [CommonAPI],

  props: {
    worker: {
      type: Function,
      default: Worker
    }
  },

  methods: {
    onChangeInput(event) {
      const files = [...event.target.files];
      const resultPromises = files.map(this.processFile);

      resultPromises.forEach(this.onDetect);
    },

    async processFile(file) {
      const imageData = await imageDataFromFile(file);
      const scanResult = await scan(this.worker, imageData);

      return scanResult;
    }
  }
};
</script>
