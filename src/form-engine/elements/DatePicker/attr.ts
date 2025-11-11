import { initial } from 'lodash'
import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: [
        ...basicAttr(),
        {
            label: '类型',
            component: 'Radio',
            name: 'props.type',
            props: {
                mode: 'static',
                options: [
                    { label: '日期时间', value: 'datetime' },
                    { label: '日期', value: 'date' },
                    { label: '年月', value: 'month' },
                    { label: '日期范围', value: 'daterange' },
                    { label: '日期时间范围', value: 'datetimerange' },
                ],
            },
        },
        {
            label: '输出时间格式',
            component: 'Input',
            name: 'props.valueFormat',
        },
        {
            label: '以当前时间',
            component: 'Radio',
            name: 'props.startOrEnd',
            props: {
                mode: 'static',
                options: [
                    { label: '开始', value: 0 },
                    { label: '结束', value: 1 },
                    { label: '不限制', value: 2 },
                ],
            },
            initialValue: 2,
        },
    ],
    high: [...highAttr(), { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' }],

    linkage: linkageAttr,
})
