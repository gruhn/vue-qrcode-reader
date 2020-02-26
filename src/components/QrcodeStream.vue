<template lang="html">
  <camera ref="camera" :facing-mode="facingMode" :stop="camera === 'off'" @playing="shouldScan = $event">
    <canvas ref="trackingLayer" class="tracking-layer"></canvas>

    <slot></slot>
  </camera>
</template>

<script>
import { keepScanning } from "../misc/scanner.js";
import { thinSquare } from "../misc/track-func.js";
import CommonAPI from "../mixins/CommonAPI.vue";
import Worker from "../worker/jsqr.js";
import Camera from "./Camera.vue";

export default {
  name: "qrcode-stream",

  components: { Camera },

  mixins: [CommonAPI],

  props: {
    camera: {
      type: String,
      default: "auto",

      validator(camera) {
        return ["auto", "rear", "front", "off"].includes(camera);
      }
    },

    track: {
      type: [Function, Boolean],
      default: true
    },

    worker: {
      type: Function,
      default: Worker
    }
  },

  data() {
    return {
      shouldScan: false,
      stopScanning: () => {}
    };
  },

  computed: {
    /**
     * Minimum delay in milliseconds between frames to be scanned. Don't scan
     * so often when visual tracking is disabled to improve performance.
     */
    scanInterval() {
      if (this.track === false) {
        return 500;
      } else {
        return 40; // ~ 25fps
      }
    },

    trackRepaintFunction() {
      if (this.track === true) {
        return thinSquare({ color: "#ff0000" });
      } else if (this.track === false) {
        return undefined;
      } else {
        return this.track;
      }
    },

    facingMode() {
      if (this.camera === "front") {
        return "user";
      } else {
        return "environment";
      }
    }
  },

  watch: {
    shouldScan(shouldScan) {
      if (shouldScan) {
        this.clearTrackingLayer();
        this.startScanning();
      } else {
        this.stopScanning();
      }
    },

    camera(__, oldCamera) {
      if (oldCamera === "off") {
        this.$emit("init", new Promise(resolve => this.$once("playing", resolve)));
      }
    },

    facingMode() {
      this.$emit("init", new Promise(resolve => this.$once("playing", resolve)));
    }
  },

  mounted() {
    this.$emit("init", new Promise(resolve => this.$once("playing", resolve)));
  },

  beforeDestroy() {
    this.stopScanning();
  },

  methods: {
    startScanning() {
      const detectHandler = result => {
        this.onDetect(Promise.resolve(result));
      };

      this.stopScanning = keepScanning(this.worker, this.$refs.camera, {
        detectHandler,
        locateHandler: this.onLocate,
        minDelay: this.scanInterval
      });
    },

    onLocate(location) {
      if (this.trackRepaintFunction === undefined || location === null) {
        this.clearTrackingLayer();
      } else {
        this.repaintTrackingLayer(location);
      }
    },

    repaintTrackingLayer(location) {
      const camera = this.$refs.camera;
      const canvas = this.$refs.trackingLayer;
      const ctx = canvas.getContext("2d");

      const coordinatesAdjusted = {};
      for (const key in location) {
        coordinatesAdjusted[key] = camera.adjustCoordinate(location[key]);
      }

      window.requestAnimationFrame(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        this.trackRepaintFunction(coordinatesAdjusted, ctx);
      });
    },

    clearTrackingLayer() {
      const canvas = this.$refs.trackingLayer;
      const ctx = canvas.getContext("2d");

      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }
};
</script>

<style lang="css" scoped>
.tracking-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
