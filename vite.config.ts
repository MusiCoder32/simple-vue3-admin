import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from 'vite'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteMockServe } from 'vite-plugin-mock'

import viteCompression from 'vite-plugin-compression'
import { simpleMockProxy } from 'simple-mock-proxy'
import UnoCSS from 'unocss/vite'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

dayjs.extend(utc)
dayjs.extend(timezone)

export default defineConfig((envObj) => {
    const { mode, command } = envObj
    console.log('当前环境:', mode)
    const { PORT, VITE_PROXY_TARGET } = loadEnv(mode, process.cwd(), '')

    const plugins = [
        vue(),
        vueJsx(),
        UnoCSS(),
        viteCompression({
            threshold: 1024 * 10,
        }),

        // #region AutoImport
        AutoImport({
            // resolvers: [ElementPlusResolver(), customResolver()],
            resolvers: [ElementPlusResolver()],
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            imports: [
                'vue',
                'pinia',
                'vue-router',
                {
                    '@/utils/index.tsx': [
                        // default imports
                        ['*', 'utils'], // import { default as axios } from 'axios',
                    ],
                    'vue-i18n': ['useI18n'],
                    dayjs: [['default', 'dayjs']],
                },
            ],
            dts: 'src/typings/auto-imports.d.ts',
            vueTemplate: true,
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            dirs: ['src/components'],
            dts: 'src/typings/components.d.ts',
        }),
        // #endregion AutoImport

        viteMockServe({
            mockPath: './mock/api',
            enable: true,
            watchFiles: true,
            logger: true,
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/images')],
            symbolId: 'icon-[dir]-[name]',
            inject: 'body-last',
            customDomId: '__svg__icons__dom__',
        }),
        VueI18nPlugin(),
    ]
    if (command == 'build') {
        //开发环境下,该插件会导致pbulic下的资源无法访问
        plugins.push(
            createHtmlPlugin({
                // html title
                minify: false,
                inject: {
                    data: {
                        buildTime: dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss Z'),
                        // projectName: VITE_PROJECT_NAME,
                        buildMode: mode,
                    },
                },
            }),
        )
    }
    return {
        plugins,
        resolve: {
            alias: {
                /*
        es11语法import.meta.url获取当前模块信息
        */
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        css: {
            // css预处理器
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        `$env: "${mode}";`, // 注入SCSS变量
                        '@import "@/assets/styles/mixin.scss";',
                    ].join('\n'),
                },
            },
        },
        // #region mockProxy
        server: {
            host: true,
            port: +PORT,
            proxy: simpleMockProxy({
                proxy: {
                    '/api-v1': {
                        target: VITE_PROXY_TARGET,
                        changeOrigin: true,
                    },
                },
                mockPath: '/mock',
                mockWrite: false,
            }),
        },
        // #endregion mockProxy
        build: {
            target: 'es2015',
            outDir: 'dist',
            minify: 'terser',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: true,
                    drop_debugger: true,
                },
            },

            rollupOptions: {
                // 拆包
                output: {
                    manualChunks: {
                        'vue-chunks': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
                        'element-plus': ['element-plus'],
                    },
                },
            },
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
        },
        optimizeDeps: {
            include: [
                'vue',
                'vue-router',
                'element-plus/es/locale/lang/zh-cn',
                'element-plus/es/locale/lang/en',
                'axios',
                'jsoneditor',
                'dayjs',
            ],
        },
    }
})

// #region customResolver
function customResolver() {
    return (name) => {
        if (name.match(/[a-zA-Z]+Column/)) {
            return {
                name,
                from: '@/common/query-columns',
            }
        }
    }
}
// #endregion customResolver
