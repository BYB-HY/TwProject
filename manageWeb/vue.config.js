const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // devServer: {
  //   disableDotRule: true, // 提供一个页面来替代404响应
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /^/$/, to: '/views/landing.html' },
  //       { from: /^/subpage/, to: '/views/subpage.html' },
  //       { from: /./, to: '/views/404.html' },
  //     ],
  //   },
  // }
  // devServer:{
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changOrigin: true,
  //       pathRewrite:{
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})
