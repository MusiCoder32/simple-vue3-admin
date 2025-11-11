import { defineConfig } from 'vitepress'

import { currentVersion, editPattern } from './shared'
import { createNav, createSideBar } from './utils'

export const en = defineConfig({
  lang: 'en-US',
  title: 'di-ui',
  description: 'Biz UI Components For Vue 3',
  base: '/en-us/',
  themeConfig: {
    nav: createNav('en-us', [
      ['Guild', 'guide'],
      ['Components', 'components'],
    ]).concat({
      text: currentVersion,
      link: '',
    }),
    get sidebar() {
      return createSideBar('en-us', [
        ['Guild', 'guide'],
        ['Components', 'components'],
      ])
    },
    editLink: {
      pattern: editPattern,
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Only available for BYD',
      copyright: `Copyright © 2024-${new Date().getFullYear()} BYD`,
    },
  },
})
