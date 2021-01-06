const path = require('path')

module.exports = {
    proxy: {
        // 如果是 /api 打头，则访问地址如下
        '/api': {
          target: 'http://219.242.113.135:8080/',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        }
    },
    alias: {
      // 键必须以斜线开始和结束
      '/@/': path.resolve(__dirname, './src'),
      '/@components/': path.resolve(__dirname, './src/components'),
      '/@assets/': path.resolve(__dirname, './src/assets'),
    }
  }