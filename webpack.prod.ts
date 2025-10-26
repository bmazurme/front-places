/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from 'webpack-merge';
import { config as dotEnvConfig } from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPreconnectPlugin from 'html-webpack-preconnect-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import CompressionPlugin from 'compression-webpack-plugin';

import type { Configuration } from 'webpack';
import common from './webpack.common';

dotEnvConfig();

const client = (env: { production?: boolean; }) => merge<Configuration & { devServer?: any; }>(common, {
  optimization: {
    minimize: !!env.production,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        // minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
  },
  plugins: [
    new Dotenv({ path: env.production ? './.env.production' : './.env.development' }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      preconnect: [
        'https://api.places.ntlstl.dev',
      ],
    }),
    new HtmlWebpackPreconnectPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new InterpolateHtmlPlugin({
      NODE_ENV: 'development',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '.' },
        { from: 'public/favicon.ico', to: '.' },
        { from: 'public/robots.txt', to: '.' },
        // { from: 'public/logo192.png', to: '.' },
        // { from: 'public/logo512.png', to: '.' },
      ],
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
});

export default [client];
