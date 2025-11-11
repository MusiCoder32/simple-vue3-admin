<template>
    <div class="vw100 vh100 h-center-center p-f z9 lf0 tp0 bg-white">
        <div class="p-a z1 h-end-center" style="top: 20px; right: 20px">
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button type="primary" @click="restoreData">恢复</el-button>
            <el-button type="primary" @click="close">返回</el-button>
        </div>
        <div id="stencil" class="relative h-full" style="width: 190px; border-right: 1px solid #dfe3e8"></div>
        <div id="graph-container" class="h-full grow"></div>
    </div>
    <el-drawer v-model="showData" size="50%" title="标题" direction="rtl">
        <el-form label-width="auto" label-position="top" :model="formLabelAlign" :rules="rules" ref="nodeForm">
            <el-form-item label="节点名称" prop="name">
                <el-input v-model="formLabelAlign.name" />
            </el-form-item>

            <el-form-item label="所属模块" prop="name">
                <el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
                    <el-option v-for="item in modules" :key="item.type" :label="item.name" :value="item.type" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang="ts">
import { toBpmn, validGraph } from './index.ts'
import initStencil from './stencil.ts'
import initGraph from './graph.ts'
import { getRestoreData } from '@/api/index.ts'

const emits = defineEmits(['submit', 'close'])

const props = defineProps({
    modelValue: null,
})
const nodeForm = ref(null)
const pageRoute = ref([])
const router = useRouter()

const modules = [
    { name: '项目立项', type: 1 },
    { name: '项目评估', type: 2 },
    { name: '项目审批', type: 3 },
    { name: '项目履行', type: 4 },
    { name: '项目暂停', type: 5 },
    { name: '项目终止', type: 6 },
]

const formLabelAlign = reactive({
    name: '',
})

const rules = {
    name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
}

const showData = ref(false)
const activeNode = ref()
const activeApprovalObj = ref('')

let graph

function close() {
    emits('close')
}
function saveData() {
    const data = graph.toJSON()
    if (!validGraph(data)) return
    emits('submit', data)

    // const bpmn = toBpmn(data)

    // 转成xml文件
    // const blob = new Blob([bpmn], { type: 'application/xml' })
    // const file = new File([blob], 'data.bpmn', {
    //     type: 'application/xml',
    // })

    //   保存接口数据
}

async function restoreData() {
    const data = props.modelValue
    if (Array.isArray(data?.cells)) {
        graph.fromJSON(data.cells)
    }
}

onMounted(() => {
    // 初始化画布
    graph = initGraph('graph-container')

    // 初始化 stencil
    initStencil('stencil', graph)

    graph.on('node:dblclick', (e) => {
        activeNode.value = e.cell
        // 打开一个抽屉
        if (e.cell.shape !== 'custom-task') return
        showData.value = true

        formLabelAlign.name = e.cell.attrs.label.text
    })

    graph.on('edge:dblclick', (e) => {
        activeNode.value = e.cell
        console.log(e)
        //获取边前置节点
        // const allEdge = document.getElementsByClassName('x6-node')
        // let prevNode
        // for (let item of allEdge) {
        //     if (item.getAttribute('data-cell-id') === e.cell.source.cell) {
        //         prevNode = item.getAttribute('data-shape')
        //     }
        // }
        // if (prevNode !== 'custom-condition') {
        //     alert('当前边不允许设置')
        //     return
        // }

        formLabelAlign.name = e.cell.getLabels().length > 0 ? e.cell.getLabels()[0].attrs.label.text : ''
        showData.value = true
    })
    nextTick(() => {
        restoreData()
    })
})
// 关闭抽屉弹框
function handleClose() {
    showData.value = false
    activeNode.value = null
}

// 抽屉提交
async function submitForm() {
    const valid = await nodeForm.value.validate().catch(() => false)
    if (valid) {
        if (activeNode.value.shape === 'custom-task') {
            activeNode.value.attr({
                label: {
                    text: formLabelAlign.name,
                },
                customText: {},
            })
        } else if (activeNode.value.shape === 'edge') {
            activeNode.value.labels = [formLabelAlign.name]
        }
        showData.value = false
    }
    activeNode.value = null
}
</script>
<style lang="scss">
.x6-widget-stencil {
    background-color: #fff;
}

.x6-widget-stencil-title {
    background-color: #fff;
    display: none;
}

.x6-widget-stencil-group-title {
    background-color: #fff !important;
}

.x6-widget-stencil-content {
    overflow: hidden;
}

.x6-widget-stencil-group-title {
    display: none;
}
</style>
