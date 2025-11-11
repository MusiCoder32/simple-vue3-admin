export default [
    {
        component: 'Alert',
        props: {
            type: 'success',
            description: '配置文本插值实现',
            closable: true,
            'show-icon': true,
        },
        designKey: 'design-MQPU',
        name: 'form-Oqi5',
    },
    {
        label: '值联动',
        help: '本字段值改变时，修改其他字段的值',
        name: 'change',
        component: 'FormList',
        children: [
            {
                label: '目标字段',
                name: 'target',
                component: 'Input',
                props: {},
            },
            {
                label: '值',
                name: 'value',
                component: 'Input',
                props: {},
            },
        ],
        props: {
            mode: 'card',
        },
    },
    {
        label: '外部事件联动',
        help: '本字段事件触发时,调用外部注入事件',
        name: 'props.on',
        component: 'FormList',
        children: [
            {
                label: '事件类型',
                name: 'eventType',
                component: 'Select',
                props: {
                    mode: 'static',
                    options: [
                        {
                            label: 'click',
                            value: 'click',
                        },
                        {
                            label: 'blur',
                            value: 'blur',
                        },
                        {
                            label: 'focus',
                            value: 'focus',
                        },
                        {
                            label: 'change',
                            value: 'change',
                        },
                        {
                            label: 'input',
                            value: 'input',
                        },
                        {
                            label: 'clear',
                            value: 'clear',
                        },
                    ],
                    placeholder: '请选择',
                    labelKey: 'label',
                    valueKey: 'value',
                },
                designKey: 'form-3L0P',
            },
            {
                label: '外部事件名',
                name: 'eventName',
                component: 'Input',
                props: {},
            },
        ],
        props: {
            mode: 'card',
        },
    },
]
