const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 根目录内的文件夹名，里面可能含有css img  js等文件夹 由用户来自定义
  assetsDir: 'static',
  // publicPath: '/',
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
  //根据开发模式禅师公共路径：这个是必须的
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // devtool: 'cheap-module-eval-source-map'
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 5000000000,
      //生成文件的最大体积
      maxAssetSize: 30000000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
})
