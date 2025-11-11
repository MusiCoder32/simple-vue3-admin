<template>
    <span id="NumberInput" class="w-full">
        <span class="pl12" v-if="value === '***'">***</span>
        <el-input-number v-else @blur="blur" class="w-full" v-bind="{ ...$attrs, ...props }" v-model="value" />

        <span class="unit" v-if="unit">
            {{ unit }}
        </span>
    </span>
</template>

<script setup>
const props = defineProps({
    modelValue: Number,
    unit: String,
    min: { type: Number, default: 0 },
    max: Number,
    disabled: Boolean,
    step: { type: Number, default: 1 },
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    },
})

function blur() {
    if (!value.value) {
        value.value = 0
        nextTick(() => {
            value.value = null
        })
    }
}
</script>

<style lang="scss" scoped>
#NumberInput {
    position: relative;
    .unit {
        margin: 0 5px;
    }
}
</style>
