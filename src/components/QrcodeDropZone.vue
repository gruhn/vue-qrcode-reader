<template>
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
import { processFile, processUrl } from "../misc/scanner.js";
import CommonAPI from "../mixins/CommonAPI.vue";

export default {
  name: "qrcode-drop-zone",

  props:{
    formats: {
      type: Array,
      default: () => ["qr_code"]
    }
  },
  mixins: [CommonAPI],

  methods: {
    onDragOver(isDraggingOver) {
      this.$emit("dragover", isDraggingOver);
    },

    onDrop({ dataTransfer }) {
      this.onDragOver(false);

      const droppedFiles = [...dataTransfer.files];
      const droppedUrl = dataTransfer.getData("text/uri-list");

      droppedFiles.forEach(file => {
        this.onDetect(processFile(file, this.formats));
      });

      if (droppedUrl !== "") {
        this.onDetect(processUrl(droppedUrl, this.formats));
      }
    }
  }
};
</script>
