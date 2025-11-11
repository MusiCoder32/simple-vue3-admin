import Collapse from './Collapse.vue'

export default {
    name: '折叠面板',
    component: Collapse,
    icon: 'collapse',
    type: 'layout',
    order: 4,
    initialValues: {
        component: 'Collapse',
        children: [{ title: '折叠面板1', name: 'name1', children: [] }],
    },
    attr: [
        {
            label: '组件类型',
            component: 'Input',
            name: 'component',
            props: {
                readonly: true,
            },
        },
        { label: '唯一标识', component: 'Input', name: 'name' },
        {
            label: '子面板设置',
            component: 'FormList',
            children: [
                {
                    label: '标题',
                    component: 'Input',
                    props: {
                        placeholder: '请输入标题',
                    },
                    designKey: 'id-l8cI',
                    name: 'title',
                },
                {
                    label: '唯一标识',
                    component: 'Input',
                    props: {
                        placeholder: '请输入唯一标识',
                    },
                    designKey: 'form-YE6U',
                    name: 'name',
                },
                {
                    label: '默认展开',
                    component: 'Switch',
                    designKey: 'form-YE6U',
                    name: 'checked',
                },
                {
                    label: '隐藏面板条件',
                    component: 'Input',
                    designKey: 'form-YE69',
                    name: 'hidden',
                },
                {
                    label: '权限标识',
                    component: 'Input',
                    designKey: 'form-YE6911',
                    name: 'has',
                },
                {
                    label: '子面板样式',
                    component: 'Input',
                    designKey: 'form-YE6911',
                    name: 'class',
                },
            ],
            props: {
                mode: 'card',
                title: '子面板',
                newItemDefaults:
                    '{{ (index) => ({ title: `折叠面板${index + 1}`, name: `name${index + 1}`,children: [] }) }}',
            },
            designKey: 'id-RQ1a',
            name: 'children',
        },
    ],
}
