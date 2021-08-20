const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib.js'),
      name: 'Sastra',
      fileName: (format) => `sastra.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['alga-js'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'alga-js': 'algaJs'
        }
      }
    }
  }
})
