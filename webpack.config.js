// module.exports = {
// entry: './src/js/main.js',
// output: {
// path: './public/',
// filename: 'bundle.js',
// },
// };

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        grumpywizards: './client/src/app.jsx'
    },
    devtool: 'source-map',
    module: {
        preLoaders: [ // Javascript
            {
                test: /\.jsx*?$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            // Javascript
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            // Stylesheets
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
            },
            // Font Definitions
            {
                test: /\.svg$/,
                loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
            }, {
                test: /\.woff$/,
                loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
            }, {
                test: /\.woff2$/,
                loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
            }, {
                test: /\.[ot]tf$/,
                loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
            }, {
                test: /\.eot$/,
                loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: 'public/[name].js'
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    sassLoader: {
        includePaths: ['client/style']
    },
    plugins: [new ExtractTextPlugin('public/grumpywizards.css')]
};
