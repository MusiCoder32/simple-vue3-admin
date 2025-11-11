<template>
    <el-scrollbar v-if="!showDesign" class="pr" v-loading="loading">
        <print-alert @escExportPdf="escExportPdfHandle" />
        <div class="h-center-center mb2">
            <el-button
                v-ell:t-a="'演示环境中显示'"
                @click="showDesign = true"
                type="primary"
                class="z9 no-print"
                icon="Setting">
                表单设计
            </el-button>
            <el-button v-ell:t-a="'演示环境中显示'" @click="refresh" type="primary" class="z9 no-print" icon="Refresh">
                恢复模板
            </el-button>
        </div>

        <schema-form
            :schema="schema"
            ref="formRef"
            :key="key"
            class="form-generator"
            v-model="formValues"
            :oldModel="oldModel"
            :labelAlign="labelAlign"
            :schemaContext="schemaContext"
            :formStatus="formStatus" />
    </el-scrollbar>
    <FormDesign
        v-else
        :schema="schema"
        :routePath="routePath"
        :path="path"
        @submit="saveDesign"
        @close="showDesign = false" />
</template>

<script setup>
import SchemaForm from '../../../src/form-engine/schema-form.vue'
import FormDesign from '../../../src/form-engine/form-design.vue'

import { cloneDeep, isEmpty } from 'lodash'

//path表单路径，必传
//routePath表单所属菜单，其默认值为当前路由path
//path与routePath同时满足时，得到表单模板
const props = defineProps({
    path: {
        type: [String, Number],
        required: true,
    },
    routePath: String,
    modelValue: null,
    disabled: null,
    oldModel: null,

    formStatus: String,
    labelAlign: String,
    schemaContext: Object,
    isUseFileRangeCache: null,
    isCloseFileRange: null,
})
const route = useRoute()

provide('isRightPanel', false)

// 可见范围查看弹窗数据是否走前台缓存
provide('$isUseFileRangeCache', props.isUseFileRangeCache)
// 是否关闭渲染可见范围列
provide('$isCloseFileRange', props.isCloseFileRange)

const emit = defineEmits(['update:modelValue', 'onChange', 'onReady', 'escExportPdf'])

const formValues = computed({
    get() {
        return props.modelValue
    },
    set(values) {
        emit('update:modelValue', values)
    },
})

const formRef = ref(null)

const schema = ref()
const originSchema = ref()
const key = ref()

const loading = ref(false)
const showDesign = ref(false)

onBeforeMount(async () => {
    if (props.path) {
        loading.value = true
        try {
            const params = {
                route: props.routePath ?? route?.path,
                path: props.path,
            }
            let temp

            const modules = import.meta.glob('../../../mock/database/forms/template/*.json', { eager: true })
            const listModules = import.meta.glob('../../../mock/database/forms/list.json', { eager: true })
            const formList = Object.values(listModules)[0].default
            let filePath
            for (let i = 0; i < formList.length; i++) {
                const item = formList[i]
                if ((!item.route || item.route === params.route) && item.path === params.path) {
                    filePath = item.filePath
                    break
                }
            }
            const arr = Object.keys(modules).filter((item) => item.indexOf(filePath) > -1)
            if (arr[0]) {
                temp = modules[arr[0]].default
                if (!isEmpty(temp)) {
                    schema.value = cloneDeep(temp)
                    originSchema.value = cloneDeep(temp)
                }

                setTimeout(() => {
                    emit('onReady')
                })
            }
        } catch (e) {
            console.log(e)
        }

        loading.value = false
    }
})

function saveDesign(temp) {
    schema.value = temp
}
function refresh() {
    schema.value = originSchema.value
}

function escExportPdfHandle() {
    emit('escExportPdf')
}

function validate() {
    return formRef.value.validate()
}
function getFormData() {
    return formRef.value.getFormValues()
}
function update() {
    key.value = +new Date()
}

defineExpose({
    schema,
    validate,
    getFormData,
    update,
})
</script>
<style lang="scss"></style>
