import { scan } from "../misc/scanner.js";
import { imageDataFromFile, imageDataFromUrl } from "../misc/image-data.js";
import CommonAPI from "../mixins/CommonAPI.js";
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
  },

  render(h) {
    const preventAndStop = handler => event => {
      event.preventDefault();
      event.stopPropagation();

      handler(event);
    };

    return h("div", {
      nativeOn: {
        drop: preventAndStop(event => this.onDrop(event)),
        dragenter: preventAndStop(() => this.onDragOver(true)),
        dragleave: preventAndStop(() => this.onDragOver(false)),
        dragover: preventAndStop(() => {})
      }
    }, this.$slots.default)
  }
};
