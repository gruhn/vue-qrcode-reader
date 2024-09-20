import { type DetectedBarcode, type BarcodeFormat, BarcodeDetector, type BarcodeDetectorOptions } from 'barcode-detector/pure'
import { eventOn } from './callforth'
import { DropImageFetchError } from './errors'

declare global {
  interface Window { 
    BarcodeDetector?: typeof BarcodeDetector
  }
}

/**
 * Singleton `BarcodeDetector` instance used by `QrcodeStream`. This is firtly to avoid
 * the overhead of creating a new instances for scanning each frame. And secondly, the 
 * instances can seamlessly be replaced in the middle of the scanning process, if the 
 * `formats` prop of `QrcodeStream` is changed.
 *
 * This instance is not used by `QrcodeCapture` and `QrcodeDropZone`, because it may not
 * have the right `formats` configured. For these components we create one-off `BarcodeDetector` 
 * instances because it does not happen so frequently anyway (see: `processFile`/`processUrl`).
 */
let barcodeDetector: BarcodeDetector

/**
 * Constructs a `BarcodeDetector` instance, given a list of targeted barcode formats.
 * Preferably, we want to use the native `BarcodeDetector` implementation if supported. 
 * Otherwise, we fall back to the polyfill implementation.
 *
 * Note, that we can't just monkey patch the polyfill on load, i.e. 
 *
 *     window.BarcodeDetector ??= BarcodeDetector 
 *
 * for two reasons. Firstly, this is not SSR compatible, because `window` is not available 
 * during SSR. Secondly, even if the native implementation is availabe, we still might 
 * want to use the polyfill. For example, if the native implementation only supports the 
 * format `"qr_code"` but the user wants to scan `["qr_code", "aztec"]` (see #450).
 */
async function createBarcodeDetector(formats: BarcodeFormat[]): Promise<BarcodeDetector> {
  if (window.BarcodeDetector === undefined) {
    console.debug('[vue-qrcode-reader] Native BarcodeDetector not supported. Will use polyfill.')
    return new BarcodeDetector({ formats })
  }

  const allSupportedFormats = await window.BarcodeDetector.getSupportedFormats()
  const unsupportedFormats = formats.filter(format => !allSupportedFormats.includes(format))

  if (unsupportedFormats.length > 0) {
    console.debug(`[vue-qrcode-reader] Native BarcodeDetector does not support formats ${JSON.stringify(unsupportedFormats)}. Will use polyfill.`)
    return new BarcodeDetector({ formats })
  }

  console.debug('[vue-qrcode-reader] Will use native BarcodeDetector.')
  return new window.BarcodeDetector({ formats })
}

/**
 * Update the set of targeted barcode formats. In particular, this function
 * can be called during scanning and the camera stream doesn't have to be 
 * interrupted.
 */
export async function setScanningFormats(formats: BarcodeFormat[]) {
  barcodeDetector = await createBarcodeDetector(formats)
}

