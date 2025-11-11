import { optionAttr, linkageAttr, basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: [
        ...basicAttr(['initialValue', 'props.readonly']),
        {
            label: '初始值',
            component: 'JsonEdit',
            name: 'initialValue',
            props: {
                mode: 'dialog',
                initVal: '{{$values.props.multiple?[]:" "}}',
            },
        },

        {
            label: '选择模式',
            component: 'Switch',
            name: 'props.multiple',
            props: {
                'active-text': '多选',
                'inactive-text': '单选',
            },
            designKey: 'form-eTxc',
        },
        {
            label: '开启filter',
            component: 'Switch',
            name: 'props.filterable',
            props: {
                'active-text': '开启',
                'inactive-text': '关闭',
            },
            designKey: 'form-eTxc',
        },
        // {
        //     label: '支持创建选项',
        //     component: 'Switch',
        //     name: 'props.allowCreate',
        //     props: {
        //         'active-text': '开启',
        //         'inactive-text': '关闭',
        //     },
        //     designKey: 'form-eTxc',
        // },
        {
            label: '开启其他选项功能',
            name: 'props.showOtherOption',
            component: 'Switch',
            designKey: 'form-12e33L0P66',
        },

        ...optionAttr,
    ],

    high: [
        ...highAttr(),
        {
            label: '自动选中第一项',
            component: 'Switch',
            name: 'props.autoSelectedFirst',
            designKey: 'form-LPpx',
        },
        {
            label: '滚动加载下一页',
            component: 'Switch',
            name: 'props.scrollLoad',
            designKey: 'form-LPpxscrollLoad',
        },
    ],

    linkage: linkageAttr,
})
