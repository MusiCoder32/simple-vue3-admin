<template>
    <simple-table
        ref="demoTableRef"
        :columns="[]"
        :isInitData="true"
        :getTableData="getTableData"
        :border="true"
        :showIndex="false"
        :autoHeight="true"
        :showAdd="false"
        :otherOptions="{
            'span-method': spanMethod,
        }">
        <el-table-column prop="name_first" label="一级菜单">
            <template #default="scope">
                <el-checkbox
                    :label="scope.row.id_first"
                    v-model="checkedFirstIds"
                    :checked="scope.row.isChecked_first == 1"
                    @change="handleFirstLevelChange(scope.row)">
                    {{ scope.row.name_first }}
                </el-checkbox>
            </template>
        </el-table-column>
        <el-table-column prop="name_second" label="二级菜单">
            <template #default="scope">
                <div v-if="scope.row.id_second">
                    <el-checkbox
                        :label="scope.row.id_second"
                        v-model="checkedSecondIds"
                        :checked="scope.row.isChecked_second == 1"
                        @change="handleSecondLevelChange(scope.row)">
                        {{ scope.row.name_second }}
                    </el-checkbox>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="name_third" label="三级菜单">
            <template #default="scope">
                <div v-if="scope.row.id_third">
                    <el-checkbox
                        v-if="scope.row.id_third"
                        :label="scope.row.id_third"
                        :checked="scope.row.isChecked_third == 1"
                        v-model="checkedThirdIds"
                        @change="handleThirdLevelChange(scope.row)">
                        {{ scope.row.name_third }}
                    </el-checkbox>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="children" label="按钮" width="400">
            <template #default="scope">
                <div v-if="scope.row.children" class="flex flex-wrap">
                    <div v-for="child in scope.row.children" :key="child.id">
                        <el-checkbox
                            :label="child.id"
                            v-model="checkedButtonIds"
                            :checked="child.isChecked == 1"
                            class="mr20"
                            @change="handleButtonLevelChange(scope.row, child.id)">
                            {{ child.name }}
                        </el-checkbox>
                    </div>
                </div>
            </template>
        </el-table-column>
    </simple-table>
    <div style="margin-top: 20px">
        <h3>选中的 ID:</h3>
        <p>一级菜单 ID: {{ checkedFirstIds }}</p>
        <p>二级菜单 ID: {{ checkedSecondIds }}</p>
        <p>三级菜单 ID: {{ checkedThirdIds }}</p>
        <p>按钮 ID: {{ checkedButtonIds }}</p>
    </div>
</template>

<script setup>
import { rolesApi } from '@/api/users'
import { getTreeData } from '@/utils/general'

const tableData = ref([])

// 数据列表
async function getTableData() {
    const menuList = await roleAuth()
    const treeData = getTreeData({ data: menuList })

    tableData.value = formatData(treeData)

    return {
        list: tableData.value,
    }
}

// 存储选中状态
const checkedFirstIds = ref([])
const checkedSecondIds = ref([])
const checkedThirdIds = ref([])
const checkedButtonIds = ref([])

// 处理一级菜单选择变化
function handleFirstLevelChange(row) {
    const isChecked = checkedFirstIds.value.includes(row.id_first)
    tableData.value.forEach((item) => {
        if (item.id_first === row.id_first) {
            if (isChecked) {
                // 勾选了一级菜单，勾选所有相关二级菜单和按钮
                if (item.id_second && !checkedSecondIds.value.includes(item.id_second)) {
                    checkedSecondIds.value.push(item.id_second)
                }
                if (item.id_third && !checkedThirdIds.value.includes(item.id_third)) {
                    checkedThirdIds.value.push(item.id_third)
                }
                if (item.children) {
                    item.children.forEach((child) => {
                        if (!checkedButtonIds.value.includes(child.id)) {
                            checkedButtonIds.value.push(child.id)
                        }
                    })
                }
            } else {
                // 取消勾选一级菜单，取消所有相关二级菜单和按钮
                checkedSecondIds.value = checkedSecondIds.value.filter((id) => id !== item.id_second)
                checkedThirdIds.value = checkedThirdIds.value.filter((id) => id !== item.id_third)
                if (item.children) {
                    item.children.forEach((child) => {
                        checkedButtonIds.value = checkedButtonIds.value.filter((id) => id !== child.id)
                    })
                }
            }
        }
    })
}

