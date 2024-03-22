<template>
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

  props:{
    formats: {
      type: Array,
      default: () => ["qr_code"]
    }
  },

  mixins: [CommonAPI],

  methods: {
    onChangeInput(event) {
      const files = [...event.target.files];
      const resultPromises = files.map(file => processFile(file, this.formats));

      resultPromises.forEach(this.onDetect);
    }
  }
};
</script>
