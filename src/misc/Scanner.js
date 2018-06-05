import jsQR from 'jsqr'

export function scan (imageData) {
  const { data, width, height } = imageData
  const result = jsQR(data, width, height)

  let content, location

  if (result === null) {
    content = null
    location = null
  } else {
    content = result.data
    location = result.location
  }

  return { content, location }
}

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export function keepScanning (camera, options) {
  const {
    decodeHandler,
    locateHandler,
    shouldContinue,
    scanInterval = 16, // milliseconds
  } = options

  const recur = (contentBefore, locationBefore) => {
    return () => {
      const imageData = camera.captureFrame()
      const { content, location } = scan(imageData)

      if (content !== null && content !== contentBefore) {
        decodeHandler(content)
      }

      if (location !== locationBefore) {
        locateHandler(location)
      }

      if (shouldContinue()) {
        window.setTimeout(() => {
          window.requestAnimationFrame(
            recur(content || contentBefore, location)
          )
        }, scanInterval)
      }
    }
  }

  window.requestAnimationFrame(recur(null, null))
}
