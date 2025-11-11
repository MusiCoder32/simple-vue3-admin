---
title: 参与贡献
outline: [2, 3]
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/wyj.png',
//     avatar: 'https://github.com/MusiCoder32.png',
    name: 'Wang Yongjie',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: '/qh.png',
    name: 'Qiu Hua',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

# Our Team

Say hello world.

<VPTeamMembers size="small" :members="members" />
