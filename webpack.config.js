const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entryFile = path.join(__dirname, 'src', 'index.js')
const env = process.env.NODE_ENV
const prod = env === 'production'
const port = 3000

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    app: prod ? entryFile : ['react-hot-loader/patch', entryFile]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: prod ? '[name]-[contenthash].js' : '[name].js',
    pathinfo: !prod
  },
  // stats: 'minimal',
  devtool: prod ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  devServer: {
    port,
    // stats: 'errors-only',
    // overlay: true,
    // contentBase: false,
    // historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: ({context = ''}) => /node_modules/.test(context),
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.sass$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: prod ? 'img/[name]-[hash].[ext]' : 'img/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.(woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: prod ? 'fonts/[name]-[hash].[ext]' : 'fonts/[name].[ext]'
            }
          }
        ],
      }
    ]
  },
  plugins: [
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.optimize.OccurrenceOrderPlugin(),
    !prod && new webpack.NoEmitOnErrorsPlugin(),
    prod && new webpack.optimize.ModuleConcatenationPlugin(),
    prod && new webpack.HashedModuleIdsPlugin(),
    prod && new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      append: false
    }),
    new MiniCssExtractPlugin({
      filename: prod ? '[name]-[contenthash].css' : '[name].css',
      chunkFilename: prod ? '[id].[contenthash].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body'
    }),
  ].filter(Boolean)
}
