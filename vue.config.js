module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9898/',
        // 允许跨域
        changeOrigin: true,
        onProxyReq(proxyReq) {
          proxyReq.removeHeader('origin');
        },
        pathRewrite: {
          '^/api': '/',
        },
      },
      '/p': {
        target: 'http://localhost:8989/',
        // 允许跨域
        changeOrigin: true,
        onProxyReq(proxyReq) {
          proxyReq.removeHeader('origin');
        },
        pathRewrite: {
          '^/p': '/p',
        },
      },
    },
  },
};
