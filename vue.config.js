const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {},
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  }
})
