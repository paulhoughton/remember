var path = require('path');

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'),
              loader: 'babel-loader' },
            { test: /\.css/, 
              loader: "style-loader!css-loader" },
            { test: /\.woff$/,
              loader: 'url?limit=100000' },
            { test: /\.js$/, 
              loader: 'exports-loader' }
        ]
    }
};
