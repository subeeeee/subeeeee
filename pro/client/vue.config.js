const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_dev_port || 9527
const name = 'BillingSystem'

module.exports = {
  publicPath: 'web',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: { // 配置 webpack-dev-server 行为。
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '_c': resolve('src/components')
      }
    }
  }
}
