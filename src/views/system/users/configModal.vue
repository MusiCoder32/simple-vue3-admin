<template>
    <el-tabs v-model="activeName" class="config-tabs mt8">
        <el-tab-pane :label="$t('authority.configRolesModal.systemRoles')" name="SYSTEM">
            <el-form :model="systemRolesForm" label-position="top" class="mt20">
                <el-form-item :label="$t('authority.configRolesModal.createMode')">
                    <el-radio-group v-model="systemRolesForm.createMode">
                        <el-radio value="MAN">{{ $t('authority.configRolesModal.manualCreate') }}</el-radio>
                        <el-radio value="SYSTEM">{{ $t('authority.configRolesModal.systemCreate') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('authority.configRolesModal.selectRoles')">
                    <el-checkbox-group
                        v-if="systemRolesForm.createMode === CreateMethodEnum['人工创建']"
                        v-model="systemRolesForm.selectManualRoles">
                        <template v-for="(item, index) in systemRoles?.manualCreate">
                            <template v-if="systemRoles.manualCreate.length">
                                <el-checkbox
                                    :key="item.roleId + index"
                                    :value="item.roleId"
                                    name="item.roleId"
                                    class="long-label">
                                    {{ item.roleName }}
                                </el-checkbox>
                            </template>
                        </template>
                    </el-checkbox-group>
                    <el-checkbox-group v-else v-model="systemRolesForm.selectSystemRoles">
                        <template v-for="(item, index) in systemRoles?.systemCreate">
                            <template v-if="systemRoles.systemCreate.length">
                                <el-checkbox
                                    :key="item.roleId + index"
                                    :value="item.roleId"
                                    name="item.roleId"
                                    disabled
                                    class="long-label">
                                    {{ item.roleName }}
                                </el-checkbox>
                            </template>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('authority.configRolesModal.projectRoles')" name="PROJECT">
            <el-form :model="projectRolesForm" label-position="top" class="mt20">
                <el-form-item :label="$t('authority.configRolesModal.createMode')">
                    <el-radio-group v-model="projectRolesForm.createMode">
                        <el-radio value="SYSTEM">{{ $t('authority.configRolesModal.systemCreate') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('authority.configRolesModal.selectRoles')">
                    <el-checkbox-group v-model="projectRolesForm.selectRoles">
                        <template v-for="(item, index) in projectRoles?.systemCreate">
                            <template v-if="projectRoles.systemCreate.length">
                                <el-checkbox
                                    :key="item.roleId + index"
                                    :value="item.roleId"
                                    name="item.roleId"
                                    disabled
                                    class="long-label">
                                    {{ item.roleName }}
                                </el-checkbox>
                            </template>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { usersApi } from '@/api/users'
import { RoleTypeEnum, CreateMethodEnum } from '@/enums'
import { compact } from 'lodash'

const httpApi = usersApi
const props = defineProps(['userId'])
const activeName = ref(RoleTypeEnum['系统角色'])
const systemRolesForm = ref({
    createMode: CreateMethodEnum['人工创建'],
    selectManualRoles: [],
    selectSystemRoles: [],
})
const projectRolesForm = ref({
    createMode: CreateMethodEnum['系统创建'],
    selectRoles: [],
})
const systemRoles = ref({})
const projectRoles = ref({})

onMounted(() => {
    initForm()
})

async function initForm() {
    const systemManParams = {
        userId: props.userId,
        source: 'MAN',
        type: 'SYSTEM',
    }
    const systemSystemParams = {
        userId: props.userId,
        source: 'SYSTEM',
        type: 'SYSTEM',
    }
    const projectSystemParams = {
        userId: props.userId,
        source: 'SYSTEM',
        type: 'PROJECT',
    }

    const systemManRoles = await getConfigUserRole(systemManParams)
    const systemSystemRoles = await getConfigUserRole(systemSystemParams)
    const projectSystemRoles = await getConfigUserRole(projectSystemParams)
    systemRoles.value.manualCreate = systemManRoles
    systemRoles.value.systemCreate = systemSystemRoles
    projectRoles.value.systemCreate = projectSystemRoles

    systemRolesForm.value.selectManualRoles = systemRoles.value?.manualCreate
        .filter((item) => item.isChecked == 1)
        .map((item) => item.roleId)
    systemRolesForm.value.selectSystemRoles = systemRoles.value?.systemCreate
        .filter((item) => item.isChecked == 1)
        .map((item) => item.roleId)
    projectRolesForm.value.selectRoles = projectRoles.value?.systemCreate
        .filter((item) => item.isChecked == 1)
        .map((item) => item.roleId)
}
async function getConfigUserRole(params) {
    try {
        const data = await httpApi.getConfigUserRole(params)
        return data?.roleList || []
    } catch (error) {
        console.log(e)
    }
}
async function saveConfigUserRole() {
    try {
        const params = { userId: props.userId, roleIds: compact(systemRolesForm.value.selectManualRoles) }
        await httpApi.saveConfigUserRole(params)
    } catch (error) {
        console.log(e)
    }
}

defineExpose({
    saveConfigUserRole,
})
</script>

<style lang="scss" scoped>
.config-tabs {
    height: 444px;
    max-height: calc(80vh - 170px);
    overflow: auto;
}
</style>
