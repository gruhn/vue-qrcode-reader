import 'webrtc-adapter'
import jsQR from 'jsqr'
import noop from 'lodash/noop'
import { normalizeConstraints, normalizeLocation } from './helpers.js'

// use specific array instance to guarantee equality ([] !== [] but NO_LOCATION === NO_LOCATION)
const NO_LOCATION = []
const SCAN_INTERVAL = 10 // milliseconds

const NOT_READY_ERROR = new Error('Scanner is not initialized. Call Scanner.init() and await the returned Promise.')
const WEBRTC_SUPPORT_ERROR = new Error('WebRTC API is required but not supported in this browser.')

let state = null
let listeners = {
  decode: noop,
  locate: noop,
}

/**
 * Requests a camera stream using the Stream API and based on
 * `cameraConstraints`. Then connects the stream to the passed video element and
 * waits for it to load. The promise returned here is the payload for the
 * `init` event. Any error here leads to this promises rejection.
 */
async function init (videoEl, cameraConstraints) {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    throw WEBRTC_SUPPORT_ERROR
  }

  if (state !== null) {
    reset()
  }

  const constraints = normalizeConstraints(cameraConstraints)

  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  const streamLoadedPromise = new Promise((resolve, reject) => {
    videoEl.addEventListener('loadeddata', resolve, { once: true })
    videoEl.addEventListener('error', reject, { once: true })
  })

  if (videoEl.srcObject !== undefined) {
    videoEl.srcObject = stream
  } else if (videoEl.mozSrcObject !== undefined) {
    videoEl.mozSrcObject = stream
  } else if (window.URL.createObjectURL) {
    videoEl.src = window.URL.createObjectURL(stream)
  } else if (window.webkitURL) {
    videoEl.src = window.webkitURL.createObjectURL(stream)
  } else {
    videoEl.src = stream
  }

  videoEl.playsInline = true
  videoEl.play() // firefox does not emit `loadeddata` if video not playing

  await streamLoadedPromise

  const streamWidth = videoEl.videoWidth
  const streamHeight = videoEl.videoHeight
  const canvasEl = document.createElement('canvas')
  canvasEl.width = streamWidth
  canvasEl.height = streamHeight

  state = {
    stream,
    videoEl,
    canvasCtx: canvasEl.getContext('2d'),
    canvasBounds: [0, 0, streamWidth, streamHeight],
    lastDecodeResult: null,
    lastLocateResutl: NO_LOCATION,
    scanning: false,
  }
}

function reset () {
  if (state !== null) {
    state.stream.getTracks().forEach(
      track => track.stop()
    )

    state = null
  } else {
    throw NOT_READY_ERROR
  }
}

async function start () {
  if (state !== null) {
    state.scanning = true
    state.videoEl.play()

    await new Promise(resolve => {
      state.videoEl.addEventListener('timeupdate', resolve, { once: true })
    })

    window.requestAnimationFrame(() => keepScanning())
  } else {
    throw NOT_READY_ERROR
  }
}

function stop () {
  if (state !== null) {
    state.scanning = false
    state.videoEl.pause()
  } else {
    throw NOT_READY_ERROR
  }
}

function clearCache () {
  if (state !== null) {
    state.lastDecodeResult = null
    state.lastLocateResutl = NO_LOCATION
  } else {
    throw NOT_READY_ERROR
  }
}

function onDecode (handler = noop) {
  listeners.decode = handler
}

function onLocate (handler = noop) {
  listeners.locate = handler
}

// export everthing that belongs to public API
export default {
  get NO_LOCATION () {
    return NO_LOCATION
  },

  get ready () {
    return state !== null
  },

  get scanning () {
    return state !== null && state.scanning
  },

  init,
  reset,
  start,
  stop,
  clearCache,
  onDecode,
  onLocate,
}

/**
 * Captures a frame from camera stream and draws it to canvas. Then reads
 * image data from canvas and returns it for further analysis. This extra
 * step is necessary because it's not possible to read image data from a
 * video element directly.
 */
function captureFrame () {
  state.canvasCtx.drawImage(state.videoEl, ...state.canvasBounds)

  return state.canvasCtx.getImageData(...state.canvasBounds)
}

function scanFrame () {
  const result = {
    locateResult: NO_LOCATION,
    decodeResult: null,
  }

  const imageData = captureFrame()

  const binaryImage = jsQR.binarizeImage(
    imageData.data,
    imageData.width,
    imageData.height
  )

  const locationRaw = jsQR.locateQRInBinaryImage(binaryImage)

  if (locationRaw !== null) {
    const videoDimensions = [
      state.videoEl.videoWidth,
      state.videoEl.videoHeight,
      state.videoEl.offsetWidth,
      state.videoEl.offsetHeight,
    ]

    result.locateResult = normalizeLocation([
      locationRaw.bottomLeft,
      locationRaw.topLeft,
      locationRaw.topRight,
    ], ...videoDimensions)

    const qrcode = jsQR.extractQRFromBinaryImage(binaryImage, locationRaw)

    result.decodeResult = jsQR.decodeQR(qrcode)
  }

  return result
}

function keepScanning () {
  if (state !== null && state.scanning) {
    let { locateResult, decodeResult } = scanFrame()

    updateDecodeResult(decodeResult)
    updateLocateResult(locateResult)

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        keepScanning()
      })
    }, SCAN_INTERVAL)
  }
}

function updateDecodeResult (newVal) {
  newVal = newVal || state.lastDecodeResult

  if (state.lastDecodeResult !== newVal) {
    state.lastDecodeResult = newVal

    if (state.lastDecodeResult !== null) {
      listeners.decode(state.lastDecodeResult)
    }
  }
}

function updateLocateResult (newVal) {
  if (state.lastLocateResult !== newVal) {
    state.lastLocateResult = newVal
    listeners.locate(state.lastLocateResult)
  }
}
