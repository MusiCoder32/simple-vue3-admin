<template>
    <div class="h-full w-full bg-white">
        <print-alert />

        <simple-table
            ref="tableRef"
            :columns="columns"
            :otherOptions="{
                border: true,
            }"
            :showIndex="false"
            :showExport="true"
            :excelColInfo="excelColInfo"
            :getTableData="getTableData"
            :excelName="excelName" />
    </div>
</template>
<script setup lang="tsx">
import { statisticsApi } from '@/api/statistics'
const excelColInfo = [{ wpx: 150 }, { wpx: 200 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }]
const defaultTime = [dayjs().subtract(6, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
const excelName = ref(`项目简报数据(${defaultTime[0]} - ${defaultTime[1]} )`)

const columns = computed(() => {
    return [
        {
            title: '项目简报数据',
            columnAttr: {
                renderHeader() {
                    return <span class="text-4 fw700">{excelName.value}</span>
                },
            },
            children: [
                {
                    title: '同期时间区间',
                    dataIndex: '同期时间区间',
                    tableHidden: true,
                    formItem: {
                        type: ElDatePicker,
                        value: [
                            dayjs().subtract(18, 'month').format('YYYY-MM-DD'),
                            dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
                        ],
                        querySort: 2,
                        opts: {
                            type: 'daterange',
                            disabled: true,
                            valueFormat: 'YYYY-MM-DD',
                            startPlaceholder: $t('common.selectText'),
                            endPlaceholder: $t('common.selectText'),
                        },
                    },
                },
                {
                    title: '统计项目类型',
                    dataIndex: 'calType',
                    merge: true,
                    customRender(text) {
                        const obj = {
                            majorProject: '项目',
                            investProject: '投资项目',
                        }
                        return obj[text]
                    },
                },
                {
                    title: '统计时间区间',
                    tableTitle: '统计区间',
                    dataIndex: 'calRange',
                    formItem: {
                        type: ElDatePicker,
                        value: defaultTime,

                        opts: {
                            type: 'daterange',
                            valueFormat: 'YYYY-MM-DD',
                            startPlaceholder: $t('common.selectText'),
                            endPlaceholder: $t('common.selectText'),
                            onChange(model) {
                                excelName.value = `项目简报数据(${model['calRange'][0]} - ${model['calRange'][1]} )`
                                model['同期时间区间'] = [
                                    dayjs(model['calRange'][0]).subtract(1, 'year').format('YYYY-MM-DD'),
                                    dayjs(model['calRange'][1]).subtract(1, 'year').format('YYYY-MM-DD'),
                                ]
                            },
                        },
                    },
                },
                {
                    title: '在处理项目数量',
                    dataIndex: 'dealCount',
                },
                {
                    title: '新受理项目数量',
                    dataIndex: 'newAcceptedCount',
                },
                {
                    title: '结案项目数量',
                    dataIndex: 'closedCount',
                },
            ],
        },
    ]
})

async function getTableData(params) {
    try {
        const data = await statisticsApi.getBriefData({
            statisticsDateStart: params['calRange'][0],
            statisticsDateEnd: params['calRange'][1],
        })
        return {
            list: data.sort((a, b) => a.sortNum - b.sortNum),
        }
    } catch (e) {
        console.log(e)
    }
}
</script>
<style lang="scss" scoped>
.statistics-item {
    border: 1px solid rgb(220, 220, 220);
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(0, 141, 249, 0.1) 0%, rgba(250, 251, 252, 0.1) 36.667%);
    height: 105px;
}
.color-red {
    color: #f65646;
}
.color-green {
    color: #26bf75;
}
</style>
