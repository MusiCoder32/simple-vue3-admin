import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: basicAttr(),
    high: [
        ...highAttr(),
        {
            label: '最长字数',
            component: 'InputNumber',
            name: 'props.maxlength',
        },
        {
            label: '最小行数',
            component: 'InputNumber',
            name: 'props.minRows',
            initialValue: 2,
        },
        {
            label: '最大行数',
            component: 'InputNumber',
            name: 'props.maxRows',
            initialValue: 4,
        },
    ],
    linkage: linkageAttr,
})
