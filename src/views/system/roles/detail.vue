<template>
    <div class="v-center pb48 h-full w-full">
        <detail-crumb @click="crumbClosed" last-crumb-label="角色用户" />
        <el-scrollbar class="h0 relative w-full grow">
            <div class="v-box h-full w-full">
                <el-form :model="authModeForm" class="auth-form pl20 pt16 bg-white">
                    <el-form-item :label="$t('authority.roleUsersModal.configAuthMode')">
                        <el-radio-group v-model="authModeForm.authMode" disabled>
                            <el-radio value="manualConfig">{{ $t('authority.roleUsersModal.manualConfig') }}</el-radio>
                            <el-radio value="projectConfig">
                                {{ $t('authority.roleUsersModal.projectConfig') }}
                            </el-radio>
                            <el-radio value="systemRecognize">
                                {{ $t('authority.roleUsersModal.systemRecognize') }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div class="line w-full" />
                <simple-table
                    class="pt16 table grow"
                    ref="tableRef"
                    :columns="userRolesListColumns"
                    :getTableData="getTableData"
                    :showPage="true"
                    :showAdd="false"
                    indexWidth="80">
                    <el-table-column :label="$t('common.operations')" align="left" fixed="right" width="120">
                        <template #default="scope">
                            <div class="h-start-center">
                                <el-popconfirm :title="$t('message.delModalMessage')" @confirm="handleDel(scope.row)">
                                    <template #reference>
                                        <el-button
                                            type="primary"
                                            text
                                            :disabled="
                                                (roleType === RoleTypeEnum['系统角色'] &&
                                                    createMethod === CreateMethodEnum['系统创建'] &&
                                                    roleName !== '超级管理员') ||
                                                roleType === RoleTypeEnum['项目角色']
                                            ">
                                            {{ $t('common.delete') }}
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                    <template #afteradd>
                        <div
                            class="mt4 mb12"
                            v-if="
                                roleName === '超级管理员' ||
                                (roleType === RoleTypeEnum['系统角色'] && createMethod !== CreateMethodEnum['系统创建'])
                            ">
                            <el-button type="primary" @click="handleAdd">
                                {{ $t('authority.roleUsersModal.addUsers') }}
                            </el-button>
                        </div>
                        <div class="project-role-tooltip text-4 fw4" v-if="roleType === RoleTypeEnum['项目角色']">
                            {{ $t('message.projectRoleTooltip') }}
                        </div>
                    </template>
                </simple-table>
            </div>
        </el-scrollbar>
        <div class="form-footer-center">
            <el-button @click="closed">
                {{ $t('common.close') }}
            </el-button>
        </div>
    </div>
    <simple-layer ref="usersLayerRef" @confirm="usersConfirm" size="max" :confirmButtonText="$t('common.save')">
        <template #default>
            <users-modal ref="usersModalRef" :roleId="roleId" />
        </template>
    </simple-layer>
</template>

<script lang="ts" setup>
import { rolesApi } from '@/api/users'
import createColumns from './index'
import { RoleTypeEnum, CreateMethodEnum } from '@/enums'
import UsersModal from './usersModal.vue'

const { userRolesListColumns } = createColumns()

const httpApi = rolesApi
const tableRef = ref()
const usersLayerRef = ref()
const usersModalRef = ref()
const props = defineProps({
    roleId: String,
    roleType: String,
    createMethod: String,
    roleName: String,
})

const authModeForm = computed(() => {
    const { roleType, createMethod, roleName } = props
    if (
        (RoleTypeEnum['系统角色'] === roleType && CreateMethodEnum['人工创建'] === createMethod) ||
        roleName === '超级管理员'
    ) {
        return {
            authMode: 'manualConfig',
        }
    }
    if (RoleTypeEnum['系统角色'] === roleType && CreateMethodEnum['系统创建'] === createMethod) {
        return {
            authMode: 'systemRecognize',
        }
    }
    if (RoleTypeEnum['项目角色'] === roleType) {
        return {
            authMode: 'projectConfig',
        }
    }
})

const emit = defineEmits('closed')

function crumbClosed() {
    closed()
}

// 列表数据
async function getTableData(params) {
    const argument = { roleId: props.roleId, ...params }
    try {
        const data = await httpApi.getRoleUsers(argument)
        return {
            list: data?.list || [],
            total: data?.total || 0,
        }
    } catch (e) {
        console.log(e)
    }
}
// 删除
async function handleDel(row) {
    try {
        let params = {
            roleId: props.roleId,
            userId: row.userId,
        }
        await httpApi.delRoleUser(params)
        tableRef.value.renderTable()
        ElMessage.success($t('message.delSuccess'))
    } catch (e) {
        console.log(e)
    }
}
// 添加用户
function handleAdd() {
    usersLayerRef.value.add({ title: '角色用户' })
}
// 添加用户弹窗保存回调
async function usersConfirm() {
    await usersModalRef.value.saveRoleUsers()
    tableRef.value.initTable()
    usersLayerRef.value.closed()
    ElMessage.success($t('message.saveSuccess'))
}
// 添加用户弹窗关闭回调
function closed() {
    emit('closed')
}
</script>

<style scoped>
.project-role-tooltip {
    height: 48px;
    line-height: 48px;
}
</style>
