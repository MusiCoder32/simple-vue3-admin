<template>
    <div class="w100 h100" v-show="showList">
        <simple-table
            ref="tableRef"
            :columns="projectColumns"
            :getTableData="getTableData"
            :showPage="true"
            :showAdd="false"
            :showIndex="true">
            <el-table-column :label="$t('common.operations')" align="left" fixed="right">
                <template #default="scope">
                    <div class="h-start-center">
                        <el-button type="primary" text @click="handleView(scope.row)">
                            {{ $t('common.view') }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </simple-table>
    </div>
    <detail v-if="!showList" @changeShowList="changeShowList" :mainProjectInfo="mainProjectInfo" />
</template>
<script lang="tsx" setup>
import createColumns from './index'
import { linkApi } from '@/api/projects/link'
import Detail from './detail.vue'

const router = useRouter()
const route = useRoute()

const { projectColumns } = createColumns()
const httpApi = linkApi

const tableRef = ref()
const showList = ref(true)
const mainProjectInfo = ref()

onMounted(() => {
    const { messageInfo } = route.query
    if (messageInfo) {
        const messageObj = JSON.parse(messageInfo)
        if (messageObj.optionType === 'view') {
            handleView(messageObj)
        } else if (messageObj.optionType === 'biView') {
            handleBiView(messageObj)
        }
    }
})

async function getTableData(params) {
    try {
        const data = await httpApi.get(params)
        return {
            list: data.list,
            total: data.total,
        }
    } catch (e) {
        console.log(e)
    }
}
function changeShowList() {
    router.replace({ query: {} })
    showList.value = true
    tableRef.value?.renderTable()
}
function handleView(row) {
    mainProjectInfo.value = {
        id: row.projectInstId,
        name: row.projectInstName,
        code: row.projectInstCode,
    }
    showList.value = false
}
function handleBiView(row) {
    mainProjectInfo.value = {
        id: row.projectInstId,
        name: row.projectInstName,
        code: row.projectInstCode,
        optionType: row.optionType,
    }
    showList.value = false
}
</script>

<style></style>
