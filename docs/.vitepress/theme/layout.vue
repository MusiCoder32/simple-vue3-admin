<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { lang } = useData()
const { locale } = useI18n({ useScope: 'global' })
watchEffect(() => (locale.value = lang.value))

const globalProperties = getCurrentInstance().appContext.config.globalProperties

const localFn = globalProperties.$t
globalProperties.$t = function (value, args) {
    //避免传入$t()中的参数为空,导致i18n报错
    if (typeof value === 'string') {
        return localFn(value, { ...args })
    }
}
window.$t = globalProperties.$t
</script>

<template>
    <DefaultTheme.Layout>
        <el-config-provider size="default" :locale="locale">
            <slot />
        </el-config-provider>
    </DefaultTheme.Layout>
</template>
