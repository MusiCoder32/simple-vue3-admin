<template>
    <el-input
        class="no-print"
        :disabled="disabled"
        :placeholder="disabled ? '' : $t(placeholder)"
        :model-value="typeof modelValue === 'string' ? modelValue?.trim() : modelValue"
        @update:model-value="update"
        v-bind="{ ...$attrs }" />

    <div :class="$attrs.class" :style="$attrs.style" class="only-print text-wrap">
        {{ modelValue }}
    </div>
</template>

<script setup>
const props = defineProps({
    placeholder: String,
    disabled: null,
    modelValue: null,
})
const emits = defineEmits(['update:modelValue'])

function update(value) {
    emits('update:modelValue', value.trim())
}
</script>

<style scoped></style>
