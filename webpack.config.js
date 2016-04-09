var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-mdl', 'react-mdl/extra/material']
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'app.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'sw.js' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.woff$/,
        loader: 'url'
      }
    ]
  }
};
