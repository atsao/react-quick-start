'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const cssLoaders = require('./cssLoaders');
const cssModuleRules = cssLoaders.slice();
cssModuleRules.unshift('style-loader');

let config = {};

config.devtool = 'eval';

config.entry = [
  'babel-polyfill',
  'react-hot-loader/patch',
  paths.app.srcIndex,
  'webpack-hot-middleware/client',
];

config.output = {
  path: paths.app.build,
  publicPath: paths.publicPath,
  filename: '[name].js',
};

config.resolve = {
  modules: [paths.app.src, paths.nodeModules, 'node_modules'],
  extensions: ['.js', '.json'],
};

config.module = {
  rules: [
    {
      test: /\.(js|jsx)?$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: paths.app.src,
    },
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
      include: paths.app.src,
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssModuleRules,
    },
  ],
};

config.plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.app.srcHtml,
  }),
  new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
];

module.exports = config;
