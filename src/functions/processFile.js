import { scan } from "../misc/scanner.js";
import { imageDataFromFile } from "../misc/image-data.js";
import Worker from "../worker/jsqr.js";

export default async function processFile(file) {
  const imageData = await imageDataFromFile(file);
  const scanResult = await scan(Worker, imageData);

  return scanResult;
}
