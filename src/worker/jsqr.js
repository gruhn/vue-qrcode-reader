const inlineWorker = func => {
  const functionBody = func
    .toString()
    .trim()
    .match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];

  return new Worker(
    URL.createObjectURL(new Blob([functionBody], { type: "text/javascript" }))
  );
};

const jsqrWorker = () => {
  return inlineWorker(function(self) {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js"
    );

    self.addEventListener("message", function(event) {
      const imageData = event.data;
      let result = null;
      try {
        result = self.jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });
      } catch (error) {
        if (!(error instanceof RangeError)) {
          throw error;
        }
      }

      let content = null;
      let location = null;

      if (result !== null) {
        content = result.data;
        location = result.location;
      }

      const message = { content, location, imageData };
      self.postMessage(message, [imageData.data.buffer]);
    });
  });
};

const nativeWorker = () => {
  const workerCode = `
    const detector = new BarcodeDetector({ formats: ["qr_code"] });

    const detect = async imageData => {
      try {
        const [ result ] = await detector.detect(imageData);

        if (result === undefined) {
          return { content: null, location: null };
        } else {
          const [
            topLeftCorner,
            topRightCorner,
            bottomRightCorner,
            bottomLeftCorner
          ] = result.cornerPoints;

          return {
            content: result.rawValue,
            location: {
              topLeftCorner,
              topRightCorner,
              bottomRightCorner,
              bottomLeftCorner,

              // not supported by native API
              topRightFinderPattern: {},
              topLeftFinderPattern: {},
              bottomLeftFinderPattern: {}
            }
          };
        }
      } catch (error) {
        console.error("Boo, BarcodeDetection failed: " + error);
      }
    };

    self.addEventListener("message", async event => {
      const imageData = event.data;

      const { content, location } = await detect(imageData);

      self.postMessage({ content, location, imageData }, [imageData.data.buffer]);
    });
  `;

  return new Worker(
    URL.createObjectURL(new Blob([workerCode], { type: "text/javascript" }))
  );
};

export default "BarcodeDetector" in window ? nativeWorker : jsqrWorker;
