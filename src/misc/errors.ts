export class DropImageFetchError extends Error {
  constructor() {
    super("can't process cross-origin image")

    this.name = 'DropImageFetchError'
  }
}

export class StreamApiNotSupportedError extends Error {
  constructor() {
    super('this browser has no Stream API support')

    this.name = 'StreamApiNotSupportedError'
  }
}

export class InsecureContextError extends Error {
  constructor() {
    super(
      'camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    )

    this.name = 'InsecureContextError'
  }
}

export class StreamLoadTimeoutError extends Error {
  constructor() {
    super(
      'Loading camera stream timed out after 6 seconds. If you are on iOS in PWA mode, this is a known issue (see https://github.com/gruhn/vue-qrcode-reader/issues/298)'
    )

    this.name = 'StreamLoadTimeoutError'
  }
}
