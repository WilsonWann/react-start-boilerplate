const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSvgDataUri = require('mini-svg-data-uri');
const TerserWebpackPlugin = require("terser-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    ids: true
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    noParse: '/lodash/',
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0
            }
          },
          'image-webpack-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "reactVendor"
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilityVendor"
        },
        bootstrapVendor: {
          test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
          name: "bootstrapVendor"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "vendor",
        }
      }
    },
    runtimeChunk: "single",
    minimizer: [
      new TerserWebpackPlugin({ extractComments: false })
    ],
    moduleIds: 'deterministic'
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 100,
    maxAssetSize: 100
  },
  devtool: 'source-map',
  plugins: [
    // new WebpackDashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inlineSource: 'runtime+//.js',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ],
};