<template>
    <simple-table :showIndex="false" :columns="columns" :list="tableData"></simple-table>
</template>
<script setup>
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
        title: 'xxxx项目统计',
        children: [
            {
                title: '基本信息',
                children: [
                    {
                        dataIndex: 'name',
                        title: '名称',
                    },
                    {
                        dataIndex: 'user',
                        title: '申请人',
                    },
                ],
            },
            {
                title: '其他信息',
                children: [
                    {
                        dataIndex: 'time',
                        title: '时间',
                    },
                    {
                        dataIndex: 'description',
                        title: '描述',
                    },
                ],
            },
        ],
    },
])
</script>
