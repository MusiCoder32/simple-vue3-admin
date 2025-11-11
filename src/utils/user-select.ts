import userSelect from '@/components/users-select.vue'
import { createVNode, render } from 'vue'
import AppContextPlugin from '@/utils/app-context'

const userSelectPlugin = {
    opened: false,
}

userSelectPlugin.open = (props) => {
    return new Promise((resolve) => {
        if (userSelectPlugin.opened) {
            return
        }
        userSelectPlugin.opened = true
        const id = 'user-select-container'
        let container = document.getElementById(id)
        if (!container) {
            container = document.createElement('div')
            container.id = id
            container.classList.add('z9')
            container.classList.add('p-a')
            document.body.appendChild(container)
        }

        const vnode = createVNode(userSelect, {
            ...props,
            remove(data, type) {
                render(null, container)
                userSelectPlugin.opened = false
                if (type === 'confirm') {
                    resolve(data)
                }
            },
        })
        vnode.appContext = AppContextPlugin._context
        render(vnode, container)
    })
}

export default userSelectPlugin
