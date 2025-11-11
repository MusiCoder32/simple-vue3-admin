<template>
    <simple-table
        :showAdd="true"
        ref="tableRef"
        :columns="columns"
        :getTableData="getTableData"
        @add="handleAdd"
        :showPage="true">
        <el-table-column label="操作" align="center" width="120">
            <template #default="scope">
                <div class="h-center-center">
                    <el-button class="!m0 !p0 !mr2" type="primary" size="small" text @click="handleLook(scope.row)">
                        查看
                    </el-button>
                    <el-button class="!m0 !p0 !mr2" type="primary" size="small" text @click="handleEdit(scope.row)">
                        修改
                    </el-button>

                    <el-popconfirm title="确定删除吗？" @confirm="handleDel(scope.row)">
                        <template #reference>
                            <el-button class="!ml0 !p0" type="danger" size="small" text>删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
        </el-table-column>
    </simple-table>
    <simple-layer ref="layerRef" :columns="columns" @confirm="submit" />
</template>
<script lang="tsx" setup>
import { find } from 'lodash'

enum TypeEnum {
    '1' = '白日梦',
    '2' = '菌中毒',
}

const tableRef = ref()
const layerRef = ref()
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
]
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
        customRender(text) {
            return TypeEnum[text]
        },
    },
    {
        dataIndex: 'time',
        title: '时间',
        width: 100,
        queryHidden: true,
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
        overflow: true,
        queryHidden: true,
        formItem: {
            col: 1,
            type: ElInput,
            opts: {
                type: 'textarea',
            },
        },
    },
])

// 表格数据
async function getTableData(params) {
    try {
        // const data = await httpApi.get(params)
        return {
            list: [...list],
            total: 23,
        }
    } catch (e) {
        console.log(e)
    }
}
// 提交
async function submit(data, type) {
    // await httpApi[type](data)
    if (type === 'add') {
        list.push({ id: +new Date(), ...data })
    } else if (type === 'update') {
        list.forEach((item) => {
            if (item.id === data.id) {
                Object.assign(item, data)
            }
        })
    }
    layerRef.value.close()
    tableRef.value.initTable()
}

// 删除
async function handleDel({ id }) {
    try {
        // await httpApi.del({ id })
        list = list.filter((item) => item.id !== id)
        tableRef.value.initTable()
        ElMessage.success('成功')
    } catch (e) {
        console.log(e)
    }
}
// 新增弹窗功能
function handleAdd() {
    layerRef.value.add({
        col: 2,
    })
    const item = find(columns.value, { dataIndex: 'time' })
    item.disabled = false
}

function handleEdit(model) {
    layerRef.value.edit({ model, col: 2 })
}
function handleLook(model) {
    layerRef.value.look({ model, col: 2 })
}
</script>
