// @ts-ignore
import { shimGetUserMedia as chromeShim } from 'webrtc-adapter/src/js/chrome/getusermedia'
// @ts-ignore
import { shimGetUserMedia as firefoxShim } from 'webrtc-adapter/src/js/firefox/getusermedia'
// @ts-ignore
import { shimGetUserMedia as safariShim } from 'webrtc-adapter/src/js/safari/safari_shim'
// @ts-ignore
import { detectBrowser } from 'webrtc-adapter/src/js/utils'

import { StreamApiNotSupportedError } from './errors'
import { indempotent } from './util'

export default indempotent(() => {
  const result = detectBrowser(window)

  switch (result.browser) {
    case 'chrome':
      chromeShim(window, result)
      break
    case 'firefox':
      firefoxShim(window, result)
      break
    case 'safari':
      safariShim(window, result)
      break
    default:
      throw new StreamApiNotSupportedError()
  }
})
