module.exports = {
  css: { extract: false },

  lintOnSave: false,

  transpileDependencies: ["webrtc-adapter"],

  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  }

};
