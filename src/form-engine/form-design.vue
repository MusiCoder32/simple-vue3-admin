<template>
    <div class="form-designer h-center-center z1000 fixed left-0 top-0 h-screen w-screen bg-white">
        <el-scrollbar class="h-full" style="min-width: 200px">
            <left-panel class="h-full w-full" />
        </el-scrollbar>

        <div class="v-center-center w0 h-full grow" style="">
            <Actions class="w-full" @save="save" @close="close" :previewSchemaContext="previewSchemaContext" />
            <middle-editor class="w-full" />
        </div>

        <el-scrollbar class="p2.5 h-full" style="min-width: 250px; max-width: 250px">
            <right-panel class="h-full w-full" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="tsx">
import LeftPanel from './left-panel/index.vue'
import MiddleEditor from './middle-editor/index.vue'
import Actions from './middle-editor/actions.vue'
import RightPanel from './right-panel/index.vue'
import { getCurrentByKey, setCurrentByKey } from './index.ts'

defineOptions({
    name: 'FormDesign',
})

const props = defineProps({
    schema: Object,
    routePath: String,
    path: String,
    previewSchemaContext: {
        type: Object,
        default: () => ({}),
    },
    class: null,
    style: null,
})

const emit = defineEmits(['submit', 'close'])

const currentKey = ref('')

const currentSchema = ref({
    labelWidth: 150,
    labelAlign: 'right',
    labelSuffix: ':',
    size: 'default',
    items: [],
})

watchEffect(() => {
    if (props.schema) {
        currentSchema.value = props.schema
    }
})

const current = computed({
    get() {
        const result = getCurrentByKey(currentSchema.value.items, currentKey.value) || {}
        return result
    },
    set(element) {
        currentKey.value = element.designKey
        currentSchema.value.items = setCurrentByKey(currentSchema.value.items, element)
        nextTick(() => {
            utils.setLoc(props.routePath + props.path, currentSchema.value)
        })
    },
})

provide('$current', current)
provide('$schema', currentSchema)

function save(formTemplate) {
    emit('submit', formTemplate)
    localStorage.removeItem(props.routePath + props.path)
}
function close() {
    localStorage.removeItem(props.routePath + props.path)
    emit('close')
}
</script>

<style lang="scss">
.formRender {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}
</style>
