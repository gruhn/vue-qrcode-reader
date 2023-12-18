<template>
  <div>
    <p>
      Barcodeformat:
      <select v-model="selectedBarcodeTypes" multiple>
        <option v-for="(option, index) in barcodeTypes" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </p>
    <p>
      Track function:
      <select v-model="selected">
        <option v-for="option in options" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select>
    </p>

    <qrcode-stream :formats="selectedBarcodeTypes" :track="selected.value" @error="logErrors" />
  </div>
</template>

<script>
import { QrcodeStream } from '../../../../src'

export default {
  components: { QrcodeStream },

  data() {
    const options = [
      { text: 'nothing (default)', value: undefined },
      { text: 'outline', value: this.paintOutline },
      { text: 'centered text', value: this.paintCenterText },
      { text: 'bounding box', value: this.paintBoundingBox }
    ]

    const selected = options[1]

    const barcodeTypes = ["aztec", "code_128", "code_39", "code_93", "codabar", "databar", "databar_expanded", "data_matrix", "dx_film_edge", "ean_13", "ean_8", "itf", "maxi_code", "micro_qr_code", "pdf417", "qr_code", "rm_qr_code", "upc_a", "upc_e", "linear_codes", "matrix_codes"]

    const selectedBarcodeTypes = ["qr_code"]

    return { selected, options, selectedBarcodeTypes, barcodeTypes}
  },

  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },

    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
        console.log(boundingBox.width, ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
      }
    },

    logErrors: console.error
  }
}
</script>
