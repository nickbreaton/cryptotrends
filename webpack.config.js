const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const relative = (...paths) => {
  return path.resolve(__dirname, ...paths)
};

module.exports = {
  mode: 'development',
  entry: [
    relative('src/index.js')
  ],
  output: {
    path: relative('dist'),
    filename: '[hash].[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      // patch for `google-trends-api`
    'https': relative('src/lib/https')
    }
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.svg$/, use: ['babel-loader', 'svg-react-loader'] },
      { test: /\.worker\.js$/, use: ['worker-loader', 'babel-loader'] }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      relative('public')
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: relative('src/index.html')
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: relative('dist/sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html'
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    proxy: {
      '/trends/api': {
        target: 'https://trends.google.com',
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
};
