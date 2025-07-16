<template>
  <div :style="wrapperStyle">
    <!--
      All immediate children of the wrapper div are stacked upon each other.
      The z-index is implicitly given by the (inverse) element order.

      The video element is at the very bottom, the pause frame canvas is above it,
      the tracking layer is yet above and finally at the very top is the slot
      overlay.
    -->

    <video
      ref="videoRef"
      :style="videoElStyle"
      autoplay
      muted
      playsinline
    ></video>

    <canvas
      id="qrcode-stream-pause-frame"
      ref="pauseFrameRef"
      v-show="!shouldScan"
      :style="cameraStyle"
    ></canvas>

    <canvas
      id="qrcode-stream-tracking-layer"
      ref="trackingLayerRef"
      :style="overlayStyle"
    ></canvas>

    <div :style="overlayStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetectedBarcode, BarcodeFormat } from 'barcode-detector/pure'
import {
  onUnmounted,
  computed,
  onMounted,
  ref,
  watch,
  type PropType,
  type CSSProperties
} from 'vue'

import { keepScanning, setScanningFormats } from '../misc/scanner'
import * as cameraController from '../misc/camera'
import { assert } from '../misc/util'
import type { EmittedError } from '@/misc/errors'

export interface QrcodeStreamProps {
  /**
   * Passes an object with various camera configuration options.
   */
  constraints?: MediaTrackConstraints

  /**
   * Passes formats that will be recognized during detection.
   */
  formats?: BarcodeFormat[]

  /**
   * Setting this prop to true freezes the camera. Set to false to resume.
   */
  paused?: boolean

  /**
   * Enables or disables camera torch during detection.
   */
  torch?: boolean

  /**
   * A function responsible for visually highlighting detected QR codes in real-time. 
   * A transparent canvas overlays the camera stream. When a barcode is detected, its location is painted to the canvas.
   * To enable this feature, pass a function to the `track` that defines how this should look like. 
   * The function is called to produce each frame. It receives an array of detected codes as the first argument and a 
   * `CanvasRenderingContext2D` instance as the second argument.
   * 
   * NOTE: The scanning frequency is increased when you provide a track function, which might hurt performance perceptibly.
   *
   * WARN: Avoid access to reactive properties in this function (like stuff in data, computed or your Vuex store). 
   * The function is called several times a second and might cause memory leaks. To be safe don't access `this` at all.
   */
  track?: (detectedCodes: DetectedBarcode[], ctx: CanvasRenderingContext2D) => void
}

const props = withDefaults(defineProps<QrcodeStreamProps>(), {
  // in this file: don't use `props.constraints` directly. Use `constraintsCached`.
  constraints: () => ({ facingMode: 'environment' } as MediaTrackConstraints),
  // in this file: don't use `props.formats` directly. Use `formatsCached`.
  formats: () => ['qr_code'],
  paused: false,
  torch: false,
  // Could also use a NO-OP function as default here but `undefined` makes
  // it clearer that no function is defined and when no tracking function is
  // defined we lower the scanning frequency:
  track: undefined,
})

const emit = defineEmits<{
  /**
   * Defines callback function called when code detetect.
   */
  (e: 'detect', detectedCodes: DetectedBarcode[]): void
  /**
   * Defines callback function called when camera becomes on.
   */
  (e: 'camera-on', capabilities: Partial<MediaTrackCapabilities>): void
  /**
   * Defines callback function called when camera becomes off.
   */
  (e: 'camera-off'): void
  /**
   * Defines callback function called when error occures.
   */
  (e: 'error', error: EmittedError): void
}>()

// Props like `constraints` and `formats` which carry non-primitive values might receive
// structurally equal updates. For example, let `constraints` be the variable that is
// passed to `QrcodeStream`:
//
//     <qrcode-stream :constraints="constraints" />
//
// and imagine the `script` section looks like this:
//
//     const constraints = ref({})
//
//     setInterval(() => {
//       constraints.value = { deviceId: 'whatever' }
//     }, 100)
//
// This would keep triggering updates in `QrcodeStream` although the constraints don't
// actually change. This is because the assigned object is referencially different every
// time and Vue only checks referencial equality. A less contrived example where this
// happens is when the template looks like this:
//
//     <qrcode-stream :constraints="{ deviceId: 'whatever' }" />
//
// Whenever Vue re-evaluates the passed object it creates a referencially different copy.
//
// To avoid this problem we maintain "cached" versions of these props and only update
// them when we detect strucural changes.
const constraintsCached = ref(props.constraints)
const formatsCached = ref(props.formats)

watch(
  () => props.constraints,
  (newConstraints, oldConstraints) => {
    // Only update `constraintsCached` if the new constraints object is strucurally different.
    if (JSON.stringify(newConstraints) !== JSON.stringify(oldConstraints)) {
      constraintsCached.value = newConstraints
    }
  },
  { deep: true }
)

