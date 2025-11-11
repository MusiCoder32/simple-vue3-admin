import { cloneDeep } from 'lodash'
export default function ({ dataIndex, formItem, title, model }) {
    const { type, opts } = formItem

    const componentAttr = cloneDeep(opts) || {}
    componentAttr.placeholder = componentAttr.placeholder || '请输入' + title

    if (['ElSelect', 'ElTreeSelect'].includes(type.name)) {
        componentAttr.placeholder = componentAttr.placeholder || '请选择' + title
        componentAttr.clearable = componentAttr.clearable ?? true
    }

    //给各事件传入查询区表单Model参数，利用引用对象特性，可实现字段间联动
    Object.keys(componentAttr).forEach((key) => {
        if (typeof componentAttr[key] === 'function') {
            componentAttr[key] = () => opts[key](model)
        }
    })

    const slots = componentAttr.slots
    delete componentAttr.slots

    return (
        <type {...componentAttr} modelValue={model[dataIndex]} onUpdate:modelValue={(val) => (model[dataIndex] = val)}>
            {slots}
        </type>
    )
}
