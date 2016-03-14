var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var settings = require('../../enclave.js')
var stringSafetyNet = require('./src/utils/javascriptUtils').stringSafetyNet
var HotReloader = new webpack.HotModuleReplacementPlugin()
var pathPrefix = '../../'
var isDeveloping
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
  pathPrefix + stringSafetyNet(settings.entry, 'App.js')
].filter(function(item) {
  return !!item && item
})

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: pathPrefix + stringSafetyNet(settings.index, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: entryArr,
  output: {
    path: pathPrefix + stringSafetyNet(settings.output, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-0', 'es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.(otf|eot|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(s(a|c))?(c)?ss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, HotReloader],
  devServer: {
    contentBase: pathPrefix + stringSafetyNet(settings.output, 'dist'),
    hot: true,
  }
}
