const {resolve} = require('path')
module.exports = {
    proxy: {
        // 如果是 /api 打头，则访问地址如下
        '/api': {
          target: 'http://219.242.113.135:3080/',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        }
    },
    alias: {
      // 键必须以斜线开始和结束
      '/@/': resolve(__dirname, './src'),
      '/@components/': resolve(__dirname, './src/components'),
      '/@assets/': resolve(__dirname, './src/assets'),
    }
  }