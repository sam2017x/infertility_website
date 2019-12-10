const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'],
      { verbose: true, beforeEmit: true }),
    new HtmlWebPackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              emitFile: true
            }
          }
        ]
      }
    ]
  }
};
