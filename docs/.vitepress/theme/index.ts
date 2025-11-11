import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createI18n } from 'vue-i18n'
import zh from '../../../src/locales/zh-cn'
import en from '../../../src/locales/en'
import MyLayout from './layout.vue'
import Directives from '../../../src/configs/directive'
import SimpleTable from '../../../src/components/simple-table/simple-table.vue'
import SimpleLayer from '../../../src/components/simple-layer/simple-layer.vue'
import SimpleForm from '../../examples/form-engine/simple-form.vue' //保留了/src/components中的simple-form组件核心逻辑，调整了表单管理相关代码
import EllVue from 'simple-ellipsis/vue'
import SimpleChart from '../../../src/components/simple-chart/simple-chart.vue'
import PrintAlert from '../../../src/components/print-alert.vue'
import './style.css'
import 'virtual:uno.css'
import '../../../src/assets/styles/main.scss'
import simpleFormItems from '../../../src/form-engine/elements' //注册表单引擎组件

const iconArr = [
    'Edit',
    'Search',
    'EditPen',
    'Plus',
    'Delete',
    'Close',
    'ArrowDown',
    'ArrowUp',
    'User',
    'InfoFilled',
    'Minus',
    'Top',
    'Upload',
    'QuestionFilled',
    'UploadFilled',
    'Loading',
    'Expand',
    'Fold',
    'Warning',
    'WarningFilled',
    'Setting',
    'Refresh',
]

export default {
    extends: DefaultTheme,
    Layout: MyLayout,
    enhanceApp({
        app,
        // route,
        siteData,
    }) {
        const i18nOptions = {
            locale: siteData.value.lang,
            legacy‌: false,
            fallbackLocale‌: 'zh-cn',
            globalInjection‌: false,
            messages: {
                'zh-cn': zh,
                en,
            },
        }
        const i18n = createI18n(i18nOptions)

        app.provide('$simpleFormItems', simpleFormItems)

        app.use(i18n)
        app.use(Directives)

        iconArr.forEach(async (item) => {
            const { [item]: IconComponent } = await import('@element-plus/icons-vue')
            app.component(item, IconComponent)
        })
        app.use(EllVue)
        app.component('simple-table', SimpleTable)
        app.component('simple-layer', SimpleLayer)
        app.component('simple-chart', SimpleChart)
        app.component('simple-form', SimpleForm)
        app.component('print-alert', PrintAlert)
        // component resolver 无法解决 str -> jsx 的场景，手动引入
        // }) // install element-ui
    },
} satisfies Theme
