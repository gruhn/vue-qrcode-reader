<script>
import BarcodeDetector from "barcode-detector"

export default {
  beforeMount() {
    // if (!('BarcodeDetector' in window)) {
    window.BarcodeDetector = BarcodeDetector
    // }
  },

  methods: {
    async onDetect(resultPromise) {
      this.$emit("detect", resultPromise);

      try {
        const { content } = await resultPromise;

        if (content !== null) {
          this.$emit("decode", content);
        }
      } catch (error) {
        // fail silently
      }
    }
  }
};
</script>
