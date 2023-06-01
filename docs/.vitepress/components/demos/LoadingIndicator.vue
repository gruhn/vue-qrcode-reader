<template>
  <div>
    <button @click="reload">Destroy And Re-Create Component</button>

    <qrcode-stream @init="onInit" v-if="!destroyed">
      <div class="loading-indicator" v-if="loading">
        Loading...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {

  components: { QrcodeStream },

  data () {
    return {
      loading: false,
      destroyed: false
    }
  },

  methods: {
    async onInit (promise) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async reload () {
      this.destroyed = true

      await this.$nextTick()

      this.destroyed = false
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
