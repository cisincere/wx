module.exports = {
  devServer: {
    proxy: {
      '/java': {
        target: 'http://localhost:9898/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/pthon': {
        target: 'http://localhost:8989/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/pthon': '',
        },
      },
    },
  },
};
