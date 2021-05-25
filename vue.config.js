module.exports = {
  transpileDependencies: [
    'vuetify',
    'quasar'
  ],
  css: {
    extract: false
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
}
