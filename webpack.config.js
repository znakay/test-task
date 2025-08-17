const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('imagemin-webpack-plugin').default;

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--mode=production');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './resources/scripts/index.js',
  output: {
    filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true, // заменяет CleanWebpackPlugin в webpack 5+
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                  ...(isProduction ? [
                    ['cssnano', { 
                      preset: ['default', {
                        discardComments: { removeAll: true },
                        normalizeWhitespace: true
                      }]
                    }]
                  ] : [])
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // инлайн файлы < 8kb
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                },
                modules: false, // важно для tree shaking
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ],
            cacheDirectory: true, // кеширование для быстрой сборки
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProduction ? '[name].[contenthash:8].chunk.css' : '[name].chunk.css'
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
    }),
    // Оптимизация изображений
    ...(isProduction ? [
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        gifsicle: { optimizationLevel: 7 },
        mozjpeg: { progressive: true, quality: 80 },
        pngquant: { quality: [0.6, 0.8] },
        svgo: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeEmptyAttrs', active: false }
          ]
        }
      })
    ] : [])
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isProduction, // удаляем console.log в продакшене
            drop_debugger: isProduction,
            pure_funcs: isProduction ? ['console.log', 'console.info'] : []
          },
          format: {
            comments: false, // удаляем комментарии
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssnanoMinify,
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
            }
          ]
        },
        test: /\.css$/i,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    // Tree shaking для удаления неиспользуемого кода
    usedExports: true,
    sideEffects: false, // укажите true если есть side effects
  },
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'resources/scripts'),
      '@styles': path.resolve(__dirname, 'resources/styles'),
      '@images': path.resolve(__dirname, 'resources/images'),
      '@fonts': path.resolve(__dirname, 'resources/fonts')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // Source maps только для разработки
  devtool: isProduction ? false : 'eval-source-map',
};