const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = require('./config/paths');

const env = process.env.NODE_ENV || 'development';

let config = {
  devtool: 'eval',
  entry: [paths.app.srcIndex],
  output: {
    path: paths.app.build,
    filename: 'bundle.js',
    publicPath: paths.publicPath,
    contentBase: paths.app.public,
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'eslint',
        include: paths.app.src,
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: paths.app.src,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        exclude: null,
        loader: env === 'development' ? 'style!css?sourceMap' : ExtractTextPlugin.extract('style', 'css?sourceMap'),
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        loader: 'file',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.app.srcHtml,
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ],
  resolve: {
    fallback: paths.nodeModulesPath,
    modulesDirectories: [
      'node_modules',
    ],
    root: [
      paths.app.src,
    ],
    extensions: [
      '',
      '.js',
      '.json',
    ],
  },
  postcss: () => {
    return [
      autoprefixer,
    ];
  },
};

if (env === 'development') {
  config.entry.push('webpack-hot-middleware/client');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

if (env === 'production') {
  config.devtool = 'source-map';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
