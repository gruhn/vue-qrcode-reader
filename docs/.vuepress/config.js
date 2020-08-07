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
        'Validate',
        'SwitchCamera',
        'Fullscreen',
        'Torch',
        'DragDrop',
        'Upload',
        'Fallback'
      ],

      '/api/': [
        'QrcodeStream',
        'QrcodeDropZone',
        'QrcodeCapture'
      ],
    },

    nav: [
      { text: 'Live Demos', link: '/demos/DecodeAll' },
      { text: 'API Reference', link: '/api/QrcodeStream' }
    ]
  }
}
