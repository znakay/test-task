const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './resources/scripts/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'resources/images', 
          to: 'images',
          globOptions: {
            ignore: ['**/.DS_Store']
          }
        },
        { 
          from: 'resources/fonts', 
          to: 'fonts',
          globOptions: {
            ignore: ['**/.DS_Store']
          }
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              colormin: true,
              convertValues: true,
              discardDuplicates: true,
              discardEmpty: true,
              mergeRules: true,
              minifyFontValues: true,
              minifySelectors: true,
              reduceIdents: false,
              svgo: true,
            },
          ],
        },
      }),
    ],
  },
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'resources/scripts'),
      '@styles': path.resolve(__dirname, 'resources/styles'),
      '@images': path.resolve(__dirname, 'resources/images'),
      '@fonts': path.resolve(__dirname, 'resources/fonts')
    }
  }
};