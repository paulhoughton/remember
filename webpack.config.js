var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './src/index.js',
    vendor: Object.keys(pkg.dependencies).concat('./src/vendor')
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'app.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' }
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
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.woff$/,
        use: 'url-loader'
      }
    ]
  }
};
