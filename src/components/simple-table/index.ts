import { defaults, isNil, cloneDeep } from 'lodash'

export function initCol(columns) {
    const queryList = ref([])
    const queryFormRules = ref({})
    const queryFormModel = ref({})
    const mergeCol = ref([]) //记录表格需要处理单元格合并的列
    const subTotalKeys = ref([]) //记录表格需要处理统计列
    const subAndGrandOptions = ref([]) //记录小计总计

    const { list, rules, model, merges, subs, totalOptions, sort } = columnRecursion(columns)

    // sort数组按照其元素querySort属性排序
    sort.sort((a, b) => a.formItem.querySort - b.formItem.querySort)
    //处理有特定查询区域排序的情况
    sort.forEach((item) => {
        list.splice(item.formItem.querySort, 0, item)
    })
    queryList.value = cloneDeep(list)
    queryFormRules.value = rules
    queryFormModel.value = model
    mergeCol.value = merges
    subTotalKeys.value = subs
    subAndGrandOptions.value = totalOptions

    return {
        queryList,
        queryFormRules,
        queryFormModel,
        mergeCol,
        subTotalKeys,
        subAndGrandOptions,
    }
}

/**
 * Description placeholder
 *
 * @export
 * @param {*} columns  表格列配置
 * @returns {{ list: [];  rules: {}; model: {}; merges: []; subs: []; }} {list：查询区配置数据；rules：查询区表单规则；model：查询区表单数据对象；merges:需执行行合并列；subs：需计算小计列}
 */
function columnRecursion(columns) {
    const list = []
    const sort = []
    const rules = {}
    const model = {}
    const merges = []
    const subs = []
    const totalOptions = {}

    columns.forEach((item) => {
        //<-----处理表格查询区域相关
        if (item.formItem && !item.queryHidden) {
            if (item.formItem.querySort || item.formItem.querySort === 0) {
                sort.push(item)
            } else {
                list.push(item)
            }
            const key = item.dataIndex
            if (item.formItem.queryRules) {
                rules[key] = item.formItem.queryRules
            }

            model[key] = item.formItem.value
        }
        //处理表格查询区域相关----->

        //收集需执行行合并的列
        if (item.merge) {
            merges.push(item.dataIndex)
        }

        //<-----处理小计总计相关
        if (item.grandTotalTitle) {
            totalOptions.grandTotalTitle = item.grandTotalTitle
            totalOptions.grandTotalKey = item.dataIndex
        }
        if (item.subTotalTitle) {
            totalOptions.subTotalTitle = item.subTotalTitle
            totalOptions.subTotalKey = item.dataIndex
        } else if (item.subTotal) {
            subs.push(item.dataIndex)
        }
        //处理小计总计相关----->

        if (item.children) {
            const childRes = columnRecursion(item.children)
            sort.push(...childRes.sort)
            list.push(...childRes.list)
            Object.assign(rules, childRes.rules)
            Object.assign(model, childRes.model)
            //defaults方法中，当前一个对象有值是，后续对象的值忽略
            Object.assign(totalOptions, defaults(totalOptions, childRes.totalOptions))
            merges.push(...childRes.merges)
            subs.push(...childRes.subs)
        }
    })

    return { list, rules, model, merges, subs, totalOptions, sort }
}

type SubAndGrandOptionsType = {
    subTotalKey: string
    grandTotalKey: string
    subTotalTitle: string
    subTotalKey: string
}
/**
 * 添加小计行与总计行
 *
 * @export
 * @param {*} list 表格数据
 * @param {*} subAndGrandOptions subAndGrandOptions
 * @returns {{}}
 */
export function addSubtotals(list: [], subAndGrandOptions: SubAndGrandOptionsType, subKeys: []) {
    if (!list.length) return []
    const { grandTotalKey, subTotalKey } = subAndGrandOptions
    const groupKey = grandTotalKey ?? subTotalKey
    const result = []
    let group = []
    let lastGroupVal = list[0][groupKey]

    if (subTotalKey) {
        list.forEach((item, idx) => {
            if (item[groupKey] !== lastGroupVal) {
                result.push(...group, createSubtotalRow(group, subAndGrandOptions, subKeys))
                group = []
                lastGroupVal = item[groupKey]
            }
            group.push(item)

            if (idx === list.length - 1) {
                // 最后一条，则添加小计行数据
                result.push(...group, createSubtotalRow(group, subAndGrandOptions, subKeys))
            }
        })
    } else {
        result.push(...list)
    }

    // 则添加总计行数据
    if (grandTotalKey) {
        result.push(createGrandTotalRow(list, subAndGrandOptions, subKeys))
    }
    return result

    function createSubtotalRow(group, subAndGrandOptions, subKeys) {
        const { subTotalKey, grandTotalKey, subTotalTitle } = subAndGrandOptions
        const result = {
            isSubtotal: true,
            [grandTotalKey]: group[0][grandTotalKey],
            [subTotalKey]: subTotalTitle || '小计',
        }
        subKeys.forEach((key) => {
            result[key] = group.reduce((sum, row) => sum + Number(row[key]), 0)
        })
        return result
    }
    function createGrandTotalRow(list, subAndGrandOptions, subKeys) {
        const { grandTotalKey, grandTotalTitle } = subAndGrandOptions
        const result = { isTotal: true, [grandTotalKey]: grandTotalTitle || '总计' }
        subKeys.forEach((key) => {
            result[key] = list.reduce((sum, row) => sum + Number(row[key]), 0)
        })
        return result
    }
}

/**
 * 设置表格列合并
 *
 * @export
 * @param {*} list 表格数据
 * @param {*} otherSpanMethod 外部传入的合并设置
 * @param {*} mergeCol 需执行行合并的列
 * @param {*} subTotalKeys 小计列key集合
 */

export function setSpanMethod(list: [], otherSpanMethod: Function, mergeCol: [], subTotalKeys: string[]) {
    return ({ row, column, rowIndex, columnIndex }) => {
        const dataIndex = column.property

        let result
        if (typeof otherSpanMethod === 'function') {
            result = otherSpanMethod({ row, column, rowIndex, columnIndex })
        }

        if (result) {
            return result
        }

        if (mergeCol.includes(dataIndex)) {
            if (isNil(row['$merge_' + dataIndex]) || row['$merge_' + dataIndex] === rowIndex) {
                row['$merge_' + dataIndex] = rowIndex
                let rowspan = 1
                for (let i = rowIndex + 1; i < list.length; i++) {
                    if (isSameParent(list[i], row, dataIndex)) {
                        list[i]['$merge_' + dataIndex] = rowIndex
                        rowspan++
                    } else {
                        break
                    }
                }

                return { rowspan, colspan: 1 }
            } else {
                return { rowspan: 0, colspan: 0 }
            }
        }

        return { rowspan: 1, colspan: 1 }
    }

    function isSameParent(listItem, row, dataIndex) {
        for (let i = 0; i < mergeCol.length; i++) {
            const key = mergeCol[i]
            if (listItem[key] !== row[key]) {
                return false
            }

            if (mergeCol[i] === dataIndex) {
                break
            }
        }
        return true
    }
}
