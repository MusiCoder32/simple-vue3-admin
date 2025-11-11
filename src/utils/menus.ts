import { cloneDeep } from 'lodash'
import { routerMap } from '@/router/router-map'

import { MenuType } from '@/enums'

export function formatRouter(arr) {
    const data = cloneDeep(arr)
    data.sort((a, b) => a.sortNum - b.sortNum)
    const menuResult = []
    const routerResult = []
    const pathLabelMap = {}
    const map = new Map()
    const childMap = new Map()
    const buttonTemp = new Map()
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        item.path = item.route
        item.label = item.name
        const { pid, id, type, path, label } = item

        if (type === MenuType['菜单']) {
            pathLabelMap[path] = { path, label }

            item.meta = {
                permissions: [],
            }
            if (routerMap[path]) {
                item.component = routerMap[path]
                item.meta.title = label
                if (buttonTemp.has(id)) {
                    item.meta.permissions = buttonTemp.get(id)
                    buttonTemp.delete(id)
                }
                routerResult.push(item)
            }

            map.set(id, item)

            if (childMap.has(id)) {
                item.children = childMap.get(item.id)
                childMap.delete(item.id)
            }

            if (pid) {
                // 如果父元素已进入map，则将自身添加到父元素子集
                if (map.has(pid)) {
                    const parent = map.get(pid)
                    parent.children ? parent.children.push(item) : (parent.children = [item])
                } else {
                    childMap.has(pid) ? childMap.get(pid).push(item) : childMap.set(pid, [item])
                }
            } else {
                menuResult.push(item)
            }
        } else {
            if (map.has(pid)) {
                const parent = map.get(pid)
                parent.meta.permissions.push(item)
            } else {
                buttonTemp.has(pid) ? buttonTemp.get(pid).push(item) : buttonTemp.set(pid, [item])
            }
        }
    }

    return {
        menu: menuResult,
        router: routerResult,
        pathLabelMap,
    }
}
