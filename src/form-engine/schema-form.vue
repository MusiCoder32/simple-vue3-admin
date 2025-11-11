<template>
    <el-form
        :model="formValues"
        :label-position="labelAlign ?? schema.labelAlign"
        :size="schema.size"
        :disabled="disabled || schema.disabled"
        hide-required-asterisk
        scroll-to-error
        :scroll-into-view-options="{ behavior: 'smooth', block: 'start' }"
        ref="formRef"
        :class="schema.class"
        id="SchemaForm">
        <FormItemGroup :formItems="formItems" />
    </el-form>
</template>

<script setup lang="tsx">
import { handleLinkages, deepParse } from './index.ts'
import FormItemGroup from './form-item-group.vue'
import { cloneDeep } from 'lodash'

defineOptions({
    name: 'SchemaForm',
})

const formRef = ref(null)

const props = defineProps({
    // 表单数据源，双向绑定
    modelValue: {
        type: Object,
    },
    // 表单JSON配置
    schema: {
        type: Object,
        default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] }),
    },
    schemaContext: {
        type: Object,
        default: () => ({}),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    labelAlign: null,
    formStatus: null,
    oldModel: null,
})

const emit = defineEmits(['update:modelValue', 'onSubmit', 'onChange'])

const selectData = reactive({})
const oldSelectData = reactive({})

const formValues = computed({
    get() {
        return props.modelValue
    },
    set(values) {
        /**
         * 1.表单设计时,属性值变动时触发该处更新,modelValue为外部传入的schema,导致schema更新
         */
        emit('update:modelValue', values)
    },
})

const status = computed(() => props.formStatus)

const context = computed(() => ({
    $values: formValues.value,
    $selectData: selectData,
    $oldSelectData: oldSelectData,
    $utils: {},
    ...props.schemaContext,
    $formStatus: props.formStatus,
}))

// 保证schema的响应式
const currentSchema = computed(() => ({ disabled: props.disabled, ...props.schema }))

const formItems = computed(() => {
    const list = currentSchema.value.items
    /**
     * 2.formValues变动触发context,然后触发此处deepParse,导到重新渲染formItems,实现值联动效果
     */
    const result = deepParse(list, context.value)
    return result
})

const formValuesWatch = computed(() => {
    return cloneDeep(formValues.value)
})
watch(
    formValuesWatch,
    (newVal, oldVal) => {
        emit('onChange', newVal)
        handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value, context: context.value })
    },
    { deep: true, immediate: true },
)

const validate = () => formRef.value.validate()

async function submit() {
    try {
        await validate()
        emit('onSubmit', formValues.value)
        return formValues.value
    } catch (e) {
        ElMessage.error('表单填写校验不通过！')
        return Promise.reject(e)
    }
}

const getFormValues = () => ({ ...formValues.value })
const setFormValues = (values) => {
    formValues.value = { ...formValues.value, ...values }
}

const reset = () => formRef.value.resetFields()

provide('$schema', currentSchema)

provide('$formValues', formValues)
provide('$formStatus', status)
provide('$oldFormValues', props.oldModel)

provide('$selectData', selectData)
provide('$oldSelectData', oldSelectData)
provide('$context', context)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset, context })
</script>
