<template>
    <div ref="editorRef" style="height: 400px; border: 1px solid #eee; border-radius: 4px; overflow: hidden"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import vueEditStr from './vue-edit-str'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const code = ref('')
const schema = inject('$schema', {})
const editorRef = ref()
let view = null

onMounted(() => {
    code.value = vueEditStr(JSON.stringify(schema.value, null, 2))
    view = new EditorView({
        doc: code.value,
        extensions: [
            basicSetup,
            javascript(),
            oneDark,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    code.value = view.state.doc.toString()
                }
            }),
        ],
        parent: editorRef.value,
    })
})

onUnmounted(() => {
    if (view) {
        view.destroy()
        view = null
    }
})
</script>
