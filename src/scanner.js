import jsQR from 'jsqr'

export function scan (imageData, locateOnly) {
  let location = null
  let content = null

  const binaryImage = jsQR.binarizeImage(
    imageData.data,
    imageData.width,
    imageData.height
  )

  location = jsQR.locateQRInBinaryImage(binaryImage)

  if (location !== null && !locateOnly) {
    const qrcode = jsQR.extractQRFromBinaryImage(binaryImage, location)

    content = jsQR.decodeQR(qrcode)
  }

  return { location, content }
}

export function decode (imageData) {
  return scan(imageData, false).content
}

export function locate (imageData) {
  return scan(imageData, true).location
}
