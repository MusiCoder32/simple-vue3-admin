<template>
    <div class="input-number-range" :class="{ 'is-disabled': disabled }">
        <div class="flex">
            <el-input
                ref="inputFormRef"
                style="width: 50%"
                clearable
                v-model.number="startValues"
                :disabled="disabled"
                :placeholder="startPlaceholder"
                @input="handleInputForm"></el-input>
            <div class="center ml8 mr8">
                <span>-</span>
            </div>
            <el-input
                ref="inputToRef"
                style="width: 50%"
                clearable
                v-model.number="endValues"
                :disabled="disabled"
                :placeholder="endPlaceholder"
                @input="handleInputTo"></el-input>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    startValue: {
        type: Number || String,
        default: null,
    },
    endValue: {
        typeof: Number || String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    startPlaceholder: {
        type: String,
        default: '请输入',
    },
    endPlaceholder: {
        type: String,
        default: '请输入',
    },
    precision: {
        type: Number,
        default: 0,
    },
})
const emits = defineEmits(['update:startValue', 'update:endValue'])
const startValues = computed({
    set(value) {
        emits('update:startValue', value)
    },
    get() {
        return props.startValue
    },
})
const endValues = computed({
    set(value) {
        emits('update:endValue', value)
    },
    get() {
        return props.endValue
    },
})
function handleInputForm(value) {
    const regex = /^[\d.]*$/
    if (!regex.test(value)) {
        value = value.substring(0, value.length - 1)
    }
    emits('update:startValue', value)
}
function handleInputTo(value) {
    const regex = /^[\d.]*$/
    if (!regex.test(value)) {
        value = value.substring(0, value.length - 1)
    }
    emits('update:endValue', value)
}
</script>
