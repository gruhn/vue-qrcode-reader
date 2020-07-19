<template>
  <div>
    <p>
      Last result: <b>{{ decodedContent }}</b>
    </p>

    <p class="error">
      {{ errorMessage }}
    </p>

    <qrcode-stream
      @decode="onDecode"
      :torch="torch"
      @init="onInit"
    ></qrcode-stream>

    <button @click="torch = !torch">Torch On/Off</button>
  </div>
</template>

<script>
import QrcodeStream from "../src/components/QrcodeStream";

export default {

  components: { QrcodeStream },

  data() {
    return {
      decodedContent: "",
      errorMessage: "",
      torch: false
    };
  },

  methods: {
    onDecode(content) {
      this.decodedContent = content;
    },

    onInit(promise) {
      promise
        .then(({ capabilities }) => {
          console.log("Successfully initilized! Ready for scanning now!");
          console.log(capabilities)
        })
        .catch(error => {
          if (error.name === "NotAllowedError") {
            this.errorMessage = "Hey! I need access to your camera";
          } else if (error.name === "NotFoundError") {
            this.errorMessage = "Do you even have a camera on your device?";
          } else if (error.name === "NotSupportedError") {
            this.errorMessage =
              "Seems like this page is served in non-secure context (HTTPS, localhost or file://)";
          } else if (error.name === "NotReadableError") {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?";
          } else if (error.name === "OverconstrainedError") {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
          } else {
            this.errorMessage = "UNKNOWN ERROR: " + error.message;
          }
        });
    }
  }
};
</script>
