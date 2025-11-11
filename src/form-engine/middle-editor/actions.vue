<template>
    <div class="formDesign-actions">
        <div class="formDesign-actions-left">
            <el-button size="small" @click="handlePreviewExec">预览JSON脚本</el-button>
            <el-button size="small" @click="handlePreviewVue">生成VUE代码</el-button>
            <el-button size="small" type="primary" @click="handlePreviewForm">预览表单</el-button>
        </div>
        <div class="formDesign-actions-right">
            <el-button size="small" type="danger" @click="handleClear">清空</el-button>
            <el-button size="small" @click="handleSave" type="primary">保存</el-button>
            <el-button size="small" @click="handleBack" type="primary">返回</el-button>
        </div>

        <el-dialog v-model="execVisible" title="预览脚本" width="70%" center destroy-on-close top="10vh">
            <json-editor-vue
                class="editor"
                v-model="json"
                mode="text"
                :options="{ search: true, history: true }"
                language="zh"
                @blur="onBlur" />
        </el-dialog>

        <el-dialog v-model="vueVisible" title="VUE代码" width="70%" class="dialog" center destroy-on-close top="10vh">
            <VueEdit />
        </el-dialog>

        <el-dialog v-model="formVisible" title="预览表单" width="70%" class="dialog" destroy-on-close center top="10vh">
            <schema-form v-model="form" :schema="schema" ref="formRef" :schemaContext="previewSchemaContext" />
            <template #footer>
                <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
                <el-button @click="formRef.reset()" type="primary">重置</el-button>
                <JsonEdit
                    v-model="formContext"
                    height="400px"
                    title="联动变量"
                    description="实时预览表单的联动变量，调试联动"
                    mode="dialog" />
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="jsx">
import SchemaForm from '../schema-form.vue'
import { changeItems } from '../index.ts'
import VueEdit from '../vue-edit.vue'
import JsonEditorVue from 'json-editor-vue'
import JsonEdit from '../elements/JsonEdit/JsonEdit.vue'

const execVisible = ref(false)

defineProps({
    previewSchemaContext: {
        type: Object,
        default: () => ({}),
    },
})

const schema = inject('$schema')
const emit = defineEmits(['save', 'close'])

const json = computed({
    get() {
        return schema.value
    },
    set(value) {
        schema.value = value
    },
})

const formRef = ref(null)

const form = ref({})

const formContext = computed(() => formRef.value?.context)

const formVisible = ref(false)

const vueVisible = ref(false)

const handlePreviewExec = () => {
    execVisible.value = true
}

const handlePreviewVue = () => {
    vueVisible.value = true
}

const handlePreviewForm = () => {
    form.value = {}
    formVisible.value = true
}

const onBlur = async (editor) => {
    const res = await editor.validate()
    if (res.length) {
        let parse = editor.getText()
        parse = new Function('return ' + parse)()
        parse.items = changeItems(parse.items)
        json.value = parse
    }
}

async function handleSave() {
    const modalRes = await ElMessageBox.confirm('请确认是否保存,保存后若需返回列表页,请点击返回按钮?', '提示', {
        type: 'warning',
    }).catch(() => false)
    if (modalRes) {
        emit('save', schema.value)
    }
}
async function handleBack() {
    const res = await ElMessageBox.confirm(
        '请确认已保存当前页面内容,否则会导致本次编辑内容丢失,是否立即返回?',
        '提示',
        {
            type: 'warning',
        },
    ).catch(() => false)
    if (res) {
        emit('close')
    }
}

const handleSubmit = () => {
    formRef.value
        .submit()
        .then((values) => {
            alert(JSON.stringify(values, null, 2), '模拟提交')
        })
        .catch((e) => console.log(e))
}

const handleClear = () => {
    schema.value = { ...schema.value, items: [] }
}
</script>

<style scoped lang="scss">
.formDesign-actions {
    /* padding: 10px; */
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .formDesign-actions-left,
    .formDesign-actions-right {
        button {
            margin-bottom: 10px;
        }
    }
}
</style>
