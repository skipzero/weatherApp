const ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require("webpack-dashboard/plugin");

const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          loader: 'style-loader', // inject CSS to page
        }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer'),
                  new DashboardPlugin({ port: 3001 }),
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ),
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // inline base64 URLs for <=8Kb images
            limit: 8192,
            // direct URLs for >8Kb, will be copied to /assets/ on build.
            // import myImage from './myImage.png';
            // <img src=`${WEB_URL}/${myImage}` />
            fallback: 'file-loader',
            name: '[name].[ext]', // these are actually passes to "file-loader"
            publicPath: '',
          },
        },
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
