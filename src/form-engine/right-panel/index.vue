<template>
    <div class="h-full w-full">
        <el-tabs class="current-config">
            <el-tab-pane label="字段配置" class="h-full">
                <div class="h-full">
                    <h4 v-if="!Object.keys(current).length">未选中字段</h4>
                    <template v-else>
                        <schema-form
                            :key="current.designKey"
                            :modelValue="current"
                            @update:modelValue="updateCurrent"
                            :schema="attrSchema"></schema-form>
                        <div>
                            <el-button @click="handleEdit">编辑配置文本</el-button>
                        </div>
                        <el-drawer destroy-on-close v-model="editVisible">
                            <json-editor-vue
                                class="h-full w-full"
                                :modelValue="current"
                                mode="text"
                                @update:modelValue="updateCurrent"
                                :debounce="1000"
                                language="zh" />
                        </el-drawer>
                    </template>
                </div>
            </el-tab-pane>
            <el-tab-pane label="表单配置">
                <schema-form v-model="currentSchema" :schema="formOptions"></schema-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import SchemaForm from '../schema-form.vue'
import formOptions from './form-options'
const simpleFormItems = inject('$simpleFormItems', null)

const current = inject('$current') //通过引用地址来更新值
const currentSchema = inject('$schema')

import JsonEditorVue from 'json-editor-vue'

const editVisible = ref(false)

const attrSchema = computed(() => {
    const config = simpleFormItems[current.value.component]

    return { size: 'small', labelAlign: 'top', items: config ? config.attr : [] }
})

const handleEdit = () => {
    editVisible.value = true
}

function updateCurrent(value) {
    if (typeof value === 'string') {
        try {
            current.value = JSON.parse(value)
        } catch (error) {}
    } else if (typeof value === 'object') {
        current.value = value
    }
}

provide('isRightPanel', true)
</script>

<style lang="scss">
.current-config {
    .el-tabs__content {
        overflow: visible;
    }
}
</style>
