//使用代理解决跨域

module.exports = {
  devServer: {
    proxy: {
      '/1api': { //商品管理 奕桦
        target: 'http://10.25.193.205:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/1api': ''
        }
      },
      '/2api': { //商品类别管理 雨檬
        target: 'http://10.25.193.177:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/2api': ''
        }
      },
      '/3api': { //商品描述管理 佳琪
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
      '/6api': { //搜索 文康
        target: 'http://10.25.193.148:9996', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/6api': ''
        }
      },
      '/7api': { //搜索 金华
        target: 'http://10.25.193.165:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/7api': ''
        }
      },
      '/8api': { //
        target: 'http://10.25.193.148:9999', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/8api': ''
        }
      },
      '/9api': { //登录
        target: 'http://10.25.193.177:9995', //源地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/9api': ''
        }
      },
      '/11api': { //
        target: 'http://10.25.193.205:9998',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/11api': ''
        }
      },
      '/12api': { //购物车   feifei
        target: 'http://10.25.193.190:9997', //源地址
        // ws: true, //是否代理websockets
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/6api': ''
        }
      },
      '/13api': { //订单管理   feifei
        target: 'http://10.25.193.190:9999', //源地址
        // ws: true, //是否代理websockets
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/5api': ''
        }
      },
      '/wenkang': { //首页 文康
        target: 'http://10.25.193.148:9998',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/wenkang': ''
        }
      },
    }
  }
}
