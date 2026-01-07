import * as d3 from 'd3'
export default class Chart {
    constructor({ id, width, height, colors, margin }) {
        this._box = d3.select('#' + id)

        const boxDom = this._box.node()
        this._width = width ?? boxDom.offsetWidth
        this._height = height ?? boxDom.offsetHeight

        this._id = id

        this._scaleX = null
        this._scaleY = null
        this._colors = (i) => (colors ?? d3.schemeCategory10)[i]
        this._svg = null
        this._body = null
        this._zoomHandler = null

        this._margins = {
            top: margin?.top ?? 10,
            left: margin?.left ?? 10,
            right: margin?.right ?? 10,
            bottom: margin?.bottom ?? 10,
        }
        this.renderChart()
    }

    id() {
        return this._id
    }

    width() {
        return this._width
    }

    height() {
        return this._height
    }

    margin() {
        return this._margins
    }

    // scaleX(x) {
    //     if (arguments.length === 0) return this._scaleX
    //     this._scaleX = x
    //     return this
    // }

    // scaleY(y) {
    //     if (arguments.length === 0) return this._scaleY
    //     this._scaleY = y
    //     return this
    // }

    svg() {
        return this._svg
    }

    body() {
        return this._body
    }

    box() {
        return this._box
    }
    getBodyWidth() {
        const width = this._width - this._margins.left - this._margins.right
        return width > 0 ? width : 0
    }

    getBodyHeight() {
        const height = this._height - this._margins.top - this._margins.bottom
        return height > 0 ? height : 0
    }

    renderChart() {
        if (!this._box) {
            this._box = d3.select('#' + this._id)
        }

        if (!this._svg) {
            this._svg = this._box.append('svg')
        }
        this._svg.attr('width', this._width).attr('height', this._height)

        if (!this._body) {
            this._body = this._svg.append('g').attr('class', 'body')
        }

        return this
    }

    setZoom(handler) {
        if (handler) {
            this._zoomHandler = handler
            return
        }
        this._zoomHandler = d3
            .zoom() // 创建缩放行为
            // .filter(() => isFull.value) // 可以处理zoomHandler何时生效
            .wheelDelta(() => {
                return d3.event.deltaY * -0.002
            })
            .on('zoom', () => {
                this._body.attr('transform', d3.event.transform)
            })
        this._svg.call(this._zoomHandler)
    }
    getZoomHandler() {
        if (!this._zoomHandler) {
            this.setZoom()
        }
        return this._zoomHandler
    }

    zoomToFit() {
        const bbox = this._body.node().getBBox()
        const contentWidth = bbox.width || 1
        const contentHeight = bbox.height || 1

        // 仅在计算 scale 时扣除 padding，其他逻辑不变
        const viewW = this.getBodyWidth()
        const viewH = this.getBodyHeight()

        const scale = Math.min(viewW / contentWidth, viewH / contentHeight)

        //缩放居中的，左边界的坐标应该为留白部分的一半 Lx = (viewW - contentW * scale) / 2
        //而Lx应该是通过仿射变换工具得来 scale * xMin + tx = Lx
        //故解得平移参数tx =  (viewW - contentW * scale) / 2  + padding - scale * xMin

        const translate = [
            (viewW - contentWidth * scale) / 2 + this.margin().left - bbox.x * scale,
            (viewH - contentHeight * scale) / 2 + this.margin().top - bbox.y * scale,
        ]

        // 应用自动缩放
        this._svg
            .transition()
            .call(this.getZoomHandler().transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
    }
}
