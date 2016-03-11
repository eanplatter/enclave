var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var settings = require('../../enclave.js')
var stringSafetyNet = require('./src/utils/javascriptUtils').stringSafetyNet
var HotReloader = new webpack.HotModuleReplacementPlugin();

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
  '../../' + stringSafetyNet(settings.entry, 'App.js')
].filter(function(item) {
  return !!item && item
})

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '../../' + stringSafetyNet(settings.index, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: entryArr,
  output: {
    path: '../../' + stringSafetyNet(settings.output, 'dist'),
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "react-hot!babel"},
      {test: /\.json$/, exclude: /node_modules/, loader: "json"},
      {test: /\.[s]css$?, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader"}
    ]
  },
  plugins: [HTMLWebpackPluginConfig, HotReloader],
  devServer: {
    contentBase: '../../' + stringSafetyNet(settings.output, 'dist'),
    hot: true,
  }
}