// 处理二级菜单选择变化
function handleSecondLevelChange(row) {
    const isChecked = checkedSecondIds.value.includes(row.id_second)
    const parentChecked = checkedFirstIds.value.includes(row.id_first)

    tableData.value
        .filter((item) => item.id_second === row.id_second)
        .forEach((item) => {
            if (isChecked) {
                // 勾选了二级菜单，勾选所有相关三级菜单和按钮
                if (!parentChecked) {
                    checkedFirstIds.value.push(row.id_first)
                }
                if (item.id_third && !checkedThirdIds.value.includes(item.id_third)) {
                    checkedThirdIds.value.push(item.id_third)
                }
                if (item.children) {
                    item.children.forEach((child) => {
                        if (!checkedButtonIds.value.includes(child.id)) {
                            checkedButtonIds.value.push(child.id)
                        }
                    })
                }
            } else {
                // 取消勾选二级菜单，取消所有相关三级菜单和按钮
                checkedThirdIds.value = checkedThirdIds.value.filter((id) => id !== item.id_third)
                if (item.children) {
                    item.children.forEach((child) => {
                        checkedButtonIds.value = checkedButtonIds.value.filter((id) => id !== child.id)
                    })
                }

                // 检查当前一级菜单下的二级菜单是否都未被选中，如果是则自动取消勾选一级菜单
                const allSecondUnchecked = tableData.value
                    .filter((item) => item.id_first === row.id_first)
                    .every((item) => !checkedSecondIds.value.includes(item.id_second))

                if (allSecondUnchecked) {
                    checkedFirstIds.value = checkedFirstIds.value.filter((id) => id !== row.id_first)
                    handleFirstLevelChange(row)
                }
            }
        })
}

// 处理三级菜单选择变化
function handleThirdLevelChange(row) {
    const isChecked = checkedThirdIds.value.includes(row.id_third)
    const secondMenuChecked = checkedSecondIds.value.includes(row.id_second)
    const firstMenuChecked = checkedFirstIds.value.includes(row.id_first)

    if (isChecked) {
        // 勾选了三级菜单，勾选所有相关按钮
        if (!secondMenuChecked) {
            checkedSecondIds.value.push(row.id_second) // 确保对应的二级菜单被选中
        }
        if (!firstMenuChecked) {
            checkedFirstIds.value.push(row.id_first) // 确保对应的一级菜单被选中
        }
        if (row.children) {
            row.children.forEach((child) => {
                if (!checkedButtonIds.value.includes(child.id)) {
                    checkedButtonIds.value.push(child.id)
                }
            })
        }
    } else {
        if (row.children) {
            row.children.forEach((child) => {
                checkedButtonIds.value = checkedButtonIds.value.filter((id) => id !== child.id)
            })
        }

        // 检查当前二级菜单下的三级菜单是否都未被选中，如果是则自动取消勾选二级菜单
        const allThirdUnchecked = tableData.value
            .filter((item) => item.id_second === row.id_second)
            .every((item) => !checkedThirdIds.value.includes(item.id_third))

        if (allThirdUnchecked) {
            checkedSecondIds.value = checkedSecondIds.value.filter((id) => id !== row.id_second)
            handleSecondLevelChange(row)
        }
    }
}

