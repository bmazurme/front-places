import path from 'path';
import { merge } from 'webpack-merge';
import { config as dotEnvConfig } from 'dotenv';

import type { Configuration } from 'webpack';

type Environment = 'development' | 'production' | 'none' | undefined;

dotEnvConfig();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const common = merge<Configuration & {devServer?: any}>({
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV as Environment ?? 'development',
  entry: ['./src/index.tsx'],
  output: {
    publicPath: '/',
    // filename: 'bundle.js',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.join(__dirname, 'build'),
  },
});

export default common;
