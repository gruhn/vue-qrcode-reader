<template lang="html">
  <div class="wrapper">
    <div class="inside">
      <!--
      All DOM elements here are stacked upon each other.
      Order matters! The last element is on top.
      Therefore we don't need `z-index`.
      -->
      <video
        ref="video"
        v-show="shouldScan"
        class="camera"
        autoplay
        muted
        playsinline
      ></video>

      <canvas
        ref="pauseFrame"
        v-show="!shouldScan"
        class="pause-frame"
      ></canvas>

      <canvas ref="trackingLayer" class="tracking-layer"></canvas>

      <div class="overlay">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { keepScanning } from "../misc/scanner.js";
import { thinSquare } from "../misc/track-func.js";
import Camera from "../misc/camera.js";
import CommonAPI from "../mixins/CommonAPI.vue";
import Worker from "../worker/jsqr.js";

export default {
  name: "qrcode-stream",

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
      cameraInstance: null,
      destroyed: false,
      stopScanning: () => {}
    };
  },

  computed: {
    shouldStream() {
      return this.destroyed === false && this.camera !== "off";
    },

    shouldScan() {
      return this.shouldStream === true && this.cameraInstance !== null;
    },

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

    constraints() {
      const base = {
        audio: false,
        video: {
          width: { min: 360, ideal: 640, max: 1920 },
          height: { min: 240, ideal: 480, max: 1080 }
        }
      };

      switch (this.camera) {
        case "auto":
          base.video.facingMode = { ideal: "environment" };

          return base;
        case "rear":
          base.video.facingMode = { exact: "environment" };

          return base;
        case "front":
          base.video.facingMode = { exact: "user" };

          return base;
        case "off":
          return undefined;

        default:
          return undefined;
      }
    }
  },

  watch: {
    shouldStream(shouldStream) {
      if (!shouldStream) {
        const frame = this.cameraInstance.captureFrame();
        this.paintPauseFrame(frame);
      }
    },

    shouldScan(shouldScan) {
      if (shouldScan) {
        this.clearPauseFrame();
        this.clearTrackingLayer();
        this.startScanning();
      } else {
        this.stopScanning();
      }
    },

    constraints() {
      this.$emit("init", this.init());
    }
  },

  mounted() {
    this.$emit("init", this.init());
  },

  beforeDestroy() {
    this.beforeResetCamera();
    this.stopScanning();
    this.destroyed = true;
  },

  methods: {
    async init() {
      this.beforeResetCamera();

      if (this.constraints === undefined) {
        this.cameraInstance = null;
      } else {
        this.cameraInstance = await Camera(this.constraints, this.$refs.video);

        // if the component is destroyed before `cameraInstance` resolves a
        // `beforeDestroy` hook has no chance to clear the remaining camera
        // stream.
        if (this.destroyed) {
          this.cameraInstance.stop();
        }
      }
    },

    startScanning() {
      const detectHandler = result => {
        this.onDetect(Promise.resolve(result));
      };

      // this.stopScanning()
      this.stopScanning = keepScanning(this.worker, this.cameraInstance, {
        detectHandler,
        locateHandler: this.onLocate,
        minDelay: this.scanInterval
      });
    },

    beforeResetCamera() {
      if (this.cameraInstance !== null) {
        this.cameraInstance.stop();
        this.cameraInstance = null;
      }
    },

    onLocate(location) {
      if (this.trackRepaintFunction === undefined || location === null) {
        this.clearTrackingLayer();
      } else {
        this.repaintTrackingLayer(location);
      }
    },

    /**
     * The coordinates are based on the original camera resolution but the
     * video element is responsive and scales with space available. Therefore
     * the coordinates are re-calculated to be relative to the video element.
     */
    normalizeLocation(widthRatio, heightRatio, location) {
      const normalized = {};

      for (const key in location) {
        normalized[key] = {
          x: Math.floor(location[key].x * widthRatio),
          y: Math.floor(location[key].y * heightRatio)
        };
      }

      return normalized;
    },

    repaintTrackingLayer(location) {
      const video = this.$refs.video;
      const canvas = this.$refs.trackingLayer;
      const ctx = canvas.getContext("2d");

      const displayWidth = video.offsetWidth;
      const displayHeight = video.offsetHeight;
      const resolutionWidth = video.videoWidth;
      const resolutionHeight = video.videoHeight;

      window.requestAnimationFrame(() => {
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        const widthRatio = displayWidth / resolutionWidth;
        const heightRatio = displayHeight / resolutionHeight;

        location = this.normalizeLocation(widthRatio, heightRatio, location);

        this.trackRepaintFunction(location, ctx);
      });
    },

    clearTrackingLayer() {
      const canvas = this.$refs.trackingLayer;
      const ctx = canvas.getContext("2d");

      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    },

    paintPauseFrame(imageData) {
      const canvas = this.$refs.pauseFrame;
      const ctx = canvas.getContext("2d");

      window.requestAnimationFrame(() => {
        canvas.width = imageData.width;
        canvas.height = imageData.height;

        ctx.putImageData(imageData, 0, 0);
      });
    },

    clearPauseFrame() {
      const canvas = this.$refs.pauseFrame;
      const ctx = canvas.getContext("2d");

      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

.inside {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  z-index: 0;
}

.overlay, .tracking-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.camera, .pause-frame {
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
