const env = process.env.NODE_ENV || 'development';

const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

let config = {};

if (env !== 'development') {
  config = prodConfig;
} else {
  config = devConfig;
}

module.exports = config;
