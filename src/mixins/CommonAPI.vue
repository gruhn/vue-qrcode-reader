<script>
export default {
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
