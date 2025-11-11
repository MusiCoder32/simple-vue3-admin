import filePreview from '../components/file-preview.vue'
import { createVNode, render } from 'vue'
import AppContextPlugin from '../utils/app-context'

const filePreviewPlugin = {
    opened: false,
}

filePreviewPlugin.open = (props) => {
    return new Promise((resolve) => {
        if (filePreviewPlugin.opened) {
            return
        }
        filePreviewPlugin.opened = true
        const id = 'file-preview-container'
        let container = document.getElementById(id)
        if (!container) {
            container = document.createElement('div')
            container.id = id
            container.classList.add('z-top')
            container.classList.add('p-a')
            document.body.appendChild(container)
        }

        const vnode = createVNode(filePreview, {
            ...props,
            remove(data, type) {
                render(null, container)
                filePreviewPlugin.opened = false
                if (type === 'confirm') {
                    resolve(data)
                }
            },
        })
        vnode.appContext = AppContextPlugin._context
        render(vnode, container)
    })
}

export default filePreviewPlugin
