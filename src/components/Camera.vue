<template lang="html">
  <div class="wrapper">
    <!-- The element order defines the stacking order (no need for z-index) -->

    <video
      ref="videoEl"
      class="camera"
      v-show="isPlaying"
      autoplay
      muted
      playsinline
    ></video>

    <canvas
      ref="pauseFrame"
      class="pause-frame"
      v-show="!isPlaying"
    ></canvas>

    <div class="overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import adapterFactory from "webrtc-adapter/src/js/adapter_factory.js";
import { StreamApiNotSupportedError, InsecureContextError } from "../misc/errors.js";
import { imageDataFromVideo } from "../misc/image-data.js";
import { eventOn, timeout } from "callforth";

const INSECURE_CONTEXT = window.isSecureContext !== true;
const STREAM_API_NOT_SUPPORTED = !(
  navigator &&
  (navigator.getUserMedia ||
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
);
let streamApiShimApplied = false;

export default {
  name: "camera",

  props: {
    facingMode: {
      type: String,
      default: "environment",
      validator(value) {
        return ["environment", "user"].includes(value);
      }
    },

    stop: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      mounted: false,
      stream: null
    };
  },

  computed: {
    shouldPlay() {
      return this.mounted && !this.stop;
    },

    isPlaying() {
      return this.shouldPlay && this.stream !== null;
    },

    constraints() {
      return {
        "audio": false,
        "video": {
          "width": { min: 360, ideal: 640, max: 1920 },
          "height": { min: 240, ideal: 480, max: 1080 },
          "facing-mode": { ideal: this.facingMode }
        }
      };
    }
  },

  watch: {
    shouldPlay(shouldPlay) {
      if (shouldPlay) {
        this.startStream(this.constraints);
      } else {
        const frame = this.captureFrame();
        this.paintPauseFrame(frame);
      }
    },

    isPlaying(isPlaying) {
      if (isPlaying) {
        this.$emit("playing", true);
        this.clearPauseFrame();
      } else {
        this.$emit("playing", false)
      }
    },

    facingMode() {
      this.startStream(this.constraints);
    }
  },

  mounted() {
    // At least in Chrome `navigator.mediaDevices` is undefined when the page is
    // loaded using HTTP rather than HTTPS. Thus `STREAM_API_NOT_SUPPORTED` is
    // initialized with `false` although the API might actually be supported.
    // So although `getUserMedia` already should have a build-in mechanism to
    // detect insecure context (by throwing `NotAllowedError`), we have to do a
    // manual check before even calling `getUserMedia`.
    if (INSECURE_CONTEXT) {
      this.$emit("error", new InsecureContextError());
    }

    if (STREAM_API_NOT_SUPPORTED) {
      this.$emit("error", new StreamApiNotSupportedError());
    }

    if (streamApiShimApplied === false) {
      adapterFactory({ window });
      streamApiShimApplied = true;
    }

    this.mounted = true;
  },

  beforeDestroy() {
    this.mounted = false;
    this.stopStream(this.stream);
  },

  methods: {
    async startStream(constraints) {
      if (this.stream !== null) {
        this.stopStream(this.stream)
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoEl = this.$refs.videoEl;

        if (videoEl.srcObject !== undefined) {
          videoEl.srcObject = stream;
        } else if (videoEl.mozSrcObject !== undefined) {
          videoEl.mozSrcObject = stream;
        } else if (window.URL.createObjectURL) {
          videoEl.src = window.URL.createObjectURL(stream);
        } else if (window.webkitURL) {
          videoEl.src = window.webkitURL.createObjectURL(stream);
        } else {
          videoEl.src = stream;
        }

        await eventOn(videoEl, "loadeddata");

        // In edge cases the component is destroyed while `startStream` is
        // still busy. In this case the 'beforeDestroy' hook has no chance to
        // close the resulting stream. Thus, we have to do it here:
        if (!this.mounted) {
          this.stopStream(stream);
        } else {
          this.stream = stream;
        }
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          error.message = "You need to grant camera access permisson. " + error.message;
        } else if (error.name === 'NotFoundError') {
          error.message = "No camera on this device. " + error.message;
        } else if (error.name === 'NotSupportedError') {
          error.message = "Secure context required (HTTPS, localhost). " + error.message;
        } else if (error.name === 'NotReadableError') {
          error.message = "Is the camera already in use? " + error.message;
        } else if (error.name === 'OverconstrainedError') {
          error.message = "Installed cameras are not suitable. " + error.message;
        } else if (error.name === 'StreamApiNotSupportedError') {
          error.message = "Stream API is not supported in this browser. " + error.message;
        }

        this.$emit("error", error);
      }
    },

    stopStream(stream) {
      if (stream !== null) {
        stream.getTracks().forEach(track => track.stop());
      }
    },

    captureFrame() {
      return imageDataFromVideo(this.$refs.videoEl);
    },

    adjustCoordinate({ x, y }) {
      const video = this.$refs.videoEl;

      // The visually occupied area of the video element.
      // Because the component is responsive and fills the available space,
      // this can be more or less than the actual resolution of the camera.
      const displayWidth = video.offsetWidth;
      const displayHeight = video.offsetHeight;

      // The actual resolution of the camera.
      // These values are fixed no matter the screen size.
      const resolutionWidth = video.videoWidth;
      const resolutionHeight = video.videoHeight;

      // Due to `object-fit: cover;` the displayed stream might not only be
      // scaled but also cut off in width or height so we must account for that
      // too.
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

      return {
        x: Math.floor(x * xScalar + xOffset),
        y: Math.floor(y * yScalar + yOffset)
      };
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
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.camera, .pause-frame {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
