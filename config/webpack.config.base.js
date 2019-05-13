var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var outputFile = "vue-qrcode-reader";
var globalName = "VueQrcodeReader";

var config = require("../package.json");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /worker\//,
        loader: "worker-loader",
        options: {
          inline: true,
          fallback: false
        }
      },
      {
        test: /.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: {
                loader: "css-loader",
                options: { minimize: true }
              }
            })
          }
        }
      }
    ]
  },
  plugins: [new ExtractTextPlugin(outputFile + ".css")]
};
