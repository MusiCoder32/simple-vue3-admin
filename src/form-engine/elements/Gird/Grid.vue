<template>
    <div class="form-item-grid bg-white">
        <drag-item-box v-if="design" :children="children" title="栅格布局" :name="name" />

        <div v-else class="grid-layout">
            <FormItemGroup :formItems="children" />
        </div>
    </div>
</template>

<script setup>
import FormItemGroup from '../../form-item-group.vue'
import DragItemBox from '../../middle-editor/drag-item-box.vue'

const thisProps = defineProps({
    name: String,
    props: Object,
    children: Array,
    design: Boolean,
})

// const grid-layout = computed(() => ({
//     display: 'grid',
//     'align-items': 'start',
//     'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
//     'row-gap': thisProps.props['row-gap'] + 'px',
//     'column-gap': thisProps.props['column-gap'] + 'px',
// }))
</script>

<style scoped lang="scss">
.form-item-grid {
    .el-form-item {
        margin-bottom: 0 !important;
    }
    .el-form-item__content {
        align-items: start;
    }
}
</style>
