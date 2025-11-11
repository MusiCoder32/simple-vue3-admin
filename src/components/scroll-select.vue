<template>
    <el-select
        v-model="modelCpd"
        :multiple="props.multiple"
        clearable
        collapse-tags
        reserve-keyword
        filterable
        collapse-tags-tooltip
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :loading="loading"
        :style="{ width: '200px' }"
        :filter-method="handleFilter"
        @change="
            (value: any) => {
                if (props.change != null) {
                    props.change(value)
                }
            }
        ">
        <div v-infinite-scroll="loadMore" :infinite-scroll-immediate="true">
            <el-option
                v-for="item in reSelect.optionList"
                :key="item[props.optionKey]"
                :value="item[props.value]"
                :label="getLabel(item, props.label ? props.label : 'Name')" />

            <div class="el-select-dropdown__empty">
                <span v-if="loading">{{ $t('message.loading') }}</span>
                <span v-if="noMore">{{ $t('message.noMore') }}</span>
            </div>
        </div>
    </el-select>
</template>
<script setup lang="ts">
interface selectProps {
    modelValue: any //选择赋值
    name: string //一个父与子里面的下拉：不可重复
    methods: (data: any) => any //接口方法
    label: any //下拉中显示值
    multiple: boolean //是否多选
    placeholder: string //占位显示
    optionKey: string //Key源
    value: string //value源
    disabled?: boolean //是否禁用
    change: Function | undefined //
}
const props = withDefaults(defineProps<selectProps>(), {
    modelValue: null,
    name: 'scroll-select',
    label: null,
    //默认不可多选
    placeholder: '请选择',
    optionKey: 'ID', //默认
    value: 'ID', //默认
    disabled: false, //默认不禁用
    change: () => {},
})
const loading = ref(false)
const emit = defineEmits(['update:modelValue'])
const modelCpd = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})

const reSelect = reactive({
    pageNum: 0,
    pageSize: 9,
    total: 0,
    optionList: [] as any,
    filter: null,
})

const noMore = computed(() => {
    return reSelect.total && reSelect.optionList.length >= reSelect.total
})
function initLoad() {
    reSelect.pageNum = 0
    loadMore(reSelect)
}
//加载数据
async function loadMore() {
    if (noMore.value) return
    reSelect.pageNum += 1
    const params = {
        pageNum: reSelect.pageNum,
        pageSize: reSelect.pageSize,
        filter: reSelect.filter,
    }

    try {
        let res = await props.methods(params)
        if (res.list && res.list.length > 0) {
            reSelect.optionList = reSelect.optionList.concat(res.list)
        }
        reSelect.total = res.total
    } catch (e) {
        console.log(e)
    }
    loading.value = false
}

//下拉显示值
function getLabel(obj: any, fields: string) {
    let matchs = fields.match(/\w+/g)
    if (matchs == null) {
        return ''
    }
    matchs.forEach((element) => {
        fields = fields.replace(element, obj[element])
    })
    return fields
}
function handleFilter(value) {
    reSelect.filter = value
    reSelect.optionList = []
    loading.value = true
    initLoad()
}
</script>
