const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  entry: [
    './src/index.js',
    'bootstrap-loader',
  ],
  target: 'node',
  externals: ['nodeExternals'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFileName: 'chunkId.',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
    }),

    // To strip all locales except “en”
    new MomentLocalesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html - loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                new HtmlWebPackPlugin({
                  template: './src/index.html',
                  filename: 'index.html',
                }),
              ],
            },
          }, 'sass-loader'],
      },
    ],
  },
};
