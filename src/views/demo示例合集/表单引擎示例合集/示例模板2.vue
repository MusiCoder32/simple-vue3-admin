<template>
    <div class="p4 bg-white">
        <simple-form route-path="/demos" path="demo2" :schemaContext="schemaContext" v-model="model"></simple-form>
        <div class="h-center-center">
            <el-button type="primary" @click="clickHandle">提交</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const model = ref({
    age: 18,
    oldNames: [{}, {}],
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
