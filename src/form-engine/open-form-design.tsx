import FormDesign from './form-design.vue'
import AppContextPlugin from '@/utils/app-context'
import { formsApi as httpApi } from '@/api/forms'
//createVNode, render不在auto-import中默认导入列表中,故需要手动导入
import { createVNode, render } from 'vue'
import { isEmpty } from 'lodash'
const FormDesignComponent = defineComponent({
    props: {
        routePath: null,
        path: null,
        remove: null, //utils.fileUpload自己维护,无需传入
    },
    setup(props) {
        const loading = ref()
        const schema = ref({
            items: [],
        })
        const route = useRoute()

        onMounted(() => {
            handleDesign()
        })

        function close() {
            props.remove()
        }
        async function saveDesign(template) {
            loading.value = true
            const params = {
                route: props.routePath ?? route?.path,
                path: props.path,
                template,
            }
            await httpApi.saveFormTemplate(params)
            localStorage.removeItem(params.path + params.path)
            ElMessage.success('保存成功')
            loading.value = false
            // props.remove()
        }

        async function handleDesign(row) {
            loading.value = true
            const params = {
                route: props.routePath ?? route?.path,
                path: props.path,
            }
            const dataLocal = utils.getLoc(params.route + params.path)

            let template
            try {
                template = await httpApi.getFormTemplateByPath(params)
            } catch (e) {
                console.log(e)
            }
            if (dataLocal) {
                const modalRes = await ElMessageBox.confirm('系统检测到你存在尚未保存的内容，是否恢复？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).catch(() => false)
                if (modalRes) {
                    schema.value = dataLocal
                } else {
                    schema.value = template
                }
            } else {
                if (!isEmpty(template)) {
                    schema.value = template
                }
            }
            loading.value = false
        }

        return () => (
            <FormDesign
                schema={schema.value}
                routePath={props.routePath}
                path={props.path}
                onSubmit={saveDesign}
                onClose={close}
                v-loading={loading.value}
            />
        )
    },
})

function openFormDesign(props) {
    if (!props.path) {
        return ElMessageBox({
            title: '错误',
            message: '请设置remote-form组件的path属性',
            type: 'error',
        })
    }
    return new Promise((resolve) => {
        if (openFormDesign.opened) {
            return
        }
        openFormDesign.opened = true
        const id = 'form-design-container'
        let container = document.getElementById(id)
        if (!container) {
            container = document.createElement('div')
            container.id = id
            // container.classList.add('absolute', 'w-full', 'top-0', 'left-0')
            document.body.appendChild(container)
        }

        const vnode = createVNode(FormDesignComponent, {
            ...props,
            remove(data) {
                render(null, container)
                openFormDesign.opened = false
                resolve(data)
            },
        })
        vnode.appContext = AppContextPlugin._context
        render(vnode, container)
    })
}

export default openFormDesign
