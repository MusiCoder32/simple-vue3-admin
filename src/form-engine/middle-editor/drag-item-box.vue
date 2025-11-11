<template>
    <div id="drag-item-box">
        <div class="title">【{{ title }}】 {{ name }}</div>
        <DragItem :list="children" class="grid-layout" />
    </div>
</template>

<script setup>
import DragItem from './drag-item.vue'
defineProps({
    name: String,
    children: Array,
    title: String,
})
</script>

<style scoped lang="scss">
#drag-item-box {
    border: 2px dashed $font-color-theme3;
    margin: 10px;
    position: relative;
    padding: 5px;
    .title {
        position: absolute;
        left: 0;
        top: -20px;
        padding: 1px 5px;
        background-color: var(--el-color-primary);
        font-size: 12px;
        color: #fff;
        z-index: 10;
        line-height: 16px;
    }
}
</style>
