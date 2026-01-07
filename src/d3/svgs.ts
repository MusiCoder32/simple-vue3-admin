// @ts-ignore
import { debounce } from 'lodash-es'
// @ts-ignore

function computedSize(): number {
    const docEle = document.documentElement
    const screenRatioByDesign = 16 / 9
    const offsetWidth = docEle.offsetWidth || docEle.clientWidth
    const offsetHeight = docEle.offsetHeight || docEle.clientHeight
    const screenRatio = offsetWidth / offsetHeight
    return (offsetWidth / 1920) * (screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1)
}

class Watcher {
    call: Function
    id: string
    allSize: number[]
    dom: Element | null
    constructor(call: Function, id: string, allSize: number[]) {
        this.call = call
        this.id = id
        this.allSize = allSize
        this.dom = null
    }
    draw() {
        Promise.resolve().then(() => {
            const sizeRatio: number = computedSize()
            const newAllSize: Array<number> = this.allSize.map((item: number) => {
                return <number>sizeRatio * item
            })
            this.call(this.id, ...newAllSize)
        })
    }
    remove() {
        if (!this.dom) {
            this.dom = document.querySelector('#' + this.id)
        }
        if (this.dom) {
            this.dom.innerHTML = ''
            return true
        } else {
            return false
        }
    }
}

const dep = new Map()
const notice = debounce(1000, false, () => {
    dep.forEach((item, key) => {
        const result = item.remove()
        if (result) {
            item.draw()
        } else {
            dep.delete(key)
        }
    })
})
function svgInit(call: Function, id: string, allSize: number[]) {
    const watcher = new Watcher(call, id, allSize)
    watcher.draw()
    dep.set(id, watcher)
}

const resizeFunction = () => {
    dep.forEach((item, key) => {
        const result = item.remove()
        if (!result) {
            dep.delete(key)
        }
    })
    notice()
}

window.addEventListener('resize', resizeFunction)
export default svgInit
