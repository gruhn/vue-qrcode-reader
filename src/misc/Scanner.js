import jsQR from 'jsqr'

export function scan (imageData) {
  const { data, width, height } = imageData
  const result = jsQR(data, width, height)

  return result
}
