var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')

var outputFile = 'vue-qrcode-reader'
var globalName = 'VueQrcodeReader'

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: outputFile + '.browser.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  externals: {
    // Put external libraries like lodash here
    // With their global name
    // Example: 'lodash': '_'
    'jsqr': 'jsqr',
    'babel-runtime': 'babel-runtime',
    'webrtc-adapter': 'webrtc-adapter',
    'lodash/isObject': 'lodash/isObject',
    'lodash/isBoolean': 'lodash/isBoolean',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
})
