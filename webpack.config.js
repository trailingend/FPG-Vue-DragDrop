const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDORS = [
  'jquery', 'lodash'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDORS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
        {
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            use: 'vue-loader',
            test: /\.vue$/
        },
        {
            use: ['style-loader', 'css-loader'],
            test: /\.css$/
        },
        {
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader', 'resolve-url-loader', 'sass-loader']
            }),
            test: /\.scss$/
        },
        {
            use : 'file-loader',
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/
        },
        {
            use: "file-loader",
            test: /\.(jpe?g|png|gif|svg|mp4)$/
        }
    ]
  },
  resolve: {
    alias: {
        jquery: "jquery/src/jquery",
        vue$: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      hash: false,
      minify: {
        removeCommits: true,
        collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin({
        filename: 'style.css'
    }),
    new CopyWebpackPlugin([
        { from: './images', to: './images'},
        { from: './fonts', to: './fonts'},
    ], {
        ignore: ['*.scss', '.DS_Store']
    })
  ]
};