watch(
  () => props.formats,
  (newFormats, oldFormats) => {
    // Only update `formatsCached` if the new formats object is strucurally different.
    if (JSON.stringify(newFormats) !== JSON.stringify(oldFormats)) {
      formatsCached.value = newFormats
    }
  },
  { deep: true }
)

// DOM refs
const pauseFrameRef = ref<HTMLCanvasElement>()
const trackingLayerRef = ref<HTMLCanvasElement>()
const videoRef = ref<HTMLVideoElement>()

// Whether the camera is currently streaming or not
const cameraActive = ref(false)

// `isMounted` sensitively influences many other reactive values but we make sure
// to strictly only modify it with the corresponding lifecycle hooks.
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

onUnmounted(() => {
  // Initially assumed, that setting `isMounted.value = false` in a
  // `onBeforeUnmounted` hook, would trigger the watcher on `cameraSettings`
  // one last time before the component is destroyed. But apparently the
  // watcher is not called in time. So we need to stop the camera directly.
  cameraController.stop()
})

// Collect all reactive values together that influence the camera to have a
// single source of truth for when EXACTLY to start/stop/restart the camera.
// The watcher on this computed value should be the only function to interact
// with the camera directly and it should only interact with it in response to
// changes of this computed value.
const cameraSettings = computed(() => {
  return {
    torch: props.torch,
    constraints: constraintsCached.value,
    shouldStream: isMounted.value && !props.paused
  }
})

watch(
  cameraSettings,
  async (newSettings) => {
    const videoEl = videoRef.value
    assert(
      videoEl !== undefined,
      'cameraSettings watcher should never be triggered when component is not mounted. Thus video element should always be defined.'
    )

    const canvas = pauseFrameRef.value
    assert(
      canvas !== undefined,
      'cameraSettings watcher should never be triggered when component is not mounted. Thus canvas should always be defined.'
    )

    const ctx = canvas.getContext('2d')
    assert(ctx !== null, 'if cavnas is defined, canvas 2d context should also be non-null')

    if (newSettings.shouldStream) {
      // When a camera is already loaded and then the `constraints` prop is changed, then
      //  => both `cameraActive.value` and `cameraSettings.shouldStream` stay `true`
      //  => so `shouldScan` does not change and thus
      //  => and thus the watcher on `shouldScan` is not triggered
      //  => and finally we don't start a new scanning process
      // So in this interaction scanning breaks. To prevent that we explicitly set `cameraActive`
      // to `false` here. That is not just a hack but also makes semantically sense, because
      // the camera is briefly inactive right before requesting a new camera.
      cameraController.stop()
      cameraActive.value = false

      // start camera
      try {
        // Usually, when the component is destroyed the `onUnmounted` hook takes care of stopping the camera.
        // However, if the component is destroyed while we are in the middle of starting the camera, then
        // the `onUnmounted` hook might fire before the following promise resolves ...
        const capabilities = await cameraController.start(videoEl, newSettings)
        // ... thus we check whether the component is still alive right after the promise resolves and stop
        // the camera otherwise.
        if (!isMounted.value) {
          await cameraController.stop()
        } else {
          cameraActive.value = true
          emit('camera-on', capabilities)
        }
      } catch (error: unknown) {
        emit('error', error as EmittedError)
      }
    } else {
      // stop camera
      // paint pause frame
      canvas.width = videoEl.videoWidth
      canvas.height = videoEl.videoHeight

      ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight)

      cameraController.stop()
      cameraActive.value = false
      emit('camera-off')
    }
  },
  { deep: true }
)

// `setScanningFormats` will create a new BarcodeDetector instance with the given formats.
watch(formatsCached, (formats) => {
  if (isMounted.value) {
    setScanningFormats(formats)
  }
})

// The single source of truth when EXACTLY to start/stop scanning the camera stream.
// The watcher on this computed property should be the only function to interact with
// the scanner.
const shouldScan = computed(() => cameraSettings.value.shouldStream && cameraActive.value)

watch(shouldScan, (shouldScan) => {
  if (shouldScan) {
    assert(
      pauseFrameRef.value !== undefined,
      'shouldScan watcher should only be triggered when component is mounted. Thus pause frame canvas is defined'
    )
    clearCanvas(pauseFrameRef.value)

    assert(
      trackingLayerRef.value !== undefined,
      'shouldScan watcher should only be triggered when component is mounted. Thus tracking canvas is defined'
    )
    clearCanvas(trackingLayerRef.value)

    // Minimum delay in milliseconds between frames to be scanned. Don't scan
    // so often when visual tracking is disabled to improve performance.
    const scanInterval = () => {
      if (props.track === undefined) {
        return 500
      } else {
        return 40 // ~ 25fps
      }
    }

    assert(
      videoRef.value !== undefined,
      'shouldScan watcher should only be triggered when component is mounted. Thus video element is defined'
    )
    keepScanning(videoRef.value, {
      detectHandler: (detectedCodes: DetectedBarcode[]) => emit('detect', detectedCodes),
      formats: formatsCached.value,
      locateHandler: onLocate,
      minDelay: scanInterval()
    })
  }
})

