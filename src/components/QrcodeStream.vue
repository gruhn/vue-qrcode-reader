<template>
  <div class="qrcode-stream-wrapper">
    <!--
    Note, the following DOM elements are not styled with z-index.
    If z-index is not defined, elements are stacked in the order they appear in the DOM.
    The first element is at the very bottom and subsequent elements are added on top.
    -->
    <video
      ref="videoRef"
      :class="{ 'qrcode-stream-camera--hidden': !shouldScan }"
      class="qrcode-stream-camera"
      autoplay
      muted
      playsinline
    />

    <canvas ref="pauseFrameRef" v-show="!shouldScan" class="qrcode-stream-camera" />

    <canvas ref="trackingLayerRef" class="qrcode-stream-overlay" />

    <div class="qrcode-stream-overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetectedBarcode } from '@sec-ant/barcode-detector'
import { onBeforeUnmount, computed, onMounted, ref, watch } from 'vue'

import { adaptOldFormat, keepScanning } from '../misc/scanner'
import Camera from '../misc/camera'
import { useCommonApi } from '../composables/useCommonApi'
import type { Point } from '../types/types'

const props = defineProps({
  camera: {
    type: String,
    default: 'auto',
    validator(camera: string) {
      return ['auto', 'rear', 'front', 'off'].includes(camera)
    }
  },
  torch: {
    type: Boolean,
    default: false
  },
  track: {
    type: Function
  }
})

const emit = defineEmits(['detect', 'decode', 'init'])
const { onDetect } = useCommonApi(emit)

// refs
const pauseFrameRef = ref<HTMLCanvasElement>()
const trackingLayerRef = ref<HTMLCanvasElement>()
const videoRef = ref<HTMLVideoElement>()

// data
const cameraInstance = ref<Awaited<ReturnType<typeof Camera>>>()
const isMounted = ref(false)

// computations
const shouldScan = computed(
  () =>
    isMounted.value &&
    props.camera !== 'off' &&
    cameraInstance.value &&
    videoRef.value &&
    videoRef.value.readyState > 1
)

/**
 * Minimum delay in milliseconds between frames to be scanned. Don't scan
 * so often when visual tracking is disabled to improve performance.
 */
const scanInterval = () => {
  if (props.track === undefined) {
    return 500
  } else {
    return 40 // ~ 25fps
  }
}

//lifecycle
watch(shouldScan, (shouldScan) => {
  if (shouldScan && pauseFrameRef.value && trackingLayerRef.value) {
    clearCanvas(pauseFrameRef.value)
    clearCanvas(trackingLayerRef.value)
    startScanning()
  }
})

watch(
  () => props.torch,
  () => init()
)

watch(
  () => props.camera,
  () => init()
)

onMounted(() => {
  init()
  isMounted.value = true
})

onBeforeUnmount(() => {
  beforeResetCamera()
  isMounted.value = false
})

// methods
const init = () => {
  const promise = (async () => {
    beforeResetCamera({ freeze: props.camera === 'off' })

    if (props.camera === 'off') {
      cameraInstance.value = undefined

      return {
        capabilities: {}
      }
    } else {
      cameraInstance.value = await Camera(videoRef, {
        camera: props.camera,
        // @ts-ignore
        torch: props.torch
      })

      if (!cameraInstance.value) {
        return {
          capabilities: {}
        }
      }

      const capabilities = cameraInstance.value.getCapabilities()

      // if the component is destroyed before `cameraInstance` resolves a
      // `beforeDestroy` hook has no chance to clear the remaining camera
      // stream.
      if (!isMounted.value) {
        cameraInstance.value.stop()
      }

      return {
        capabilities
      }
    }
  })()

  emit('init', promise)
}

const startScanning = () => {
  const detectHandler = (result: ReturnType<typeof adaptOldFormat>) => {
    onDetect(Promise.resolve(result))
  }

  keepScanning(videoRef, {
    detectHandler,
    locateHandler: onLocate,
    minDelay: scanInterval()
  })
}

const beforeResetCamera = (options?: { freeze?: boolean }) => {
  const { freeze } = options || { freeze: false }

  if (freeze && pauseFrameRef.value && videoRef.value) {
    const canvas = pauseFrameRef.value
    const ctx = canvas.getContext('2d')
    const video = videoRef.value

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
  }

  if (cameraInstance.value) {
    cameraInstance.value.stop()
    cameraInstance.value = undefined
  }
}

const onLocate = (detectedCodes: DetectedBarcode[]) => {
  const canvas = trackingLayerRef.value
  const video = videoRef.value

  if (canvas !== undefined) {
    if (detectedCodes.length > 0 && props.track !== undefined && video !== undefined) {
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

      const scale = ({ x, y }: Point) => {
        return {
          x: Math.floor(x * xScalar),
          y: Math.floor(y * yScalar)
        }
      }

      const translate = ({ x, y }: Point) => {
        return {
          x: Math.floor(x + xOffset),
          y: Math.floor(y + yOffset)
        }
      }

      const adjustedCodes = detectedCodes.map((detectedCode) => {
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
          cornerPoints: cornerPoints.map((point) => translate(scale(point))),
          boundingBox: DOMRectReadOnly.fromRect({ x, y, width, height })
        }
      })

      canvas.width = video.offsetWidth
      canvas.height = video.offsetHeight

      const ctx = canvas.getContext('2d')

      props.track(adjustedCodes, ctx)
    } else {
      clearCanvas(canvas)
    }
  }
}

// const repaintTrackingLayer = (video, canvas, location) => {
//   const ctx = canvas.getContext("2d");

//   window.requestAnimationFrame(() => {
//     canvas.width = displayWidth;
//     canvas.height = displayHeight;

//     trackRepaintFunction(coordinatesAdjusted, ctx);
//   });
// },

const clearCanvas = (canvas: HTMLCanvasElement) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  ctx?.clearRect(0, 0, canvas.width, canvas.height)
}
</script>

<style lang="css" scoped>
.qrcode-stream-wrapper {
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 0;
}

.qrcode-stream-overlay {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
}

.qrcode-stream-camera {
  width: 100%;
  height: 100%;

  display: block;
  object-fit: cover;
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
.qrcode-stream-camera--hidden {
  visibility: hidden;
  position: absolute;
}
</style>
