import { defineConfig } from 'vitepress'

import { currentVersion, editPattern } from './shared'
import { createNav, createSideBar } from './utils'

export const zh = defineConfig({
    lang: 'zh-CN',
    title: 'Simple Vue3 Admin',
    description: '极简的Vue3后台管理模板',
    themeConfig: {
        nav: createNav('zh-cn', [
            ['开始', 'guide'],
            ['组件', 'components'],
   
        ]).concat({
            text: currentVersion,
            link: '',
        }),
        get sidebar() {
            return createSideBar('zh-cn', [
                ['开始', 'guide'],
                ['组件', 'components'],
                ['指令', 'directive'],
                ['方法', 'method'],
                ['知识点', 'knowledge'],
            ])
        },
        editLink: {
            pattern: editPattern,
            text: '在 Gitee 上编辑此页面',
        },
        footer: {
            message: '致力于成为上手难度最低的中后台前端框架',
            copyright: `版权所有 © 2024-${new Date().getFullYear()}`,
        },
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        outline: {
            label: '页面导航',
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
    },
})
