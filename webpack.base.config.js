const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const betterProgress = require('better-webpack-progress');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const rootDirs = [
  path.resolve(__dirname, 'src'),
];


module.exports = {
  resolve: {
    modules: [
      ...rootDirs,
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new ProgressPlugin(betterProgress({
      mode: 'compact',
    })),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Cubemap Viewer',
      // template: 'index.html',
      // inject: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: rootDirs,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.(otf|woff|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
