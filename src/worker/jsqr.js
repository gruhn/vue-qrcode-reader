const inlineWorker = func => {
  const functionBody = func
    .toString()
    .trim()
    .match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];

  return new Worker(
    URL.createObjectURL(new Blob([functionBody], { type: "text/javascript" }))
  );
};

export default () => {
  /* eslint-disable no-undef */
  return inlineWorker(function() {
    self.importScripts(
      "https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js"
    );

    self.addEventListener("message", function(event) {
      const imageData = event.data;
      const result = jsQR(imageData.data, imageData.width, imageData.height);

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
  /* eslint-enable */
};
