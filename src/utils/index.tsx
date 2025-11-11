import filePreviewPlugin from './file-preview'
import fileUploadPlugin from './file-upload'
import mitt from 'mitt'
export const { on, once, off, emit } = mitt()

//暴露emitter

export function saveFile(blob: Blob, fileName: string, fileType: any) {
    // document.location.href = strData;
    const saveLink = document.createElement('a')
    const fileUrl = URL.createObjectURL(blob)

    // download file name
    saveLink.download = fileName + '.' + fileType
    // download file data
    saveLink.href = fileUrl
    // start download
    saveLink.click()
}
/**localStorage相关*/
export function getLoc(key: string) {
    let res = localStorage.getItem(key)
    if (isJSON(res)) {
        res = JSON.parse(res)
    }
    return res
}
export function setLoc(key: string, data: any) {
    const str = JSON.stringify(data)
    localStorage.setItem(key, str)
}
export function isJSON(str) {
    if (typeof str !== 'string') return false
    try {
        JSON.parse(str)
        return true
    } catch {
        return false
    }
}

export function filePreview(fileObj: Object) {
    return filePreviewPlugin.open({ fileObj })
}

export function fileUpload(
    obj: {
        formStatus?: null
        fileArr?: Array
        content?: String
        projectInstId: string
        flowBlockName: String
    } = {},
) {
    const {
        formStatus = 'upload',
        fileArr = [],
        content = null,
        projectInstId,
        isUseFileRangeCache = false,
        isCloseFileRange = false,
    } = obj

    return fileUploadPlugin({
        formStatus,
        fileArr,
        content,
        projectInstId,
        isUseFileRangeCache,
        isCloseFileRange,
    })
}

export function isChinese(str) {
    const regex = /[\u4e00-\u9fff]/ // 正则表达式匹配中文字符
    return regex.test(str)
}

export function date(time) {
    if (time) {
        return dayjs(time).format('YYYY-MM-DD')
    }
    return '--'
}

export function dateTime(time) {
    if (time) {
        return dayjs(time).format('YYYY-MM-DD  HH:mm:ss')
    }
    return '--'
}

/**
 * Description placeholder
 *
 * @export
 * @param {*} otherHeight 当详情页存在非表单设计器元素时，需传入详情页面的el-scrollbar组件id作为选择器，计算其所占页面高度
 * @returns {*}
 */
export function exportPdfPreview(otherDomQuery?: string[]) {
    document.body.classList.add('print')
    return new Promise((resolve, reject) => {
        setPrintHeight(resolve, reject, otherDomQuery)
    })
}

//计算页面不出现滚动条所需的高度，在导出pdf时，不能出现滚动条

function setPrintHeight(resolve, reject, otherDomQuery) {
    let height = 52 + 200
    let scrollDom

    if (otherDomQuery) {
        //用于处理风险告知列表详情页特殊的页面结构情况
        scrollDom = document.querySelector(otherDomQuery)
        height += scrollDom?.scrollHeight || 0
    } else {
        const formGeneratorDom = document.querySelector('.form-generator')
        if (!formGeneratorDom) {
            reject(new Error('form-generator element not found'))
        }
        height += formGeneratorDom?.offsetHeight || 0
        scrollDom = formGeneratorDom?.parentNode
    }
    setTimeout(() => {
        document.documentElement.style.setProperty('--container-height', height + 'px')
        const { scrollHeight, offsetHeight } = scrollDom
        if (scrollHeight > offsetHeight) {
            setPrintHeight(resolve, reject, otherDomQuery, false)
        } else {
            resolve()
        }
    }, 1000)
}

export function setSelectOption(enumObj) {
    return {
        default() {
            return Object.keys(enumObj).map((key) => {
                const option = {
                    label: key,
                    value: enumObj[key],
                }
                return <ElOption {...option} />
            })
        },
    }
}
