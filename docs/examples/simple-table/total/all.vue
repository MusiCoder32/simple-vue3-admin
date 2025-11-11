<template>
    <simple-table
        :columns="columns"
        :list="tableData"
        :showIndex="false"
        :showExport="true"
        :otherOptions="{
            rowClassName,
            border: true,
        }"
        :otherSpanMethod="otherSpanMethod"></simple-table>
</template>
<script setup>
const tableData = [
    {
        name: '中彩票了',
        user: '张三',
        count: 100,
        time: '2025-9-11',
        description: '梦见中彩票',
    },
    {
        name: '中奖了',
        user: '张三',
        count: 5,
        time: '2025-9-15',
    },
    {
        name: '薅羊毛',
        user: '李四',
        count: 5000,
        time: '2025-9-11',
    },
    {
        name: '打工',
        user: '李四',
        count: 5000,
        time: '2025-10-11',
    },
    {
        name: '搬砖',
        user: '李四',
        count: 5000,
        time: '2025-11-11',
    },
]
const columns = ref([
    {
        dataIndex: 'user',
        title: '姓名',
        grandTotalTitle: '总计',
        merge: true,
    },
    {
        dataIndex: 'name',
        title: '项目',
        subTotalTitle: '小计',
    },
    {
        dataIndex: 'time',
        title: '时间',
    },
    {
        dataIndex: 'count',
        title: '金额',
        subTotal: true,
    },
])

function otherSpanMethod({ row, column }) {
    if (row.isSubtotal) {
        if (column.property === 'name') {
            return [1, 2] // 合并两列
        } else if (column.property === 'time') {
            return [0, 0]
        }
    } else if (row.isTotal) {
        if (column.property === 'user') {
            return [1, 3] // 合并3列
        } else if (column.property === 'name' || column.property === 'time') {
            return [0, 0]
        }
    }
}
// 设置统计行样式
function rowClassName({ row }) {
    return row.isSubtotal || row.isTotal ? 'fw600' : ''
}
</script>
