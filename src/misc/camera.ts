import { StreamApiNotSupportedError, InsecureContextError } from './errors'
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
    cameraState.videoEl.srcObject = null

    for (const track of cameraState.stream.getTracks()) {
      cameraState.stream.removeTrack(track)
      track.stop()
    }

    cameraState = { isActive: false }
  }
}

// Modern phones often have multipe front/rear cameras.
// Sometimes special purpose cameras like the wide-angle camera are picked
// by default. Those are not optimal for scanning QR codes but standard
// media constraints don't allow us to specify which camera we want exactly.
const narrowDownFacingMode = async (camera: string) => {
  // Filter some devices, known to be bad choices.
  const deviceBlackList = [
    'OBS Virtual Camera',
    'OBS-Camera',
    'Desk View Camera',
    'Schreibtischansicht-Kamera',
    'Caméra Desk View',
    'Fotocamera di Panoramica Scrivania',
    'Rückseitige Ultra-Weitwinkelkamera',
    'Rückseitige Telefotokamera',
    'Rückseitige Dual-Weitwinkelkamera',
    'Rückseitige Triple-Kamera',
    'Back Dual Wide Camera',
    'Back Triple Camera',
    'Back Ultra Wide Camera',
    'Zadní ultra širokoúhlý fotoaparát',
    'Stolní kamera'
  ]

  const devices = (await navigator.mediaDevices.enumerateDevices())
    .filter(({ kind }) => kind === 'videoinput')
    .filter(({ label }) => !deviceBlackList.includes(label))
    .filter(({ label }) => !label.includes('infrared'))

  if (devices.length > 2) {
    // Explicitly picking the first entry in the list of all videoinput
    // devices for as the default front camera and the last entry as the default
    // rear camera seems to be a good heuristic on some devices.
    const frontCamera = devices[0]
    const rearCamera = devices[devices.length - 1]

    switch (camera) {
      case 'auto':
        return { deviceId: { exact: rearCamera.deviceId } }
      case 'rear':
        return { deviceId: { exact: rearCamera.deviceId } }
      case 'front':
        return { deviceId: { exact: frontCamera.deviceId } }
      default:
        return undefined
    }
  } else {
    switch (camera) {
      case 'auto':
        return { facingMode: { ideal: 'environment' } }
      case 'rear':
        return { facingMode: { exact: 'environment' } }
      case 'front':
        return { facingMode: { exact: 'user' } }
      default:
        return undefined
    }
  }
}

export async function start(
  videoEl: HTMLVideoElement, { camera, torch }: { camera: string; torch: string }
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

  const constraints = {
    audio: false,
    video: {
      width: { min: 360, ideal: 640, max: 1920 },
      height: { min: 240, ideal: 480, max: 1080 },
      ...(await narrowDownFacingMode(camera))
    }
  }

  const stream = await navigator.mediaDevices.getUserMedia(constraints)

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

  await eventOn(videoEl, 'loadeddata')

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
