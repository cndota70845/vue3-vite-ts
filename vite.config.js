const {resolve} = require('path')
module.exports = {
    base: './',
    port: 3000,
    hostname:'localhost',
    outDir: 'dist',
    https: false,
    // proxy: {
    //   '/': {
    //       target: 'http://219.242.113.135:3000/',
    //       changeOrigin: true,
    //       ws: true,
    //       rewrite: path => path.replace(/^\//, '')
    //   }
    // },
    alias: {
      // 键必须以斜线开始和结束
      '/@/': resolve(__dirname, './src'),
      '/@components/': resolve(__dirname, './src/components'),
      '/@assets/': resolve(__dirname, './src/assets'),
    }
  }