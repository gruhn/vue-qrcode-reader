<template>
  <div>
    <p>
      By default only QR-codes are detected but a variety of other barcode formats are also
      supported. You can select one or multiple but the more you select the more expensive scanning
      becomes: <br />

      <span
        v-for="option in Object.keys(barcodeFormats)"
        :key="option"
        class="barcode-format-checkbox"
      >
        <input
          type="checkbox"
          v-model="barcodeFormats[option]"
          :id="option"
        />
        <label :for="option">{{ option }}</label>
      </span>
    </p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <p
      v-if="error !== null"
      class="drop-error"
    >
      {{ error }}
    </p>

    <qrcode-drop-zone
      @detect="onDetect"
      @dragover="onDragOver"
      @error="logErrors"
      :formats="selectedBarcodeFormats"
    >
      <div
        class="drop-area"
        :class="{ dragover: dragover }"
      >
        DROP SOME IMAGES HERE
      </div>
    </qrcode-drop-zone>
  </div>
</template>

<script>
import { QrcodeDropZone } from '../../../../src'

/*** barcode formats ***/

export default {
  components: { QrcodeDropZone },

  data() {
    return {
      result: null,
      error: null,
      dragover: false,
      barcodeFormats: {
        aztec: false,
        code_128: false,
        code_39: false,
        code_93: false,
        codabar: false,
        databar: false,
        databar_expanded: false,
        data_matrix: false,
        dx_film_edge: false,
        ean_13: false,
        ean_8: false,
        itf: false,
        maxi_code: false,
        micro_qr_code: false,
        pdf417: false,
        qr_code: true,
        rm_qr_code: false,
        upc_a: false,
        upc_e: false,
        linear_codes: false,
        matrix_codes: false
      }
    }
  },

  computed: {
    selectedBarcodeFormats() {
      return Object
        .keys(this.barcodeFormats)
        .filter(format => this.barcodeFormats[format])
    }   
  },

  methods: {
    onDetect(detectedCodes) {
      console.log(detectedCodes)

      this.result = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    },

    logErrors(error) {
      if (error.name === 'DropImageFetchError') {
        this.error = "Sorry, you can't load cross-origin images :/"
      } else if (error.name === 'DropImageDecodeError') {
        this.error = "Ok, that's not an image. That can't be decoded."
      } else {
        this.error = 'Ups, what kind of error is this?! ' + error.message
      }
    },

    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver
    }
  }
}
</script>

<style>
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: #3c3c43;
}

.dragover {
  background-color: #10b981;
}

.drop-error {
  color: red;
  font-weight: bold;
}
</style>
