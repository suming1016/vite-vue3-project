import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import createGzip from 'rollup-plugin-gzip'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, process.cwd())
  console.log('配置', command, mode, env, import.meta)
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: [
          'vue', // 导入内置的所有api
          'vue-router',
          'pinia',
          // "@vueuse/core",
          {
            'vue-router': ['createRouter'], // 导入指定的api
            /* 自定义模块 */
            // "@/hooks/api.ts": ["defineApi"], // 导入指定文件下的指定api
            // "@/api/index.ts": [["*", "api"]], // 导入指定文件下的api，并重命名
            '@/store/index.ts': [['*', 'store']],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dts: fileURLToPath(new URL('types/auto-imports.d.ts', import.meta.url)),
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: fileURLToPath(new URL('types/components.d.ts', import.meta.url)),
      }),
      visualizer({
        filename: 'bundle-stats.html', // 输出文件的名称，默认为 'stats.html'
        gzipSize: true, // 是否以 gzip 格式输出报告
        // sourcemap: true, // 是否显示文件大小的分布情况
        open: true, //在默认用户代理中打开生成的文件
      }),
      ...(mode === 'development' && env.VITE_DEVTOOLS === 'true'
        ? [vueDevTools()]
        : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      // https://www.rollupjs.com/configuration-options/#output-entryfilenames
      rollupOptions: {
        output: {
          entryFileNames: 'js/app.[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: ({ name, names, type }) => {
            console.log('assetInfo', name, names, type)
            if (names && /\.(js|mjs|cjs)$/.test(names[0])) {
              return `js/[name].[hash][extname]`
            } else if (names && /\.(css|less|scss|sass)$/.test(names[0])) {
              return `css/[name].[hash][extname]`
            } else if (
              names &&
              /\.(png|jpe?g|gif|svg|webp|ico|bmp|tiff)$/.test(names[0])
            ) {
              return `images/[name].[hash][extname]`
            } else if (names && /\.(ttf|woff|woff2|eot|otf)$/.test(names[0])) {
              return `fonts/[name].[hash][extname]`
            } else if (names && /\.(mp4|webm)$/.test(names[0])) {
              return `videos/[name].[hash][extname]`
            } else {
              return `[name].[hash][extname]`
            }
          },
          // manualChunks: { // 分包 方法一，
          // a: ["lodash", "vue"],
          // lodash: ["lodash"],
          // },
          manualChunks(id) {
            // 静态资源分拆打包  // 分包 方法二
            if (id.includes('node_modules')) {
              //把vue vue-router  @vueuse 等核心模块打包成一个文件
              if (id.includes('vue')) {
                return 'vue'
              } else {
                // return "vendor";
                //最小化拆分包
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString()
              }
            }
          },
        },
        plugins: [
          // 添加 Gzip 压缩插件
          createGzip({
            minSize: 1024 * 100, // 设置最小压缩大小为 100KB
          }),
        ],
      },
    },
    server: {
      watch: {
        usePolling: true, // 启用轮询以支持环境变量热更新
      },
    },
  }
})
