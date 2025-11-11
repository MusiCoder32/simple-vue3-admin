import attr from './attr'
import TextArea from './TextArea.vue'

export default {
    name: '多行文本',
    component: TextArea,
    icon: 'textarea',
    type: 'basic',
    order: 2,
    initialValues: {
        label: '多行文本',
        component: 'Textarea',
        props: {
            minRows: 1,
            maxRows: 4,
            placeholder: '请输入',
        },
    },
    attr,
}
