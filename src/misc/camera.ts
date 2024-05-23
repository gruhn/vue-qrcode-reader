import { StreamApiNotSupportedError, InsecureContextError, StreamLoadTimeoutError } from './errors'
import { eventOn, timeout } from './callforth'
import shimGetUserMedia from './shimGetUserMedia'
import { assertNever } from './util'

type CameraState = CameraStopped | CameraStopping | CameraError | CameraStarting | CameraStarted

let state: CameraState = { kind: 'stopped' }

type CameraStopped = { 
  kind: 'stopped'
}

type CameraStopping = { 
  kind: 'stopping'
  task: Promise<CameraStopped>
}

type CameraError = { 
  kind: 'error'
  reason: Error
}

type CameraStarting = {
  kind: 'starting'
  task: Promise<CameraStarted>
}

type CameraStarted = {
  kind: 'started'
  capabilities: Partial<MediaTrackCapabilities>
  videoEl: HTMLVideoElement,
  stream: MediaStream
  constraints: MediaTrackConstraints,
  isTorchOn: boolean
}

export async function start(
  videoEl: HTMLVideoElement,
  constraints: MediaTrackConstraints,
  torch: boolean
): Promise<Partial<MediaTrackCapabilities>> {
  if (state.kind === 'stopped' || state.kind === 'error') {
    const task = runStartTask(videoEl, constraints, torch)
    state = { kind: 'starting', task }
    try { 
      state = await task
      return state.capabilities
    } catch (error) {
      state = { kind: 'error', reason: error }
      throw error
    }
  } 
  
  if (state.kind === 'stopping' || state.kind === 'starting') {   
    // camera still actively stopping/starting ==> await pending task and try again
    await state.task
    return start(videoEl, constraints, torch)
  } 
  
  if (state.kind === 'started') {
    await stop()
    return start(videoEl, constraints, torch)
  }

  // generate type error if not all cases are covered:
  assertNever(state)
}

export async function stop(): Promise<void> {
  if (state.kind === 'stopped' || state.kind === 'error') {
    console.warn(`[vue-qrcode-reader] tried to stop camera although it's already stopped`)
    return
  } 
  
  if (state.kind === 'stopping') {
    console.warn(`[vue-qrcode-reader] tried to stop camera although it's already in the process of stopping`)
    await state.task
    return
  }

  if (state.kind === 'starting') {
    // camera actively starting ==> await pending task and try again
    await state.task
    return stop()
  }
  
  if (state.kind === 'started') {
    const task: Promise<CameraStopped> = runStopTask(state)
    state = { kind: 'stopping', task }
    try {
      state = await task
      return
    } catch (error) {
      console.error(`[vue-qrcode-reader] error while trying to stop camera: "${error}"`)
      state = { kind: 'error', reason: error }      
      throw error
    }
  }

  // generate type error if not all cases are covered:
  assertNever(state)
}

type CreateObjectURLCompat = (obj: MediaSource | Blob | MediaStream) => string

async function runStartTask(
  videoEl: HTMLVideoElement,
  constraints: MediaTrackConstraints,
  torch: boolean
): Promise<CameraStarted> {
  console.debug(
    '[vue-qrcode-reader] starting camera with constraints: ',
    JSON.stringify(constraints)
  )

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

  console.debug('[vue-qrcode-reader] calling getUserMedia')
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: constraints
  })

  if (videoEl.srcObject !== undefined) {
    videoEl.srcObject = stream
  } else if (videoEl.mozSrcObject !== undefined) {
    videoEl.mozSrcObject = stream
  } else if (window.URL.createObjectURL) {
    videoEl.src = (window.URL.createObjectURL as CreateObjectURLCompat)(stream)
  } else if (window.webkitURL) {
    videoEl.src = (window.webkitURL.createObjectURL as CreateObjectURLCompat)(stream)
  } else {
    videoEl.src = stream.id
  }

  // In the WeChat browser on iOS,
  // 'loadeddata' event won't get fired
  // unless video is explictly triggered by play()
  videoEl.play()

  console.debug('[vue-qrcode-reader] waiting for video element to load')
  await Promise.race([
    eventOn(videoEl, 'loadeddata'),

    // On iOS devices in PWA mode, QrcodeStream works initially, but after
    // killing and restarting the PWA, all video elements fail to load camera
    // streams and never emit the `loadeddata` event. Looks like this is
    // related to a WebKit issue (see #298). No workarounds at the moment.
    // To at least detect this situation, we throw an error if the event
    // has not been emitted after a 6 second timeout.
    timeout(6_000).then(() => {
      throw new StreamLoadTimeoutError()
    })
  ])
  console.debug('[vue-qrcode-reader] video element loaded')

  // According to: https://oberhofer.co/mediastreamtrack-and-its-capabilities/#queryingcapabilities
  // On some devices, getCapabilities only returns a non-empty object after
  // some delay. There is no appropriate event so we have to add a constant timeout
  await timeout(500)

  const [track] = stream.getVideoTracks()

  const capabilities: Partial<MediaTrackCapabilities> = track?.getCapabilities?.() ?? {}

  let isTorchOn = false
  if (torch && capabilities.torch) {
    await track.applyConstraints({ advanced: [{ torch: true }] })
    isTorchOn = true
  }

  console.debug('[vue-qrcode-reader] camera started')
  return {
    kind: 'started',
    videoEl,
    stream,
    capabilities,
    constraints,
    isTorchOn
  }
}

async function runStopTask({ videoEl, stream, isTorchOn }: CameraStarted): Promise<CameraStopped> {
  console.debug('[vue-qrcode-reader] stopping camera')

  videoEl.src = ''
  videoEl.srcObject = null
  videoEl.load()

  // wait for load() to emit error
  // because src and srcObject are empty
  await eventOn(videoEl, 'error')

  for (const track of stream.getTracks()) {
    isTorchOn ?? (await track.applyConstraints({ advanced: [{ torch: false }] }))
    stream.removeTrack(track)
    track.stop()
  }

  return { kind: 'stopped' }
}
