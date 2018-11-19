<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-stream :paused="paused" @decode="onDecode" @init="logErrors">
      <div v-show="paused" class="validation-layer">
        <div class="validation-notice">
          <div v-if="validating">
            Long validation in progress...
          </div>

          <div v-else-if="isValid" class="valid">
            This is a URL
          </div>

          <div v-else class="invalid">
            This is NOT a URL!
          </div>
        </div>
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isValid: false,
      validating: false,
      paused: false,
      result: null
    }
  },

  methods: {

    async onDecode (content) {
      this.result = content

      this.pauseCamera()

      this.validating = true
      this.isValid = await this.validate(content)
      this.validating = false

      window.setTimeout(() => {
        this.unPauseCamera()
      }, 2000)
    },

    pauseCamera () {
      this.paused = true
    },

    unPauseCamera () {
      this.paused = false
    },

    validate (content) {
      return new Promise(resolve => {
        window.setTimeout(() => { // pretend it's taking really long
          if (content.startsWith('http')) {
            resolve(true)
          } else {
            resolve(false)
          }
        }, 3000)
      })
    },

    logErrors (promise) {
      promise.catch(console.error)
    }

  }
}
</script>

<style scoped>
.validation-layer {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-notice {
  font-weight: bold;
  font-size: 1.4rem;
}

.valid {
  color: green;
}
.invalid {
  color: red;
}
</style>
