<template>
    <el-dialog
        v-model="layer.show"
        :title="showHead ? $t(layer.title) : ''"
        :width="width"
        :show-close="showClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-bind="$attrs"
        destroy-on-close
        class="layer-form"
        align-center
        :beforeClose="beforeClosed"
        @open="initForm"
        @closed="close">
        <div class="h-full" v-loading="bodyLoading ?? false">
            <slot></slot>
            <el-form
                v-if="columns?.length"
                class="mt4 w-full"
                :class="layer.type === 'look' ? 'layer-form-readonly' : null"
                :disabled="layer.disabled"
                :label-position="layer.type === 'look' ? 'left' : 'top'"
                :model="form.model"
                scroll-to-error
                ref="formRef"
                label-width="auto"
                :rules="form.rules"
                :inline="true">
                <el-row class="m0 w-full" gutter="20">
                    <template v-for="(column, index) in formItemArr" :key="column.dataIndex + index">
                        <el-col :span="Math.floor(24 / (column.formItem.col || layer.col || 1))">
                            <el-form-item
                                class="w-full"
                                :label="$t(column.layerTitle || column.title)"
                                :prop="column.dataIndex">
                                <!-- 使用simple-form-item渲染表单组件 -->
                                <simple-form-item
                                    :model="form.model"
                                    :formItem="column.formItem"
                                    :title="column.title"
                                    :dataIndex="column.dataIndex" />
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
            </el-form>
            <slot name="after"></slot>
        </div>

        <!-- 弹窗底部按钮 -->
        <template v-if="showCancelButton || showConfirmButton" #footer>
            <div class="form-footer-layer-right">
                <el-button v-if="showCancelButton && layer.type !== 'look'" @click="close">
                    {{ cancelButtonText || $t('common.cancel') }}
                </el-button>
                <el-button
                    :disabled="needChange && isChanged"
                    :loading="loading || bodyLoading"
                    v-if="showConfirmButton"
                    type="primary"
                    @click="confirm">
                    {{ confirmButtonText || $t('common.confirm') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { cloneDeep, isEqual, isNil } from 'lodash'
import { ColumnType } from '../simple-table/types.ts'
import SimpleFormItem from '../simple-form-item'

type Props = {
    columns?: ColumnType[]
    size?: string
    showClose?: boolean
    showHead?: boolean
    bodyLoading?: boolean
    onConfirm?: Function
    onBeforeClosed?: Function
    showConfirmButton?: boolean
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    needChange?: boolean
}

type LayerType = {
    title?: string
    col?: number
    model?: object
    idKey: string //指定后端接口用id字段名
}
const layer = ref({})

const props = withDefaults(defineProps<Props>(), {
    size: 'large',
    showConfirmButton: true,
    showCancelButton: true,
    showHead: true,
    showClose: true,
})

const loading = ref(false)
const formRef = ref(null)
const form = ref({
    model: {},
    rules: [],
})
const originModel = ref({})
const formItemArr = ref([])

const width = computed(() => {
    const obj = {
        small: '480px',
        middle: '720px',
        large: '960px',
        max: '1232px',
    }
    return obj[props.size]
})

const isChanged = computed(() => {
    return isEqual(originModel.value, form.value.model)
})

const emit = defineEmits(['confirm', 'close'])
// const fileKeyArr = []

function initForm() {
    const result = []
    if (props.columns) {
        let rules = {}
        //将传入的data对象做为model的初始值
        const model = {}
        props.columns.forEach((item) => {
            if (item.formItem && !item.layerHidden) {
                const { type, required } = item.formItem
                result.push(cloneDeep(item))

                let prefixMessage = $t('common.inputText')
                if (type === 'select') {
                    prefixMessage = $t('common.selectText')
                }
                rules[item.dataIndex] = [
                    {
                        required,
                        message: prefixMessage + $t(item.title),
                        trigger: 'blur',
                    },
                ]
                if (item.layerRules) {
                    rules[item.dataIndex].push(...item.layerRules)
                }
                const itemValue = layer.value.model?.[item.dataIndex]
                if (isNil(itemValue)) {
                    model[item.dataIndex] = item.formItem.value
                } else {
                    model[item.dataIndex] = itemValue
                }
            }
        })
        formItemArr.value = result.sort((a, b) => a.formItem.layerSort - b.formItem.layerSort)
        form.value.model = model
        form.value.rules = rules
        originModel.value = cloneDeep(model)
        setTimeout(() => {
            nextTick(formRef.value.clearValidate)
        })
    }
}

async function confirm() {
    loading.value = true
    try {
        let valid = await formRef.value?.validate().catch(() => false)
        if (!formRef.value || valid) {
            const data = cloneDeep(form.value.model)
            const { idKey, type, model } = layer.value

            if (type === 'update') {
                //用于更新数据时，设置id
                data[idKey ?? 'id'] = model[idKey ?? 'id']
            }
            emit('confirm', data, type)
        } else {
            ElMessage.error($t('message.validFail'))
        }
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}

function close() {
    layer.value.show = false
    emit('close')
}

async function beforeClosed(done) {
    if (!props.onBeforeClosed) {
        done()
    } else {
        const res = await props.onBeforeClosed()
        if (res) {
            done()
        }
    }
}
// function updateFile(fileList, key) {
//     console.log(fileList, 23234)
//     props.form.model[key] = cloneDeep(fileList)
// }

function add(obj: LayerType = {}) {
    layer.value = obj
    layer.value.type = 'add'
    layer.value.title ??= $t('common.add')
    layer.value.col ??= 2
    layer.value.show = true
}
function edit(obj: LayerType = {}) {
    layer.value = obj
    layer.value.type = 'update'
    layer.value.title ??= $t('common.edit')
    layer.value.col ??= 2
    layer.value.show = true
}
function look(obj: LayerType = {}) {
    layer.value = obj
    layer.value.type = 'look'
    layer.value.title ??= $t('common.view')
    layer.value.col ??= 2
    layer.value.show = true
}
function update(data) {
    if (typeof data !== 'object') {
        return
    }
    for (const key in data) {
        form.value.model[key] = data[key]
    }
}
defineExpose({
    add,
    edit,
    look,
    update,
    close,
    getStatus: () => layer.value.show,
})
</script>

<style lang="scss"></style>
