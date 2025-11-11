<template>
    <div class="p4 bg-white">
        <h1>演于只读下设置姓名字段可编辑</h1>
        <simple-form
            class="readonly"
            route-path="/demos"
            path="demo4-1"
            :schemaContext="schemaContext"
            v-model="model"></simple-form>
        <h1 class="mt5">演于编辑模式下设置曾用名列表为只读</h1>
        <simple-form route-path="/demos" path="demo4-2" :schemaContext="schemaContext" v-model="model"></simple-form>
        <div class="h-center-center">
            <el-button type="primary" @click="clickHandle">提交</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const model = ref({
    name: '张三',
    marry: '1',
    age: 18,
    like: '乒乓',
    oldNames: [
        {
            oldName: '李四',
            length: 2,
        },
        {
            oldName: '王五',
            length: 2,
        },
    ],
})
const hobbyOptions = [
    {
        label: '鸡肉',
        value: '鸡肉',
    },
    {
        label: '猪肉',
        value: '猪肉',
    },
    {
        label: '牛肉',
        value: '牛肉',
    },
]
function clickHandle() {
    alert(JSON.stringify(model.value))
}

const schemaContext = { hobbyOptions }
// provide('$selfEvents', {})
</script>
