const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    client: {
      overlay: false // Desactiva el overlay de errores
    }
  }
};
