<template>
  <qrcode-stream :camera="camera" @init="$emit('init', $event)">
    <button @click="switchCamera">Switch Camera</button>
  </qrcode-stream>
</template>

<script>
export default {
  data () {
    return {
      useRearCamera: true
    }
  },

  computed: {
    camera () {
      if (this.useRearCamera) {
        return {
          facingMode: { ideal: 'environment' }
        }
      } else {
        return {
          facingMode: { exact: 'user' }
        }
      }
    }

  },

  methods: {
    switchCamera () {
      this.useRearCamera = !this.useRearCamera
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
</style>
