import { DropImageFetchError, DropImageDecodeError } from "./errors.js";
import { eventOn } from "callforth";

const canvas = document.createElement("canvas");
const canvasCtx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

function imageDataFromCanvas(canvasImageSource, width, height) {
  const scalingRatio = Math.min(
    1,
    canvas.width / width,
    canvas.height / height
  );
  const widthScaled = scalingRatio * width;
  const heightScaled = scalingRatio * height;

  canvasCtx.drawImage(canvasImageSource, 0, 0, widthScaled, heightScaled);

  return canvasCtx.getImageData(0, 0, widthScaled, heightScaled);
}

export function imageDataFromImage(imageElement) {
  const width = imageElement.naturalWidth;
  const height = imageElement.naturalHeight;

  return imageDataFromCanvas(imageElement, width, height);
}

export function imageDataFromVideo(videoElement) {
  const width = videoElement.videoWidth;
  const height = videoElement.videoHeight;

  return imageDataFromCanvas(videoElement, width, height);
}

export async function imageDataFromUrl(url) {
  if (url.startsWith("http") && url.includes(location.host) === false) {
    throw new DropImageFetchError();
  }

  const image = document.createElement("img");
  image.src = url;

  await eventOn(image, "load");

  return imageDataFromImage(image);
}

export async function imageDataFromFile(file) {
  if (/image.*/.test(file.type)) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    const result = await eventOn(reader, "load");
    const dataURL = result.target.result;

    return imageDataFromUrl(dataURL);
  } else {
    throw new DropImageDecodeError();
  }
}
