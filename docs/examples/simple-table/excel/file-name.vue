<template>
    <simple-table :columns="columns" :list="tableData" :showExport="true" :excelFileName="excelFileName"></simple-table>
</template>
<script setup>
const excelFileName = ref('张三幻想录')
const tableData = [
    {
        id: 1,
        name: '中彩票了',
        user: '张三',
        type: '1',
        time: '2025-9-11',
        description: '梦见中彩票',
    },
    {
        id: 2,
        name: '看见小人',
        user: '李四',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
]
const columns = ref([
    {
        dataIndex: 'name',
        title: '名称',
    },
    {
        dataIndex: 'user',
        title: '申请人',
    },

    {
        dataIndex: 'time',
        title: '时间',
    },
    {
        dataIndex: 'description',
        title: '描述',
    },
])
</script>
