<template>
    <div
        v-loading="loading || selfLoading"
        class="simple-table p4 w-full bg-white"
        flex="column"
        :id="id"
        :class="{ 'h-full': !autoHeight }">
        <!-- 查询区域 -->
        <div v-if="queryList && queryList?.length > 0" class="mb1 no-print w-full" flex="~ justify-between items-start">
            <el-form
                @submit.prevent
                class="query-box w0 grow"
                :class="expand ? 'expand' : ''"
                ref="queryFormRef"
                :model="queryFormModel"
                :rules="queryFormRules"
                :label-width="labelWidth ?? '80px'"
                :inline-message="false"
                label-position="right">
                <template v-for="item in queryList" :key="item.dataIndex">
                    <el-form-item class="pr5" :prop="item.queryIndex ?? item.dataIndex">
                        <template #label>
                            <div v-ell>{{ $t(item.queryTitle || item.title) }}</div>
                        </template>

                        <!-- 使用simple-form-item渲染表单组件 -->
                        <simple-form-item
                            :model="queryFormModel"
                            :formItem="item.formItem"
                            :title="item.title"
                            :dataIndex="item.queryIndex || item.dataIndex" />

                        <template #error="{ error }">
                            <div class="el-form-item__error w-full" v-ell>{{ error }}</div>
                        </template>
                    </el-form-item>
                </template>
            </el-form>
            <div v-if="queryList && queryList.length" class="h-start-center">
                <el-button class="ml2" @click="reset">
                    {{ $t('common.reset') }}
                </el-button>
                <el-button type="primary" class="ml2" @click="search">
                    {{ $t('common.query') }}
                </el-button>

                <div
                    v-if="showExpand"
                    class="h-start-center color-blue pointer whitespace-nowrap"
                    @click="expand = !expand">
                    <div class="ml4 mr1">{{ expand ? $t('common.fold') : $t('common.unfold') }}</div>
                    <el-icon class="fw500">
                        <ArrowUp v-if="expand" />
                        <ArrowDown v-else />
                    </el-icon>
                </div>
            </div>
        </div>

        <!-- 查询区与列表区中间按钮区域 -->
        <slot name="afterQuery"></slot>
        <div v-if="showAdd || showExport" class="h-between-center mb4 no-print">
            <div class="h-start-center">
                <el-button v-if="showAdd" type="primary" @click="add">
                    {{ $t(addBtnName) }}
                </el-button>
                <slot name="left"></slot>
            </div>
            <div v-if="showExport" flex="~ justify-end items-center">
                <el-button type="primary" @click="exportExcel">导出Excel</el-button>
                <slot name="right"></slot>
            </div>
        </div>

        <!-- 列表区域 -->
        <div class="" :class="tableData.length ? (!autoHeight ? 'h0 grow' : '') : 'simple-table-empty'">
            <el-table
                height="100%"
                @selection-change="selectChange"
                @select="rowSelect"
                @select-all="selectAll"
                @expand-change="expandChange"
                :span-method="spanMethod"
                v-bind="otherOptions"
                ref="table"
                :data="tableData"
                :header-cell-style="{ 'background-color': 'rgb(245, 247, 250)' }"
                :highlight-current-row="showRadio">
                <el-table-column
                    type="selection"
                    :reserve-selection="reserveSelection"
                    align="left"
                    width="40"
                    v-if="showCheckbox"
                    :selectable="(row) => !row?.disabled" />
                <el-table-column width="40" align="left" v-if="showRadio">
                    <template #default="scope">
                        <el-radio
                            :disabled="scope.row?.disabled"
                            @click="radioChange(scope)"
                            :modelValue="radioValue"
                            :value="scope.$index + ''" />
                    </template>
                </el-table-column>
                <!-- 展开行可通过该方式实现,当无选择框时,也可直接通过设置column.columnType为expand实现 -->
                <slot name="expand"></slot>

                <el-table-column :label="$t('common.number')" :width="indexWidth" align="center" v-if="showIndex">
                    <template #default="scope">
                        {{ showPage ? (page.index - 1) * page.size + scope.$index + 1 : scope.$index + 1 }}
                    </template>
                </el-table-column>
                <slot name="beforeColumn"></slot>

                <table-column :tableData="tableData" :columns="columns" />

                <slot name="default"></slot>
            </el-table>
        </div>
        <!-- 列表分页 -->
        <div v-if="showPage" class="h-end-center pt4">
            <el-pagination
                v-model:current-page="page.index"
                background
                size="small"
                :layout="pageLayout"
                :total="page.total"
                :page-size="page.size"
                :page-sizes="pageSizes"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"></el-pagination>
        </div>
        <simple-layer ref="exportFieldRef" @confirm="exportExcel" size="small">
            <el-form-item :error="fieldSelected.length ? null : '请勾选需要导出列'">
                <el-select clearable class="mt7" multiple v-model="fieldSelected">
                    <template v-for="column in columns">
                        <el-option
                            v-if="!column.tableHidden"
                            :key="column.dataIndex"
                            :label="column.title"
                            :value="column.title"></el-option>
                    </template>
                </el-select>
            </el-form-item>
        </simple-layer>
    </div>
