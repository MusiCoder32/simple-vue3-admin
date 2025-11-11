<template>
    <!-- 需要开发下拉列表滚动加载时再使用该指令 -->
    <!-- v-selectLoadMore:[popperClass]="scrollFetchData" -->
    <el-select
        :model-value="selectVal"
        v-bind="$attrs"
        :multiple="multiple"
        :placeholder="$t(placeholder)"
        clearable
        :filterable="filterable"
        @remove-tag="removeTag"
        @clear="clear"
        :popper-class="popperClass">
        <template #label="{ label, value }">{{ $t(label) }}</template>
        <el-option
            v-for="item in currentOptions"
            @click="clickHandle(item, valueKey)"
            :disabled="item.disabled"
            :key="item[valueKey]"
            :label="$t(item[labelKey])"
            :value="item[valueKey]">
            <!-- {{ formatter ? formatter(item[labelKey]) : item[labelKey] }} -->
        </el-option>

        <template #footer v-if="scrollLoad">
            <div class="footer" v-loading="loading">
                {{
                    isMax ? $t('message.noMoreSelect') : loading ? $t('message.loading') : $t('message.scrollLoadMore')
                }}
            </div>
        </template>
    </el-select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import useSelect from '../../hooks/use-select'
import { getRandomId } from '../../index.ts'

const props = defineProps({
    modelValue: {},
    oldValue: {},
    placeholder: null,
    options: {
        type: Array,
        default: () => [],
    },
    localOptions: {
        default: () => [],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    filterable: {
        type: Boolean,
        default: false,
    },
    mode: {
        type: String,
        default: 'static',
    },
    labelKey: {
        type: String,
        default: 'label',
    },
    valueKey: {
        type: String,
        default: 'value',
    },
    autoSelectedFirst: {
        type: Boolean,
        default: false,
    },
    api: Object,
    name: String,
    filterKey: { default: 'filter', type: String },
    formatter: Function,
    sort: Boolean,
    tableDrop: Boolean,
    columns: { default: () => [], type: Array },
    scrollLoad: Boolean,
    showOtherOption: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const popperClass = getRandomId(8) + '-popper'

const { selectVal, currentOptions, selectChange, removeTag, clear, loading, fetchData, isMax } = useSelect(props, emits)

function clickHandle(item, key) {
    if (item.disabled) {
        return
    }
    selectChange(item[key])
}

const scrollFetchData = () => {
    if (props.scrollLoad) {
        fetchData()
    }
}
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;
}
</style>
