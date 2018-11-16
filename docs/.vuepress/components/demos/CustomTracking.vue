<template>
  <qrcode-stream :track="repaint" @init="logErrors" />
</template>

<script>
export default {

  methods: {
    repaint (location, ctx) {
      if (location !== null) {
        const {
          topLeftFinderPattern,
          topRightFinderPattern,
          bottomLeftFinderPattern
        } = location

        const pointArray = [
          topLeftFinderPattern,
          topRightFinderPattern,
          bottomLeftFinderPattern
        ]

        ctx.fillStyle = '#007bff'

        pointArray.forEach(({ x, y }) => {
          ctx.fillRect(x - 5, y - 5, 10, 10)
        })
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    }
  }

}
</script>
