var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var settings = require('../../enclave.js')
var stringSafetyNet = require('./src/utils/javascriptUtils').stringSafetyNet
var pathPrefix = '../../'

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: pathPrefix + stringSafetyNet(settings.index, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

var UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
})

module.exports = {
  entry: [
    pathPrefix + stringSafetyNet(settings.entry, 'App.js')
  ],
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
  plugins: [
    HTMLWebpackPluginConfig,
    UglifyJsPluginConfig,
    new webpack.optimize.DedupePlugin(),
  ],
  devServer: {
    contentBase: pathPrefix + stringSafetyNet(settings.output, 'dist'),
    hot: true,
  }
}
