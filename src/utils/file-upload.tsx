//createVNode, render不在auto-import中默认导入列表中,故需要手动导入
import { createVNode, render } from 'vue'
import AppContextPlugin from './app-context'
const fileUploadComponent = defineComponent({
    props: {
        formStatus: null,
        fileArr: null,
        content: null,
        projectInstId: null,
        remove: null, //utils.fileUpload自己维护,无需传入

        isUseFileRangeCache: null,
        isCloseFileRange: null,
    },
    setup(props) {
        const model = ref({
            fileArr: props.fileArr ?? [],
            projectInstId: props.projectInstId,
        })
        const layerRef = ref()
        const remoteFormRef = ref()
        const route = useRoute()
        const getViewRangeContent = computed(() => {
            if (props.content) {
                return props.content
            }
            const path = props.routePath ?? route?.path

            //风险评估
            if (path === '/risk/evaluate') {
                return 'attachments.riskEvaluateViewRange'
            }
            if (path === '/risk/confirm') {
                return 'attachments.riskConfirmViewRange'
            }

            return null
        })
        onMounted(() => {
            layerRef.value.add({
                title: props.formStatus === 'upload' ? 'attachments.uploadAttachments' : 'common.view',
            })
        })

        function closed() {
            props.remove()
        }
        function updateModel(newValue) {
            model.value = newValue
        }

        function confirmHandle() {
            props.remove(model.value.fileArr)
        }

        function handleReady() {
            remoteFormRef.value.schema.items[1].props.content = getViewRangeContent.value
        }

        return () => (
            <SimpleLayer
                ref={layerRef}
                onConfirm={confirmHandle}
                onClose={closed}
                size="large"
                showConfirmButton={props.formStatus === 'upload'}
                showCancelButton={props.formStatus === 'upload'}>
                <RemoteForm
                    class="layer-table"
                    ref={remoteFormRef}
                    path="common-upload"
                    onUpdate:modelValue={updateModel}
                    modelValue={model.value}
                    formStatus={props.formStatus}
                    onOnReady={handleReady}
                    isUseFileRangeCache={props.isUseFileRangeCache}
                    isCloseFileRange={props.isCloseFileRange}
                />
            </SimpleLayer>
        )
    },
})

function fileUpload(props) {
    return new Promise((resolve, reject) => {
        if (fileUpload.opened) {
            return
        }
        fileUpload.opened = true
        const id = 'file-upload-container'
        let container = document.getElementById(id)
        if (!container) {
            container = document.createElement('div')
            container.id = id
            container.classList.add('p-a')
            document.body.appendChild(container)
        }

        const vnode = createVNode(fileUploadComponent, {
            ...props,
            remove(data) {
                render(null, container)
                fileUpload.opened = false
                if (Array.isArray(data)) {
                    resolve(data)
                } else {
                    reject('点击的取消按钮')
                }
            },
        })
        vnode.appContext = AppContextPlugin._context
        render(vnode, container)
    })
}

export default fileUpload
