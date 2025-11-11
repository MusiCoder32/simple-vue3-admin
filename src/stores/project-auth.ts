import { getProjectAuth } from '@/api/users'
import { MenuType } from '@/enums'
import { debounce } from 'lodash'

export const projectAuthStore = defineStore('projectAuthStore', () => {
    const authMap = ref({})

    const check = debounce(
        async function (projectInstId) {
            try {
                const { menuList } = await getProjectAuth({ projectInstId })
                //以projectInstId项目id为属性,存储该项目下的所有权限数据
                authMap.value[projectInstId] = format(menuList)
            } catch (e) {
                console.log(e)
            }
        },
        2 * 1000,
        {
            leading: true,
            trailing: false,
        },
    )
    return { authMap, check }
})

//将权限按钮的route属性,组装到菜单对象的auths属性下
function format(data) {
    const result = []
    const map = new Map()
    const buttonTemp = new Map()
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const { pid, id, type } = item

        if (type === MenuType['菜单']) {
            result.push(item)
            map.set(id, item)
            if (buttonTemp.has(id)) {
                item.auths = buttonTemp.get(id)
                buttonTemp.delete(id)
            } else {
                item.auths = []
            }
        } else {
            if (map.has(pid)) {
                const parent = map.get(pid)
                parent.auths.push(item.route)
            } else {
                buttonTemp.has(pid) ? buttonTemp.get(pid).push(item.route) : buttonTemp.set(pid, [item.route])
            }
        }
    }
    return result
}
