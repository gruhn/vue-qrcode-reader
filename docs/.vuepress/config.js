module.exports = {
  title: 'Vue Qrcode Reader',
  description: 'A set of Vue.js components for detecting and decoding QR codes.',

  base: '/vue-qrcode-reader/',

  extraWatchFiles: [
    '../src/'
  ],

  themeConfig: {
    repo: 'gruhn/vue-qrcode-reader',

    sidebar: {
      '/demos/': [
        'Simple',
        'DecodeAll',
        'CustomTracking',
        'LoadingIndicator',
        'ScanSameQrcodeMoreThanOnce',
        'Validate',
        'SwitchCamera',
        'Fullscreen',
        'Torch',
        'DragDrop',
        'Upload'
      ],

      '/api/': [
        'QrcodeStream',
        'QrcodeDropZone',
        'QrcodeCapture'
      ],
    },

    nav: [
      { text: 'Live Demos', link: '/demos/CustomTracking' },
      { text: 'API Reference', link: '/api/QrcodeStream' }
    ]
  }
}
