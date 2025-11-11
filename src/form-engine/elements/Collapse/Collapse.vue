<template>
    <ElCollapse v-bind="{ ...props }" v-model="activeKey">
        <template v-for="item in children">
            <template v-if="!item.hidden || design">
                <ElCollapseItem
                    v-has="design || item.has"
                    :class="item.class"
                    class="mb4 relative"
                    :key="item.name"
                    :name="item.name">
                    <template #title>
                        <Title :title="$t(item.title)" italic type="h4" />
                    </template>
                    <div v-if="item.hidden && design" className="hidden-ico">
                        <svg-icon name="form-engine-hidden" />
                    </div>
                    <div class="tip" v-if="!item.children?.length">
                        <div class="mb2.5 text-5">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </div>
                        <div class="f12 gray">请拖入子字段</div>
                    </div>
                    <DragItem :list="item.children" v-if="design" />
                    <FormItemGroup :formItems="item.children" v-else />
                </ElCollapseItem>
            </template>
        </template>
    </ElCollapse>
</template>

<script setup lang="tsx">
import FormItemGroup from '../../form-item-group.vue'
import DragItem from '../../middle-editor/drag-item.vue'
import Title from '../Title/Title.vue'
const thisProps = defineProps({
    props: Object,
    children: Array,
    design: Boolean,
    modelValue: null,
})

const activeKey = ref([])

onBeforeMount(() => {
    if (!thisProps.design) {
        activeKey.value = thisProps.children.filter((item) => item.checked).map((item) => item.name)
    }
})
</script>

<style lang="scss">
.form-item-grid {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>
