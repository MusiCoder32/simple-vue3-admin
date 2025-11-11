// import Radio from '../Radio/Radio.vue'
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
    { label: '标签', component: 'Input', name: 'label' },
    { label: '固定宽度', component: 'Input', name: 'props.width' },
    { label: '隐藏标签', component: 'Switch', name: 'props.hideLabel', initialValue: true },
    {
        label: '水平对齐方式',
        component: 'Radio',
        name: 'props.align',
        props: {
            mode: 'static',
            options: [
                { label: '左对齐', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '右对齐', value: 'right' },
            ],
        },
        initialValue: 'left',
    },
    {
        label: '竖直对齐方式',
        component: 'Radio',
        name: 'props.vAlign',
        props: {
            mode: 'static',
            options: [
                { label: '顶对齐', value: 'flex-start' },
                { label: '居中', value: 'center' },
                { label: '底对齐', value: 'flex-end' },
            ],
        },
        initialValue: 'left',
    },
    {
        label: 'paddingTop',
        component: 'InputNumber',
        name: 'props.paddingTop',
        initialValue: 20,
    },
    {
        label: 'paddingBottom',
        component: 'InputNumber',
        name: 'props.paddingBottom',
        initialValue: 20,
    },
    { label: '间距大小', component: 'InputNumber', name: 'props.gap', props: { unit: 'px' } },
    { label: '自动换行', component: 'Switch', name: 'props.autoWrap' },
]