</template>

<script setup lang="tsx">
import { isNil } from 'lodash'
import exportExcelFn from './export-excel'
import SimpleFormItem from '../simple-form-item'
import TableColumn from './table-column'
import { Props } from './types'
import { initCol, addSubtotals, setSpanMethod } from './index'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const id = 'simple-table-' + +new Date()
const expand = ref(false)

const props = withDefaults(defineProps<Props>(), {
    isInitData: true,
    isDelayLoading: true,
    autoHeight: true,
    showIndex: true,
    page: () => ({ index: 1, size: 10, total: 0 }),
    pageLayout: 'total, sizes, prev, pager, next, jumper', // 分页需要显示的东西，默认全部
    pageSizes: () => [10, 20, 50, 100],
    addBtnName: 'common.add',
    indexWidth: '55',
    otherOptions: () => ({}),
})
const selfLoading = ref(false)
const emits = defineEmits([
    'add',
    'selectChange',
    'rowSelect',
    'selectAll',
    'checkboxSelect',
    'radioSelect',
    'expandChange',
])

const table = ref(null)
const tableData = ref([])
const queryFormRef = ref(null)

const radioValue = ref()
const showExpand = ref(false)
const spanMethod = ref(() => {
    return { rowspan: 1, colspan: 1 }
})
const isOnMounted = ref(true)

const exportFieldRef = ref()
const fieldSelected = ref()

let timer = null

const { queryList, queryFormRules, queryFormModel, mergeCol, subTotalKeys, subAndGrandOptions } = initCol(props.columns)

onMounted(() => {
    queryFormRef.value?.resetFields()

    if (props.isInitData || props.list) {
        initTable()
    }
    isShowExpandFn()
})

// 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
onActivated(() => {
    //首次挂载时,既会触发onMounted,也会触发onActivated
    if (isOnMounted.value) {
        isOnMounted.value = false
    } else {
        table.value.doLayout()
        renderTable()
    }
    isShowExpandFn()
})

async function initTable(data = {}) {
    props.page.index = 1
    await renderTable(data)
}

async function renderTable(data = {}) {
    selfLoading.value = true

    // <---组装查询参数
    const startTime = +new Date()
    let params = props.showPage
        ? {
              pageNum: props.page.index,
              pageSize: props.page.size,
          }
        : {}

    if (queryList.value?.length) {
        for (let i = 0; i < queryList.value.length; i++) {
            const { queryIndex, dataIndex } = queryList.value[i]
            /**
             * 根据实际项目情况，统一处理查询区参数组装逻辑
             */
            const key = queryIndex ?? dataIndex
            const value = queryFormModel.value[key]
            params[key] = value
        }
    }
    params = { ...params, ...data }
    // 组装查询参数--->

    try {
        //获取表格数据
        let list = []
        if (Array.isArray(props.list)) {
            props.page.total = props.list.length
            list = [...props.list]
            if (props.showPage) {
                /**
                 * 通过props.list传入列表数据的情况下，暂不考虑响应查询区查询的情形，若需要，可在此处补充逻辑
                 */
                const start = (props.page.index - 1) * props.page.size
                const end = start + props.page.size
                list = props.list.slice(start, end)
                console.log(list, start, end)
            }
        } else {
            const dataRes = await props.getTableData(params)
            props.page.total = dataRes?.total
            list = dataRes?.list || []
        }

        //处理表格
        //小计总计
        if (subTotalKeys.value.length > 0) {
            list = addSubtotals(list, subAndGrandOptions.value, subTotalKeys.value)
        }
        tableData.value = list
        //单元格合并
        if (mergeCol.value.length > 0 || props.otherSpanMethod) {
            spanMethod.value = setSpanMethod(list, props.otherSpanMethod, mergeCol.value, subTotalKeys.value)
        }
        //多选数据默认勾选
        if (props.showCheckbox && props.selectedIds?.length) {
            nextTick(() => {
                props.selectedIds.forEach((id) => {
                    for (let i = 0; i < tableData.value.length; i++) {
                        let row = tableData.value[i]
                        if (id == row.id) {
                            table.value.toggleRowSelection(row, true)
                            break
                        }
                    }
                })
            })
        }
        //单选数据默认勾选
        if (props.showRadio && props.selectedId) {
            radioValue.value = props.selectedId
        }

        if (props.showPage) {
            if (isNil(props.page.total) && import.meta.env.MODE === 'development') {
                ElMessage.error($t('message.pageError'))
            }
        }
    } catch (e) {
        console.log(e)
    }

    //延迟关闭loading,防止loading闪烁
    const endTime = +new Date()
    if (props.isDelayLoading) {
        setTimeout(
            () => {
                selfLoading.value = false
            },
            Math.max(0, 1000 - (endTime - startTime)),
        )
    } else {
        selfLoading.value = false
    }
}

