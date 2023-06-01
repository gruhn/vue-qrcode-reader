import adapter from 'webrtc-adapter'

import { StreamApiNotSupportedError } from './errors'
import { indempotent } from './util'

export default indempotent(() => {
  const browser = adapter.browserDetails.browser

  switch (browser) {
    case 'chrome':
    case 'firefox':
    case 'safari':
      break
    default:
      throw new StreamApiNotSupportedError()
  }
})
