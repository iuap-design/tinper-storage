const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'tinper-storage.js',
    library: "tinper-storage",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
        banner: `
            description:  基于 Localstorage 的数据缓存封装方案
            author: Yonyou FED Team
            date: 2018-04-27
            version: V0.0.2
            file: [file]
        `
    })
]
};