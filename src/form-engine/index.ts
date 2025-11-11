import { isArray, cloneDeep, isEqual, isString, isPlainObject } from 'lodash'

export function changeItems(items) {
    return items.map((item) => {
        let config
        if (item.initialValues) {
            config = cloneDeep(item.initialValues)
        } else {
            config = item
        }

        const data = {
            ...config,
            designKey: config.designKey || `form-${getRandomId(4)}`,
            name: config.name || getRandomId(6),
        }
        if (config.children) {
            data.children = changeItems(config.children)
        }

        return data
    })
}

const copyChildren = (children) => {
    return children.map((child) => {
        const data = { ...cloneDeep(child), designKey: `form-${getRandomId(4)}`, name: getRandomId(8) }

        if (child.children) {
            data.children = copyChildren(child.children)
        }

        return data
    })
}

export function copyItems(list, id) {
    return list.reduce((all, current) => {
        if (current.children) {
            all.push({ ...current, children: copyItems(current.children, id) })
        } else {
            all.push(current)
        }

        if (current.designKey === id) {
            const newItem = {
                ...cloneDeep(current),
                designKey: `form-${getRandomId(4)}`,
                name: getRandomId(8),
            }
            if (current.children) {
                newItem.children = copyChildren(current.children)
            }
            if (current.label && !newItem.label.includes('copy')) {
                newItem.label = newItem.label + ' copy'
            }
            all.push(newItem)
        }

        return all
    }, [])
}

export function deleteItem(items, elementId) {
    const data = items.filter((item) => {
        return item.designKey !== elementId
    })

    return data.map((item) => {
        if (item.children) {
            return {
                ...item,
                children: deleteItem(item.children, elementId),
            }
        }
        return item
    })
}
export function isRegexString(str) {
    const regexMetaCharacters = /[.*+?^${}()|[\]\\]/

    return regexMetaCharacters.test(str)
}

//模板转换函数，将一个由双大括号包裹的字符串，转化为js表达式并返回结果（context限制变量范围）
const templateParse = (str, context) => {
    if (!str) return str
    if (typeof str !== 'string') return str

    const template = str.match(/{{(.+?)}}/)
    if (template) {
        try {
            const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])

            return parse(...Object.values(context))
        } catch (e) {
            // console.log(str, '模板转换错误：', e)
            return str
        }
    } else {
        return str
    }
}

export function deepParse(prop, context) {
    const $values = context.$values

    if (isString(prop)) {
        return templateParse(prop, context)
    }
    if (isPlainObject(prop)) {
        return Object.keys(prop).reduce((all, key) => {
            const itemContext = { ...context }

            if (prop.name && $values) {
                itemContext.$val = getDataByPath($values, prop.name)
                itemContext.$select = context.$selectData[prop.name]
            }

            return { ...all, [key]: deepParse(prop[key], itemContext) }
        }, {})
    }
    if (isArray(prop)) {
        return prop.map((item) => {
            return deepParse(item, context)
        })
    }

    return prop
}

export function handleLinkages({ newVal, oldVal, formValues, formItems, context }) {
    for (const item of formItems) {
        const newValue = getDataByPath(newVal, item.name)
        const oldValue = getDataByPath(oldVal, item.name)

        if (item.change && !isEqual(newValue, oldValue)) {
            let temp = cloneDeep(formValues.value)
            item.change.forEach(({ target, value }) => {
                if (target) {
                    if (target.includes('.*.')) {
                        //自增组件特殊处理
                        const targetArr = target.split('.*.')
                        const listTarget = targetArr.pop()
                        const targetParse = targetArr.join('.')
                        const list = getDataByPath(newVal, targetParse)
                        if (isArray(list)) {
                            temp = setDataByPath(
                                temp,
                                targetParse,
                                list.map((item) => {
                                    return {
                                        ...item,
                                        [listTarget]: value,
                                    }
                                }),
                            )
                        }
                    } else {
                        temp = setDataByPath(temp, target, value)
                    }
                }
            })
            Object.assign(formValues.value, temp)
        }

        if (item.children && item.component !== 'FormList') {
            handleLinkages({
                newVal,
                oldVal,
                formValues,
                formItems: item.children,
                context,
            })
        }
    }
}

export function getDataByPath(obj, path) {
    // 使用正则表达式分割路径字符串
    const keys = path.split('.')

    // 遍历路径，逐层深入对象
    let result = obj
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key]
        } else {
            // 如果路径无效，返回 undefined 或者其他默认值
            return undefined
        }
    }

    return result
}

export function setDataByPath(object, path, value) {
    const cloneObj = cloneDeep(object)
    // 将路径字符串分割成路径数组
    const pathArray = path.split('.')
    // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
    function update(obj: formValuesType, pathArray: string[], value: any) {
        // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
        if (pathArray.length === 1) {
            obj[pathArray[0]] = value
            return
        }

        // 获取当前路径的第一个部分
        const currentKey = pathArray.shift()

        if (currentKey) {
            // 如果当前键不存在，则创建一个空对象
            if (!obj[currentKey]) {
                obj[currentKey] = {}
            }

            // 递归调用更新函数
            update(obj[currentKey], pathArray, value)
        }
    }

    // 调用递归函数
    update(cloneObj, pathArray, value)

    // 返回更新后的对象
    return cloneObj
}
export function setDataByPathOrigin(object, path, value) {
    // 将路径字符串分割成路径数组
    const pathArray = path.split('.')
    // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
    function update(obj: formValuesType, pathArray: string[], value: any) {
        // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
        if (pathArray.length === 1) {
            obj[pathArray[0]] = value
            return
        }

        // 获取当前路径的第一个部分
        const currentKey = pathArray.shift()

        if (currentKey) {
            // 如果当前键不存在，则创建一个空对象
            if (!obj[currentKey]) {
                obj[currentKey] = {}
            }

            // 递归调用更新函数
            update(obj[currentKey], pathArray, value)
        }
    }

    // 调用递归函数
    update(object, pathArray, value)

    // 返回更新后的对象
    return object
}

export function getRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomId = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        randomId += characters.charAt(randomIndex)
    }

    return randomId
}

export const getCurrentByKey = (items, key) => {
    return items.reduce((all, item) => {
        if (item.designKey === key) {
            return item
        }
        if (item.children) {
            const res = getCurrentByKey(item.children, key)
            if (res) return res
        }

        return all
    }, null)
}

export function setCurrentByKey(items, element) {
    return items.map((item) => {
        if (item.designKey === element.designKey) {
            return element
        }
        if (item.children) {
            return { ...item, children: setCurrentByKey(item.children, element) }
        }
        return item
    })
}

export function recursionDelete(items, callback) {
    const data = items.filter(callback)
    return data.map((item) => {
        if (item.children) {
            return {
                ...item,
                children: recursionDelete(item.children, callback),
            }
        }
        return item
    })
}
