/* eslint-disable import/no-extraneous-dependencies */
// Very similar to webpack.prod.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      // Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      // Button: 'exports-loader?Button!bootstrap/js/dist/button',
      // Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      // Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      // Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      // Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      // Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      // Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      // Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      // Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      // Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
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
      // {
      //   test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: 'url-loader?limit=10000',
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      //   use: 'file-loader',
      // },
    ],
  },
};







// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var DashboardPlugin = require("webpack-dashboard/plugin");
//
// const path = require('path');
//
// module.exports = {
//   devtool: 'source-map',
//   mode: 'development',
//   entry:
//     [
//       './src/index.js',
//       'bootstrap-loader',
//     ],
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'public')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(scss)$/,
//         use: ExtractTextPlugin.extract({
//           loader: 'style-loader', // inject CSS to page
//         }, {
//             loader: 'css-loader', // translates CSS into CommonJS modules
//           }, {
//             loader: 'postcss-loader', // Run post css actions
//             options: {
//             }
//           }, {
//             loader: 'sass-loader' // compiles Sass to CSS
//           }
//         ),
//       },
//       {
//         test: /\.(gif|png|jpg)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             // inline base64 URLs for <=8Kb images
//             limit: 8192,
//             // direct URLs for >8Kb, will be copied to /assets/ on build.
//             // import myImage from './myImage.png';
//             // <img src=`${WEB_URL}/${myImage}` />
//             fallback: 'file-loader',
//             name: '[name].[ext]', // these are actually passes to "file-loader"
//             publicPath: '',
//           },
//         },
//       },
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin("styles.css"),
//     require('precss'),
//     require('autoprefixer'),
//     new DashboardPlugin({ port: 3001 }),
//   ]
// };
