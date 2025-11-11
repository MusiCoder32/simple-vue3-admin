<template>
    <div class="form-list relative w-full">
        <drag-item-box v-if="design" :children="children" title="自增容器" :name="name" />

        <div v-else>
            <div class="" v-if="mode === 'inline'">
                <el-form-item v-for="(item, index) in list" :key="item.key">
                    <div class="grid w-full grid-cols-3 gap-5">
                        <form-item
                            v-for="field in fields(index)"
                            class="mt2.5"
                            v-bind="field"
                            :showChange="false"
                            :key="field.label"
                            :name="`${name}.${index}.${field.name}`"
                            :hideLabel="index > 0" />

                        <div class="h-start-end read-hidden add-button h-full w-full" v-if="index == 0">
                            <svg-icon
                                v-if="allowAdd && !isMax"
                                @click="handleAddItem"
                                class="text-4 color-blue mb2"
                                name="form-engine-add-link" />
                            <span class="color-blue ml1">{{ $t('common.append') }}</span>
                        </div>
                        <div class="h-start-end read-hidden h-full w-full" v-if="allowReduce && index > 0">
                            <el-button @click="handleReduceItem(index)">{{ $t('common.delete') }}</el-button>
                        </div>
                    </div>
                </el-form-item>
            </div>

            <div class="w-full" v-if="mode === 'card'">
                <div v-for="(item, index) in list" :class="index > 0 ? 'mt4' : ''" :key="item.key">
                    <el-card class="card-box">
                        <template #header>
                            <div class="h-between-center" style="height: 20px">
                                <span>{{ $t(title) + (index + 1) }}</span>
                                <div class="h-center-center">
                                    <div
                                        v-if="allowReduce && !disabled && (index > 0 || !needFirst)"
                                        @click="handleReduceItem(index)"
                                        class="pl4 pr3 h-center-center">
                                        <svg-icon name="form-engine-delete"></svg-icon>
                                    </div>
                                    <div
                                        class="h-start-center pointer pl3 whitespace-nowrap"
                                        @click="item.expand = !item.expand">
                                        <el-icon class="fw500">
                                            <ArrowUp v-if="item.expand" />
                                            <ArrowDown v-else />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="item.expand" class="p4" :class="isRightPanel ? '' : 'grid-layout'">
                            <form-item
                                v-for="field in fields(index)"
                                :showChange="false"
                                v-bind="field"
                                :key="field.label"
                                class=""
                                :name="`${name}.${index}.${field.name}`" />
                        </div>
                    </el-card>
                </div>

                <div
                    @click="handleAddItem"
                    class="h-start-center add-button h-full w-full"
                    v-if="!disabled && allowAdd && !isMax">
                    <svg-icon class="text-4 color-blue" name="form-engine-add-link" />
                    <span class="color-blue ml1">{{ $t('common.append') }}</span>
                </div>
            </div>

            <div v-if="mode === 'table'">
                <simple-table
                    class="form-list-table !p0"
                    :style="{ height: isFixedHeight ? fixedHeight : 'auto' }"
                    :auto-height="!isFixedHeight"
                    ref="tableRef"
                    :columns="columns"
                    :isDelayLoading="false"
                    :list="list"
                    :showPage="showPage"
                    :showIndex="showIndex"
                    :showAdd="false"
                    :show-selection="showSelect"
                    @selectChange="selectChange" />

                <div
                    v-if="!disabled && allowAdd && !isMax"
                    style="cursor: pointer"
                    class="h-start-center mt3 add-button"
                    @click="handleAddItem">
                    <svg-icon class="text-4 color-blue" name="form-engine-add-link" />
                    <span class="color-blue ml1">{{ $t('common.addNewLine') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import FormItem from '../../form-item.vue'
import DragItemBox from '../../middle-editor/drag-item-box.vue'
import { deepParse } from '../../index.ts'
import { isNil, isEqual, cloneDeep, clone } from 'lodash'

const isRightPanel = inject('isRightPanel', false)

const context = inject('$context', {})

const tableRef = ref()
const props = defineProps({
    operations: null,
    operationWidth: null,
    children: Array,
    isFixedHeight: {
        default: false,
        type: Boolean,
    },
    fixedHeight: String,
    allowAdd: {
        default: true,
        type: Boolean,
    },
    allowReduce: {
        default: true,
        type: Boolean,
    },
    showIndex: {
        default: true,
        type: Boolean,
    },
    showSelect: {
        default: false,
        type: Boolean,
    },
    fileRangeType: null,
    content: null,
    showPage: {
        default: false,
        type: Boolean,
    },
    needFirst: {
        default: false,
        type: Boolean,
    },
    defaultLineCount: {
        default: 0,
        type: Number,
    },
    maxLines: {
        default: 999,
        type: Number,
    },
    mode: {
        default: 'table',
        type: String,
    },
    title: {
        default: '卡片',
        type: String,
    },
    newItemDefaults: {
        type: Function,
        default: () => ({
            expand: true,
        }),
    },
    columns: {
        type: Array,
    },
    hasFileViewAuth: {
        default: '',
        type: String,
    },
    name: String,
    design: Boolean,
    disabled: Boolean,
})
const page = ref({ index: 1, size: 10 })

const emit = defineEmits(['update:modelValue'])

// const list = computed({
//     get() {
//         const arr = []
//         if (props.modelValue && Array.isArray(props.modelValue)) {
//             arr.push(...props.modelValue)
//         }

//         return arr
//     },
//     set() {
//         emit('update:modelValue', [...list.value])
//         console.log('update')
//     },
// })

const list = defineModel({ default: [] })

const showOperaColumn = computed(() => {
    let result = false
    if (Array.isArray(props.operations)) {
        props.operations.forEach((item) => {
            if (!item.hidden) {
                result = true
            }
        })
    }
    return result
})

const fields = computed(() => (index) => deepParse(props.children, { $item: list.value[index], $index: index }))

const isMax = computed(() => {
    if (props.maxLines) {
        return list.value?.length >= props.maxLines
    }
    return false
})

const columns = computed(() => {
    const result = []
    if (Array.isArray(props.children)) {
        props.children.forEach((item) => {
            if (!item.hidden) {
                const obj = {
                    dataIndex: item.name,
                    title: $t(item.label),
                    align: 'left',
                    // width: item.width,
                    minWidth: item.width,
                    help: item.help,
                    formRequired: item.required,
                    customRender(text, row, index) {
                        //字段属性配置那里,第一层属性储存的是form-item相关属性,往下的props,才是form-item包含组件的属性

                        const rowContent = { $item: row, $index: index, ...context.value }

                        /**
                         * 此处deepParse方法,将表格行数据当作content传入deepParse中,使用得表单引擎在配置界面可以直接使用{{$row[列属性]}}的方式获取单元格的值
                         * 需要注意,在使用方法且需要以行数据进行传参时,必须以三元表达式判断$row是否存在,如{{ $row  ? () => test($row) : null }},否则插值表达式({{}})会被提前解析成功,导致报找不到参数$row的错误
                         */
                        const obj = deepParse(item, rowContent)

                        const realIndex = (page.value.index - 1) * page.value.size + index
                        const options = {
                            ...obj,
                            hideLabel: true,
                            showChange: false,
                            style: { marginBottom: 0 },
                            name: `${props.name}.${realIndex}.${item.name}`,
                        }

                        return <FormItem {...options} />
                    },
                }
                Object.keys(obj).forEach((key) => {
                    if (isNil(obj[key])) {
                        delete obj[key]
                    }
                })

                result.push(obj)
            }
        })
    }

    //渲染操作列
    if (showOperaColumn.value) {
        const obj = {
            title: $t('common.operations'),
            minWidth: props.operationWidth || props.operations.length * 60,
            className: 'no-print operate',
            customRender(text, row, index) {
                const btnArr = []
                props.operations.forEach((item) => {
                    const rowContent = { $row: row, $index: index, ...context.value }

                    const btnItem = deepParse(item, rowContent)

                    if (!btnItem.hidden) {
                        btnArr.push(
                            <el-button
                                v-has={btnItem.has}
                                disabled={btnItem.disabled}
                                onClick={() => buttonHandle(btnItem.buttonEvent, { row, $index: index })}
                                type="primary"
                                class="button-item"
                                style="margin-left: -15px"
                                text
                                icon={btnItem.icon}>
                                {$t(btnItem.buttonName)}
                            </el-button>,
                        )
                    }
                })
                return btnArr
            },
        }
        result.push(obj)
    }

    return result
})

const listWatch = computed(() => {
    return cloneDeep(list.value)
})

watch(
    listWatch,
    (newVal, oldVal) => {
        // <---formList 值联动---
        if (!isEqual(newVal, oldVal)) {
            for (let i = 0; i < listWatch.value.length; i++) {
                const newChangeData = newVal[i] || {}
                const oldChangeData = oldVal[i] || {}
                fields.value(i).forEach((item) => {
                    if (item.change && oldChangeData && !isEqual(newChangeData[item.name], oldChangeData[item.name])) {
                        item.change.forEach((v) => {
                            const name = v.target.split('.').pop()
                            list.value[i][name] = v.value
                        })
                    }
                })
            }
            if (props.mode === 'table') {
                nextTick(() => {
                    tableRef.value.renderTable()
                })
            }
        }

        // formList ---值联动--->
    },
    {
        deep: true,
    },
)

onMounted(() => {
    if (props.needFirst) {
        //不走handleAddItem来更新modelValue,会导致生成的值为一个对象,而不是数组
        list.value.length || handleAddItem()
    }
})

function selectChange(selction) {
    list.value.forEach((item) => {
        item.checked = false
    })
    selction.forEach((item) => {
        item.checked = true
    })
}

function handleAddItem() {
    if (isMax.value) {
        return
    }
    list.value.push(props.newItemDefaults(list.value.length))
    list.value = [...list.value]
}

function handleReduceItem(index) {
    list.value.splice(index, 1)
    list.value = [...list.value]
}

async function buttonHandle(eventName, row) {
    try {
        if (eventName === 'function') {
            const res = await eventName(row, list.value)
        } else {
            if (eventName === 'delRow') {
                handleReduceItem(row.$index)
            }
            // } else if (eventName === 'fileSoftDel') {
            //     ElMessage.success($t('message.delSuccess'))
            //     handleReduceItem(row.$index)
            // } else if (eventName === 'fileView') {
            //     utils.filePreview(row.row)
            // }
        }
    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss">
.label-required::before {
    color: var(--el-color-danger);
    content: '*';
    margin-right: 4px;
}

.card-box {
    box-shadow: none !important;
    border: 1px solid #dcdfe6 !important;

    .el-card__header {
        background: rgb(245, 247, 250);
        padding: 16px;

        svg:hover {
            color: $primary-blue;
        }
    }

    .el-card__body {
        padding: 0;
    }
}

.add-button:hover .color-blue {
    color: #79bbff;
}
</style>
