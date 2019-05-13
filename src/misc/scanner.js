import { eventOn } from "callforth";

export async function scan(Worker, imageData) {
  const worker = new Worker();

  worker.postMessage(imageData, [imageData.data.buffer]);

  const event = await eventOn(worker, "message");

  worker.terminate();

  return event.data;
}

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export function keepScanning(Worker, camera, options) {
  const { detectHandler, locateHandler, minDelay } = options;

  let contentBefore = null;
  let locationBefore = null;
  let lastScanned = performance.now();

  const worker = new Worker();

  // If worker can't process frames fast enough, memory will quickly full up.
  // Make sure to process only one frame at a time.
  let workerBusy = false;
  let shouldContinue = true;

  worker.onmessage = event => {
    workerBusy = false;

    const { content, location } = event.data;

    if (content !== null && content !== contentBefore) {
      detectHandler(event.data);
    }

    if (location !== locationBefore) {
      locateHandler(location);
    }

    contentBefore = content || contentBefore;
    locationBefore = location;
  };

  const processFrame = timeNow => {
    if (shouldContinue) {
      window.requestAnimationFrame(processFrame);

      if (timeNow - lastScanned >= minDelay) {
        lastScanned = timeNow;

        if (workerBusy === false) {
          workerBusy = true;

          const imageData = camera.captureFrame();

          worker.postMessage(imageData, [imageData.data.buffer]);
        }
      }
    } else {
      worker.terminate();
    }
  };

  processFrame();

  return () => {
    shouldContinue = false;
  };
}
