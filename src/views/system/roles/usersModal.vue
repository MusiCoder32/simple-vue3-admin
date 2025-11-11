<template>
    <div class="mt20 users-modal w-full">
        <el-form :model="authModeForm">
            <el-form-item :label="$t('authority.roleUsersModal.configAuthMode')">
                <el-radio-group v-model="authModeForm.authMode" disabled>
                    <el-radio value="manualConfig">{{ $t('authority.roleUsersModal.manualConfig') }}</el-radio>
                    <el-radio value="projectConfig">{{ $t('authority.roleUsersModal.projectConfig') }}</el-radio>
                    <el-radio value="systemRecognize">{{ $t('authority.roleUsersModal.systemRecognize') }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="users-content flex">
            <div class="left w50 v-box p16 h-full">
                <div class="flex">
                    <el-form
                        label-position="right"
                        label-width="56px"
                        :model="leftQueryForm"
                        class="query-box w0 expand grow"
                        ref="leftFormRef">
                        <template v-for="item in queryList" :key="item.value">
                            <el-form-item class="pr10">
                                <template #label>
                                    <div v-ell>{{ item.label }}</div>
                                </template>
                                <el-input
                                    v-model="leftQueryForm[item.value]"
                                    :placeholder="$t('common.inputText')"
                                    clearable />
                            </el-form-item>
                        </template>
                    </el-form>
                    <el-button @click="leftReset">{{ $t('common.reset') }}</el-button>
                    <el-button type="primary" @click="leftSearch">
                        {{ $t('common.query') }}
                    </el-button>
                </div>
                <el-tree
                    v-if="showTree"
                    class="tree grow"
                    :props="treeProps"
                    :data="treeData"
                    ref="treeRef"
                    node-key="userId"
                    :load="loadNode"
                    show-checkbox
                    :check-strictly="true"
                    lazy
                    @check-change="handleTreeChange">
                    <template #default="{ node, data }">
                        <span v-if="!data.name" class="org-name">
                            {{ data.orgName }}
                        </span>
                        <span v-else class="staff">{{ data.name }}({{ data.staffCode }} {{ data.email }})</span>
                    </template>
                </el-tree>
                <simple-table
                    v-else
                    class="p0 table grow"
                    ref="leftTableRef"
                    :columns="userRolesLeftColumns"
                    :showCheckbox="true"
                    :selectedIds="selectedIds"
                    :getTableData="getLeftTableData"
                    @rowSelect="handleTableChange"
                    @selectAll="selectAll"
                    :showPage="true"
                    pageLayout="total,prev,pager,next"
                    :showIndex="false"
                    :showAdd="false" />
            </div>
            <div class="right w50 p16 v-box">
                <div class="mb16 text-4">{{ $t('usersSelectModal.choosed') }} {{ selectedData?.length }}</div>
                <simple-table
                    class="p0 table grow"
                    ref="rightTableRef"
                    :columns="userRolesRightColumns"
                    :isInitData="false"
                    :isDelayLoading="false"
                    :getTableData="getRightTableData"
                    :showPage="true"
                    labelWidth="55px"
                    :showAdd="false">
                    <el-table-column :label="$t('common.operations')" align="left" fixed="right" width="120">
                        <template #default="scope">
                            <div class="h-start-center">
                                <el-button type="primary" text @click="handleDel(scope.row)">
                                    {{ $t('common.delete') }}
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </simple-table>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { rolesApi } from '@/api/users'
import createColumns from './index'
import { every, isEmpty, differenceBy, uniqBy } from 'lodash'

const { userRolesLeftColumns, userRolesRightColumns } = createColumns()

const httpApi = rolesApi
const props = defineProps({
    roleId: String,
})
const treeProps = {
    label: 'label',
    children: 'zones',
    isLeaf: 'isLeaf',
}
const queryList = [
    { label: $t('authority.roleUsersModal.division'), value: 'orgName' },
    { label: $t('authority.roleUsersModal.dept'), value: 'deptName' },
    { label: $t('authority.roleUsersModal.name'), value: 'name' },
    { label: $t('authority.roleUsersModal.code'), value: 'staffCode' },
]

const showTree = ref(true)
const leftFormRef = ref(null)
const authModeForm = ref({
    authMode: 'manualConfig',
})
const leftQueryForm = ref({
    orgName: '',
    deptName: '',
    name: '',
    staffCode: '',
})
const treeRef = ref()
const rightTableRef = ref()
const leftTableRef = ref()
const treeData = ref()
const selectedData = ref([])

const selectedIds = computed(() => {
    return selectedData.value.map((item) => item.userId)
})

// 监听左侧查询区
watch(
    leftQueryForm,
    (newValue) => {
        const allEmpty = Object.values(newValue).every((value) => value?.trim() === '')
        if (allEmpty) {
            showTree.value = true
        }
    },
    { deep: true },
)
async function loadNode(node: Node, resolve: (data: Tree[]) => void, reject: () => void) {
    try {
        const { orgList, userList } = await httpApi.getRoleOrgTree({
            pCode: node.data?.orgCode || '',
            roleId: props.roleId,
        })
        const usersArr = userList.map((item) => ({ ...item, isLeaf: true }))
        if (selectedData.value?.length) {
            nextTick(() => {
                selectedData.value.forEach((item) => treeRef.value.setChecked(item, true))
            })
        }
        return resolve([...orgList, ...usersArr])
    } catch (e) {
        console.log(e)
    }
}
async function getLeftTableData(params) {
    try {
        const { pageSize, pageNum } = params
        const argument = {
            roleId: props.roleId,
            ...leftQueryForm.value,
            pageSize,
            pageNum,
        }
        const data = await httpApi.getRoleOrgTable(argument)
        const list = data?.list.map((item) => ({ ...item, id: item.userId })) || []
        return {
            list: list,
            total: data?.total || 0,
        }
    } catch (e) {
        console.log(e)
    }
}
function getRightTableData(params) {
    const allData = selectedData.value
    const { pageNum, pageSize } = params
    try {
        const list = allData?.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        return {
            list,
            total: allData.length,
        }
    } catch (e) {
        console.log(e)
    }
}
function handleTreeChange(selection, isChecked) {
    if (isChecked) {
        selectedData.value.push(selection)
    } else {
        selectedData.value = selectedData.value.filter((item) => item.userId !== selection.userId)
    }
    rightTableRef.value.renderTable()
}
function handleTableChange(selection, row) {
    if (selectedIds.value.includes(row.userId)) {
        selectedData.value = selectedData.value.filter((item) => item.userId !== row.userId)
    } else {
        selectedData.value.push(row)
    }
    rightTableRef.value.renderTable()
}
function selectAll(selection) {
    if (selection.length) {
        selectedData.value = uniqBy([...selectedData.value, ...selection], 'userId')
    } else {
        selectedData.value = differenceBy(selectedData.value, leftTableRef.value.tableData, 'userId')
    }
    rightTableRef.value.renderTable()
}
function leftReset() {
    Object.keys(leftQueryForm.value).forEach((key) => {
        leftQueryForm.value[key] = ''
    })
    showTree.value = true
}
function leftSearch() {
    if (every(leftQueryForm.value, (item) => isEmpty(item))) {
        ElMessageBox.alert($t('message.queryCondition'), $t('message.tooltip'))
    } else {
        showTree.value = false
        leftTableRef.value?.initTable()
    }
}
function handleDel(row) {
    selectedData.value = selectedData.value.filter((item) => item.userId !== row.userId)
    if (showTree.value) {
        treeRef.value.setChecked(row, false)
    } else {
        leftTableRef.value.renderTable()
    }
    rightTableRef.value.renderTable()
}
async function saveRoleUsers() {
    const params = { roleId: props.roleId, userIdList: selectedIds.value, userGrantMethod: 0 }
    try {
        await httpApi.saveRoleUsers(params)
    } catch (e) {
        console.log(e)
    }
}
defineExpose({
    saveRoleUsers,
})
</script>

<style lang="scss">
.users-modal {
    height: calc(80vh - 170px);
    .users-content {
        height: calc(80vh - 218px);
        border: 1px solid #e5e7e9;
        .left {
            border-right: 1px solid #e5e7e9;
            .tree {
                overflow: auto;
            }
        }
        .right {
            .table {
                overflow: auto;
            }
        }
    }
}

.tree .el-tree-node .el-tree-node__content:has(.org-name) {
    .el-checkbox .el-checkbox__inner {
        display: none;
    }
}
.tree .el-tree-node .el-tree-node__content:has(.staff) {
    .el-checkbox .el-checkbox__inner {
        display: inline-block;
    }
}
</style>
