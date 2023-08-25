import { StreamApiNotSupportedError, InsecureContextError, StreamLoadTimeoutError } from './errors'
import { eventOn, timeout } from './callforth'
import shimGetUserMedia from './shimGetUserMedia'

type Camera = {
  isActive: true
  videoEl: HTMLVideoElement
  stream: MediaStream
} | { 
  isActive: false 
}

let cameraState : Camera = { isActive: false }

export function stop() {
  if (cameraState.isActive) {
    cameraState.videoEl.src = ""
    cameraState.videoEl.srcObject = null
    cameraState.videoEl.load()

    for (const track of cameraState.stream.getTracks()) {
      cameraState.stream.removeTrack(track)
      track.stop()
    }

    cameraState = { isActive: false }
  }
}

export function getCapabilities() : MediaTrackCapabilities {
  if (cameraState.isActive) {
    const [track] = cameraState.stream.getVideoTracks()
    // Firefox does not yet support getCapabilities as of August 2020
    return track?.getCapabilities?.() ?? {}
  } else {
    return {}
  }
}

export async function start(
  videoEl: HTMLVideoElement, { constraints, torch }: { 
    constraints: MediaTrackConstraints
    torch: boolean
  }
) : Promise<MediaTrackCapabilities> {
  // At least in Chrome `navigator.mediaDevices` is undefined when the page is
  // loaded using HTTP rather than HTTPS. Thus `STREAM_API_NOT_SUPPORTED` is
  // initialized with `false` although the API might actually be supported.
  // So although `getUserMedia` already should have a built-in mechanism to
  // detect insecure context (by throwing `NotAllowedError`), we have to do a
  // manual check before even calling `getUserMedia`.
  if (window.isSecureContext !== true) {
    throw new InsecureContextError()
  }

  if (navigator?.mediaDevices?.getUserMedia === undefined) {
    throw new StreamApiNotSupportedError()
  }

  // This is a browser API only shim. It patches the global window object which
  // is not available during SSR. So we lazily apply this shim at runtime.
  shimGetUserMedia()

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: constraints
  })

  if (videoEl.srcObject !== undefined) {
    videoEl.srcObject = stream
    // @ts-ignore
  } else if (videoEl.mozSrcObject !== undefined) {
    // @ts-ignore
    videoEl.mozSrcObject = stream
  } else if (window.URL.createObjectURL) {
    // @ts-ignore
    videoEl.src = window.URL.createObjectURL(stream)
  } else if (window.webkitURL) {
    // @ts-ignore
    videoEl.src = window.webkitURL.createObjectURL(stream)
  } else {
    videoEl.src = stream.id
  }

  await Promise.race([
    eventOn(videoEl, 'loadeddata'),

    // On iOS devices in PWA mode, QrcodeStream works initially, but after
    // killing and restarting the PWA, all video elements fail to load camera 
    // streams and never emit the `loadeddata` event. Looks like this is 
    // related to a WebKit issue (see #298). No workarounds at the moment. 
    // To at least detect this situation, we throw an error if the event
    // has not been emitted after a 3 second timeout.
    timeout(3000).then(() => { throw new StreamLoadTimeoutError() })
  ])

  // According to: https://oberhofer.co/mediastreamtrack-and-its-capabilities/#queryingcapabilities
  // On some devices, getCapabilities only returns a non-empty object after
  // some delay. There is no appropriate event so we have to add a constant timeout
  await timeout(500)

  if (torch) {
    const [track] = stream.getVideoTracks()
    const capabilities = track.getCapabilities()

    // @ts-ignore
    if (capabilities.torch) {
      // @ts-ignore
      track.applyConstraints({ advanced: [{ torch: true }] })
    } else {
      console.warn('device does not support torch capability')
    }
  }

  cameraState = { videoEl, stream, isActive: true }

  // Firefox does not yet support getCapabilities as of August 2020
  const [track] = cameraState.stream.getVideoTracks()
  return track?.getCapabilities?.() ?? {}
}
