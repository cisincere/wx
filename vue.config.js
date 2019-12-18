module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://111.229.100.35:9898/',
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
        // target: 'http://111.229.100.35:8989/',
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
