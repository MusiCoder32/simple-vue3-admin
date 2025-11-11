/**全屏相关*/

export function isFullScreen(): boolean {
    return !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
    )
}

export function fullScreenChange(): boolean {
    const element = document.documentElement
    if (isFullScreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
        return false
    } else {
        if (typeof window.ActiveXObject !== 'undefined') {
            const wscript = new ActiveXObject('WScript.Shell')
            if (wscript != null) {
                wscript.SendKeys('{F11}')
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen()
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen()
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen()
            }
        }
        return true
    }
}

// 谷歌浏览器F11全屏后，在页面中编写的全屏按钮失效,可监听f11按键状态，改用api开启全屏
export function escFullScreenListener(): AbortController {
    const controller = new AbortController()
    window.addEventListener(
        'keydown',
        (e) => {
            if (e.key === 'F11' || e.keyCode === 122) {
                e.preventDefault()
                fullScreenChange()
            }
        },
        { signal: controller.signal },
    )
    return controller
}

interface TreeFormat {
    data: []
    idKey: string
    parentIdKey: string
    childrenKey: string
    labelKey: string
    valueKey: string
}

// 一维数据转多根节点树状结构
export function getTreeData(obj: TreeFormat) {
    const {
        data = [],
        idKey = 'id',
        parentIdKey = 'pid',
        childrenKey = 'children',
        valueKey = 'value',
        labelKey = 'label',
    } = obj
    if (!data || data.length === 0) {
        return []
    }
    const result = []
    const map = new Map()
    const childMap = new Map()
    // 遍历出所有的parentId与itemId
    for (const item of data) {
        const id = item[idKey]

        item.label = item[labelKey]
        item.value = item[valueKey]
        map.set(id, item)

        // 判断是否在遍历到自身前，已有子元素储存于childMap中，childMap中以pid为键值
        if (childMap.has(id)) {
            item[childrenKey] = childMap.get(id)
            childMap.delete(id)
        }

        const parentId = item[parentIdKey]
        //如果parentId为空，设置为根节点，其他子节点会挂载到根节点的子节点数组中，
        //故只需要返回result即可
        if ([null, undefined, ''].includes(parentId)) {
            result.push(item)
        } else {
            // 如果父元素已进入map，则将自身添加到父元素子集
            if (map.has(parentId)) {
                const parent = map.get(parentId)
                parent[childrenKey] ? parent[childrenKey].push(item) : (parent[childrenKey] = [item])
            } else {
                // 如果遍历到子元素时，父元素还被遍历添加到map中，则存入childMap，等到后续遍历到父元素时，再将其添加到父元素中
                childMap.has(parentId) ? childMap.get(parentId).push(item) : childMap.set(parentId, [item])
            }
        }
    }

    return result
}

export function getClientSize() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight,
        }
    } else if (document.compatMode === 'BackCompat') {
        return {
            w: document.body.clientWidth,
            h: document.body.clientHeight,
        }
    } else {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        }
    }
}

export function getBrowserLanguage() {
    const localMap = {
        zh: 'zh-cn',
        en: 'en',
    }
    // 首选使用 standards-based 的 `navigator.language`
    let language = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage

    // 兼容旧版本IE（虽然现代实践中很少需要）
    if (!language && typeof navigator.userLanguage !== 'undefined') {
        language = navigator.userLanguage
    }

    // 确保获取到的语言代码
    if (typeof language === 'string') {
        // 简化语言代码，例如将 "en-US" 转换为 "en"
        language = language.substring(0, 2)
    }
    const result = localMap[language]
    if (result) {
        utils.setLoc('locale', result)
    }
    return result
}
