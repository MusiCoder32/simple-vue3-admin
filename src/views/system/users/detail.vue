<template>
    <div v-loading="loading" class="v-center pb48 h-full w-full">
        <detail-crumb @click="crumbClosed" last-crumb-label="查看" />
        <el-scrollbar class="h0 w-full grow">
            <simple-form
                v-if="!loading"
                ref="usersForm"
                v-model="model"
                path="users-view"
                class="readonly"
                :disabled="true"
                formStatus="readonly"
                @onReady="handleReady" />
        </el-scrollbar>
        <div class="form-footer-center">
            <el-button @click="closed">
                {{ $t('common.close') }}
            </el-button>
        </div>
    </div>
</template>
<script lang="tsx" setup>
import { usersApi } from '@/api/users'

import router from '@/router'
import { remove } from 'lodash'

const httpApi = usersApi
const props = defineProps({ userId: String })

const loading = ref(false)
const usersForm = ref()
const model = ref({})

const emit = defineEmits(['closed'])

onMounted(() => {
    initForm()
})

function crumbClosed() {
    closed()
}

async function initForm() {
    try {
        loading.value = true
        const params = { id: props.userId }
        const baseInfo = await getBaseInfo(params)
        const rolesArr = await getRoleList(params)
        const projectArr = await getProjectList(params)
        const recordArr = await getOperateLog(params)

        model.value = Object.assign(model.value, baseInfo)
        model.value.rolesArr = rolesArr
        model.value.projectArr = projectArr
        model.value.recordArr = recordArr
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}
async function getBaseInfo(params) {
    try {
        const data = await httpApi.getBaseInfo(params)
        return data || {}
    } catch (e) {
        console.log(e)
    }
}
async function getRoleList(params) {
    try {
        const data = await httpApi.getRoleList(params)
        return data || []
    } catch (e) {
        console.log(e)
    }
}
async function getProjectList(params) {
    try {
        const data = await httpApi.getProjectList(params)
        return data || []
    } catch (e) {
        console.log(e)
    }
}
async function getOperateLog(params) {
    try {
        const data = await httpApi.getOperateLog(params)
        return data || []
    } catch (e) {
        console.log(e)
    }
}
function handleReady() {
    try {
        const value = 'viewProject'
        const permissions: any[] = (router.currentRoute.value.meta.permissions as any[]) || []
        let permission
        for (let i = 0; i < permissions.length; i++) {
            const item = permissions[i]
            if (item.path === value) {
                permission = item
                break
            }
        }
        if (!permission) {
            nextTick(() => {
                remove(usersForm.value.schema.items[0].children, { name: 'name3' })
            })
        }
    } catch (e) {
        console.log(e)
    }
}
function closed() {
    emit('closed')
}

provide('$selfEvents', {})
</script>

<style></style>
