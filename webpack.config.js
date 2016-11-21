const webpack = require('webpack');
const path = require('path');
const css = require('!raw!sass!./file.scss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
  debug: true,
  entry: {
    main: './server.js'
  },
  module: {
    loaders: []
  },
  output: {
    path: path.join(_dirname, 'public/js'),
    filename: '[name].js'
  }
};
