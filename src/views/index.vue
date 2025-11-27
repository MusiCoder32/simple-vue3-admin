<template>
    <el-header class="no-print" style="padding: 0; height: 56px"><s-header /></el-header>
    <el-container class="container-height" style="margin-top: 1px">
        <Menus class="no-print" @select="menuSelect" />
        <el-main v-loading="loading" class="!p0" flex="!~ col items-center justify-center">
            <div style="height: 30px" class="no-print w-full">
                <tag-nav ref="tagNavRef" @change="tagChange" />
            </div>
            <div class="h0 content-box relative w-full flex-1" style="z-index: 1">
                <el-scrollbar ref="scrollbarRef" class="pl4 pt4 pr4 h-full w-full">
                    <div class="component-box h-full w-full" style="min-width: 968px">
                        <RouterView v-slot="{ Component, route }">
                            <!-- 可查看doc/重要逻辑说明.md文档第2点 -->
                            <KeepAlive :include="keepAliveInclude">
                                <component
                                    :componentName="changeComponentName(Component)"
                                    :is="Component"
                                    :key="keepAliveInfo[route.path]"></component>
                            </KeepAlive>
                        </RouterView>
                    </div>
                </el-scrollbar>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash'
import SHeader from './header.vue'
import Menus from './menus.vue'
import TagNav from './tag-nav.vue'

const router = useRouter()
const route = useRoute()
//api请求后台配置,来判断是否禁用文本选中功能,间接禁用复制功能

const loading = ref(false)
const openTime = ref()
const tagNavRef = ref()
const scrollbarRef = ref()
const timeout = ref(false)
const keepAliveInfo = ref({})
const keepAliveInclude = computed(() => {
    return Object.keys(keepAliveInfo.value).map((item) => {
        return item
            .split('/')
            .filter((item) => item)
            .join('-')
    })
})

utils.on('loading', () => {
    if (timeout.value) {
        clearTimeout(timeout.value)
        timeout.value = null
    } else {
        openTime.value = +new Date()
    }
    loading.value = true
})
utils.on('hideLoading', (immediate: boolean) => {
    //在开启loading后的逻辑中，存在打开弹窗的情况下，
    //延迟关闭loading会存在遮罩层叠加带来的视觉异常，
    //此时应该传入immediate将loading立即关闭
    if (immediate) {
        loading.value = false
        timeout.value = null
        return
    }

    const time = +new Date() - openTime.value
    timeout.value = setTimeout(
        () => {
            loading.value = false
            timeout.value = null
        },
        Math.max(1000 - time, 0),
    )
})

//通过该方式,修改组件名,该组件名可用于keep-alive中控制组件是否缓存
function changeComponentName(com) {
    if (com?.type) {
        com.type.name = route.path
            .split('/')
            .filter((item) => item)
            .join('-')
    }

    setTimeout(() => {
        scrollbarRef.value?.update()
    }, 2000)
}

function tagChange(tagArr, refreshPath) {
    const obj = {}
    tagArr.forEach((item) => {
        const key = item.path
        obj[key] = keepAliveInfo.value[key] ?? +new Date()
    })
    if (refreshPath) {
        obj[refreshPath] = +new Date()
    }
    keepAliveInfo.value = obj
}

function menuSelect(path) {
    const arr = tagNavRef.value.tagArr
    const index = findIndex(arr, { path })
    if (index > -1) {
        router.push(arr[index])
    } else {
        router.push({ path })
    }
}
</script>
<style lang="scss">
.el-scrollbar__view {
    height: 100%;
}
.content-box {
    @media screen and (max-width: 1200px) {
        padding-bottom: 16px;
    }
}
.container-height {
    height: calc(100% - 57px);
}
.component-box {
    > div:first-child {
        border-radius: 4px 4px 0 0;
        > div:first-child {
            border-radius: 4px 4px 0 0;
        }
    }
}
.content-box {
    > .el-scrollbar:has(.board-box) {
        padding: 0 !important;
    }
}
</style>
