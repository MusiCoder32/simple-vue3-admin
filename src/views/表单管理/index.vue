<template>
    <simple-table
        :showAdd="true"
        ref="tableRef"
        :columns="columns"
        :getTableData="getTableData"
        @add="handleAdd"
        :showPage="false">
        <el-table-column label="操作" align="center" width="200">
            <template #default="scope">
                <div class="h-start-center">
                    <el-button type="primary" size="small" text icon="EditPen" @click="handleDesign(scope.row)">
                        设计
                    </el-button>
                    <el-button type="primary" size="small" text icon="EditPen" @click="handleEdit(scope.row)">
                        修改
                    </el-button>

                    <el-popconfirm title="确定删除吗？" @confirm="handleDel(scope.row)">
                        <template #reference>
                            <el-button type="danger" size="small" text icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
        </el-table-column>
    </simple-table>
    <simple-layer ref="layerRef" :columns="columns" @confirm="submit" />
</template>
<script lang="tsx" setup>
import { formsApi as httpApi } from '@/api/forms'
import { menusStore } from '@/stores/menus'
import { find } from 'lodash'
import openFormDesign from '@/form-engine/open-form-design'

const tableRef = ref()
const layerRef = ref()
const menusStoreObj = menusStore()

const { pathLabelMap } = storeToRefs(menusStoreObj)

const columns = ref([
    {
        dataIndex: 'name',
        title: '表单名称',
        queryHidden: true,
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'route',
        title: '所属菜单',
        queryHidden: true,
        formItem: {
            type: ElTreeSelect,
            opts: {
                valueKey: 'path',
                data: [{ label: '公共表单', path: 'common' }, ...menusStoreObj.menus],
            },
            required: true,
        },
        customRender(text) {
            if (text === 'common') {
                return '公共表单'
            }
            return $t(pathLabelMap.value[text]?.label)
        },
    },
    {
        dataIndex: 'path',
        title: '表单路径',
        queryHidden: true,
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'filePath',
        title: 'mock路径',
        queryHidden: true,
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'updateTime',
        title: '更新时间',
        customRender(text) {
            if (!text) {
                return '--'
            }
            return dayjs(text).format('YYYY-MM-DD')
        },
    },
    {
        dataIndex: 'description',
        title: '描述',
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

async function handleDesign(row) {
    const { path, route } = row
    await openFormDesign({ path, routePath: route })
    tableRef.value.initTable()
}

// 表格数据
// params <init> Boolean ，默认为false，用于判断是否需要初始化分页
async function getTableData(params) {
    try {
        const data = await httpApi.get(params)
        return {
            list: data,
        }
    } catch (e) {
        console.log(e)
    }
}

async function submit(data, type) {
    await httpApi[type](data)
    layerRef.value.close()
    tableRef.value.initTable()
}

// 删除
async function handleDel({ id }) {
    try {
        await httpApi.del({ id })
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
    const item = find(columns.value, { dataIndex: 'filePath' })
    item.formItem.opts = { disabled: false }
}

function handleEdit(model) {
    layerRef.value.edit({ model, col: 2 })
    const item = find(columns.value, { dataIndex: 'filePath' })
    item.formItem.opts = { disabled: true }
}
</script>
<style lang="scss" scoped>
.statusName {
    margin-right: 10px;
}
</style>
