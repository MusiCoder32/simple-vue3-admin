<template>
    <simple-table :columns="columns" :getTableData="getTableData" />
</template>
<script lang="tsx" setup>
import { sortBy } from 'lodash'
enum TypeEnum {
    '1' = '白日梦',
    '2' = '菌中毒',
}

let list = [
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
    {
        id: 3,
        name: '有女朋友了',
        user: '张三',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
    {
        id: 4,
        name: '上岸了1',
        user: '李四',
        type: '1',
        time: '2025-9-11',
        description: '去云南旅游',
    },
    {
        id: 4,
        name: '上岸了2',
        user: '李四',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
    {
        id: 4,
        name: '上岸了3',
        user: '李四',
        type: '1',
        time: '2025-9-11',
        description: '去云南旅游',
    },
]
const columns = ref([
    {
        dataIndex: 'user',
        title: '申请人',
        merge: true,
    },
    {
        dataIndex: 'type',
        title: '类别',
        merge: true,
        customRender(text) {
            return TypeEnum[text]
        },
    },
    {
        dataIndex: 'name',
        title: '名称',
    },
    {
        dataIndex: 'time',
        title: '时间',
        width: 100,
    },
    {
        dataIndex: 'description',
        title: '描述',
        overflow: true,
    },
])

// 表格数据
async function getTableData(params) {
    try {
        // const {list} = await httpApi.get(params)
        return {
            list: sortBy(list, ['user', 'type']),
        }
    } catch (e) {
        console.log(e)
    }
}
</script>
