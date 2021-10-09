<template lang="html">
  <div class="qrcode-stream-wrapper">
    <!--
    Note, the following DOM elements are not styled with z-index.
    If z-index is not defined, elements are stacked in the order they appear in the DOM.
    The first element is at the very bottom and subsequent elements are added on top.
    -->
    <video
      ref="video"
      :class="{ 'qrcode-stream-camera--hidden': !shouldScan }"
      class="qrcode-stream-camera"
      autoplay
      muted
      playsinline
    ></video>

    <canvas
      ref="pauseFrame"
      v-show="!shouldScan"
      class="qrcode-stream-camera"
    ></canvas>

    <canvas ref="trackingLayer" class="qrcode-stream-overlay"></canvas>

    <div class="qrcode-stream-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { keepScanning } from "../misc/scanner.js";
import Camera from "../misc/camera.js";
import CommonAPI from "../mixins/CommonAPI.vue";

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

    torch: {
      type: Boolean,
      default: false
    },

    track: {
      type: Function
    }
  },

  data() {
    return {
      cameraInstance: null,
      destroyed: false
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
      if (this.track === undefined) {
        return 500;
      } else {
        return 40; // ~ 25fps
      }
    }
  },

  watch: {
    shouldStream(shouldStream) {
      if (!shouldStream) {
        const canvas = this.$refs.pauseFrame;
        const ctx = canvas.getContext("2d");
        const video = this.$refs.video;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      }
    },

    shouldScan(shouldScan) {
      if (shouldScan) {
        this.clearCanvas(this.$refs.pauseFrame);
        this.clearCanvas(this.$refs.trackingLayer);
        this.startScanning();
      }
    },

    torch() {
      this.init();
    },

    camera() {
      this.init();
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.beforeResetCamera();
    this.destroyed = true;
  },

  methods: {
    init() {
      const promise = (async () => {
        this.beforeResetCamera();

        if (this.camera === "off") {
          this.cameraInstance = null;

          return {
            capabilities: {}
          };
        } else {
          this.cameraInstance = await Camera(this.$refs.video, {
            camera: this.camera,
            torch: this.torch
          });

          const capabilities = this.cameraInstance.getCapabilities();

          // if the component is destroyed before `cameraInstance` resolves a
          // `beforeDestroy` hook has no chance to clear the remaining camera
          // stream.
          if (this.destroyed) {
            this.cameraInstance.stop();
          }

          return {
            capabilities
          };
        }
      })();

      this.$emit("init", promise);
    },

    startScanning() {
      const detectHandler = result => {
        this.onDetect(Promise.resolve(result));
      };

      keepScanning(this.$refs.video, {
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

    onLocate(detectedCodes) {
      const canvas = this.$refs.trackingLayer;
      const video = this.$refs.video;

      if (canvas !== undefined) {
        if (detectedCodes.length > 0 && this.track !== undefined && video !== undefined) {
          // The visually occupied area of the video element.
          // Because the component is responsive and fills the available space,
          // this can be more or less than the actual resolution of the camera.
          const displayWidth = video.offsetWidth;
          const displayHeight = video.offsetHeight;

          // The actual resolution of the camera.
          // These values are fixed no matter the screen size.
          const resolutionWidth = video.videoWidth;
          const resolutionHeight = video.videoHeight;

          // Dimensions of the video element as if there would be no
          //   object-fit: cover;
          // Thus, the ratio is the same as the cameras resolution but it's
          // scaled down to the size of the visually occupied area.
          const largerRatio = Math.max(
            displayWidth / resolutionWidth,
            displayHeight / resolutionHeight
          );
          const uncutWidth = resolutionWidth * largerRatio;
          const uncutHeight = resolutionHeight * largerRatio;

          const xScalar = uncutWidth / resolutionWidth;
          const yScalar = uncutHeight / resolutionHeight;
          const xOffset = (displayWidth - uncutWidth) / 2;
          const yOffset = (displayHeight - uncutHeight) / 2;

          const scale = ({ x, y }) => {
            return {
              x: Math.floor(x * xScalar),
              y: Math.floor(y * yScalar)
            };
          }

          const translate = ({ x, y }) => {
            return {
              x: Math.floor(x + xOffset),
              y: Math.floor(y + yOffset)
            };
          }

          const adjustedCodes = detectedCodes.map(detectedCode => {
            const { boundingBox, cornerPoints } = detectedCode

            const { x, y } = translate(scale({
              x: boundingBox.x,
              y: boundingBox.y
            }))
            const { x: width, y: height } = scale({
              x: boundingBox.width,
              y: boundingBox.height
            })

            return {
              ...detectedCode,
              cornerPoints: cornerPoints.map(point => translate(scale(point))),
              boundingBox: DOMRectReadOnly.fromRect({ x, y, width, height })
            }
          })

          canvas.width = video.offsetWidth;
          canvas.height = video.offsetHeight;

          const ctx = canvas.getContext('2d');

          this.track(adjustedCodes, ctx);
        } else {
          this.clearCanvas(canvas);
        }
      }
    },

    repaintTrackingLayer(video, canvas, location) {
      const ctx = canvas.getContext("2d");


      window.requestAnimationFrame(() => {
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        this.trackRepaintFunction(coordinatesAdjusted, ctx);
      });
    },

    clearCanvas(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

  }
};
</script>

<style lang="css" scoped>
.qrcode-stream-wrapper {
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 0;
}

.qrcode-stream-overlay {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
}

.qrcode-stream-camera {
  width: 100%;
  height: 100%;

  display: block;
  object-fit: cover;
}
/* When a camera stream is loaded, we assign the stream to the `video`
 * element via `video.srcObject`. At this point the element used to be
 * hidden with `v-show="false"` aka. `display: none`. We do that because
 * at this point the videos dimensions are not known yet. We have to
 * wait for the `loadeddata` event first. Only after that event we
 * display the video element. Otherwise the elements size awkwardly flickers.
 *
 * However, it appears in iOS 15 all iOS browsers won't properly render
 * the video element if the `video.srcObject` was assigned *while* the
 * element was hidden with `display: none`. Using `visibility: hidden`
 * instead seems to have fixed the problem though.
 */
.qrcode-stream-camera--hidden {
  visibility: hidden;
  position: absolute;
}
</style>
