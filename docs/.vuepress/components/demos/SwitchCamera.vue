<template>
  <div>
    <p class="error" v-if="noFrontCamera">
      You don't seem to have a front camera on your device
    </p>

    <qrcode-stream :camera="{ facingMode }" @init="onInit">
      <button @click="switchCamera">Switch Camera</button>
    </qrcode-stream>
  </div>
</template>

<script>
const REAR_CAMERA = { ideal: 'environment' }
const FRONT_CAMERA = { exact: 'user' }

export default {
  data () {
    return {
      facingMode: REAR_CAMERA,
      noFrontCamera: false
    }
  },

  methods: {
    switchCamera () {
      if (this.facingMode === FRONT_CAMERA) {
        this.facingMode = REAR_CAMERA
      } else {
        this.facingMode = FRONT_CAMERA
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        this.noFrontCamera = this.facingMode === FRONT_CAMERA
          && error.name === 'OverconstrainedError'

        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
