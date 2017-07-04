'use strict';

const path = require('path');

const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
  require('./config/dev')(app);
} else {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(compiler.outputPath, 'index.html'));
  });
}

app.use('/api', router);
require('./routes')(router);

app.listen(port, err => {
  /* eslint-disable */
  if (err) return console.error(err);
  console.log('App is listening on', port);
  /* eslint-enable */
});

module.exports = app;
