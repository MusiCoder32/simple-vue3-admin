<template>
    <el-button type="primary" @click="handleView">查看弹窗</el-button>
    <el-button type="primary" @click="handleEdit">编辑弹窗</el-button>
    <el-button type="primary" @click="handleAdd">新增弹窗</el-button>
    <simple-layer ref="layerRef" :columns="columns" @confirm="submit" />
</template>
<script lang="tsx" setup>
enum TypeEnum {
    '1' = '白日梦',
    '2' = '菌中毒',
}

const layerRef = ref()
const model = {
    id: 2,
    name: '看见小人',
    user: '李四',
    type: '2',
    time: '2025-9-11',
    description: '去云南旅游',
}

const columns = ref([
    {
        dataIndex: 'name',
        title: '名称',
        queryTitle: '查询姓名',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'user',
        title: '申请人',
        formItem: {
            type: ElInput,
            required: true,
            layerSort: 1,
        },
    },
    {
        dataIndex: 'type',
        title: '类别',
        formItem: {
            type: ElSelect,
            required: true,
            opts: {
                slots: {
          
                    ...utils.setSelectOption(TypeEnum),
                },
            },
        },
    },
    {
        dataIndex: 'time',
        title: '时间',
        width: 100,
        formItem: {
            type: ElDatePicker,
            value: dayjs().format('YYYY-MM-DD'),
            opts: {
                type: 'date',
                disabled: true,
            },
        },
    },
    {
        dataIndex: 'description',
        title: '描述',
        formItem: {
            col: 1,
            type: ElInput,
            opts: {
                type: 'textarea',
            },
        },
    },
])

// 提交
async function submit(data, type) {
    // await httpApi[type](data)
    if (type === 'add') {
        alert(
            JSON.stringify({
                类型: '添加',
                数据: data,
            }),
        )
    } else if (type === 'update') {
        alert(
            JSON.stringify({
                类型: '编辑',
                数据: data,
            }),
        )
    }
    layerRef.value.close()
}

// 新增弹窗功能
function handleAdd() {
    layerRef.value.add({
        col: 2,
    })
}

function handleEdit() {
    layerRef.value.edit({ model, col: 2 })
}
function handleView() {
    layerRef.value.look({ model, col: 2 })
}
</script>
