import jsQR from 'jsqr'

export function scan (imageData) {
  let location = null
  let content = null

  const binaryImage = jsQR.binarizeImage(
    imageData.data,
    imageData.width,
    imageData.height
  )

  location = jsQR.locateQRInBinaryImage(binaryImage)

  if (location !== null) {
    const qrcode = jsQR.extractQRFromBinaryImage(binaryImage, location)

    content = jsQR.decodeQR(qrcode)
  }

  return { location, content }
}
