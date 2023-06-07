import { type DetectedBarcode } from '@undecaf/barcode-detector-polyfill'
import type { Ref } from 'vue'

import { eventOn } from './callforth'
import { DropImageFetchError } from './errors'
import type { Point } from '../types/types'

export const adaptOldFormat = (detectedCodes: DetectedBarcode[]) => {
  if (detectedCodes.length > 0) {
    const [firstCode] = detectedCodes

    const [topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner] =
      firstCode.cornerPoints

    return {
      content: firstCode.rawValue,
      location: {
        topLeftCorner,
        topRightCorner,
        bottomRightCorner,
        bottomLeftCorner,

        // not supported by native API:
        topLeftFinderPattern: {},
        topRightFinderPattern: {},
        bottomLeftFinderPattern: {}
      },
      imageData: null
    }
  } else {
    return {
      content: null,
      location: null,
      imageData: null
    }
  }
}

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export const keepScanning = async (
  videoElement: Ref<HTMLVideoElement | undefined>,
  {
    detectHandler,
    locateHandler,
    minDelay
  }: { detectHandler: any; locateHandler: any; minDelay: any }
) => {
  // @ts-ignore https://github.com/gruhn/barcode-detector/pull/7
  const barcodeDetector = new (await import('barcode-detector')).default({ formats: ['qr_code'] })

  const processFrame =
    (state: {
      lastScanned: number
      contentBefore: string | null
      locationBefore: {
        topLeftCorner: Point
        topRightCorner: Point
        bottomRightCorner: Point
        bottomLeftCorner: Point
        topLeftFinderPattern: {}
        topRightFinderPattern: {}
        bottomLeftFinderPattern: {}
      } | null
    }) =>
    async (timeNow: number) => {
      if (videoElement?.value && videoElement?.value.readyState > 1) {
        const { lastScanned, contentBefore, locationBefore } = state

        if (timeNow - lastScanned >= minDelay) {
          const detectedCodes = await barcodeDetector.detect(videoElement.value)
          const { content, location, imageData } = adaptOldFormat(detectedCodes)

          if (content !== null && content !== contentBefore) {
            detectHandler({ content, location, imageData })
          }

          if (location !== null || locationBefore !== null) {
            locateHandler(detectedCodes)
          }

          window.requestAnimationFrame(
            processFrame({
              lastScanned: timeNow,
              contentBefore: content ?? contentBefore,
              locationBefore: location
            })
          )
        } else {
          window.requestAnimationFrame(processFrame(state))
        }
      }
    }

  processFrame({
    contentBefore: null,
    locationBefore: null,
    lastScanned: performance.now()
  })(performance.now())
}

const imageElementFromUrl = async (url: string) => {
  if (url.startsWith('http') && url.includes(location.host) === false) {
    throw new DropImageFetchError()
  }

  const image = document.createElement('img')
  image.src = url

  await eventOn(image, 'load')

  return image
}

export const processFile = async (file: File) => {
  // @ts-ignore https://github.com/gruhn/barcode-detector/pull/7
  const barcodeDetector = new (await import('barcode-detector')).default({
    formats: ['qr_code']
  })
  const detectedCodes = await barcodeDetector.detect(file)

  return adaptOldFormat(detectedCodes)
}

export const processUrl = async (url: string) => {
  // @ts-ignore https://github.com/gruhn/barcode-detector/pull/7
  const barcodeDetector = new (await import('barcode-detector')).default({
    formats: ['qr_code']
  })
  const image = await imageElementFromUrl(url)
  const detectedCodes = await barcodeDetector.detect(image)

  return adaptOldFormat(detectedCodes)
}
