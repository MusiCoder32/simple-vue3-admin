<template>
    <!-- row-key用于嵌套表格
    row-class-name用于表格行class,在表格拖动是使用 -->
    <simple-table
        ref="tableRef"
        :otherOptions="{
            'row-class-name': tableRowClassName,
            'row-key': 'id',
        }"
        :columns="columns"
        :getTableData="getTableData"
        :showIndex="false"
        :showAdd="true"
        @add="handleAdd"
        :showPage="false">
        <el-table-column label="操作" align="center" fixed="right" width="250">
            <template #default="scope">
                <div class="h-start-center">
                    <el-button type="primary" size="small" text icon="EditPen" @click="handleEdit(scope.row)">
                        修改
                    </el-button>
                    <el-button
                        v-if="scope.row.type !== MenuType['按钮']"
                        type="primary"
                        size="small"
                        text
                        @click="handleAdd(scope.row)"
                        icon="Plus">
                        新增
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
import Sortable from 'sortablejs'
import { menusApi } from '@/api/users'
import { getTreeData } from '@/utils/general'
import { MenuType } from '@/enums'

const httpApi = menusApi
const tableRef = ref()
const layerRef = ref()
const currentRow = ref()

const columns = ref([
    {
        dataIndex: 'name',
        title: '名称',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'route',
        title: '路由',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'icon',
        title: '图标',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'type',
        title: '类型',
        customRender(text) {
            let result
            Object.keys(MenuType).forEach((key) => {
                if (MenuType[key] === text) {
                    result = key
                }
            })
            return result
        },
        formItem: {
            type: ElSelect,
            required: true,
            opts: {
                slots: {
                    ...utils.setSelectOption(MenuType),
                },
            },
        },
    },
])

const tableRowClassName = ({ row }) => {
    return `${row.pid ? 'pid-' + row.pid : ''} id-${row.id} row-type-${row.type}`
}
onMounted(() => {
    rowDrop()
})
async function getTableData() {
    try {
        const data = await httpApi.get()
        if (Array.isArray(data)) {
            const result: any[] = getTreeData({ data }) || []
            return {
                list: result,
            }
        }
    } catch (e) {
        console.log(e)
    }
}

// 新增弹窗功能
const handleAdd = (row: any) => {
    layerRef.value.add({ title: '新增' })
    currentRow.value = row
}
// 编辑弹窗功能
const handleEdit = (row) => {
    layerRef.value.edit({ model: row })
}

// 新增、修改功能
async function submit(data, type) {
    if (currentRow.value?.id) {
        data.pid = currentRow.value.id
        currentRow.value = ''
    }
    await httpApi[type](data)
    layerRef.value.close()
    tableRef.value.initTable()
}

// 删除功能
const handleDel = async (data: any) => {
    let params = {
        id: data.id,
    }
    if (data?.children?.length > 0) {
        ElMessage.error('存在子集数据不能删除')
        return
    }
    await httpApi.del(params)
    tableRef.value.initTable()
    ElMessage.success('成功')
}

// 行拖动
function rowDrop() {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    const sortor = Sortable.create(tbody, {
        draggable: '.row-type-' + MenuType['菜单'],
        invertSwap: true,
        onMove(evt) {
            const data = tableRef.value.tableData
            let draggedObj = getId(evt.dragged)
            let relatedObj = getId(evt.related)
            if (draggedObj.parentId === relatedObj.parentId) {
                let parentId = draggedObj.parentId
                if (parentId) {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (item.id === parentId) {
                            exchange(item.children, draggedObj, relatedObj)
                            break
                        }
                    }
                } else {
                    exchange(data, draggedObj, relatedObj)
                }
                return true
            } else {
                return false
            }
        },
        onEnd() {
            console.log('move end')
            const data = tableRef.value.tableData
            const queue = [...data]

            const ids = []
            const sortNums = []
            while (queue.length) {
                const item = queue.shift()
                ids.push(item.id)
                sortNums.push(ids.length)
                if (Array.isArray(item.children)) {
                    queue.push(...item.children)
                }
            }

            httpApi.updateSort({ ids, sortNums })
        },
    })
}
function exchange(obj, draggedObj, relatedObj) {
    let dragged, related
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i]
        if (item.id === draggedObj.id) {
            dragged = {
                index: i,
                value: item,
            }
        }
        if (item.id === relatedObj.id) {
            related = {
                index: i,
                value: item,
            }
        }
    }
    obj[dragged.index] = related.value
    obj[related.index] = dragged.value
}
function getId(dom) {
    let parentId, id
    let arr = Array.from(dom.classList)
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (item.indexOf('pid') === 0) {
            parentId = item.slice(4)
        }
        if (item.indexOf('id') === 0) {
            id = item.slice(3)
        }
    }
    return { parentId, id }
}
</script>
<style lang="scss" scoped>
.statusName {
    margin-right: 10px;
}
</style>
