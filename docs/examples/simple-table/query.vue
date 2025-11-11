<template>
    <simple-table :columns="columns" :getTableData="getTableData" />
</template>
<script lang="tsx" setup>
import { isMatch, isNil } from 'lodash'

enum TypeEnum {
    '1' = '白日梦',
    '2' = '菌中毒',
}

let list = [
    {
        id: 1,
        name: '中彩票了',
        user: '张三',
        type: '1',
        time: '2025-9-11',
        description: '梦见中彩票',
    },
    {
        id: 2,
        name: '看见小人',
        user: '李四',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
    {
        id: 3,
        name: '有女朋友了',
        user: '张三',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
    {
        id: 4,
        name: '上岸了',
        user: '李四',
        type: '2',
        time: '2025-9-11',
        description: '去云南旅游',
    },
]
const columns = ref([
    {
        dataIndex: 'name',
        title: '名称',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'user',
        title: '申请人',
        formItem: {
            type: ElInput,
            required: true,
        },
    },
    {
        dataIndex: 'type',
        title: '类别',
        formItem: {
            type: ElSelect,
            required: true,
            opts: {
                slots: {
       
                    ...utils.setSelectOption(TypeEnum),
                },
            },
        },
        customRender(text) {
            return TypeEnum[text]
        },
    },
    {
        dataIndex: 'time',
        title: '时间',
        width: 100,
        queryHidden: true,
        formItem: {
            type: ElDatePicker,
            value: dayjs().format('YYYY-MM-DD'),
            opts: {
                type: 'date',
                disabled: true,
            },
        },
    },
    {
        dataIndex: 'description',
        title: '描述',
        overflow: true,
        queryHidden: true,
        formItem: {
            col: 1,
            type: ElInput,
            opts: {
                type: 'textarea',
            },
        },
    },
])

// 表格数据
async function getTableData(params) {
    try {
        // const {list} = await httpApi.get(params)

        Object.keys(params).forEach((key) => {
            if (isNil(params[key])) {
                delete params[key]
            }
        })
        return {
            list: list.filter((item) => isMatch(item, params)),
        }
    } catch (e) {
        console.log(e)
    }
}
</script>
