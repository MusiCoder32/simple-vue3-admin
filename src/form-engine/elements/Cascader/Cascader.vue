<template>
    <el-cascader
        v-model="value"
        :options="currentOptions"
        :loading="loading"
        :show-all-levels="!takeLastLevel"
        :placeholder="$t(placeholder)"
        class="w-full"
        :props="{
            multiple,
        }"
        v-bind="$attrs">
        <template #default="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
        </template>
    </el-cascader>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElCascader } from 'element-plus'
import useSelect from '../../hooks/use-select'

const props = defineProps({
    modelValue: {},
    placeholder: null,
    options: {
        type: Array,
        default: () => [],
    },
    multiple: {
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
    api: Object,
    name: String,
    takeLastLevel: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        if (props.takeLastLevel && val) {
            return emits('update:modelValue', val[val.length - 1])
        }
        emits('update:modelValue', val)
    },
})

const { currentOptions, loading, selectChange } = useSelect(props, emits)
</script>
