<template>
    <simple-table
        v-if="showList"
        ref="tableRef"
        :columns="usersColumns"
        :getTableData="getTableData"
        :showAdd="false"
        :showPage="true"
        indexWidth="80">
        <el-table-column :label="$t('common.operations')" align="left" fixed="right" width="160">
            <template #default="scope">
                <div class="h-start-center">
                    <el-button v-has="'config'" type="primary" text @click="handleConfig(scope.row)">
                        {{ $t('authority.users.configRoleBtn') }}
                    </el-button>
                    <el-button type="primary" text @click="handleView(scope.row)">
                        {{ $t('common.view') }}
                    </el-button>
                </div>
            </template>
        </el-table-column>
    </simple-table>
    <detail v-else @closed="handleDetailClosed" :userId="userId" />
    <simple-layer ref="configLayerRef" @confirm="configConfirm" @closed="colsed" size="middle">
        <template #default>
            <config-modal :userId="userId" ref="configModalRef" />
        </template>
    </simple-layer>
</template>
<script lang="tsx" setup>
import { usersApi } from '@/api/users'
import createColumns from './index'
import ConfigModal from './configModal.vue'
import Detail from './detail.vue'

const { usersColumns } = createColumns()

const httpApi = usersApi
const showList = ref(true)
const tableRef = ref()
const configLayerRef = ref()
const configModalRef = ref()
const userId = ref('')

// 表格数据
async function getTableData(params) {
    const argument = {
        ...params,
        orgGroupCode: params.orgGroupName,
        orgCode: params.orgName,
        deptCode: params.deptName,
        orgGroupName: null,
        orgName: null,
        deptName: null,
    }
    try {
        const data = await httpApi.get(argument)
        return {
            list: data?.list || [],
            total: data?.total || 0,
        }
    } catch (e) {
        console.log(e)
    }
}
// 配置角色
function handleConfig(row) {
    userId.value = row.id
    configLayerRef.value.edit({ title: 'authority.users.configRoles' })
}
// 配置角色弹窗确认的回调
async function configConfirm() {
    await configModalRef.value.saveConfigUserRole()
    tableRef.value.renderTable()
    configLayerRef.value.closed()
    ElMessage.success($t('message.saveSuccess'))
}
// 配置角色弹窗取消的回调
function colsed() {
    userId.value = ''
}
// 查看
function handleView(row) {
    userId.value = row.id
    showList.value = false
}
// 查看详情关闭的回调
function handleDetailClosed() {
    showList.value = true
    userId.value = ''
}
</script>
<style lang="scss" scoped></style>
