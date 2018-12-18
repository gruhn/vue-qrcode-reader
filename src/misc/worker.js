import jsQR from 'jsqr'
import { DataMatrixReader, BinaryBitmap, RGBLuminanceSource, HybridBinarizer, NotFoundException } from '@zxing/library'

self.addEventListener('message', function (event) {
  const imageData = event.data

  // QRCode decore
  const result = jsQR(
    imageData.data,
    imageData.width,
    imageData.height
  )

  let content = null
  let location = null

  if (result !== null) {
    content = result.data
    location = result.location
  }


  // Datamatrix decode
  if (result === null) {
    const luminanceSource = new RGBLuminanceSource(
      toGrayscaleBuffer(imageData.data, imageData.width, imageData.height), //imageData.data,
      imageData.width,
      imageData.height
    )

    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource))

    try {
      const datamatrixResult = new DataMatrixReader().decode(binaryBitmap)

      if (datamatrixResult !== null) {
        content = datamatrixResult.text
        location = null
      }
    } catch (re) {
      // if (re instanceof NotFoundException) {
      //   console.log('Datamatrix not found')
      // } else {
      //   console.log('Other exception: ', re.constructor.name)
      // }
    }
  }

  const message = { content, location, imageData }
  self.postMessage(message, [imageData.data.buffer])
})


function toGrayscaleBuffer(imageBuffer, width, height) {
  const grayscaleBuffer = new Uint8ClampedArray(width * height);
  for (let i = 0, j = 0, length = imageBuffer.length; i < length; i += 4, j++) {
    let gray;
    const alpha = imageBuffer[i + 3];
    // The color of fully-transparent pixels is irrelevant. They are often, technically, fully-transparent
    // black (0 alpha, and then 0 RGB). They are often used, of course as the "white" area in a
    // barcode image. Force any such pixel to be white:
    if (alpha === 0) {
      gray = 0xFF;
    } else {
      const pixelR = imageBuffer[i];
      const pixelG = imageBuffer[i + 1];
      const pixelB = imageBuffer[i + 2];
      // .299R + 0.587G + 0.114B (YUV/YIQ for PAL and NTSC),
      // (306*R) >> 10 is approximately equal to R*0.299, and so on.
      // 0x200 >> 10 is 0.5, it implements rounding.
      gray = (306 * pixelR +
        601 * pixelG +
        117 * pixelB +
        0x200) >> 10;
    }
    grayscaleBuffer[j] = gray;
  }
  return grayscaleBuffer;
}
