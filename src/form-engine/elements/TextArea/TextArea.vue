<template>
    <div class="design-textarea">
        <div class="no-print relative">
            <!-- 只读用 -->
            <el-input
                type="textarea"
                class="textarea-readonly"
                :show-word-limit="true"
                :placeholder="disabled ? '' : $t(placeholder)"
                v-bind="{ ...$attrs }"
                :model-value="typeof modelValue === 'string' ? modelValue?.trim() : modelValue"
                :disabled="disabled"
                :autosize="{
                    minRows: 1,
                    maxRows: maxRowsNew,
                }"
                ref="textareaRef1"
                :key="maxRowsNew"
                autocomplete="off" />

            <!-- 编辑用 -->
            <el-input
                class="textarea-edit"
                ref="textareaRef2"
                type="textarea"
                :model-value="modelValue"
                @update:model-value="update"
                :show-word-limit="true"
                :placeholder="disabled ? '' : $t(placeholder)"
                v-bind="{ ...$attrs }"
                :disabled="disabled"
                :autosize="{
                    minRows,
                    maxRows: maxRowsNew,
                }"
                :key="maxRowsNew"
                autocomplete="off" />
            <div v-if="false && showEllipsis && !expand" class="textarea-ellipsis">...</div>
        </div>

        <div
            v-if="showEllipsis"
            class="h-start-center no-print color-blue pointer whitespace-nowrap"
            @click="expandClick">
            <div class="ml12 mr4">{{ expand ? $t('common.fold') : $t('common.unfold') }}</div>
            <el-icon class="fw500">
                <ArrowUp v-if="expand" />
                <ArrowDown v-else />
            </el-icon>
        </div>
        <div class="only-print text-wrap">{{ modelValue }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    placeholder: String,
    disabled: null,
    maxRows: null,
    minRows: null,
    modelValue: null,
})
const maxRowsNew = ref(props.maxRows || 4)
const textareaRef1 = ref()
const textareaRef2 = ref()
const expand = ref(false)

const showEllipsis = ref(false)

watch(
    () => props.modelValue,
    () => {
        nextTick(() => {
            setTimeout(() => {
                const dom1 = textareaRef1.value?.ref
                const dom2 = textareaRef2.value?.ref
                showEllipsis.value =
                    expand.value || dom1?.scrollHeight > dom1?.offsetHeight || dom2?.scrollHeight > dom2?.offsetHeight
            }, 500)
        })
    },
    {
        immediate: true,
    },
)
const emits = defineEmits(['update:modelValue'])

function update(value) {
    emits('update:modelValue', value.trim())
}

function expandClick() {
    if (expand.value) {
        expand.value = false
        maxRowsNew.value = props.maxRows
    } else {
        expand.value = true
        maxRowsNew.value = 9999
    }
}
</script>

<style scoped>
.textarea-ellipsis {
    right: 12px;
    bottom: 0px;
    height: 24px;
    width: 16px;
    line-height: 24px;
    text-align: center;
    background: white;
    right: 12px;
    bottom: 0;
    position: absolute;
}
.textarea-readonly {
    display: none !important;
}
</style>
