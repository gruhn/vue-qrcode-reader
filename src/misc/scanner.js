import { DropImageFetchError, DropImageDecodeError } from "./errors.js";
import { eventOn } from "callforth";

const adaptOldFormat = detectedCodes => {
  if (detectedCodes.length > 0) {
    const [ firstCode ] = detectedCodes;

    const [
      topLeftCorner,
      topRightCorner,
      bottomRightCorner,
      bottomLeftCorner
    ] = firstCode.cornerPoints

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
export const keepScanning = (videoElement, options) => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });

  const { detectHandler, locateHandler, minDelay } = options;

  const processFrame = state => async timeNow => {
    if (videoElement.readyState > 1) {
      const { lastScanned, contentBefore, locationBefore } = state

      if (timeNow - lastScanned >= minDelay) {
        const detectedCodes = await barcodeDetector.detect(videoElement);
        const { content, location, imageData } = adaptOldFormat(detectedCodes)

        if (content !== null && content !== contentBefore) {
          detectHandler({ content, location, imageData });
        }

        if (location !== locationBefore) {
          locateHandler(location);
        }

        window.requestAnimationFrame(processFrame({
          lastScanned: timeNow,
          contentBefore: content ?? contentBefore,
          locationBefore: location
        }))
      } else {
        window.requestAnimationFrame(processFrame(state))
      }
    }
  };

  processFrame({
    contentBefore: null,
    locationBefore: null,
    lastScanned: performance.now()
  })();
};

const imageElementFromUrl = async url => {
  if (url.startsWith("http") && url.includes(location.host) === false) {
    throw new DropImageFetchError();
  }

  const image = document.createElement("img");
  image.src = url;

  await eventOn(image, "load");

  return image;
}

const imageElementFromFile = async file => {
  if (/image.*/.test(file.type)) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    const result = await eventOn(reader, "load");
    const dataURL = result.target.result;

    return imageElementFromUrl(dataURL);
  } else {
    throw new DropImageDecodeError();
  }
}

export const processFile = async file => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] })
  const image = await imageElementFromFile(file);
  const detectedCodes = await barcodeDetector.detect(image)

  return adaptOldFormat(detectedCodes)
}

export const processUrl = async url => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] })
  const image = await imageElementFromUrl(url);
  const detectedCodes = await barcodeDetector.detect(image)

  return adaptOldFormat(detectedCodes)
}
