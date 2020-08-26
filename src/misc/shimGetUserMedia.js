import { shimGetUserMedia as shimGetUserMediaChrome } from 'webrtc-adapter/src/js/chrome/getusermedia';
import { shimGetUserMedia as shimGetUserMediaEdge } from 'webrtc-adapter/src/js/edge/getusermedia';
import { shimGetUserMedia as shimGetUserMediaFirefox } from 'webrtc-adapter/src/js/firefox/getusermedia';
import { shimGetUserMedia as shimGetUserMediaSafari } from 'webrtc-adapter/src/js/safari/safari_shim';
import { detectBrowser } from 'webrtc-adapter/src/js/utils';

import { StreamApiNotSupportedError } from './errors';
import { indempotent } from './util';

export default indempotent(() => {
  const { browser } = detectBrowser(window);

  switch (browser) {
    case 'chrome':
      shimGetUserMediaChrome(window);
      break;
    case 'firefox':
      shimGetUserMediaFirefox(window);
      break;
    case 'edge':
      shimGetUserMediaEdge(window);
      break;
    case 'safari':
      shimGetUserMediaSafari(window);
      break;
    default:
      throw new StreamApiNotSupportedError()
  }
})
