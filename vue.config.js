// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // https://webpack.js.org/configuration/resolve/#resolvefallback
  // problem: Webpack 5 no longer polyfills Node.js core modules automatically
  // solve in vue-cli5:
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  },
  devServer: {
    port: 7891,
    open: false,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      '/api/': {
        target: 'https://www.mxnzp.com',
        changeOrigin: true,
        ws: false
      }
    }
  },
  pluginOptions: {
    // 插件预加载 scss 文件
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variables.module.scss'),
        path.resolve(__dirname, 'src/assets/styles/mixins.scss'),
        path.resolve(__dirname, 'src/assets/styles/common.scss'),
        path.resolve(__dirname, 'src/assets/styles/transition.scss'),
        path.resolve(__dirname, 'src/assets/styles/sideBar.scss')
      ]
    }
  },
  chainWebpack: config => {
    config.resolve
      .alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // svg 图标预加载
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
