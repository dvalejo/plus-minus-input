const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  //devtool: 'source-map',
  entry: {
    'input-counter': './src/input-counter.ts',
    'input-counter.min': './src/input-counter.ts'
  },
  devServer: {
    port: 8000,
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          (isProduction ? MiniCssExtractPlugin.loader : 'style-loader'), 'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'input-counter.css'
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: isProduction
    ? {
      minimize: true,
      minimizer: [new TerserPlugin({
        include: /\.min\.js$/
      })]
    }
    : {
      minimize: false
    },
  // minimizer: [new UglifyJsPlugin({
  //   include: /\.min\.js$/
  // })]
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'MyControls'
  },
};