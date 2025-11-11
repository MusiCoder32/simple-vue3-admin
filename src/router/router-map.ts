import { MenuType } from '@/enums'
import { unionBy } from 'lodash'

// // 自动扫描 views 下所有 vue 文件
export const routerMap = {}
export const demoMenus = [
    {
        id: '8203b6b6a64afb95b95b2',
        name: '表单管理',
        route: '/表单管理',
        icon: 'form',
        sort: 1,
        type: MenuType['菜单'],
        status: true,
        children: null,
    },
    {
        id: '8203b6b6a64a33232fb95b95b2',
        name: 'demo示例合集',
        route: '/demo示例合集',
        icon: 'demo',
        sort: 1,
        type: MenuType['菜单'],
        status: true,
        children: null,
    },
    {
        id: '8203b6b6a64afb95b95b23addroles',
        label: '删除',
        pid: '/demo示例合集/表单引擎/列表管理',
        route: 'del',
        sort: 6,
        type: MenuType['按钮'],
        status: true,
        children: null,
    },
]

const modules = import.meta.glob('../views/**/*.vue')
let menus = []
// 生成路由
Object.keys(modules).forEach((path, index) => {
    if (path.indexOf('demo示例合集') > -1) {
        const name = path.match(/..\/views\/demo示例合集\/(.*)\.vue$/)?.[1]
        if (import.meta.env.MODE === 'development') {
            routerMap['/' + name] = modules[path]
            const routeArr = name.split('/')
            routeArr.forEach((item, i) => {
                const route = '/' + routeArr.slice(0, i + 1).join('/')
                if (i === 0) {
                    menus.push({
                        id: route,
                        pid: '8203b6b6a64a33232fb95b95b2',
                        name: item,
                        route,
                        sort: index,
                        type: MenuType['菜单'],
                        status: true,
                    })
                } else {
                    menus.push({
                        id: route,
                        name: item,
                        pid: '/' + routeArr.slice(0, i).join('/'),
                        route,
                        sort: index,
                        type: MenuType['菜单'],
                        status: true,
                    })
                }
            })
        }
    } else {
        const name = path.match(/..\/views(.*)\/index\.vue$/)?.[1]
        routerMap[name] = modules[path]
    }
})
menus = unionBy(menus, 'id')
demoMenus.push(...menus)
