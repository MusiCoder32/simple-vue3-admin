import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: [
        ...basicAttr(['initialValue']),
        {
            label: '初始值',
            component: 'InputNumber',
            name: 'initialValue',
        },

        {
            label: '按钮位置',
            component: 'Radio',
            name: 'props.controlsPosition',
            props: {
                mode: 'static',
                options: [
                    { label: '两侧', value: '' },
                    { label: '内部', value: 'right' },
                ],
            },
            initialValue: '',
        },
        {
            label: '最小值',
            component: 'InputNumber',
            name: 'props.min',
            initialValue: 0,
        },
        {
            label: '最大值',
            component: 'InputNumber',
            name: 'props.max',
        },
        {
            label: '单位',
            component: 'Input',
            name: 'props.unit',
        },
        {
            label: '步长',
            component: 'InputNumber',
            name: 'props.step',
            initialValue: 1,
        },
        {
            label: '精度',
            component: 'InputNumber',
            name: 'props.precision',
            initialValue: 2,
        },
    ],

    high: highAttr(),

    linkage: linkageAttr,
})
