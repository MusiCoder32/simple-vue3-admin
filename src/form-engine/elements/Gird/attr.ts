export default [
    {
        label: '组件类型',
        component: 'Input',
        name: 'component',
        props: {
            readonly: true,
        },
    },
    { label: '自定义class', component: 'Input', name: 'props.class' },
    // { label: '唯一标识', component: 'Input', name: 'name' },
    // { label: '列数', component: 'InputNumber', name: 'props.columns', initialValue: 2 },
    // { label: '列间距', component: 'InputNumber', name: 'props.column-gap', props: { unit: 'px' } },
    // { label: '行间距', component: 'InputNumber', name: 'props.row-gap', props: { unit: 'px' } },
]
