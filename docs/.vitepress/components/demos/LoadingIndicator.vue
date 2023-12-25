<template>
  <div>
    <button @click="reload">Destroy And Re-Create Component</button>

    <qrcode-stream
      @camera-on="onCameraOn"
      v-if="!destroyed"
    >
      <div
        class="loading-indicator"
        v-if="loading"
      >
        Loading...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {
  components: { QrcodeStream },

  data() {
    return {
      loading: true,
      destroyed: false
    }
  },

  methods: {
    onCameraOn() {
      this.loading = false
    },

    async reload() {
      this.destroyed = true
      await this.$nextTick()
      this.destroyed = false
      this.loading = true
    }
  }
}
</script>

<style scoped>
button {
  margin-bottom: 20px;
}

.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
