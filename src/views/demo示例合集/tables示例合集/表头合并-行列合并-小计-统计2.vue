<template>
    <div id="export-pdf-1314" class="h-full w-full">
        <print-alert />
        <simple-table
            ref="tableRef"
            :labelWidth="48"
            :columns="columns"
            :getTableData="getTableData"
            :showIndex="false"
            :showExport="true"
            :otherOptions="otherOptions"
            :otherSpanMethod="otherSpanMethod"
            :subTotalKeys="subTotalKeys"
            :excelColInfo="excelColInfo"
            :excelName="excelName">
            <template #right>
                <el-button type="primary" @click="exportPreviewHandle">导出PDF</el-button>
            </template>
        </simple-table>
    </div>
</template>
<script setup lang="tsx">
import dataJson from './data.json?raw'

const excelColInfo = [{ wpx: 150 }, { wpx: 200 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }]
const defaultTime = [dayjs().subtract(6, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
const excelName = ref(`项目简报数据(${defaultTime[0]} - ${defaultTime[1]} )`)
const tableRef = ref()
const otherOptions = {
    border: true,
    'row-class-name': rowClassName,
}
const columns = [
    {
        title: '项目简报数据',
        columnAttr: {
            renderHeader() {
                return <span class="text-4 fw700">{excelName.value}</span>
            },
        },
        children: [
            {
                title: '日期',
                dataIndex: 'calRange',
                tableHidden: true,
                formItem: {
                    value: defaultTime,
                    type: ElDatePicker,
                    opts: {
                        valueFormat: 'YYYY-MM-DD',
                        type: 'daterange',
                        clearable: false,
                        startPlaceholder: $t('common.selectText'),
                        endPlaceholder: $t('common.selectText'),
                        onChange(queryModel) {
                            const startDate = queryModel['calRange'][0]
                            const endDate = queryModel['calRange'][1]
                            excelName.value = `项目简报数据(${startDate} - ${endDate} )`
                            queryModel.totalDays = dayjs(endDate).diff(startDate, 'day')
                        },
                    },
                },
            },
            {
                title: '天数',
                dataIndex: 'totalDays',
                tableHidden: true,
                formItem: {
                    value: dayjs(defaultTime[1]).diff(defaultTime[0], 'day'),
                    type: ElInput,
                    opts: {
                        disabled: true,
                    },
                },
            },
            {
                // ...deptColumn.value,
                queryIndex: 'mainLawyerDeptCode',
                dataIndex: 'mainLawyerDeptName',
                grandTotalTitle: '总计',
                width: 100,
                merge: true,
                customRender(text, row) {
                    return row.mainLawyerDeptName
                },
            },
            {
                dataIndex: 'mainLawyerName',
                title: '主办律师',
                subTotalTitle: '小计',
            },

            {
                title: '在处理',
                children: [
                    {
                        title: '数量',
                        dataIndex: 'dealCount',
                        subTotal: true,
                    },
                    {
                        title: '项目金额（亿元）',
                        dataIndex: 'dealXmjeyb',
                        subTotal: true,
                    },
                ],
            },
            {
                title: '新受理',
                children: [
                    {
                        title: '数量',
                        dataIndex: 'newAcceptedCount',
                        subTotal: true,
                    },
                    {
                        title: '项目金额（亿元）',
                        dataIndex: 'newAcceptedXmjeyb',
                        subTotal: true,
                    },
                ],
            },
        ],
    },
]

function getTableData() {
    let list = JSON.parse(dataJson).sort((a, b) => a.mainLawyerDeptCode - b.mainLawyerDeptCode)
    return {
        list,
    }
}
function otherSpanMethod({ row, column }) {
    //仅用于小计功能进行列合并，非通用功能
    if (row.isTotal) {
        if (column.property === 'mainLawyerDeptName') {
            return [1, 2] // 合并3列
        } else if (column.property === 'projectStageCode' || column.property === 'mainLawyerName') {
            return [0, 0]
        }
    }
}
// 设置统计行样式
function rowClassName({ row }) {
    return row.isSubtotal || row.isTotal ? 'fw600' : ''
}

async function exportPreviewHandle() {
    if (location.href.indexOf('guid') > -1) {
        return alert('在npm run dev 环境下可用')
    }
    await utils.exportPdfPreview('#export-pdf-1314')
}
</script>