type ScanHandler = (_: DetectedBarcode[]) => void

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export const keepScanning = async (
  videoElement: HTMLVideoElement,
  {
    detectHandler,
    locateHandler,
    minDelay,
    formats
  }: {
    detectHandler: ScanHandler
    locateHandler: ScanHandler
    minDelay: number
    formats: BarcodeFormat[]
  }
) => {
  console.debug('[vue-qrcode-reader] start scanning')
  await setScanningFormats(formats)

  const processFrame =
    (state: { lastScanned: number; contentBefore: string[]; lastScanHadContent: boolean }) =>
    async (timeNow: number) => {
      if (videoElement.readyState === 0) {
        console.debug('[vue-qrcode-reader] stop scanning: video element readyState is 0')
      } else {
        const { lastScanned, contentBefore, lastScanHadContent } = state

        // Scanning is expensive and we don't need to scan camera frames with
        // the maximum possible frequency. In particular when visual tracking
        // is disabled. So we skip scanning a frame if `minDelay` has not passed
        // yet. Notice that this approach is different from doing a `setTimeout`
        // after each scan. With `setTimeout`, delay and scanning are sequential:
        //
        //    |-- scan --|---- minDelay ----|-- scan --|---- minDelay ----|
        //
        // Instead we do it concurrently:
        //
        //    |---- minDelay ----|---- minDelay ----|---- minDelay ----|
        //    |-- scan --|       |-- scan --|       |-- scan --|
        //
        // Let's say `minDelay` is 40ms, then we scan every 40ms as long as
        // scanning itself does not take more than 40ms. In particular when
        // visual tracking is enabled, that means we can repaint the tracking
        // canvas every 40ms. So we paint
        //
        //     1000ms / 40ms = 25fps (frames per second)
        //
        // 24fps is the minimum frame-rate that is perceived as a continuous
        // animation. We target 25fps just because 24 doesn't divide 1000ms
        // evenly.
        if (timeNow - lastScanned < minDelay) {
          window.requestAnimationFrame(processFrame(state))
        } else {
          const detectedCodes = await barcodeDetector.detect(videoElement)

          // Only emit a detect event, if at least one of the detected codes has
          // not been seen before. Otherwise we spam tons of detect events while
          // a QR code is in view of the camera. To avoid that we store the previous
          // detection in `contentBefore`.
          //
          // Implicitly we also don't emit a `detect` event if `detectedCodes` is an
          // empty array.
          const anyNewCodesDetected = detectedCodes.some((code) => {
            return !contentBefore.includes(code.rawValue)
          })

          if (anyNewCodesDetected) {
            detectHandler(detectedCodes)
          }

          const currentScanHasContent = detectedCodes.length > 0

          // In contrast to the QR code content, the location changes all the time.
          // So we call the locate handler on every detection to repaint the tracking
          // canvas.
          if (currentScanHasContent) {
            locateHandler(detectedCodes)
          }

          // Additionally, we need to clear the tracking canvas once when no QR code
          // is in view of the camera anymore. Technically this can be merged with the
          // previous if-statement but this way it's more explicit.
          if (!currentScanHasContent && lastScanHadContent) {
            locateHandler(detectedCodes)
          }

          const newState = {
            lastScanned: timeNow,
            lastScanHadContent: currentScanHasContent,

            // It can happen that a QR code is constantly in view of the camera but
            // maybe a scanned frame is a bit blurry and we detect nothing but in the
            // next frame we detect the code again. We also want to avoid emitting
            // a `detect` event in such a case. So we don't reset `contentBefore`,
            // if we detect nothing, only if we detect something new.
            contentBefore: anyNewCodesDetected
              ? detectedCodes.map((code) => code.rawValue)
              : contentBefore
          }

          window.requestAnimationFrame(processFrame(newState))
        }
      }
    }

  processFrame({
    lastScanned: performance.now(),
    contentBefore: [],
    lastScanHadContent: false
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

export const processFile = async (
  file: File,
  formats: BarcodeFormat[] = ['qr_code']
): Promise<DetectedBarcode[]> => {
  // To scan files/urls we use one-off `BarcodeDetector` instnaces, 
  // since we don't scan as often as camera frames. Note, that we 
  // always use the polyfill. This is because (at the time of writing)
  // some browser/OS combinations don't support `Blob`/`File` inputs
  // into the `detect` function.
  const barcodeDetector = new BarcodeDetector({ formats })

  return await barcodeDetector.detect(file)
}

export const processUrl = async (
  url: string,
  formats: BarcodeFormat[] = ['qr_code']
): Promise<DetectedBarcode[]> => {
  // To scan files/urls we use one-off `BarcodeDetector` instnaces, 
  // since we don't scan as often as camera frames. Note, that we 
  // always use the polyfill. This is because (at the time of writing)
  // some browser/OS combinations don't support `Blob`/`File` inputs
  // into the `detect` function.
  const barcodeDetector = new BarcodeDetector({ formats })

  const image = await imageElementFromUrl(url)

  return await barcodeDetector.detect(image)
}
