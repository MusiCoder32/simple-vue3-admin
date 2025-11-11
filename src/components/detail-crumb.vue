<template>
    <div
        style="height: 56px; border-top-left-radius: 4px; border-top-right-radius: 4px"
        class="no-print breadcrumb-details pl5 pr5 h-start-center border-bottom w-full bg-white">
        <el-breadcrumb separator="/">
            <!-- 菜单-双层级及以上详情页情况 -->
            <el-breadcrumb-item v-for="item in navArr" :key="item.path" @click="clickHandle">
                {{ item.label }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { menusStore } from '@/stores/menus'

const menusStoreObj = menusStore()
const { pathLabelArr } = storeToRefs(menusStoreObj)
const emits = defineEmits(['click'])
type Props = {
    lastCrumbLabel: string | string[]
}
const props = defineProps<Props>()

const navArr = computed(() => {
    const result = [...pathLabelArr.value]
    if (Array.isArray(props.lastCrumbLabel)) {
        props.lastCrumbLabel.forEach((item) => {
            result.push({
                label: item,
            })
        })
    } else if (typeof props.lastCrumbLabel === 'string') {
        result.push({
            label: props.lastCrumbLabel,
        })
    }
    return result
})

function clickHandle() {
    emits('click')
}
</script>
<style lang="scss">
.breadcrumb-details {
    .el-breadcrumb {
        display: flex;
    }
    .el-breadcrumb__inner {
        white-space: whitespace-nowrap;
    }
    .el-breadcrumb__item:nth-last-child(2) {
        .el-breadcrumb__inner:hover {
            color: #008df9;
            cursor: pointer;
        }
    }
    .el-breadcrumb__item:last-child {
        pointer-events: none;
        cursor: not-allowed;
    }
}
</style>
