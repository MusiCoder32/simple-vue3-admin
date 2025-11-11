import App from './App.vue'
import { localeContextKey } from 'element-plus'
import router from './router'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import AppContextPlugin from '@/utils/app-context' //储存本应用的vue上下文，用于其他通过jsx创建的节点快捷绑定上下文
import { localStore } from '@/stores/locale'

import simpleFormItems from '@/form-engine/elements' //注册表单引擎组件

//用于解决表单引擎手动导入组件无样式问题，后期优化
import 'element-plus/dist/index.css'

import EllVue from 'simple-ellipsis/vue'

import EpIconsPlugin from '@/configs/ep-icons'
import LocalesPlugin from '@/configs/locales'
import DirectivePlugin from '@/configs/directive'

const app = createApp(App)

app.provide('$simpleFormItems', simpleFormItems)

app.use(createPinia())
app.use(router)

app.use(EpIconsPlugin)
app.use(DirectivePlugin)
app.use(LocalesPlugin)

app.use(EllVue)
app.use(AppContextPlugin)

const { elementLocal } = storeToRefs(localStore())
/**'
 *  从源码中可知,createVnode创建的节点中element-plus组件通过localeContextKey获取国际化配置
    模板文件中的组件通过el-config-provider配置local属性取国际化配置
 */
app.provide(localeContextKey, elementLocal)

window.$loading = {
    openTime: null,
    timeout: null,
    open() {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
        } else {
            this.openTime = +new Date()
        }
        document.querySelector('#full-screen-loading-self').style.display = 'block'
    },
    close() {
        // 防止loading闪烁，保证loading开启的最短时间为1500ms
        const time = +new Date() - this.openTime
        this.timeout = setTimeout(
            () => {
                document.querySelector('#full-screen-loading-self').style.display = 'none'
                this.timeout = null
            },
            Math.max(1500 - time, 0),
        )
    },
}

app.mount('#app')
