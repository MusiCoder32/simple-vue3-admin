import path from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import UnoCSS from 'unocss/vite'

import { en } from './en'
import { repoUrl } from './shared'
import { injectPreAndNextLink } from './utils'
import { zh } from './zh'

const utilsUrl = path.resolve(import.meta.dirname, '../../src/utils/index.ts')
// https://vitepress.dev/reference/site-config
export default defineConfig((envObj) => {
    const { mode, command } = envObj
    return {
        // srcDir: 'docs',
        lang: 'zh-cn',
        head: [['link', { rel: 'icon', type: 'image/png', href: '/vite.png' }]],
        themeConfig: {
            logo: { src: '/vite.png', width: 24, height: 24 },
            // https://vitepress.dev/reference/default-theme-config
            socialLinks: [{ icon: 'github', link: repoUrl }],
        },
        rewrites: {
            'zh-cn/:rest*': ':rest*',
        },
        locales: {
            root: { label: '简体中文', ...zh },
            'en-us': { label: 'English', ...en },
        },
        markdown: {
            lineNumbers: true,
            config(md) {
                md.use(MermaidMarkdown)
                md.use(vitepressDemoPlugin, {
                    demoDir: path.resolve(import.meta.dirname, '../..'),
                })
            },
        },
        transformPageData(pageData, ctx) {
            return injectPreAndNextLink(pageData, ctx)
        },
        vite: {
            resolve: {
                alias: {
                    root: fileURLToPath(new URL('../../src', import.meta.url)),
                },
            },
            plugins: [
                vueJsx(),
                UnoCSS(),
                MermaidPlugin(),
                AutoImport({
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
                            'root/utils/index.tsx': [['*', 'utils']],
                            'vue-i18n': ['useI18n'],
                            dayjs: [['default', 'dayjs']],
                        },
                    ],
                    dts: 'typings/auto-imports.d.ts',
                    vueTemplate: true,
                }),
                Components({
                    resolvers: [ElementPlusResolver()],
                    include: [
                        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                        /\.vue$/,
                        /\.vue\?vue/, // .vue
                    ],
                    dts: 'typings/components.d.ts',
                }),
                VueI18nPlugin({
                    ssr: true,
                    defaultSFCLang: 'yaml',
                    allowDynamic: true,
                    // locale messages resource pre-compile option
                }),
            ],
            optimizeDeps: {
                include: ['mermaid'],
            },
            ssr: {
                noExternal: ['mermaid'],
            },
            css: {
                // css预处理器
                preprocessorOptions: {
                    scss: {
                        additionalData: [
                            `$env: "${mode}";`, // 注入SCSS变量
                            '@import "root/assets/styles/mixin.scss";',
                        ].join('\n'),
                    },
                },
            },
            server: {
                proxy: {
                    '/pdfjs': {
                        target: 'http://localhost:8088',
                        changeOrigin: true,
                    },
                    '/mock': {
                        target: 'http://localhost:8088',
                        changeOrigin: true,
                    },
                },
            },
        },
    }
})
