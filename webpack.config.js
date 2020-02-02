const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.pug$/,
        use: [ 'html-loader', 'pug-html-loader' ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
    ],
  },
  optimization: {
    minimizer: [ new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}) ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/view/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      { from: 'src/img', to: 'img', toType: 'dir' },
      { from: 'src/favicon.ico', to: 'favicon.ico', toType: 'file' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  mode: isProd ? 'production' : 'development',
  devServer: {
    noInfo: true,
    overlay: true,
    open: true,
    port: 3000,
    contentBase: path.join(__dirname, 'src'),
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  config.devtool = production ? false : 'cheap-module-source-map';
  return config;
};
