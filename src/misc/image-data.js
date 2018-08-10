import { DropImageFetchError, DropImageDecodeError } from './errors.js'

const canvas = document.createElement('canvas')
const canvasCtx = canvas.getContext('2d')

export function imageDataFromImage (imageElement) {
  canvas.width = imageElement.naturalWidth
  canvas.height = imageElement.naturalHeight

  const bounds = [0, 0, canvas.width, canvas.height]

  canvasCtx.drawImage(imageElement, ...bounds)

  return canvasCtx.getImageData(...bounds)
}

export function imageDataFromVideo (videoElement) {
  canvas.width = videoElement.videoWidth
  canvas.height = videoElement.videoHeight

  const bounds = [0, 0, canvas.width, canvas.height]

  canvasCtx.drawImage(videoElement, ...bounds)

  return canvasCtx.getImageData(...bounds)
}

export async function imageDataFromUrl (url) {
  if (url.startsWith('http') && url.includes(location.host) === false) {
    throw new DropImageFetchError()
  }

  const image = document.createElement('img')

  const imageLoadedPromise = new Promise((resolve, reject) => {
    image.onload = resolve
  })

  image.src = url

  await imageLoadedPromise

  return imageDataFromImage(image)
}

export async function imageDataFromFile (file) {
  if (/image.*/.test(file.type)) {
    const reader = new FileReader()

    const readerLoadedPromise = new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
    })

    reader.readAsDataURL(file)

    const dataURL = await readerLoadedPromise

    return imageDataFromUrl(dataURL)
  } else {
    throw new DropImageDecodeError()
  }
}
