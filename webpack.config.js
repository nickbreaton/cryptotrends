const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const relative = (...paths) => {
  return path.resolve(__dirname, ...paths)
}

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    relative('src/index.js')
  ],
  output: {
    path: relative('dist'),
    filename: '[hash].js',
    publicPath: ''
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      relative('public')
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: relative('src/index.html')
    })
  ],
  devServer: {
    proxy: {
      '/trends/api': {
        target: 'https://trends.google.com',
        changeOrigin: true
      }
    }
  }
}