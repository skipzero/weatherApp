/* eslint-disable import/no-extraneous-dependencies */
// Very similar to webpack.prod.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const DashboardPlugin = require("webpack-dashboard/plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    './src/index.js',
    // 'font-awesome-loader',
    'bootstrap-loader',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
  },
  plugins: [
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
              plugins: () => {
                postcssPresetEnv(
                  {
                    stage: 3,
                    browsers: 'last 2 versions'
                  }
                )
              }
            }
          }, 'sass-loader'],
      },
    ],
  },
};