function handleButtonLevelChange(row, id) {
    const isChecked = checkedButtonIds.value.includes(id)
    const secondMenuChecked = checkedSecondIds.value.includes(row.id_second)
    const firstMenuChecked = checkedFirstIds.value.includes(row.id_first)
    const thirdMenuChecked = checkedThirdIds.value.includes(row.id_third)
    // 检查当前三级菜单下的按钮是否都未被选中，如果是则自动取消勾选三级菜单
    if (isChecked) {
        if (row.id_third && !thirdMenuChecked) {
            checkedThirdIds.value.push(row.id_third) // 确保对应的三级菜单被选中
        }
        if (row.id_second && !secondMenuChecked) {
            checkedSecondIds.value.push(row.id_second) // 确保对应的二级菜单被选中
        }
        if (!firstMenuChecked) {
            checkedFirstIds.value.push(row.id_first) // 确保对应的一级菜单被选中
        }
    }
}

// 合并单元格策略
function spanMethod({ row, rowIndex, columnIndex }) {
    if (columnIndex === 0 && row.id_first) {
        const id = row.id_first
        let rowspan = 1
        for (let i = rowIndex + 1; i < tableData.value.length; i++) {
            if (tableData.value[i].id_first === id) {
                rowspan++
            } else {
                break
            }
        }
        if (rowIndex === firstOccurrenceIndex(rowIndex, 'id_first')) {
            return { rowspan, colspan: 1 }
        } else {
            return { rowspan: 0, colspan: 0 }
        }
    } else if (columnIndex === 1 && row.id_second) {
        const id = row.id_second
        let rowspan = 1
        for (let i = rowIndex + 1; i < tableData.value.length; i++) {
            if (tableData.value[i].id_second === id) {
                rowspan++
            } else {
                break
            }
        }
        if (rowIndex === firstOccurrenceIndex(rowIndex, 'id_second')) {
            return { rowspan, colspan: 1 }
        } else {
            return { rowspan: 0, colspan: 0 }
        }
    }
    return { rowspan: 1, colspan: 1 }
}

// 查找首次出现的位置
function firstOccurrenceIndex(rowIndex, key) {
    const id = tableData.value[rowIndex][key]
    for (let i = 0; i <= rowIndex; i++) {
        if (tableData.value[i][key] === id) {
            return i
        }
    }
    return -1
}

function formatData(treeData) {
    const formatList = []
    treeData.forEach((firstItem) => {
        const first = { name_first: firstItem.name, id_first: firstItem.id, isChecked_first: firstItem.isChecked }
        if (firstItem.children) {
            for (let i = 0; i < firstItem.children.length; i++) {
                const secondItem = firstItem.children[i]
                if (secondItem.mtype === 'BUTTON') {
                    first.children = firstItem.children
                    formatList.push(first)
                    break
                } else {
                    const second = {
                        name_second: secondItem.name,
                        id_second: secondItem.id,
                        isChecked_second: secondItem.isChecked,
                    }
                    if (secondItem.children) {
                        for (let j = 0; j < secondItem.children.length; j++) {
                            const thirdItem = secondItem.children[j]
                            if (thirdItem.mtype === 'BUTTON') {
                                second.children = secondItem.children
                                formatList.push({ ...first, ...second })
                                break
                            } else {
                                const third = {
                                    name_third: thirdItem.name,
                                    id_third: thirdItem.id,
                                    isChecked_third: thirdItem.isChecked,
                                }
                                if (thirdItem.children) {
                                    for (let k = 0; k < thirdItem.children.length; k++) {
                                        const forthItem = thirdItem.children[k]
                                        if (forthItem.mtype === 'BUTTON') {
                                            third.children = thirdItem.children
                                            formatList.push({ ...first, ...second, ...third })
                                            break
                                        } else {
                                            //    111
                                        }
                                    }
                                } else {
                                    formatList.push({ ...first, ...second, ...third })
                                }
                            }
                        }
                    } else {
                        formatList.push({ ...first, ...second })
                    }
                }
            }
        } else {
            formatList.push(first)
        }
    })
    return formatList
}

async function roleAuth() {
    let params = {
        roleId: '1',
    }
    const data = await rolesApi.getRolePermissions(params)
    const { menuList = [] } = data
    return menuList
}
</script>

<style scoped>
/* Add some styles if needed */
</style>
