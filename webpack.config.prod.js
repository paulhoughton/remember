var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: Object.keys(pkg.dependencies).concat('./src/vendor')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js'
  },
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};