function isShowExpandFn() {
    nextTick(() => {
        setTimeout(() => {
            if (expand.value) {
                showExpand.value = true
            } else {
                if (queryList.value.length) {
                    const dom = document.querySelector(`#${id} .query-box`)
                    showExpand.value = dom.scrollHeight > dom.offsetHeight
                }
            }
        }, 1500)
    })
}

// 分页相关：监听页码切换事件
function handleCurrentChange(val) {
    if (timer) {
        props.page.index = 1
    } else {
        props.page.index = val
        renderTable()
    }
}

// 分页相关：监听单页显示数量切换事件
function handleSizeChange(val) {
    timer = 'work'
    setTimeout(() => {
        timer = null
    }, 100)
    props.page.index = 1
    props.page.size = val
    renderTable()
}

async function search() {
    queryFormRef.value.clearValidate()
    let valid = await queryFormRef.value?.validate().catch(() => false)
    if (valid) {
        renderTable()
    }
}
function reset() {
    // let model = {}
    // props.columns.forEach((item) => {
    //     if (item.query) {
    //         model[item.queryIndex ?? item.dataIndex] = item.value
    //     }
    // })
    // queryFormModel.value = model
    for (const key in queryFormModel.value) {
        queryFormModel.value[key] = null
    }
    props.isInitData && renderTable()
}
function add() {
    emits('add')
}

function selectChange(row) {
    emits('selectChange', row)
}
function expandChange(row, expandedRow) {
    emits('expandChange', row, expandedRow)
}
function rowSelect(selection, row) {
    emits('rowSelect', selection, row)
    emits('checkboxSelect', selection)
}
function selectAll(selection) {
    emits('selectAll', selection)
    emits('checkboxSelect', selection)
}
//单选选中事件
function radioChange(scope) {
    if (!scope.row.disabled) {
        radioValue.value = scope.$index + ''
        emits('radioSelect', scope.row)
    }
}

function exportExcel() {
    if (props.showCheckbox) {
        const selectedArr = table.value.getSelectionRows()
        if (!selectedArr.length) {
            return ElMessage.error('请勾选需要导出的行数据')
        }
    }
    if (props.showExportField && !exportFieldRef.value.getStatus()) {
        exportFieldRef.value.look({ title: '请选择需要在excel中导出的列' })
        fieldSelected.value = props.columns.filter((item) => !item.tableHidden).map((item) => item.title)
    } else {
        if (fieldSelected.value.length > 0) {
            exportFieldRef.value.close()
            exportExcelFn(
                table.value,
                props.excelFileName,
                props.excelColInfo,
                props.showCheckbox,
                props.showExportField,
                fieldSelected.value,
            )
        }
    }
}

defineExpose({
    initTable, //重新请求列表数据，并将当前页码置为1，接受一个对象作为补充的查询参数
    renderTable, //重新请求列表数据，不改变页码，接受一个对象作为补充的查询参数
    tableData, //列表数据
    table, //获取el-table实例，以调用el-table支持的各种方法
    exportExcel, //导出表格数据为excel
})
</script>

<style lang="scss">
// .el-table-fixed-column--right {
//     border-left: var(--el-table-border);
// }
.query-box {
    // transition: 1s ease-out;
    overflow-y: hidden;
    max-height: 44px;
    display: flex;
    flex-wrap: wrap;
    container-type: inline-size;

    .el-form-item {
        margin-bottom: 12px !important;
    }

    @container (min-width: 1440px) {
        .el-form-item {
            width: 25%;
        }
    }

    @container (max-width: 1440px) {
        .el-form-item {
            width: 33.33%;
        }
    }

    @container (max-width: 900px) {
        .el-form-item {
            width: 50%;
        }
    }
}

.expand {
    max-height: 240px;
}

.simple-table {
    td {
        .cell:empty::after {
            content: '--';
        }
    }
    .el-table__body {
        tr {
            height: 40px;
        }
    }
    .el-table__header {
        th {
            height: 40px;
        }
    }

    .simple-table-empty {
        .el-table__empty-block {
            min-height: 40px;
            max-height: 40px;

            .el-table__empty-text {
                line-height: 40px;
            }
        }
    }
    .el-form .el-form-item .el-form-item__label {
        text-align: right;
    }
    table > thead > tr > th .cell {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }
    table > thead > tr > th.is-center .cell {
        justify-content: center;
    }
}

.el-table--default .el-table__cell {
    padding: 4px 0 !important;
}
</style>
