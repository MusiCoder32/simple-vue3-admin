<template>
    <div class="h-full w-full bg-white">
        <el-scrollbar class="scroll-container" :vertical="false" @wheel.prevent="closeContentMenu">
            <div
                ref="tagRef"
                v-for="(tag, index) in tagArr"
                :key="tag.fullPath"
                class="tags-item f12 h-full"
                :class="index === currIndex ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query }"
                @click="selectedTag(index)"
                @contextmenu.prevent="openContentMenu(index, $event)">
                <div class="h-center-center">
                    {{ tag.name }}
                    <el-icon class="ml4" v-if="tagArr.length > 1" @click.prevent.stop="closeSelectedTag(index)">
                        <Close />
                    </el-icon>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <div v-show="contentMenuVisible" @click="contentMenuVisible = false" class="vh100 vw100 p-f lf0 tp0 z9">
        <!-- tag标签操作菜单 -->
        <ul class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
            <li v-if="currIndex === mouseSelectedIndex" @click="menuClick('refresh')">
                <svg-icon icon-class="refresh" />
                {{ $t('common.refresh') }}
            </li>
            <li v-if="tagArr.length > 1" @click="menuClick('close')">
                <svg-icon icon-class="close" />
                {{ $t('common.close') }}
            </li>
            <li v-if="tagArr.length > 1" @click="menuClick('closeOther')">
                <svg-icon icon-class="close_other" />
                {{ $t('common.closeOthers') }}
            </li>
            <li v-if="mouseSelectedIndex > 0 && tagArr.length > 1" @click="menuClick('closeLeft')">
                <svg-icon icon-class="close_left" />
                {{ $t('common.closeLeft') }}
            </li>
            <li v-if="mouseSelectedIndex < tagArr.length - 1 && tagArr.length > 1" @click="menuClick('closeRight')">
                <svg-icon icon-class="close_right" />
                {{ $t('common.closeRight') }}
            </li>
            <li v-if="tagArr.length > 1" @click="menuClick('closeAll')">
                <svg-icon icon-class="close_all" />
                {{ $t('common.closeAll') }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { findIndex } from 'lodash'
import { getClientSize } from '@/utils/general'

import NProgress from '../configs/npmrogress'

const router = useRouter()
const route = useRoute()
const currIndex = ref()
const mouseSelectedIndex = ref()
const tagArr = ref([])
const left = ref(0)
const top = ref(0)
const emits = defineEmits(['change'])

watch(
    route,
    () => {
        if (route.meta.title) {
            const item = {
                ...route,
            }
            const index = findIndex(tagArr.value, { path: item.path })
            if (index > -1) {
                currIndex.value = index
                tagArr.value[index] = item
            } else {
                tagArr.value.push(item)
                currIndex.value = tagArr.value.length - 1
            }
        }
    },
    {
        immediate: true, //初始化立即执行
    },
)

watch(
    tagArr,
    () => {
        emits('change', tagArr.value)
    },
    { deep: true },
)

const contentMenuVisible = ref(false) // 右键菜单是否显示

function selectedTag(index) {
    if (currIndex.value !== index) {
        currIndex.value = index
        router.push(tagArr.value[index])
    }
}

function menuClick(type) {
    switch (type) {
        case 'refresh':
            NProgress.start()
            emits('change', tagArr.value, route.path)
            setTimeout(() => {
                NProgress.done()
            }, 1 * 1000)

            break
        case 'close':
            tagArr.value.splice(mouseSelectedIndex.value, 1)
            if (currIndex.value === mouseSelectedIndex.value) {
                currIndex.value = Math.min(tagArr.value.length - 1, currIndex.value)
            }
            break
        case 'closeOther':
            tagArr.value = [tagArr.value[mouseSelectedIndex.value]]
            currIndex.value = 0
            break

        case 'closeLeft':
            tagArr.value = tagArr.value.slice(mouseSelectedIndex.value)
            currIndex.value = 0
            break

        case 'closeRight':
            tagArr.value = tagArr.value.slice(0, mouseSelectedIndex.value + 1)
            currIndex.value = mouseSelectedIndex.value

            break
        case 'closeAll':
            tagArr.value = []
            nextTick(() => {
                router.push('/')
            })
            break
    }
    tagArr.value.length && router.push(tagArr.value[currIndex.value])
    closeContentMenu()
}

function closeSelectedTag(index) {
    tagArr.value.splice(index, 1)
    currIndex.value = Math.min(tagArr.value.length - 1, currIndex.value)
    nextTick(() => {
        router.push(tagArr.value[currIndex.value])
    })
}

/**
 * 打开右键菜单
 */
function openContentMenu(index, e: MouseEvent) {
    mouseSelectedIndex.value = index
    const menuMinWidth = 105
    const clientSize = getClientSize()
    console.log(clientSize, e)
    if (e.clientY + menuMinWidth > clientSize.w) {
        left.value = clientSize.w - menuMinWidth - 20
    } else {
        left.value = e.clientX + 20
    }
    top.value = e.clientY
    contentMenuVisible.value = true
}

/**
 * 关闭右键菜单
 */
function closeContentMenu() {
    contentMenuVisible.value = false
}

/**
 * 滚动事件
 */

defineExpose({
    tagArr,
})

// 如果是混合模式，更改selectedTag，需要对应高亮的activeTop
</script>

<style lang="scss" scoped>
.tags-item {
    display: inline-block;
    padding: 6px 11px;
    cursor: pointer;
    border: 1px solid var(--el-input-border-color);

    &:hover {
        color: var(--el-color-primary);
    }

    &.active {
        color: var(--el-color-primary);
        background-color: var(--el-border-color-light);
        border-color: rgb(163, 208, 253);
        border: 1px solid rgb(163, 208, 253);

        // &::before {
        //     display: inline-block;
        //     width: 8px;
        //     height: 8px;
        //     margin-right: 5px;
        //     content: '';
        //     background: #fff;
        //     border-radius: 50%;
        // }

        .close-icon:hover {
            color: var(--el-color-primary);
            background-color: var(--el-fill-color-light);
        }
    }
}

.contextmenu {
    position: absolute;
    z-index: 99;
    font-size: 12px;
    background: var(--el-bg-color-overlay);
    border-radius: 4px;
    box-shadow: var(--el-box-shadow-light);
    list-style: none; /* 移除项目符号 */

    li {
        padding: 8px 16px;
        cursor: pointer;

        &:hover {
            background: var(--el-fill-color-light);
        }
    }
}

.scroll-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: whitespace-nowrap;

    .el-scrollbar__bar {
        bottom: 0;
    }

    .el-scrollbar__wrap {
        height: 49px;
    }
}
</style>
