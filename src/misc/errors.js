export class DropImageFetchError extends Error {
  constructor() {
    super("can't process cross-origin image");

    this.name = "DropImageFetchError";
  }
}

export class DropImageDecodeError extends Error {
  constructor() {
    super("drag-and-dropped file is not of type image and can't be decoded");

    this.name = "DropImageDecodeError";
  }
}

export class StreamApiNotSupportedError extends Error {
  constructor() {
    super("this browser has no Stream API support");

    this.name = "StreamApiNotSupportedError";
  }
}

export class InsecureContextError extends Error {
  constructor() {
    super(
      "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."
    );

    this.name = "InsecureContextError";
  }
}
