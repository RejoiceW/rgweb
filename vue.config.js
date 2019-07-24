//使用代理解决跨域

module.exports = {
  devServer: {
    proxy: {
      '/1api': { //商品管理
        target: 'http://10.25.193.205:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/1api': ''
        }
      },
      '/2api': { //商品类别管理
        target: 'http://10.25.193.177:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/2api': ''
        }
      },
      '/3api': { //商品描述管理
        target: 'http://10.25.193.118:9998', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/3api': ''
        }
      },
      '/4api': { //用户管理
        target: 'http://10.25.193.146:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/4api': ''
        }
      },
      '/5api': { //订单管理
        target: 'http://10.25.193.190:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/5api': ''
        }
      },
      '/6api': { //内容分类管理
        target: 'http://10.25.193.165:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/6api': ''
        }
      },
    }
  }
}

