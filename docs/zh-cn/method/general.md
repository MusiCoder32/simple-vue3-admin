---
title: web端低频实用函数
outline: [2, 3]
---

# web端低频实用函数集合
位于`/src/utils/general.ts`

## 全屏相关

<el-button type="primary" @click="fullScreenChange">全屏切换</el-button>

<script setup>
    import {ElButton} from 'element-plus'
    import {onMounted,onUnmounted} from 'vue'
    import {isFullScreen,fullScreenChange,escFullScreenListener} from '../../../src/utils/general.ts'

    let escAbort
    onMounted(()=>{
       escAbort =  escFullScreenListener()
    })

    onUnmounted(()=>{
        escAbort.abort()
    })
    
</script>

### isFullScreen(是否全屏)

判断浏览器当前全屏状态

```ts
export function isFullScreen() {
    return !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
    )
}
```

### fullScreenChange(全屏切换)

切换浏览器全屏状态，并返回当前全屏状态

```ts
export function fullScreenChange() {
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
```

### escFullScreenListener(Esc按键退出全屏)

当浏览器用F11开启全屏时，Esc按键无法退出全屏，需要配置监听Esc退出全屏事件，在进入页面的onMounted阶段调用并储存返回的`controller`，在离开页面时，调用`controller.abort()`，清除监听事件

```ts
export function escFullScreenListener() {
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
```


## 树状结构数据处理

### getTreeData(一维数据转多根节点树状结构)

常用于层级选择器，多级树状结构中，后端返回一维数组，让前端自己组装数据

**实现思路**
1. 根节点判定：当 `parentId` 在 `[null, undefined, '']` 中时，该项被视为根节点，直接放入返回数组。
2. 子节点挂载：
   若父节点已处理过，立即将当前项挂到父节点的 `children`（`childrenKey`）数组。
   若父节点尚未出现，暂存到内部的 `childMap`，待父节点出现时一次性挂载。
3. 标准字段：每个节点会被就地添加（或覆盖）两个字段：
   `item.label = item[labelKey]`
   `item.value = item[valueKey]`
4. 返回结果：返回由“所有根节点”构成的数组。
5. 由后端数据保证id的唯一性，不然会出错

方法
```ts
export function getTreeData(obj) {
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
```
## 浏览器相关

### getClientSize(获取内容区域宽高)
```ts
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
```

### getBrowserLanguage(获取当前语言环境)
``` ts
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
```