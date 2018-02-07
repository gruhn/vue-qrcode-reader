import 'webrtc-adapter'
import noop from 'lodash/noop'
import { normalizeConstraints, normalizeLocation } from './helpers.js'
import { Module } from 'quirc-js'

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
    pointer: Module._xsetup(streamWidth, streamHeight),
    scanning: false,
  }

  Module.onDecoded((i, version, eccLevel, mask, dataType, payload, payloadLen, x0, y0, x1, y1, x2, y2, x3, y3) => {
    const buffer = new Uint8Array(Module.HEAPU8.buffer, payload, payloadLen)
    const content = String.fromCharCode.apply(null, buffer)

    const location = normalizeLocation(state.videoEl, [
      { x: x0, y: y0 },
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
    ])

    updateDecodeResult(content)
    updateLocateResult(location)
  })

  Module.onCounted(count => {
    if (count === 0) {
      updateDecodeResult(null)
      updateLocateResult(NO_LOCATION)
    }
  })
}

function reset () {
  if (state !== null) {
    state.stream.getTracks().forEach(
      track => track.stop()
    )

    state = null

    Module._free()
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
  const { data } = captureFrame()

  // fill image buffer greyscaled
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    Module.HEAPU8[state.pointer + j] = 0.2989 * data[i + 0] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2]
  }

  Module._xprocess()
}

function keepScanning () {
  if (state !== null && state.scanning) {
    scanFrame()

    window.requestAnimationFrame(() => {
      keepScanning()
    })
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
