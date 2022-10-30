const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: 'warning',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/drum-machine/'
    : '/'
})
