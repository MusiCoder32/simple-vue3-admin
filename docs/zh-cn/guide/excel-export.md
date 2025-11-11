---
title: Excel导出
outline: [2, 3]
sort: 6
---

# 纯前端实现Excel导出

## 概述

利用`xlsx-js-style`，结合`el-table`，在`simple-table`组件中实现纯前端导出excel，支持勾选行列，设置列宽等功能

<a @click="clickHandle" href="./../components/simple-table.html">查看Excel导出功能</a>

<script setup>
function clickHandle() {
    setTimeout(() => {
        const targetElement = document.getElementById('导出excel')
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // 可选: 'auto', 'smooth' 平滑滚动
                block: 'center', // 可选: 'start', 'center', 'end', 'nearest'
            })
        }
    },1500)
}
</script>
