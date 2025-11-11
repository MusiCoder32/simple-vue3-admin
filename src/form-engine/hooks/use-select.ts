import { isEqual, debounce } from 'lodash'
import { request } from '../../api/request'
import { getTreeData } from '../../utils/general'

const useSelect = (props, emits) => {
    const $selectData = inject('$selectData', {})
    const $oldSelectData = inject('$oldSelectData', {})

    const selectVal = computed({
        get() {
            return props.modelValue
        },
        set(val) {
            emits('update:modelValue', val)
        },
    })
    const oldSelectVal = computed(() => {
        return props.oldValue
    })

    const currentOptions = ref([])

    const loading = ref(false)

    const isMax = ref(false)

    const stateParams = reactive({
        pageNum: 1,
        pageSize: 10,
        // filters: {},
    })

    const fetchData = debounce(async () => {
        if (isMax.value || !props.api) return

        const { url, method, params, data, dataPath } = props.api
        if (!url) return

        loading.value = true

        let resData = await request({
            url,
            method,
            data: { ...data, ...params, ...stateParams },
        })
        if (dataPath) {
            resData = getTreeData({ data: resData, ...dataPath, valueKey: props.valueKey, labelKey: props.labelKey })
        }

        // if (resData.length !== stateParams.pageSize) {
        //     isMax.value = true
        // }

        currentOptions.value = [...currentOptions.value, ...resData]
        if (props.showOtherOption) {
            currentOptions.value.push({
                label: $t('common.other'),
                value: '其他',
            })
        }
        if (selectVal.value) {
            setSelectData(selectVal.value)
        }
        if (oldSelectVal.value) {
            setOldSelectData(oldSelectVal.value)
        }
        stateParams.pageNum++

        loading.value = false
    }, 300)

    onBeforeMount(() => {
        const { mode, options, localOptions } = props
        if (mode === 'static' || mode === 'local') {
            //该逻辑需外部表单数据组装完成再渲染表单才能及时拿到props.modelValue生效
            const arr = []
            mode === 'static' ? arr.push(...options) : Array.isArray(localOptions) ? arr.push(...localOptions) : null
            if (props.showOtherOption) {
                let hasPushOther = false

                if (props.modelValue) {
                    if (props.multiple) {
                        props.modelValue.forEach((item) => {
                            if (typeof item === 'string' && item.slice(0, 2) === '其他') {
                                arr.push({
                                    label: $t('common.other') + '-' + item.slice(3),
                                    value: item,
                                })
                                hasPushOther = true
                            }
                        })
                    } else {
                        if (typeof props.modelValue === 'string' && props.modelValue.slice(0, 2) === '其他') {
                            arr.push({
                                label: $t('common.other') + '-' + props.modelValue.slice(3),
                                value: props.modelValue,
                            })
                            hasPushOther = true
                        }
                    }
                }
                if (!hasPushOther) {
                    arr.push({
                        label: $t('common.other'),
                        value: '其他',
                    })
                }
            }

            currentOptions.value = arr
            if (selectVal.value) {
                setSelectData(selectVal.value)
            }
            if (oldSelectVal.value) {
                setOldSelectData(oldSelectVal.value)
            }
            isMax.value = true
        }
        if (mode === 'remote') {
            //延迟请求接口,规避参数中需要获取其他字段的值,在某些情况下,未获取到的情况
            setTimeout(() => {
                fetchData()
            })
        }
    })

    watch(
        () => props.api,
        (newVal, oldVal) => {
            //bug：这里发生只api内存地址变化，实际api无变化也会触发监听。暂时使用深层对比解决
            if (!isEqual(newVal, oldVal)) {
                stateParams.pageNum = 1
                currentOptions.value = []
                fetchData()
            }
        },
    )
    watch(
        () => props.modelValue,
        (val) => {
            if (val && !$selectData[props.name]) {
                setSelectData(selectVal.value)
                if (oldSelectVal.value) {
                    setOldSelectData(oldSelectVal.value)
                }
            }
        },
    )

    watch(currentOptions, (newVal) => {
        const { autoSelectedFirst, modelValue, valueKey, multiple, sort } = props
        // 自动选中第一项
        if (autoSelectedFirst && newVal.length && !modelValue?.length) {
            const firstValue = multiple ? [newVal[0][valueKey]] : newVal[0][valueKey]
            emits('update:modelValue', firstValue)
            selectChange(firstValue)
        }

        if (sort) {
            currentOptions.value = currentOptions.value.sort((a, b) => a.value - b.value)
        }
    })

    watch(
        () => props.options,
        (newVal) => {
            if (props.mode === 'static') {
                currentOptions.value = newVal
            }
        },
    )

    watch(
        () => props.mode,
        (newVal) => {
            if (newVal === 'static') {
                currentOptions.value = props.options
            } else if (newVal === 'local') {
                currentOptions.value = props.localOptions
            } else if (newVal === 'remote') {
                currentOptions.value = []
                fetchData()
            }
        },
    )

    async function selectChange(val) {
        let result
        if (val.indexOf('其他') > -1 && props.showOtherOption) {
            const inputRes = await ElMessageBox.prompt($t('message.otherOptionTip'), $t('message.tooltip'), {
                inputValue: val.slice(3),
            }).catch(() => false)
            if (inputRes.value) {
                const label = $t('common.other') + '-' + inputRes.value.trim()
                const content = '其他-' + inputRes.value.trim()
                currentOptions.value.pop()
                currentOptions.value.push({
                    label: label,
                    value: content,
                })
                if (props.multiple) {
                    let arr = selectVal.value || []
                    arr = arr.filter((item) => {
                        if (typeof item !== 'string') {
                            return true
                        }
                        return item.indexOf('其他') === -1
                    })
                    arr.push(content)
                    result = arr
                } else {
                    result = content
                }
            }
        } else {
            if (props.multiple) {
                const arr = selectVal.value || []
                arr.push(val)
                const set = new Set(arr)
                result = [...set]
            } else {
                result = val
            }
        }

        const selectData = setSelectData(result)

        selectVal.value = result

        emits('onChangeSelect', selectData)
    }
    function removeTag(val) {
        selectVal.value = selectVal.value.filter((item) => item !== val)
    }
    function clear() {
        selectVal.value = undefined
    }

    function setSelectData(val) {
        const { name, valueKey, multiple } = props

        let selectData = {}

        if (multiple) {
            //多选就过滤出vals对应的源数据
            selectData = currentOptions.value.filter((item) => {
                return val.includes(item[valueKey])
            })
        } else {
            //单选找到单项对应的源数据
            selectData = currentOptions.value.find((item) => item[valueKey] === val)
        }

        //如果接到了$selectData，给顶级组件保存当前值对应得数据源
        if ($selectData) {
            $selectData[name] = selectData
        }
        return selectData
    }
    function setOldSelectData(val) {
        const { name, valueKey, multiple } = props

        let selectData = {}

        if (multiple) {
            //多选就过滤出vals对应的源数据
            selectData = currentOptions.value.filter((item) => {
                return val.includes(item[valueKey])
            })
        } else {
            //单选找到单项对应的源数据
            selectData = currentOptions.value.find((item) => item[valueKey] === val)
        }

        //如果接到了$selectData，给顶级组件保存当前值对应得数据源
        if ($oldSelectData) {
            $oldSelectData[name] = selectData
        }
    }

    return { selectVal, selectChange, removeTag, clear, currentOptions, loading, fetchData, isMax }
}

export default useSelect
