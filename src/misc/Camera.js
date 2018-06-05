
class Camera {

  constructor (videoEl, stream) {
    const canvas = document.createElement('canvas')
    canvas.width = videoEl.videoWidth
    canvas.height = videoEl.videoHeight

    this.canvasCtx = canvas.getContext('2d')
    this.videoEl = videoEl
    this.stream = stream
  }

  get resolutionWidth () {
    return this.videoEl.videoWidth
  }

  get resolutionHeight () {
    return this.videoEl.videoHeight
  }

  get displayWidth () {
    return this.videoEl.offsetWidth
  }

  get displayHeight () {
    return this.videoEl.offsetHeight
  }

  stop () {
    this.stream.getTracks().forEach(
      track => track.stop()
    )
  }

  captureFrame () {
    this.canvasCtx.drawImage(
      this.videoEl, 0, 0,
      this.resolutionWidth,
      this.resolutionHeight
    )

    return this.canvasCtx.getImageData(
      0, 0, this.resolutionWidth, this.resolutionHeight
    )
  }

}

export default async function (constraints, videoEl) {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    throw new Error('WebRTC API not supported in this browser')
  }

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

  return new Camera(videoEl, stream)
}
