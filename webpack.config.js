const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

module.exports = () => {
  const config = {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: __dirname + '/dist'
    },
    module: {
      rules: [{
          test: /.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS modules
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles SASS to CSS
            }
          ]
        },
        {
          test: /.(jpg|png|svg$)/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: false,
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: false
      }),
      new HtmlWebpackPlugin({
        filename: 'contacts.html',
        template: "./src/contacts.html",
        minify: false
      }),
      new HtmlWebpackPlugin({
        filename: 'investors.html',
        template: "./src/investors.html",
        minify: false
      }),
      new CopyWebpackPlugin({
        patterns: [{
            from: 'src',
            to: 'src'
          },
          {
            from: 'about',
            to: 'about'
          },
          {
            from: 'news',
            to: 'news'
          },
          {
            from: 'reviews',
            to: 'reviews'
          },
          {
            from: 'cabinet',
            to: 'cabinet'
          },
        ]
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'bundle.css',
        chunkFilename: '[id].css',
      })
    ],
    devServer: {
      port: 3000,
      hot: true,
      watchContentBase: true
    },
    resolve: {
      extensions: ['.js']
    }
  };

  return config;
};