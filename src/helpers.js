import jsQR from 'jsqr'

export async function streamTo (video, constraints) {
  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  const streamLoadedPromise = new Promise((resolve, reject) => {
    video.addEventListener('loadeddata', resolve, { once: true })
    video.addEventListener('error', reject, { once: true })
  })

  if (video.srcObject !== undefined) {
    video.srcObject = stream
  } else if (video.mozSrcObject !== undefined) {
    video.mozSrcObject = stream
  } else if (window.URL.createObjectURL) {
    video.src = window.URL.createObjectURL(stream)
  } else if (window.webkitURL) {
    video.src = window.webkitURL.createObjectURL(stream)
  } else {
    video.src = stream
  }

  video.play() // firefox does not emit `loadeddata` if video not playing

  await streamLoadedPromise

  return stream
}

/**
 * Captures a frame from video stream and draws it to canvas. Then reads
 * image data from canvas and returns it for further analysis. This extra
 * step is necessary because it's not possible to read image data from a
 * video element directly.
 */
export function imageDataFromVideo (video) {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  const bounds = [0, 0, video.videoWidth, video.videoHeight]

  ctx.drawImage(video, ...bounds)

  return ctx.getImageData(...bounds)
}

export function scanImageData (imageData) {
  const { data, width, height } = imageData

  const result = jsQR(data, width, height)

  if (result === null) {
    return {
      data: null,
      location: null,
    }
  } else {
    return result
  }
}
