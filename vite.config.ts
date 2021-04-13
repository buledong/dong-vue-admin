import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
/**
 * @type {import('vite').UserConfig}
 */
export default {
  base: '/home/',
  plugins: [vuePlugin(), vueJsx()],
  build: {
    minify: false,
  },
  server: {
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
    },
  },
}
