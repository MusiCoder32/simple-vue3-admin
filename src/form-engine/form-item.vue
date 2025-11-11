<template>
    <template v-if="design || !hidden">
        <div v-if="config.type === 'layout'" :style="style">
            <component
                :class="thisProps?.props?.class"
                :is="config.component"
                :design="design"
                :name="name"
                :props="props"
                :children="children" />
        </div>

        <div :class="thisProps.class" v-else-if="config.type === 'assist'" :style="style">
            <component :is="config.component" v-bind="props" :design="design" />
        </div>

        <el-form-item
            v-else
            :style="style"
            :key="name"
            :prop="name"
            :label-position="labelAlign"
            :label-width="hideLabel ? '0' : schema.labelWidth"
            :rules="computeRules"
            :validate-status="computeRules?.length ? null : ''"
            :class="thisProps.class">
            <template v-if="!hideLabel" #label>
                <div class="flex h-full" :style="{ marginLeft: required ? '-10px' : 0 }">
                    <div v-if="required && !schema.hideRequiredAsterisk" class="required mr1">*</div>
                    <div
                        class="form-item-label"
                        :style="{
                            'font-weight': schema.labelBold ? 'bold' : '',
                        }">
                        {{ $t(label) }}{{ schema.labelSuffix }}
                    </div>

                    <div
                        @click.prevent
                        style="
                            pointer-events: all;
                            line-height: 16px;
                            height: 16px;
                            min-width: 14px;
                            align-self: center;
                        "
                        class="ml1 no-print"
                        v-if="help"
                        v-ell:t-a="$t(help)">
                        <svg-icon name="question" class="text-3.5 color-gray-6" />
                    </div>
                </div>
            </template>
            <div class="h-start-start w-full">
                <span
                    class="empty pl3"
                    v-if="
                        !design &&
                        (value === '' || isNil(value)) &&
                        component != 'ButtonForm' &&
                        component != 'Upload' &&
                        component != 'FormList'
                    ">
                    --
                </span>

                <div
                    class="w0 grow"
                    v-ell.delay="!['DatePicker', 'ButtonForm', 'Upload', 'FormList'].includes(component)">
                    <component
                        :is="config.component"
                        :disabled="schema.disabled"
                        :size="schema.size"
                        v-bind="formItemProps"
                        v-on="formItemSelfEvents"
                        v-model="value"
                        :oldValue="oldValue"
                        :design="design" />
                </div>
                <div class="mt1.5 no-print" v-if="showCompare">
                    <!-- <el-tooltip class="box-item" effect="dark" :content="compareText">
                        <div class="has-change white f12 h-center-center">{{ $t('common.existChange') }}</div>
                    </el-tooltip> -->
                    <div v-ell:t-a="compareText" class="has-change color-white text-3 h-center-center">
                        {{ $t('common.existChange') }}
                    </div>
                </div>
            </div>
        </el-form-item>
    </template>
</template>

<script setup lang="tsx">
import { isEqual, isNil, isEmpty } from 'lodash'
import { isRegexString, getDataByPath, setDataByPathOrigin } from './index.ts'
const simpleFormItems = inject('$simpleFormItems', null)

const schema = inject('$schema', null)
const selectData = inject('$selectData', null)
const oldSelectData = inject('$oldSelectData', null)
// const formValues = thisProps.design ? {} : inject('$formValues')
const formValues = inject('$formValues', {})
const oldFormValues = inject('$oldFormValues', null)
const selfEvents = inject('$selfEvents', null)

const thisProps = defineProps({
    label: String,
    name: String,
    labelAlign: String,
    requiredMessage: String,
    component: String,
    required: [Boolean, String],
    props: Object,
    modelValue: null,
    initialValue: null,
    style: Object,
    help: String,
    children: Array,
    hidden: Boolean,
    hideLabel: Boolean,
    designKey: String,
    rules: Array,
    class: null,
    design: Boolean,
    change: null, //用于消除告警,目前组件内无需使用该属性
    showChange: {
        default: true,
        type: Boolean,
    },
})

const formItemProps = computed(() => {
    const initProps = {
        ...thisProps.props,
        name: thisProps.name,
    }

    if (thisProps.children) {
        initProps.children = thisProps.children
    }

    return initProps
})
const formItemSelfEvents = computed(() => {
    const events = thisProps?.props?.on || []
    const result = {}
    events.forEach(({ eventName, eventType }) => {
        if (typeof eventName === 'function') {
            result[eventType] = (...rest) => eventName(...rest, thisProps.name)
        }
    })

    return result
})

let initial = true
const isRightPanel = inject('isRightPanel', false)

const value = computed({
    get() {
        const result = getDataByPath(formValues.value, thisProps.name)

        return result
    },
    set(val) {
        //解决右侧配置Switch在首次加载时,会将插值更改的问题
        //即右侧配置Switch在首次加载时,不允许同步其值
        //比如hidden属性,由于使用el-switch组件来设值,若允许同步,el-switch会将插值{{$values.xx.xx}}同步为false
        if (initial && isRightPanel && (thisProps.component === 'Switch' || thisProps.component === 'InputNumber')) {
            initial = false
        } else {
            if (formValues.value) {
                setDataByPathOrigin(formValues.value, thisProps.name, val)
            }
        }
    },
})

