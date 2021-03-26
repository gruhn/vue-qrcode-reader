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
import { processFile } from "../misc/scanner.js";
import CommonAPI from "../mixins/CommonAPI.vue";

export default {
  name: "qrcode-capture",

  mixins: [CommonAPI],

  methods: {
    onChangeInput(event) {
      const files = [...event.target.files];
      const resultPromises = files.map(processFile);

      resultPromises.forEach(this.onDetect);
    }
  }
};
</script>
