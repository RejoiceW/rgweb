const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
   },
  devServer: {
        proxy: {                                        // 配置跨域
//          '/jiaqi':{
//              target:'http://10.25.193.118:9998', 
//              changeOrigin:true, 
//              ws:true,
//              pathRewrite:{
//                  '^/jiaqi':''
//              }
//          },
            '/wenkang':{
            	target:'http://10.25.193.148:9998',
            	changeOrigin:true,
            	ws:true,
            	pathRewrite:{
                    '^/wenkang':''
                }
            }
        },                                           // 配置跨域处理,只有一个代理
        before: app => { }
    }
,
};
