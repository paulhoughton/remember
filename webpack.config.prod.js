var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Purify = require('purifycss-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-mdl', 'react-mdl/extra/material']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        test: /\.jsx?$/
      },
      { test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      { test: /\.woff$/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new ExtractTextPlugin('style.css'),
    new Purify({
      basePath: 'dist',
      paths: [
        'app.js',
        'vendor.js',
        'index.html'
      ],
      purifyOptions: { minify: true }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};
