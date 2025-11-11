<template>
    <div class="v-center w100 h100 bg-white" v-loading="loading">
        <detail-crumb @click="crumbClosed" last-crumb-label="common.detail" v-if="formStatus !== 'library'">
            <template #default>
                <div class="h-start-center fg1 w0 h100 title">
                    <div class="detail-title-line ml24" />
                    <div class="pt2 ml24 nowrap f18">{{ mainProjectInfo.code }}</div>
                    <div v-ell class="pt2 ml12 f18">
                        {{ mainProjectInfo.name }}
                    </div>
                </div>
            </template>
        </detail-crumb>
        <el-scrollbar class="w100 fg1 p-r" :class="formStatus == 'library' ? '' : 'h0'">
            <div class="pt16" :class="[isFull ? 'h100' : '', formStatus == 'library' ? '' : 'pl20 pr20']">
                <link-force
                    v-if="forceData"
                    class="br12 w100"
                    style="background-color: #f7f8fa"
                    id="link-force-1"
                    @fullChange="fullChange"
                    @select="nodeSelect"
                    :height="720"
                    :key="linkForceKey"
                    :modelValue="mainProjectInfo.id"
                    :data="forceData" />
            </div>

            <template v-if="!isFull && mainProjectInfo.optionType !== 'biView'">
                <div class="h-between-center pt20 mbn4 f16" :class="formStatus == 'library' ? 'pl0' : 'pl20 pr20'">
                    <div>{{ $t('link.projectList') }}</div>
                    <template v-if="formStatus !== 'library'">
                        <el-button type="primary" v-if="$auth(mainProjectInfo.id, 'add').value" @click="handleAdd">
                            {{ $t('link.addProject') }}
                        </el-button>
                    </template>
                </div>
                <simple-table
                    class="w100 pt16"
                    :class="formStatus == 'library' ? 'pl0 pr0' : ''"
                    ref="tableRef"
                    :columns="projectLinkColumns"
                    :getTableData="getTableData"
                    :auto-height="true"
                    :showPage="true"
                    :showAdd="false">
                    <template v-if="formStatus !== 'library'">
                        <el-table-column
                            :label="$t('common.operations')"
                            v-if="$auth(mainProjectInfo.id, 'edit').value || $auth(mainProjectInfo.id, 'del').value"
                            align="left"
                            fixed="right"
                            width="160">
                            <template #default="scope">
                                <div class="h-start-center">
                                    <el-button
                                        v-if="$auth(mainProjectInfo.id, 'edit').value"
                                        type="primary"
                                        text
                                        @click="handleEdit(scope.row)">
                                        {{ $t('common.edit') }}
                                    </el-button>
                                    <el-popconfirm
                                        :title="$t('message.delModalMessage')"
                                        @confirm="handleDelete(scope.row)">
                                        <template #reference>
                                            <el-button
                                                v-if="$auth(mainProjectInfo.id, 'del').value"
                                                type="primary"
                                                text>
                                                {{ $t('common.delete') }}
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                </simple-table>
                <div class="w100 pl20 pt4 f16 bg-white" v-if="formStatus !== 'library'">
                    {{ $t('link.alterRecord') }}
                </div>
                <simple-table
                    class="w100 pt16"
                    v-if="formStatus !== 'library'"
                    ref="recordTableRef"
                    :columns="alterRecordColumns"
                    :getTableData="getAlterRecord"
                    :auto-height="true"
                    :showPage="true"
                    :showAdd="false">
                    <el-table-column
                        v-if="$auth(mainProjectInfo.id, 'record').value"
                        :label="$t('common.operations')"
                        align="left"
                        fixed="right"
                        width="160">
                        <template #default="scope">
                            <div class="h-start-center">
                                <el-button type="primary" text @click="recordView(scope.row)">
                                    {{ $t('common.view') }}
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </simple-table>
            </template>
        </el-scrollbar>
    </div>
    <!-- 关联关系编辑弹窗 -->
    <simple-layer
        ref="layerRef"
        :bodyLoading="layerBodyLoading"
        size="middle"
        :need-change="true"
        :columns="projectLinkColumns"
        :onConfirm="submit" />

    <!-- 关联关系变更记录查看弹窗 -->
    <simple-layer ref="recordLayerRef" size="large" :show-cancel-button="false" :show-confirm-button="false">
        <div class="mt16 mb12">变更前:</div>
        <simple-table
            class="w100 p0"
            :columns="projectLinkColumns"
            :getTableData="getTableDataBefore"
            :auto-height="true"
            :show-index="false"
            :showPage="false"
            :showAdd="false" />
        <div class="mb12 mt16">变更后:</div>
        <simple-table
            class="w100 p0"
            :columns="projectLinkColumns"
            :getTableData="getTableDataAfter"
            :auto-height="true"
            :show-index="false"
            :showPage="false"
            :showAdd="false" />
    </simple-layer>
</template>

<script lang="ts" setup>
import { linkApi } from '@/api/projects/link'
import createColumns from './index'
import LinkForce from '@/d3/force/index.vue'
// import forceData from './data.json'
import { isFullScreen } from '@/utils/general'
import { initCreateApi } from '@/api/projects/init'

const layerRefStatus = ref()
const { projectLinkColumns, alterRecordColumns } = createColumns(codeChange, layerRefStatus)
const httpApi = linkApi

const props = defineProps({
    mainProjectInfo: null,
    formStatus: String,
})

const currentProjectInfo = ref({})

const loading = ref(false)
const linkForceKey = ref()
const isFull = ref(isFullScreen())
const layerRef = ref()
const recordLayerRef = ref()
const layerBodyLoading = ref(false)

