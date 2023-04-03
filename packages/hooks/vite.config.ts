import { defineConfig, LibraryFormats } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const outputDir = {
  es: 'dist/es',
  cjs: 'dist/cjs'
}

const formats = Object.keys(outputDir)
  .map((i) => ({
    format: i as LibraryFormats,
    entryFileName: '[name].js',
    globals: {
      vue: 'Vue',
    },
    preserveModules: true,
    preserveModulesRoot: 'src',
    dir: resolve(__dirname, `./${outputDir[i]}`)
  }))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: 'src',
      outputDir: Object.values(outputDir),
      tsConfigFilePath: "./tsconfig.json"
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'hooks',
      formats: Object.keys(outputDir) as LibraryFormats[]
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: formats
    }
  }
})
