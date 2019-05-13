<template lang="html">
  <div
    @drop.prevent.stop="onDrop"
    @dragenter.prevent.stop="onDragOver(true)"
    @dragleave.prevent.stop="onDragOver(false)"
    @dragover.prevent.stop
  >
    <slot></slot>
  </div>
</template>

<script>
import { scan } from "../misc/scanner.js";
import { imageDataFromFile, imageDataFromUrl } from "../misc/image-data.js";
import CommonAPI from "../mixins/CommonAPI.vue";
import Worker from "../worker/jsqr.js";

export default {
  name: "qrcode-drop-zone",

  mixins: [CommonAPI],

  props: {
    worker: {
      type: Function,
      default: Worker
    }
  },

  methods: {
    onDragOver(isDraggingOver) {
      this.$emit("dragover", isDraggingOver);
    },

    onDrop({ dataTransfer }) {
      this.onDragOver(false);

      const droppedFiles = [...dataTransfer.files];
      const droppedUrl = dataTransfer.getData("text/uri-list");

      droppedFiles.forEach(file => {
        this.onDetect(this.processFile(file));
      });

      if (droppedUrl !== "") {
        this.onDetect(this.processUrl(droppedUrl));
      }
    },

    async processFile(file) {
      const imageData = await imageDataFromFile(file);
      const scanResult = await scan(this.worker, imageData);

      return scanResult;
    },

    async processUrl(url) {
      const imageData = await imageDataFromUrl(url);
      const scanResult = await scan(this.worker, imageData);

      return scanResult;
    }
  }
};
</script>