const tableRef = ref()
const recordTableRef = ref()
const emit = defineEmits(['changeShowList'])

const forceData = ref()
const recordDetail = ref()

onBeforeMount(() => {
    currentProjectInfo.value.mainProjectInstId = props.mainProjectInfo.id
    currentProjectInfo.value.mainProjectName = props.mainProjectInfo.name
    currentProjectInfo.value.mainProjectCode = props.mainProjectInfo.code
    getForceData()
})

async function getForceData() {
    loading.value = true
    try {
        const data = await httpApi.getMap({ mainProInstId: currentProjectInfo.value.mainProjectInstId })
        forceData.value = data
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}

function fullChange(data) {
    isFull.value = data
}
function nodeSelect(data) {
    currentProjectInfo.value.mainProjectInstId = data.projectInstId
    currentProjectInfo.value.mainProjectName = data.projectInstName
    currentProjectInfo.value.mainProjectCode = data.projectInstCode
    tableRef.value.initTable()
    recordTableRef.value.initTable()
}

async function getTableData(params) {
    try {
        const { list, total } = await httpApi.getLinkList({
            mainProjectInstId: currentProjectInfo.value.mainProjectInstId,
            ...params,
        })

        return {
            list,
            total,
        }
    } catch (e) {
        console.log(e)
    }
}
async function getTableDataBefore() {
    const list = []

    const arr = recordDetail.value.beforeList
    if (Array.isArray(arr)) {
        const tempObj = {}
        arr.forEach((item) => {
            tempObj[item.fieldName] = item.changeValue
        })
        list.push(tempObj)
    }

    return {
        list,
    }
}
async function getTableDataAfter() {
    const list = []
    const arr = recordDetail.value.afterList
    if (Array.isArray(arr)) {
        const tempObj = {}
        arr.forEach((item) => {
            tempObj[item.fieldName] = item.changeValue
        })
        list.push(tempObj)
    }
    return {
        list,
    }
}

async function getAlterRecord(params) {
    try {
        const { list, total } = await httpApi.getRecord({
            projectInstId: currentProjectInfo.value.mainProjectInstId,
            ...params,
        })

        return {
            list,
            total,
        }
    } catch (e) {
        console.log(e)
    }
}

async function codeChange(value) {
    const regExp = /^PR\d{4}-\d{4}$/

    const temp = {
        relateProjectInstId: null,
        relateProjectName: null,
        relateProjectMainLawyerName: null,
        relateProjectCreatorDeptName: null,
        relateProjectCreateTime: null,
    }
    if (regExp.test(value)) {
        layerBodyLoading.value = true
        let data
        try {
            data = await initCreateApi.queryRelateProjects({ projectInstCode: value })
        } catch (e) {
            console.log(e)
        }
        layerBodyLoading.value = false
        if (data) {
            layerRef.value.update({
                relateProjectInstId: data.projectInstId,
                relateProjectName: data.projectInstName,
                relateProjectMainLawyerName: data.mainLawyerName,
                relateProjectCreatorDeptName: data.createDepartmentName,
                relateProjectCreateTime: data.buildTime,
            })
        } else {
            layerRef.value.update(temp)
        }
    } else {
        layerRef.value.update(temp)
    }
}
async function submit(data, type) {
    try {
        const params = {
            mainProjectInstId: currentProjectInfo.value.mainProjectInstId,
            mainProjectName: currentProjectInfo.value.mainProjectName,
            mainProjectCode: currentProjectInfo.value.mainProjectCode,
            list: [
                {
                    relateCondition: data.relateCondition,
                    relateProjectInstId: data.relateProjectInstId,
                    relateProjectCode: data.relateProjectCode,
                    relateProjectName: data.relateProjectName,
                    relateProjectComments: data.relateProjectComments,
                    relateProjectCreateTime: data.relateProjectCreateTime,
                },
            ],
        }
        if (type === 'add') {
            params.operateType = 'add'
            await initCreateApi.saveRelateProjects(params)
            ElMessage.success($t('message.saveSuccess'))
        } else {
            await initCreateApi.updateRelateProjects(params)
            ElMessage.success($t('message.alterSuccess'))
        }
        layerRef.value.close()
        tableRef.value.initTable()
        recordTableRef.value.initTable()
        await getForceData()
        linkForceKey.value = +new Date()
    } catch (e) {
        console.log(e)
    }
}

function handleAdd() {
    layerRefStatus.value = 'add'
    layerRef.value.add({
        column: 2,
    })
}

function handleEdit(row) {
    layerRefStatus.value = 'edit'
    layerRef.value.edit({
        column: 2,
        row: {
            ...row,
        },
    })
}
async function handleDelete(row) {
    loading.value = true
    try {
        await linkApi.del({
            mainProjectInstId: row.mainProjectInstId,
            relateProjectInstId: row.relateProjectInstId,
        })

        ElMessage.success($t('message.delSuccess'))

        tableRef.value.initTable()
        recordTableRef.value.initTable()
        await getForceData()
        linkForceKey.value = +new Date()
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}

async function recordView(row) {
    loading.value = true
    try {
        linkApi.updateReadStatus({ changeRecordId: row.id }).then(() => {
            recordTableRef.value.renderTable()
        })
        recordDetail.value = await linkApi.getRecordDetail({ businessId: row.id })
        recordLayerRef.value.add({ title: '关联项目变更前后对比' })
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}

function crumbClosed() {
    emit('changeShowList')
}
</script>

<style scoped lang="scss">
.title {
    cursor: pointer;
}
</style>
