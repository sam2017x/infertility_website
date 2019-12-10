const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.config');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:8000'),
};

module.exports = merge(config, {
  cache: true,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: path.join(__dirname, '../src/index.jsx'),
  },
  devServer: {
    contentBase: path.join(__dirname, '../src/public'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    proxy: {
      "/api": "http://localhost:8000",
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
