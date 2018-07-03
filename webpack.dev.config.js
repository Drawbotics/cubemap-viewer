const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');

const webpackBaseConfig = require('./webpack.base.config.js');


const WEBPACK_PORT = 4001;


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    publicPath: '/',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          `The app is running at http://localhost:${WEBPACK_PORT}`,
          `The app is running at http://${ip.address()}:${WEBPACK_PORT}`
        ],
      },
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: WEBPACK_PORT,
    inline: true,
    hot: false,
    historyApiFallback: true,
    publicPath: '/',
    quiet: true,
    stats: false,
    noInfo: true,
    clientLogLevel: 'none',
    overlay: true,
    contentBase: [path.join(__dirname, '/'), path.join(__dirname, 'node_modules')],
  },
});
