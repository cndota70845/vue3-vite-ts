const {resolve} = require('path')
const { sourceMapPlugin } = require('vite/dist/node/server/serverPluginSourceMap')
module.exports = {
    base: '/',
    port: 3000,
    outDir: 'dist',
    https: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // },
    alias: {
      // 键必须以斜线开始和结束
      '/@/': resolve(__dirname, './src'),
      '/@components/': resolve(__dirname, './src/components'),
      '/@assets/': resolve(__dirname, './src/assets'),
    }
  }