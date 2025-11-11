<template>
    <div style="width: 200px; height: 100px; border: 1px solid; background-color: white" v-html="value"></div>

    <el-button @click="test">script自动解析</el-button>
    <el-button @click="test2">img自动加载</el-button>
    <el-button @click="test3">a标签点击触发</el-button>
</template>

<script lang="ts" setup>
import { xssApi } from '@/api/xss'
const value = ref()

async function test() {
    window.open('http://localhost:8088/mock/xss/script')
}
async function test2() {
    value.value = await xssApi.getImg()
}
async function test3() {
    value.value = await xssApi.getHref()
}
</script>
