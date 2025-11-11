<template>
    <el-scrollbar class="pr simple-form" v-loading="loading">
        <print-alert @escExportPdf="escExportPdfHandle" />
        <div v-if="showSetting" class="h-center-center mb5">
            <el-button v-ell:t-a="'开发环境中显示'" @click="setting" type="primary" class="z9 no-print" icon="Setting">
                表单设计
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
</template>

<script setup>
import SchemaForm from '@/form-engine/schema-form.vue'
import { formsApi } from '@/api/forms.ts'

import { cloneDeep, isEmpty } from 'lodash'
import openFormDesign from '@/form-engine/open-form-design'

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
const showSetting = import.meta.env.MODE === 'development'
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
const needCreate = ref(false)

const schema = ref()
const key = ref()

const loading = ref(false)

onBeforeMount(async () => {
    if (props.path) {
        loading.value = true
        try {
            const params = {
                route: props.routePath ?? route?.path,
                path: props.path,
            }
            let temp
            const useMock = true
            if (useMock && import.meta.env.MODE !== 'development') {
                const modules = import.meta.glob('../../mock/database/forms/template/*.json', { eager: true })
                const listModules = import.meta.glob('../../mock/database/forms/list.json', { eager: true })
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
                    }

                    setTimeout(() => {
                        emit('onReady')
                    })
                }
            } else {
                temp = await formsApi.getFormTemplateByPath(params)
                if (temp === '未创建') {
                    needCreate.value = true
                } else {
                    schema.value = cloneDeep(temp)
                    needCreate.value = false
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

function escExportPdfHandle() {
    emit('escExportPdf')
}
async function setting() {
    if (needCreate.value) {
        await formsApi.add({
            name: route.meta.title + '-系统自动创建',
            route: props.routePath ?? route?.path,
            path: props.path,
            filePath:
                route.path
                    .split('/')
                    .filter((item) => item)
                    .join('-') +
                '-' +
                props.path +
                '.json',
        })
    }
    openFormDesign({
        routePath: props.routePath ?? route?.path,
        path: props.path,
    })
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
