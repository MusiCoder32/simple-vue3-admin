<template>
    <div class="form-item-inline" :style="layoutStyle">
        <drag-item-box v-if="design" :children="children" :style="InlineStyle" title="行内布局" :name="name" />

        <div v-else :style="InlineStyle">
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
    paddingTop: Number,
    paddingBottom: Number,
})

const InlineStyle = computed(() => ({
    width: thisProps.props.width ?? '100%',
    display: 'flex',
    'justify-content': thisProps.props.align,
    'align-items': thisProps.props.vAlign,
    'flex-wrap': thisProps.props.autoWrap ? 'wrap' : 'whitespace-nowrap',
    'overflow-x': 'auto',
    gap: `${thisProps.props.gap}px`,
}))

const layoutStyle = computed(() => ({
    paddingTop: `${thisProps.props.paddingTop}px`,
    paddingBottom: `${thisProps.props.paddingBottom}px`,
}))
</script>

<style scoped lang="scss">
.form-item-inline {
    .el-form-item {
        margin-bottom: 0;
    }
    .el-form-item__content {
        align-items: start;
    }
}
</style>
