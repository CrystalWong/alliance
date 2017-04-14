// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/user-api': {
          // target: 'http://10.10.33.48/',//开发
          target: 'http://10.10.32.48/',//测试
          changeOrigin: true,
          pathRewrite: {
            '^/user-api': ''
          }
        },
        '/jyhouse-union': {
          target: 'http://10.10.32.136/',//测试 合作中心
          // target: 'http://10.10.33.136/',//开发 合作中心
          changeOrigin: true,
          pathRewrite: {
            '^/jyhouse-union': ''
          }
        },
        '/jysteward-centerapipre': {
          // target: 'http://10.10.33.116/',//开发 金管家中心
          target: 'http://10.10.32.116/',//测试 金管家中心
          changeOrigin: true,
          pathRewrite: {
            '^/jysteward-centerapipre': ''
          }
        },
        '/recommend': {
          target: 'http://192.168.51.139',
          changeOrigin: true,
          pathRewrite: {
            '^/recommend': ''
          }
        },
        '/jycms-api': {
          target: 'http://app.jyall.com/jycms-api',
          changeOrigin: true,
          pathRewrite: {
            '^/jycms-api': ''
          }
        },
        '/ticket': {
          target: 'http://dev.jyall.com',
          changeOrigin: true,
          pathRewrite: {
            '^/ticket': ''
          }
        },
        '/common-push': {
          target: 'http://m.jyall.com/common-push',
          changeOrigin: true,
          pathRewrite: {
            '^/common-push': ''
          }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
