const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'component',
      filename: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                pragma: "createElement"
              }
            ]
          ]
        }
      }]
    },  {
      test: /\.css/,
      use: {
        loader: require.resolve('./lib/component-css-loader.js')
      }
    }]
  }
}