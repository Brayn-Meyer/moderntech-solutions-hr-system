const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Modern Tech Solutions'
      return args
    })
  }
})
