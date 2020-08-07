<template>
  <div>
    <p>
      Track function:
      <select v-model="selected">
        <option v-for="option in options" :value="option">
          {{ option.text }}
        </option>
      </select>
    </p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream :key="_uid" :track="selected.value" @decode="onDecode" @init="logErrors" />
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {

  components: { QrcodeStream },

  data () {
    const options = [
      { text: "None", value: false },
      { text: "Red square (default)", value: true },
      { text: "Green text", value: this.paintGreenText },
      { text: "Blue dots", value: this.paintBlueDots },
    ]

    const selected = options[2]

    return { selected, options, result: null }
  },

  methods: {
    paintBlueDots (location, ctx) {
      const {
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      } = location

      const pointArray = [
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      ]

      ctx.fillStyle = '#007bff'

      pointArray.forEach(({ x, y }) => {
        ctx.fillRect(x - 5, y - 5, 10, 10)
      })
    },

    paintGreenText (location, ctx) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      } = location

      const pointArray = [
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      ]

      const centerX = pointArray.reduce((sum, { x }) => x + sum, 0) / 4
      const centerY = pointArray.reduce((sum, { y }) => y + sum, 0) / 4

      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"

      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(this.result, centerX, centerY)

      ctx.fillStyle = '#5cb984'
      ctx.fillText(this.result, centerX, centerY)
    },

    onDecode (result) {
      this.result = result
    },

    logErrors (promise) {
      promise.catch(console.error)
    }
  }

}
</script>
