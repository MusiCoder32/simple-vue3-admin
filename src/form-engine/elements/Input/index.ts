import Input from './Input.vue'
import attr from './attr'

export default {
    name: '单行文本',
    component: Input,
    icon: 'input',
    type: 'basic',
    order: 1,
    initialValues: {
        label: '单行文本',
        component: 'Input',
        props: {
            placeholder: '请输入文本',
        },
    },
    attr,
}
