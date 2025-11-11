import { recursionDelete } from '../index.ts'

const basicAttr = (omit = [], moreAttrs = []) => {
    const attr = [
        {
            label: '组件类型',
            component: 'Input',
            name: 'component',
            props: {
                readonly: true,
            },
        },
        { label: '标签', component: 'Input', name: 'label' },
        {
            label: '唯一标识',
            component: 'Input',
            name: 'name',
            help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为props.name:'xxx'",
        },
        { label: '字段说明', component: 'Textarea', name: 'help' },
        {
            label: '占位提示',
            component: 'Input',
            name: 'props.placeholder',
            designKey: 'form-ekRL',
        },
        {
            label: 'label对齐方式',
            component: 'Radio',
            name: 'labelAlign',
            props: {
                mode: 'static',
                options: [
                    { label: '左对齐', value: 'left' },
                    { label: '居上', value: 'top' },
                    { label: '右对齐', value: 'right' },
                ],
            },
        },
        { label: '初始值', component: 'Input', name: 'initialValue' },
        {
            component: 'Grid',
            children: [
                { label: '是否必填', component: 'Switch', name: 'required' },
                { label: '是否只读', component: 'Switch', name: 'props.readonly' },
                { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
                { label: '隐藏字段', component: 'Switch', name: 'hidden' },
                { label: '隐藏标签', component: 'Switch', name: 'hideLabel' },
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
            label: '必填提示文本',
            component: 'Input',
            name: 'requiredMessage',
            designKey: 'form-ekRL1211',
        },
        {
            label: '在自增组件表格模式下列宽度',
            component: 'Input',
            name: 'width',
            designKey: 'form-ekRL123',
        },
    ]

    const omitAttrs = recursionDelete(attr, (item) => !omit.includes(item.name))

    return [...omitAttrs, ...moreAttrs]
}

export default basicAttr
