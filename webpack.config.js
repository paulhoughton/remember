var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/index'],
  output: {
    filename: 'dist/bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'index.html', to: 'dist/' },
        { from: 'sw.js', to: 'dist/' }
    ])
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
        loader: 'style-loader!css-loader' },
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      }
    ]
  }
};
