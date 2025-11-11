<template>
    <div class="h-between-center h-full w-full bg-white">
        <div class="h-start-center h-full">
            <div class="h-start-center flow-animation">
                <svg-icon name="vite" class="font-size-8 ml6 mr2" />
                <span class="fah font-size-5 fw500">{{ title }}</span>
            </div>
        </div>
        <div class="pr5 h-end-center">
            <!-- 语言切换 -->
            <el-select class="mr5 w50 !w40" size="small" v-model="language" @change="localChange">
                <el-option v-for="(val, key) in LocalEnum" :value="val" :label="key" :key="key" />
            </el-select>

            <!-- 用户信息 -->
            <el-dropdown class="">
                <div class="h-center-center">
                    <svg-icon name="user" class="text-4" />
                    <div class="ml1 mr1">{{ userInfo.name }}</div>
                    <el-icon><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="primary-color">
                        <el-dropdown-item @click="logoutFn">{{ $t('common.logout') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LocalEnum } from '@/enums'
import { localStore } from '@/stores/locale'
import { usersStore } from '@/stores/usersStore'
import logoutFn from '@/utils/logout'

const { locale } = useI18n()
const { userInfo } = usersStore()
const title = 'simple-vue3-admin'
const language = ref(utils.getLoc('locale') || 'zh-cn')

onMounted(() => {
    console.log(import.meta.env)
})

async function localChange(val) {
    await localStore().updateLocal(val)
    locale.value = val
    utils.setLoc('locale', val)
}
</script>

<style lang="scss" scoped>
.flow-animation {
    color: transparent !important;
    background-clip: text;
    background-color: #111;
    animation: prjName 5s 1s linear infinite;
}
@keyframes prjName {
    0% {
        background-position: -16px 0;
        background-image: linear-gradient(75deg, #111 0, #ff0000 20px, #111 40px);
    }
    100% {
        background-position: 200px 0;
        background-image: linear-gradient(75deg, #111 0, #ff0000 20px, #111 40px);
    }
}
</style>
