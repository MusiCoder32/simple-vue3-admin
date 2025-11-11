import { highAttr } from '../../common-attr'

export default [
    {
        label: '组件类型',
        component: 'Input',
        name: 'component',
        props: {
            readonly: true,
        },
    },
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '按钮名称', component: 'Input', name: 'props.name' },
    {
        component: 'Grid',
        children: [
            { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
            { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        ],
        props: {
            columns: 3,
            'row-gap': 0,
            'column-gap': 20,
        },
        designKey: 'form-R003',
        name: 'cNmCuu',
        style: {
            marginBottom: 0,
        },
    },

    {
        label: '按钮颜色',
        component: 'Radio',
        name: 'props.type',
        props: {
            mode: 'static',
            options: [
                { label: '普通按钮', value: '' },
                { label: 'primary', value: 'primary' },
                { label: 'success', value: 'success' },
                { label: 'info', value: 'info' },
                { label: 'warning', value: 'warning' },
                { label: 'danger', value: 'danger' },
            ],
        },
    },
    {
        label: '按钮类型',
        component: 'Radio',
        name: 'props.category',
        props: {
            mode: 'static',
            options: [
                { label: '普通按钮', value: 1 },
                { label: '文本', value: 2 },
            ],
        },
        initialValue: 1,
    },

    {
        label: '点击事件',
        component: 'Select',
        name: 'props.clickEvent',
        props: {
            mode: 'static',
            options: [
                { label: '提交表单', value: 'submitForm' },
                { label: '重置表单', value: 'resetFieldsForm' },
                { label: '自定义', value: 'custom' },
            ],
        },
        initialValue: 'submitForm',
    },
    {
        label: '自定义事件',
        component: 'Input',
        name: 'props.customEvent',
        hidden: '{{$values.props.clickEvent!=="custom"}}',
        help: '可以通过schemaContext注入自定义事件，然后通过插值获取。 例：{{ onTest }}',
    },
    ...highAttr(),
]
