<template>
    <ElCard v-bind="{ ...props, ...$attrs }">
        <DragItem :list="children" v-if="design" />
        <FormItemGroup :formItems="children" v-else />
    </ElCard>
</template>

<script setup>
import FormItemGroup from '../../form-item-group.vue'
import DragItem from '../../middle-editor/drag-item.vue'

defineProps({
    props: Object,
    children: Array,
    design: Boolean,
})
</script>

<style lang="scss">
.form-item-grid {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>
