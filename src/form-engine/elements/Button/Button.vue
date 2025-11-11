<template>
    <el-button :text="category == 2" v-bind="{ ...$attrs, ...props }" @click="onClick">
        {{ $t(name) }}
    </el-button>
    <div style="clear: both"></div>
</template>

<script setup>
import { ElButton } from 'element-plus'

const formEvents = inject('$formEvents', {})

const props = defineProps({
    name: String,
    disabled: Boolean,
    design: Boolean,
    type: {
        type: String,
        default: 'primary',
    },
    category: {
        type: Number,
        default: 1,
    },
    clickEvent: String,
    customEvent: null,
    color: String,
})

const onClick = () => {
    if (props.clickEvent === 'submitForm') {
        formEvents.submit()
    }
    if (props.clickEvent === 'resetForm') {
        formEvents.resetFields()
    }
    if (props.clickEvent === 'custom') {
        props.customEvent()
    }
}
</script>

<style scoped></style>
