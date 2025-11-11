import { messages } from '@/configs/locales'

const dayjsLocalMap = {
    en: () => import('dayjs/locale/en.js'),
    'zh-cn': () => import('dayjs/locale/zh-cn.js'),
}
const elementLocalMap = {
    'zh-cn': () => import('element-plus/dist/locale/zh-cn.mjs'),
    en: () => import('element-plus/dist/locale/en.mjs'),
}

export const localStore = defineStore('localStore', () => {
    const elementLocal = ref()

    if (!elementLocal.value) {
        const defaultLocal = utils.getLoc('locale') || 'zh-cn'
        updateLocal(defaultLocal)
    }

    async function updateLocal(type) {
        if (!messages[type]) {
            messages[type] = (await import(`@/locales/${type}.ts`)).default
        }
        elementLocal.value = (await elementLocalMap[type]()).default
        dayjs.locale((await dayjsLocalMap[type]()).default)
    }
    return { elementLocal, updateLocal }
})
