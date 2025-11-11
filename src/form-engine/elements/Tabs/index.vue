<template>
    <ElCollapse v-if="design" v-bind="{ ...props }">
        <template v-for="item in children">
            <template v-if="!item.hidden || design">
                <ElCollapseItem
                    v-has="design || item.has"
                    :class="item.class"
                    class="mb16 relative"
                    :key="item.name"
                    :name="item.name">
                    <template #title>
                        <Title :title="$t(item.title)" italic type="h4" />
                    </template>
                    <div v-if="item.hidden && design" className="hidden-ico">
                        <svg-icon name="form-engine-hidden" />
                    </div>
                    <div class="tip" v-if="!item.children?.length">
                        <div class="mb10 f20">
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
    <template v-else>
        <el-tabs
            v-bind="{ ...props }"
            :modelValue="modelValue || children[0].name"
            @tab-change="tabChangeHandle"
            class="no-print">
            <template v-for="item in children">
                <template v-if="!item.hidden">
                    <el-tab-pane
                        v-has="item.has"
                        :class="item.class"
                        :label="$t(item.title)"
                        :key="item.name"
                        :name="item.name">
                        <FormItemGroup :formItems="item.children" />
                    </el-tab-pane>
                </template>
            </template>
        </el-tabs>
        <div class="only-print">
            <template v-for="(item, index) in children" :key="index">
                <el-tabs
                    v-bind="{ ...props }"
                    :modelValue="modelValue || children[index].name"
                    v-if="!item.hidden"
                    v-has="item.has">
                    <el-tab-pane :class="item.class" :label="$t(item.title)" :key="item.name" :name="item.name">
                        <FormItemGroup :formItems="item.children" />
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
    </template>
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

const emits = defineEmits(['update:modelValue'])

function tabChangeHandle(value) {
    emits('update:modelValue', value)
}
</script>

<style lang="scss">
.form-item-grid {
    .el-form-item {
        margin-bottom: 0;
    }
}
.only-print {
    .el-tabs {
        margin-top: 0 !important;
    }
}
</style>
