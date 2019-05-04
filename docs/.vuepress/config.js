module.exports = {
  title: 'VueQrcodeReader',
  description: 'A set of Vue.js components for detecting and decoding QR codes.',

  base: '/vue-qrcode-reader/',

  themeConfig: {
    repo: 'gruhn/vue-qrcode-reader',

    sidebar: {
      '/demos/': [
        'DecodeAll',
        'CustomTracking',
        'LoadingIndicator',
        'Validate',
        'SwitchCamera',
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
      { text: 'Demos', link: '/demos/DecodeAll' },
      { text: 'Component APIs', link: '/api/QrcodeStream' }
    ]
  }
}
