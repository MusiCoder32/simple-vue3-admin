<template>
    <div ref="editorRef" style="height: 300px; border: 1px solid #eee; border-radius: 4px; overflow: hidden; line-height: 16px"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits(['update:modelValue'])
const editorRef = ref<HTMLElement | null>(null)
let view: EditorView | null = null

onMounted(() => {
    view = new EditorView({
        doc: props.modelValue,
        extensions: [
            basicSetup,
            javascript(),
            oneDark,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    const value = view!.state.doc.toString()
                    emits('update:modelValue', value)
                }
            })
        ],
        parent: editorRef.value!
    })
})

watch(() => props.modelValue, (newVal) => {
    if (view && newVal !== view.state.doc.toString()) {
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: newVal } })
    }
})

onUnmounted(() => {
    if (view) {
        view.destroy()
        view = null
    }
})
</script>
