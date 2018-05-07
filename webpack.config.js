const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    localStorage: './src/localStore.js',
    sessionStorage: './src/sessionStore.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
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
            description:  结合Localstorage和SessionStorage的数据缓存方案
            author: Yonyou FED Team
            date: 2018-05-07
            version: V0.0.2
            file: [file]
        `
    })
]
};