module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9898/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
      // 添加python后端跨域支持
      // '/api/p': {
      //   target: 'http://localhost:8989/',
      //   // 允许跨域
      //   changeOrigin: true,
      //   ws: false,
      //   pathRewrite: {
      //     '^/api/p': '/',
      //   },
      // },
    },
  },
};
