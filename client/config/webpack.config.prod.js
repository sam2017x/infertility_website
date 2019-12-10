const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000')
};

module.exports = merge(config, {
  mode: 'production',
  entry: {
    main: path.join(__dirname, '../src/index.jsx')
  },
  optimization: {
    minimize: true,
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'], { root: path.resolve(__dirname, '..') }),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
