import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'

/**
 * Returns full constraints object which is later passed to `getUserMedia` to
 * request a camera stream. Properties define if a certain camera is
 * adequate or not.
 */
export function normalizeConstraints (cameraConstraints) {
  let withDefaults

  if (isBoolean(cameraConstraints)) {
    withDefaults = cameraConstraints
  } else if (isObject(cameraConstraints)) {
    withDefaults = {
      facingMode: { ideal: 'environment' },
      width: { min: 360, ideal: 1280, max: 1920 },
      height: { min: 240, ideal: 720, max: 1080 },
      ...cameraConstraints,
    }
  }

  return {
    audio: false,
    video: withDefaults,
  }
}

/**
 * Coordinates in `points` are based on the camera resolution but the
 * video element is responsive and scales with space available. Therefore
 * the coordinates are re-calculated to be relative to the video element.
 */
export function normalizeLocation (points, absWidth, absHeight, viewWidth, viewHeight) {
  const widthRatio = viewWidth / absWidth
  const heightRatio = viewHeight / absHeight

  return points.map(({ x, y }) => ({
    x: x * widthRatio | 0,
    y: y * heightRatio | 0,
  }))
}
