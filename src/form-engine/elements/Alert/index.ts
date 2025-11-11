import Alert from './Alert.vue'
import attr from './attr'

export default {
    name: '提示框',
    component: Alert,
    icon: 'alert',
    type: 'assist',
    order: 2,
    attr,
    initialValues: {
        component: 'Alert',
        props: {
            title: '提示信息',
            type: 'info',
            effect: 'light',
            description: '这是一个描述',
            closable: true,
            'show-icon': true,
        },
    },
}
