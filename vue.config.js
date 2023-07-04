let port = "6911"
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const isProd = process.env.NODE_ENV === "production"

module.exports = {
  lintOnSave: false,
  //baseUrl: '/sub-path/',
  configureWebpack: {
    devtool: false,
    // entry: ["babel-polyfill", "./src/main.js"],
    // plugins: [
    //   // service worker caching
    //   new SWPrecacheWebpackPlugin({
    //     cacheId: 'damcorp-panel-v.1.1.0(' + (new Date()).getTime() + ')',
    //     filename: 'service-worker.js',
    //     staticFileGlobs: ['dist/**/*.{html,css,png,svg,ico,otf,eot,ttf,woff,woff2}'],
    //     minify: true,
    //     stripPrefix: 'dist/'
    //   })
    // ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: port,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {
      // app is an express instance
    }
  },
  // configureWebpack: {
  //   optimization: {
  //     minimizer: isProd ? [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             drop_console: true
  //           },
  //         }
  //       })
  //     ] : []
  //   }
  // }
}