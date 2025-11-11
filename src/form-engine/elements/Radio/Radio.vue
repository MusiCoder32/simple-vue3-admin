<template>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">{{ $t('common.noOptions') }}</div>
    <el-radio-group v-model="selectVal" @change="selectChange" v-loading="loading" v-bind="$attrs">
        <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
            <template v-if="optionType === 'circle' || optionType === 'border'">
                <el-radio
                    v-for="item in currentOptions"
                    :key="item[valueKey]"
                    :value="item[valueKey]"
                    :border="optionType === 'border'">
                    {{ $t(item[labelKey]) }}
                </el-radio>
            </template>

            <template v-else>
                <el-radio-button
                    v-for="item in currentOptions"
                    :key="item[valueKey]"
                    :value="item[valueKey]"
                    :size="$attrs.size">
                    {{ $t(item[labelKey]) }}
                </el-radio-button>
            </template>
        </el-space>
    </el-radio-group>
</template>

<script setup>
import useSelect from '../../hooks/use-select'

const props = defineProps({
    modelValue: {},
    options: {
        type: Array,
        default: () => [],
    },
    localOptions: {
        type: Array,
        default: () => [],
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
    optionType: {
        type: String,
        default: 'circle',
    },

    direction: {
        type: String,
        default: 'horizontal',
    },
    space: {
        type: Number,
        default: 20,
    },
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)
</script>

<style lang="scss" scoped></style>