const oldValue = computed(() => {
    return getDataByPath(oldFormValues, thisProps.name)
})

// 创建立项时未传给后端，退回后编辑提交后需要比对的字段（针对创建立项时的非必填项）
// const compareFields = ['investMethod', 'xmzqyjh', 'kjywtms', 'qtxmxxbz', 'jebz']
const showCompare = computed(() => {
    if (!isEmpty(oldFormValues)) {
        // if (formValues.value.hasOwnProperty(thisProps.name)) {
        //     if (oldFormValues.hasOwnProperty(thisProps.name)) {
        //         const result = !isEqual(value.value, oldValue.value)
        //         return result
        //     } else {
        //         if (compareFields.includes(thisProps.name!)) {
        //             return true
        //         }
        //     }
        // }
        if (oldFormValues.hasOwnProperty(thisProps.name)) {
            const result = !isEqual(value.value, oldValue.value)
            return result
        }
    }
    return null
})

const compareText = computed(() => {
    let result = `${$t('common.beforeChange')}\n`
    let beforeStr = ''
    let afterStr = ''

    const oldData = oldValue.value
    if (Array.isArray(oldData)) {
        if (Array.isArray(oldSelectData[thisProps.name]) && oldSelectData[thisProps.name].length != 0) {
            oldSelectData[thisProps.name].forEach((item) => {
                beforeStr += item.label + '  '
                beforeStr += '\n'
            })
        } else if (oldData.length != 0) {
            oldData.forEach((item) => {
                beforeStr += item.label + '  '
                beforeStr += '\n'
            })
        } else {
            beforeStr = '--'
        }
    } else {
        if (thisProps.component === 'Select' && oldSelectData && oldSelectData[thisProps.name]) {
            beforeStr = `${oldData ? oldSelectData[thisProps.name][thisProps.props.labelKey] : '--'}\n`
        } else {
            beforeStr = `${oldData || '--'}\n`
        }
    }

    result += beforeStr
    result += `${$t('common.afterChange')}\n`

    if (Array.isArray(value.value)) {
        if (Array.isArray(selectData[thisProps.name]) && selectData[thisProps.name].length != 0) {
            selectData[thisProps.name].forEach((item) => {
                afterStr += item.label + '  '
                afterStr += '\n'
            })
        } else if (value.value.length != 0) {
            value.value.forEach((item) => {
                afterStr += item.label + '  '
                afterStr += '\n'
            })
        } else {
            afterStr = '--'
        }
    } else {
        if (thisProps.component === 'Select' && selectData && selectData[thisProps.name]) {
            afterStr = `${value.value ? selectData[thisProps.name][thisProps.props.labelKey] : '--'}\n`
        } else {
            afterStr = `${value.value || '--'}`
        }
    }
    result += afterStr

    return result
})

const computeRules = computed(() => {
    const { rules, required, component } = thisProps

    const ruleData = []

    //在表单渲染完成后,设置model值会触发表单item的必填校验
    //常见错误为给表单设置null或者空字符串,触发表单显示必填信息,正确的做法是不赋值或赋undefined

    if (required === true) {
        ruleData.push({
            required: true,
            message: $t(thisProps.requiredMessage) ?? $t('message.requireTooltip'),
            trigger: 'change',
        })
    }

    if (rules) {
        const ruleParse = rules.map(({ type, message, trigger, customReg }) => {
            const ruleDef = {
                message: $t(message),
                trigger,
            }
            if (['email', 'url'].includes(type)) {
                return { ...ruleDef, type }
            }
            if (type === 'custom') {
                return {
                    ...ruleDef,
                    pattern: customReg,
                }
            }
            if (isRegexString(type)) {
                return {
                    ...ruleDef,
                    pattern: type,
                }
            }
            return {}
        })
        return [...ruleData, ...ruleParse]
    }
    if (component === 'Upload') {
        ruleData.push({
            validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
                if (value === false) {
                    return callback(new Error($t('attachments.uploadError')))
                }
                callback()
            },
        })
    }
    return ruleData
})

const config = computed(() => {
    return simpleFormItems[thisProps.component] || {}
})

onMounted(() => {
    nextTick(() => {
        initial = false
        if (thisProps.initialValue && (value.value === undefined || value.value === null)) {
            value.value = thisProps.initialValue
        }
    })
})
</script>

<style lang="scss" scope>
.notFormItem {
    margin-bottom: 18px;
}
.required {
    color: var(--el-color-danger);
    width: 6px;
}
.has-change {
    width: 52px;
    height: 20px;
    border: 1px solid rgb(225, 243, 216);
    border-radius: 18px;
    background: #67c23a;
}
.empty {
    display: none;
}
</style>
