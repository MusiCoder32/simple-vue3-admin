<template>
    <div v-if="showList" class="v-center h-full w-full">
        <simple-table
            class="w-full grow"
            ref="tableRef"
            :columns="rolesColumns"
            :getTableData="getTableData"
            :showPage="true"
            :showAdd="false">
            <template #afteradd>
                <div class="mb16">
                    <el-button type="primary" @click="handleAdd">
                        {{ $t('authority.roles.createRoles') }}
                    </el-button>
                </div>
            </template>
            <el-table-column :label="$t('common.operations')" align="left" fixed="right" width="278">
                <template #default="scope">
                    <div class="h-start-center">
                        <el-button
                            type="primary"
                            :disabled="scope.row.privilageBtn === 0"
                            text
                            @click="handleAuth(scope.row)">
                            {{ $t('authority.roles.configAuth') }}
                        </el-button>
                        <el-button type="primary" text @click="handleRoleUsers(scope.row)">
                            {{ $t('角色用户') }}
                        </el-button>
                        <el-button
                            type="primary"
                            :disabled="scope.row.baseBtn === 0"
                            text
                            @click="handleEdit(scope.row)">
                            {{ $t('common.edit') }}
                        </el-button>
                        <el-popconfirm :title="$t('message.delModalMessage')" @confirm="handleDel(scope.row)">
                            <template #reference>
                                <el-button
                                    type="primary"
                                    :disabled="scope.row.source === CreateMethodEnum['系统创建']"
                                    text>
                                    {{ $t('common.delete') }}
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </simple-table>
    </div>
    <detail
        v-else
        :createMethod="createMethod"
        :roleType="roleType"
        :roleId="roleId"
        :roleName="roleName"
        @closed="detailClosed" />

    <simple-layer ref="basicLayerRef" :columns="rolesColumns" @confirm="baseSave" @closed="baseClosed" size="middle">
        <template #type="slotProps">
            <el-form-item :label="$t('authority.roles.roleType')" prop="type">
                <el-radio-group v-model="slotProps.model.type" :disabled="layerStatus === 'edit'">
                    <el-radio value="SYSTEM">{{ $t('authority.roles.systemRoles') }}</el-radio>
                    <el-radio value="PROJECT" disabled>
                        {{ $t('authority.roles.projectRoles') }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
        <template #statues="slotProps">
            <el-form-item :label="$t('authority.roles.enableStatus')" prop="statues">
                <el-switch
                    v-model="slotProps.model.statues"
                    :disabled="slotProps.model.type === RoleTypeEnum['项目角色']" />
            </el-form-item>
        </template>
    </simple-layer>

    <simple-layer ref="authLayerRef" @confirm="authConfirm" @closed="authClosed" size="small">
        <template #default>
            <config-modal ref="configModalRef" :roleType="roleType" />
        </template>
    </simple-layer>
</template>
<script lang="tsx" setup>
import { rolesApi } from '@/api/users'
import createColumns from './index'
import { RoleTypeEnum, CreateMethodEnum } from '@/enums'
import Detail from './detail.vue'
import ConfigModal from './configModal.vue'

const { rolesColumns } = createColumns(change)

const httpApi = rolesApi
const showList = ref(true)
const tableRef = ref()
const basicLayerRef = ref()
const authLayerRef = ref()
const configModalRef = ref()
const layerStatus = ref('')
const roleId = ref('')
const createMethod = ref('')
const roleType = ref('')
const roleName = ref('')

// 列表数据
async function getTableData(params) {
    try {
        const data = await httpApi.get(params)
        return {
            list: data?.list || [],
            total: data?.total || 0,
        }
    } catch (e) {
        console.log(e)
    }
}
// 启用状态change函数
async function change(text, roleId) {
    try {
        const newStatus = text === '1' ? '0' : '1'
        const params = { roleId, status: newStatus }
        await httpApi.updateRoleEnable(params)
        tableRef.value.initTable()
        ElMessage.success($t('message.controlSuccess'))
    } catch (e) {
        console.log(e)
    }
}
// 新增
function handleAdd() {
    layerStatus.value = 'add'
    basicLayerRef.value.add({
        row: { type: 'SYSTEM', statues: true },
        title: 'authority.roles.createRoles',
    })
}
// 编辑
function handleEdit(row) {
    layerStatus.value = 'edit'
    basicLayerRef.value.edit({
        model: { ...row, statues: row.statues === '1' ? true : false },
        title: 'common.edit',
    })
}
// 基本信息弹窗保存回调
async function baseSave(data, type) {
    const params = { ...data, statues: data.statues ? '1' : '0' }
    try {
        await httpApi[type](params)
        layerStatus.value = ''
        basicLayerRef.value.closed()
        tableRef.value.initTable()
        ElMessage.success($t('message.saveSuccess'))
    } catch (e) {
        console.log(e)
    }
}
// 基本信息弹窗取消回调
function baseClosed() {
    layerStatus.value = ''
}
// 权限配置
async function handleAuth(row) {
    try {
        if (row) {
            roleId.value = row.id
            roleType.value = row.type
            authLayerRef.value.edit({ title: '权限配置弹窗' })
            nextTick(() => {
                configModalRef.value.roleAuth(row.id)
            })
        }
    } catch (e) {
        console.log(e)
    }
}
// 权限配置的确认回调
async function authConfirm() {
    const params = {
        roleId: roleId.value,
        menuIdList: configModalRef.value.selectedKeyList,
        ...configModalRef.value.form,
    }
    try {
        await httpApi.giveRolePermissions(params)
        ElMessage.success($t('message.configSuccess'))
        authLayerRef.value.closed()
        tableRef.value.renderTable()
    } catch (e) {
        console.log(e)
    }
}
// 权限配置的取消回调
function authClosed() {
    // roleId.value = ''
    // roleType.value = ''
}
// 删除
async function handleDel(row) {
    try {
        let params = {
            id: row.id,
        }
        await httpApi.del(params)
        tableRef.value.renderTable()
        ElMessage.success($t('message.delSuccess'))
    } catch (e) {
        console.log(e)
    }
}
// 角色用户
function handleRoleUsers(row) {
    createMethod.value = row.source
    roleType.value = row.type
    roleId.value = row.id
    roleName.value = row.name
    showList.value = false
}
// 角色用户详情关闭回调
function detailClosed() {
    showList.value = true
    roleId.value = ''
    createMethod.value = ''
    roleType.value = ''
    roleName.value = ''
}
</script>
<style lang="scss" scoped></style>
