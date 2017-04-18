var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var settings = require('../../enclave.js')
var HotReloader = new webpack.HotModuleReplacementPlugin()
var pathPrefix = '../../'
var isDeveloping

// this is a test
try {
  isDeveloping = require('./dev-mode')
} catch (e) {
  isDeveloping = ''
}

if (isDeveloping) {
  pathPrefix = ''
  settings = {
    live: 'true',
    index: './example/index.html',
    entry: './example/App.js',
    output: './example/dist',
    port: 8080,
  }
}

var liveReloadPort
var liveReloadServer

if (JSON.parse(settings.live)) {
  liveReloadPort = 'webpack-dev-server/client?http://localhost:' + settings.port
  liveReloadServer = 'webpack/hot/dev-server'
} else {
  liveReloadPort = null
  liveReloadServer = null
}

var entryArr = [
  liveReloadPort,
  liveReloadServer,
  pathPrefix + settings.entry
].filter(function(item) {
  return !!item && item
})

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: pathPrefix + settings.index,
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: entryArr,
  output: {
    publicPath: '/',
    path: pathPrefix + settings.output,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'stage-0',
            'react'
          ]
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.(otf|eot|ttf|woff|png|jpe?g|txt)/i,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.[s]?css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    HotReloader,
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: pathPrefix + settings.output,
    historyApiFallback: {
      index: '/',
    },
    hot: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
