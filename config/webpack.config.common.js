var webpack = require("webpack");
var merge = require("webpack-merge");
var base = require("./webpack.config.base");
var path = require("path");

var outputFile = "vue-qrcode-reader";
var globalName = "VueQrcodeReader";

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: outputFile + ".common.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  externals: {
    // Put external libraries like lodash here
    // With their package name
    // Example: 'lodash': 'lodash'
    jsqr: "jsqr",
    "babel-runtime": "babel-runtime",
    "webrtc-adapter": "webrtc-adapter"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      mangle: true
    })
  ]
});
