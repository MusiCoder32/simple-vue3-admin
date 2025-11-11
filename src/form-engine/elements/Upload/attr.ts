import { basicAttr, highAttr, mergeAttr, linkageAttr } from '../../common-attr'

export default mergeAttr({
    basic: [
        ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder', 'props.disabled']),
        {
            label: '储存字段',
            component: 'Input',
            name: 'props.uploadKey',
            help: '指定上传成功的文件储存到哪个表单字段中',
        },
        // { label: '上传地址', component: 'Input', name: 'props.action' },
        { label: '上传大小限制', component: 'InputNumber', name: 'props.size', props: { unit: 'MB' } },
        { label: '上传数量限制', component: 'InputNumber', name: 'props.limit', props: { unit: '个' } },
        {
            label: '按钮文案',
            component: 'Input',
            name: 'props.buttonText',
        },
        { label: '显示上传列表', component: 'Switch', name: 'props.showFileList' },
    ],
    high: highAttr(),
    linkage: [
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
                                label: '文件上传成功',
                                value: 'uploadSuccess',
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
    ],
})
