import 'webrtc-adapter'
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

  return { content, location, imageData }
}

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export function keepScanning (camera, options) {
  const {
    locateHandler,
    detectHandler,
    shouldContinue,
    minDelay,
  } = options

  let contentBefore = null
  let locationBefore = null
  let lastScanned = performance.now()

  const processFrame = timeNow => {
    if (shouldContinue()) {
      window.requestAnimationFrame(processFrame)

      if (timeNow - lastScanned >= minDelay) {
        lastScanned = timeNow

        const imageData = camera.captureFrame()
        const { content, location } = scan(imageData)

        if (content !== contentBefore && content !== null) {
          detectHandler({ content, location, imageData })
        }

        if (location !== locationBefore) {
          locateHandler(location)
        }

        contentBefore = content || contentBefore
        locationBefore = location
      }
    }
  }

  processFrame()
}
