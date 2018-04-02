var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/');

var config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    library: '[name].js',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-native': 'react-native',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

module.exports = config;
