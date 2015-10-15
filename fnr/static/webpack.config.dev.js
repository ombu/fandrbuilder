/**
 * Webpack dev config. Includes source maps and live reload.
 */

var LiveReloadPlugin = require('webpack-livereload-plugin');
var config = Object.create(require('./webpack.config'));

config.plugins.push(new LiveReloadPlugin());
config.devtool = 'cheap-module-eval-source-map';
config.output.filename = 'bundle-dev.js';

module.exports = config;
