<template>
    <simple-table :columns="columns" :list="tableData" :showIndex="false"></simple-table>
</template>
<script setup lang="tsx">
import { ElForm, ElFormItem } from 'element-plus'

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
        columnType: 'expand',
        customRender(text, row) {
            return (
                <ElForm class="pl5">
                    <ElFormItem label="人员：">{row.user}</ElFormItem>
                    <ElFormItem label="事由：">{row.name}</ElFormItem>
                    <ElFormItem label="详情：">{row.description}</ElFormItem>
                </ElForm>
            )
        },
    },
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
