import { basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: [
        {
            component: 'Alert',
            props: {
                title: '说明',
                type: 'info',
                effect: 'light',
                description: '值是由【多个相同格式的对象】组成的数组，适用于收集多组数据',
                closable: true,
                'show-icon': true,
            },
            designKey: 'form-fVKS',
            name: 'sv1sIQ',
            hidden: false,
        },
        ...basicAttr(['initialValue', 'props.placeholder', 'props.readonly']),

        {
            label: '显示序号',
            component: 'Radio',
            name: 'props.showIndex',
            props: {
                mode: 'static',
                options: [
                    { label: '显示序号', value: true },
                    { label: '隐藏序号', value: false },
                ],
            },
        },
        {
            label: '显示多选',
            component: 'Radio',
            name: 'props.showSelect',
            props: {
                mode: 'static',
                options: [
                    { label: '显示', value: true },
                    { label: '隐藏', value: false },
                ],
            },
        },
        {
            label: '显示模式',
            component: 'Radio',
            name: 'props.mode',
            props: {
                mode: 'static',
                options: [
                    { label: '表格', value: 'table' },
                    { label: '卡片', value: 'card' },
                    { label: '行内', value: 'inline' },
                ],
            },
        },
        {
            label: '初始化一条数据',
            component: 'Radio',
            name: 'props.needFirst',
            props: {
                mode: 'static',
                options: [
                    { label: '是', value: true },
                    { label: '否', value: false },
                ],
            },
        },
        {
            label: '显示分页',
            component: 'Radio',
            name: 'props.showPage',
            props: {
                mode: 'static',
                options: [
                    { label: '显示', value: true },
                    { label: '不显示', value: false },
                ],
            },
            hidden: "{{$values.props.mode !== 'table'}}",
        },
        {
            label: '最大自增数量',
            component: 'InputNumber',
            name: 'props.maxLines',
        },
        {
            label: '显示添加按钮',
            component: 'Radio',
            name: 'props.allowAdd',
            props: {
                mode: 'static',
                options: [
                    { label: '显示', value: true },
                    { label: '不显示', value: false },
                ],
            },
        },
        {
            label: '显示对比',
            component: 'Radio',
            name: 'showChange',
            props: {
                mode: 'static',
                options: [
                    { label: '显示', value: true },
                    { label: '不显示', value: false },
                ],
            },
        },

        {
            label: '操作列',
            help: '方法通过$selfEvent注入,删除方法必须返回delSuccess',
            name: 'props.operations',
            component: 'FormList',
            children: [
                {
                    label: '按钮名称',
                    name: 'buttonName',
                    component: 'Input',
                    props: {},
                },
                {
                    label: '按钮事件',
                    name: 'buttonEvent',
                    component: 'Input',
                    props: {},
                },
                {
                    label: '按钮图标',
                    name: 'icon',
                    component: 'Input',
                    props: {},
                },
                {
                    label: '按钮权限',
                    name: 'has',
                    component: 'Input',
                    props: {},
                },
                {
                    label: '是否隐藏',
                    name: 'hidden',
                    component: 'Input',
                    props: {},
                },
                {
                    label: '是否禁用',
                    name: 'disabled',
                    component: 'Input',
                    props: {},
                },
            ],
            props: {
                mode: 'card',
            },
        },
        {
            label: '操作列最小宽度(如140px)',
            help: '设置时,需要带px单位。不设置时,默认宽度为操作按钮数量*60',
            component: 'Input',
            name: 'props.operationWidth',
            props: {},
            hidden: '{{!$values.props.operations?.length}}',
        },
        {
            label: '是否固定高度',
            help: '设置时,需要设定具体高度',
            name: 'props.isFixedHeight',
            component: 'Radio',
            props: {
                mode: 'static',
                options: [
                    { label: '是', value: true },
                    { label: '否', value: false },
                ],
            },
            hidden: "{{$values.props.mode!=='table'}}",
        },
        {
            label: '固定高度值',
            help: '设置时,若高度不生效，加上!important,如(calc(100vh - 215px) !important)',
            name: 'props.fixedHeight',
            component: 'Input',
            hidden: '{{ !$values.props.isFixedHeight }}',
        },
        {
            label: '卡片标题',
            component: 'Input',
            name: 'props.title',
            hidden: "{{$values.props.mode!=='card'}}",
        },
        {
            label: '初始值',
            component: 'JsonEdit',
            name: 'initialValue',
            props: {
                mode: 'dialog',
                initVal: [],
            },
        },
    ],
    high: highAttr(),
})
