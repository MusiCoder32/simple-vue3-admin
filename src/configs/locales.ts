import { createI18n } from 'vue-i18n'
import { getBrowserLanguage } from '@/utils/general'

export const messages = {}

export default {
    install(app) {
        // 初始化时仅加载默认语言包
        const defaultLanguage = utils.getLoc('locale') || getBrowserLanguage() || 'zh-cn'
        const i18n = createI18n({
            locale: defaultLanguage,
            fallbackLocale: defaultLanguage,
            messages,
            globalInjection: true, // 允许全局使用$t
            fallbackWarn: false, //关闭找不到译文的告警提示
            missingWarn: false, //关闭找不到译文的告警提示
            missing: (locale, key, vm, result) => {
                const arr = key.split('.')

                //解决页面中依赖后端数据进行翻译的词条在接口未返回值时,页面会出现null的情况
                if (arr.at(-1) === 'null') {
                    return ''
                }
                if (arr.at(-1).startsWith('其他-')) {
                    return arr.at(-1)
                }
                return arr.join(' ')
            },
        })

        import(`@/locales/${defaultLanguage}.ts`).then((res) => {
            messages[defaultLanguage] = res.default
            //改变local值,可以触发$t方法更新翻译内容,解决页面文本翻译时,语言包还没加载完成,导致的翻译异常情况
            i18n.global.locale.value = ''
            i18n.global.locale.value = defaultLanguage
            document.title = i18n.global.t('common.projectName')
        })

        app.use(i18n)
    },
}
