import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  esbuild: {
    supported: {
      'optional-catch-binding': false
    }
  },
  build: {
    // these are the targets supported by zxing webassembly
    // ----------------------------------------------------
    // according to: https://esbuild.github.io/api/#target
    // esbuild will transpile newer ES syntaxes according to this list
    // newer web APIs will still have to be polyfilled if they don't exist
    // ----------------------------------------------------
    // according to: https://github.com/emscripten-core/emscripten/blob/b72550132f8381c3f3021853505159f6f6b11e48/src/settings.js#L1763-L1812
    // even older browsers may still be supported, however let's settle on this until someone complains
    // ----------------------------------------------------
    // safari 13 support is requested by: https://github.com/Sec-ant/barcode-detector/issues/11
    // others are defaults from emscripten and vite
    target: ['es2020', 'edge88', 'firefox68', 'chrome75', 'safari13'],
    lib: {
      entry: {
        'vue-qrcode-reader': resolve(__dirname, 'src/index.ts')
      },
      formats: ['es', 'umd'],
      name: 'VueQrcodeReader',
      fileName: (format, entryName) =>
        format === 'es' ? `${entryName}.js` : `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