// methods
const clearCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  assert(ctx !== null, 'canvas 2d context should always be non-null')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const onLocate = (detectedCodes: DetectedBarcode[]) => {
  const canvas = trackingLayerRef.value
  assert(
    canvas !== undefined,
    'onLocate handler should only be called when component is mounted. Thus tracking canvas is always defined.'
  )

  const video = videoRef.value
  assert(
    video !== undefined,
    'onLocate handler should only be called when component is mounted. Thus video element is always defined.'
  )

  if (detectedCodes.length === 0 || props.track === undefined) {
    clearCanvas(canvas)
  } else {
    // The visually occupied area of the video element.
    // Because the component is responsive and fills the available space,
    // this can be more or less than the actual resolution of the camera.
    const displayWidth = video.offsetWidth
    const displayHeight = video.offsetHeight

    // The actual resolution of the camera.
    // These values are fixed no matter the screen size.
    const resolutionWidth = video.videoWidth
    const resolutionHeight = video.videoHeight

    // Dimensions of the video element as if there would be no
    //   object-fit: cover;
    // Thus, the ratio is the same as the cameras resolution but it's
    // scaled down to the size of the visually occupied area.
    const largerRatio = Math.max(displayWidth / resolutionWidth, displayHeight / resolutionHeight)
    const uncutWidth = resolutionWidth * largerRatio
    const uncutHeight = resolutionHeight * largerRatio

    const xScalar = uncutWidth / resolutionWidth
    const yScalar = uncutHeight / resolutionHeight
    const xOffset = (displayWidth - uncutWidth) / 2
    const yOffset = (displayHeight - uncutHeight) / 2

    const scale = ({ x, y }: Point2D) => {
      return {
        x: Math.floor(x * xScalar),
        y: Math.floor(y * yScalar)
      }
    }

    const translate = ({ x, y }: Point2D) => {
      return {
        x: Math.floor(x + xOffset),
        y: Math.floor(y + yOffset)
      }
    }

    const adjustedCodes: DetectedBarcode[] = detectedCodes.map((detectedCode) => {
      const { boundingBox, cornerPoints } = detectedCode

      const { x, y } = translate(
        scale({
          x: boundingBox.x,
          y: boundingBox.y
        })
      )
      const { x: width, y: height } = scale({
        x: boundingBox.width,
        y: boundingBox.height
      })

      return {
        ...detectedCode,
        cornerPoints: cornerPoints.map((point) => translate(scale(point))) as [
          Point2D,
          Point2D,
          Point2D,
          Point2D
        ],
        boundingBox: DOMRectReadOnly.fromRect({ x, y, width, height })
      }
    })

    canvas.width = video.offsetWidth
    canvas.height = video.offsetHeight

    const ctx = canvas.getContext('2d')
    assert(ctx !== null, 'canvas 2d context should always be non-null')

    props.track(adjustedCodes, ctx)
  }
}

/**
 * Styling is all inline to avoid generating an external style.css file.
 * Component users shouldn't have to figure out how to setup their bundler to
 * import external CSS.
 */

const wrapperStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  // notice that we use z-index only once for the wrapper div.
  // If z-index is not defined, elements are stacked in the order they appear in the DOM.
  // The first element is at the very bottom and subsequent elements are added on top.
  'z-index': '0'
}

const overlayStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0'
}

const cameraStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  'object-fit': 'cover'
}

/* When a camera stream is loaded, we assign the stream to the `video`
 * element via `video.srcObject`. At this point the element used to be
 * hidden with `v-show="false"` aka. `display: none`. We do that because
 * at this point the videos dimensions are not known yet. We have to
 * wait for the `loadeddata` event first. Only after that event we
 * display the video element. Otherwise the elements size awkwardly flickers.
 *
 * However, it appears in iOS 15 all iOS browsers won't properly render
 * the video element if the `video.srcObject` was assigned *while* the
 * element was hidden with `display: none`. Using `visibility: hidden`
 * instead seems to have fixed the problem though.
 */
const videoElStyle = computed<CSSProperties>(() => {
  if (shouldScan.value) {
    return cameraStyle
  } else {
    return {
      ...cameraStyle,

      visibility: 'hidden',
      position: 'absolute'
    }
  }
})
</script>
