<template>
    <div :id="id" class="relative">
        <div v-show="showMark" class="p-a lf0 tp0 z9 h-full w-full"></div>
        <svg style="position: absolute; width: 0px; height: 0px">
            <defs>
                <marker
                    id="fore-marker-yellow"
                    markerWidth="6"
                    markerHeight="10"
                    refX="26"
                    refY="5"
                    orient="auto"
                    color="#FFCD2A">
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(-1 1) rotate(-45 2.97 9.73)"
                        fill="currentColor" />
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(1 -1) rotate(45 12.48 -3.67)"
                        fill="currentColor" />
                </marker>
                <marker
                    id="fore-marker-start-yellow"
                    markerWidth="6"
                    markerHeight="10"
                    refX="26"
                    refY="5"
                    orient="auto-start-reverse"
                    color="#FFCD2A">
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(-1 1) rotate(-45 2.97 9.73)"
                        fill="currentColor" />
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(1 -1) rotate(45 12.48 -3.67)"
                        fill="currentColor" />
                </marker>
                <marker
                    id="fore-marker-blue"
                    markerWidth="6"
                    markerHeight="10"
                    refX="26"
                    refY="5"
                    orient="auto"
                    color="#BEE3FF">
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(-1 1) rotate(-45 2.97 9.73)"
                        fill="currentColor" />
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(1 -1) rotate(45 12.48 -3.67)"
                        fill="currentColor" />
                </marker>
                <marker
                    id="fore-marker-gray"
                    markerWidth="6"
                    markerHeight="10"
                    refX="26"
                    refY="5"
                    orient="auto"
                    color="#B3B3B3">
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(-1 1) rotate(-45 2.97 9.73)"
                        fill="currentColor" />
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(1 -1) rotate(45 12.48 -3.67)"
                        fill="currentColor" />
                </marker>
                <marker
                    id="fore-marker-start-gray"
                    markerWidth="6"
                    markerHeight="10"
                    refX="26"
                    refY="5"
                    orient="auto-start-reverse"
                    color="#B3B3B3">
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(-1 1) rotate(-45 2.97 9.73)"
                        fill="currentColor" />
                    <rect
                        rx=".75"
                        width="7"
                        height="1.5"
                        transform="scale(1 -1) rotate(45 12.48 -3.67)"
                        fill="currentColor" />
                </marker>
            </defs>
        </svg>
        <div class="z8 rounded-2 v-between-center absolute right-5 bottom-5 bg-white pr-2 pl-2">
            <el-button
                type="info"
                text
                v-for="item in icons"
                :key="item.name"
                class="!m0 !p0 w-full"
                v-ell:l-a="item.help"
                @click="item.action"
                style="height: 40px; color: #606266">
                <svg-icon
                    class="font-size-6"
                    :name="
                        'links-' + (item.name === 'full-screen' && isFull ? 'exit-' + item.name : item.name)
                    "></svg-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup lang="tsx">
import Chart from '@/d3/chart.ts'
import { cloneDeep } from 'lodash-es'
import { ProjectRelateType } from '@/enums'
import { render } from 'vue'
import { ElPopover } from 'element-plus'
import jsonData from './link-arrow-data.json'

const showMark = ref()
const props = defineProps({
    id: {
        required: true,
        default: 'd3_svg_' + Math.floor(new Date().getTime() * Math.random()),
    },
    data: {
        required: true,
        default: jsonData,
    },
    modelValue: {},
})

const maxScale = 5
const minScale = 0.3
const icons = ref([
    {
        name: 'position',
        action: position,
        help: $t('d3.positionTip'),
    },
    {
        name: 'refresh',
        action: refresh,
        help: $t('d3.refreshTip'),
    },
    {
        name: 'add',
        action: add,
        help: $t('d3.addTip'),
    },
    {
        name: 'subtract',
        action: subtract,
        help: $t('d3.subtractTip'),
    },
])
const manualZoom = ref()
const moving = ref(false)
const manualPosition = ref()
const currentNodeId = ref()
const currentNode = ref()

const originId = ref()
const config = {
    title: '带箭头力导图',
    lineColor: '#B3B3B3',
    lineWidth: '1',
    radius: 20,
    pointStroke: 'white',
    //以下属性为newChart必
    id: props.id,
    margins: { top: 80, left: 80, bottom: 50, right: 80 },
    colors: ['#FFCD2A', '#BEE3FF', '#E7E7E7'],
}
watch(
    props.data,
    (value) => {
        initMap(value)
    },
    { deep: true },
)

onMounted(() => {
    currentNodeId.value = props.modelValue
    originId.value = props.modelValue
    initMap(cloneDeep(props.data))
})

//解决突然切换导航栏时,d.creatPop()执行失败,导致提示窗未能及时关闭的问题
onDeactivated(() => {
    if (currentNode.value) {
        document.querySelector('.link-popover-box-' + currentNode.value.id).parentElement.style.display = 'none'
        currentNode.value = null
    }
})

function refresh() {
    currentNodeId.value = originId.value
    const node = d3.select(`#node-box${currentNodeId.value}`)

    const translateStr = node.attr('transform')
    const { x, y } = getTransform(translateStr)
    manualPosition.value({ x, y })

    initNodeSelect()
}
function position() {
    const node = d3.select(`#node-box${currentNodeId.value}`)

    const translateStr = node.attr('transform')
    const { x, y } = getTransform(translateStr)
    manualPosition.value({ x, y })
}
function add() {
    manualZoom.value('add')
}

function subtract() {
    // scale.value -= 1
    manualZoom.value('subtract')
}

function getTransform(translateStr) {
    if (!translateStr) {
        return {
            x: 0,
            y: 0,
            k: 1,
        }
    }
    const obj = {}
    const regex = /translate\((-?\d+.?\d*),\s*(-?\d+.?\d*)\)/
    const match = translateStr.match(regex)
    if (match) {
        obj.x = +match[1] // 第一个捕获组，转换为数字
        obj.y = +match[2] // 第二个捕获组，转换为数字
    }
    return obj
}

function setPopover() {
    let d = this
    currentNode.value = d

    const container = document.querySelector('#popover-' + d.id)

    const dom = (
        <ElPopover visible={d.visible} width={40}>
            {{
                reference: () => {
                    return (
                        <div class="h-center-center h-full w-full rounded-full" style="background:currentColor">
                            <div class="text-align-center !color-gray-6">{d.id}</div>
                        </div>
                    )
                },
                default: () => {
                    return (
                        <div
                            onMouseenter={() => domMouseenter()}
                            onMouseleave={() => domMouseleave()}
                            class="link-popover-box"
                            class={'link-popover-box-' + d.id}>
                            <div
                                class="text-4"
                                class={{ 'color-blue': d.displayFlag != 1, pointer: d.displayFlag != 1 }}>
                                节点id：{d.id}
                            </div>
                        </div>
                    )
                },
            }}
        </ElPopover>
    )

    if (dom && container) {
        render(dom, container)
    }

    function domMouseenter() {
        d.visible = true
    }
    function domMouseleave() {
        d.visible = false
        setTimeout(() => {
            d.createPop()
        }, 500)
    }
}

function initMap(data) {
    const chart = new Chart({
        id: config.id,
        margins: config.margins,
        colors: config.colors,
    })

    /* ----------------------------处理数据------------------------  */
    const nodes = data.nodes
    const links = data.links

    nodes.forEach((item) => {
        if (props.modelValue === item.id && nodes.length > 5) {
            //当节点数量非常少时,固定该节点会导致节点分布不均匀,出现节点重叠现象
            item.fx = chart.width() / 2
            item.fy = chart.height() / 2
        }
    })

    /* ----------------------------建立力模型------------------------  */
    const force = d3
        .forceSimulation()
        .velocityDecay(0.8) //速度衰减
        .alphaDecay(0.04) //alpha衰变, 0表示不衰减
        .force('collide', d3.forceCollide().radius(50).strength(1))
        .force('charge', d3.forceManyBody().strength(-30)) //节点相互作用力，默认为-30斥力，设置为正数则为引力
        .force('center', d3.forceCenter(chart.width() / 2, chart.height() / 2)) //定义力模型坐标的中心点

    /**在 d3 的力导图中，连线和节点是通过连线数据里的 source 与 target 属性关联到节点数据的。
     * 关联规则由 d3.forceLink(...).id(...) 决定：
     *  id 访问器返回的值用于把 source/target 和 nodes 匹配。默认用节点的 index。*/
    force.nodes(nodes) //绑定节点

    force.force(
        'link',
        d3
            .forceLink(data.links)
            .id((d) => d.id)
            .strength(1)
            .distance(100),
    )
    //绑定节点间链接

    /* ----------------------------渲染图标题------------------------  */
    function renderTitle() {
        chart
            .svg()
            .append('text')
            .classed('title', true)
            .attr('x', chart.width() / 2)
            .attr('y', 0)
            .attr('dy', '2em')
            .text(config.title)
            .attr('fill', config.textColor)
            .attr('text-anchor', 'middle')
            .attr('stroke', config.textColor)
    }

    /* ----------------------------渲染节点------------------------  */
    function renderNodes() {
        const points = chart.body().append('g').classed('node-box-group', true).selectAll('g').data(nodes)

        const group = points
            .enter()
            .append('g')
            .attr('id', (d) => 'node-box' + d.id)
            .classed('node-box', true)
            .attr('color', (d, i) => config.colors[2])

        group
            .append('foreignObject')
            .attr('x', -config.radius)
            .attr('y', -config.radius)
            .attr('width', config.radius * 2)
            .attr('height', config.radius * 2)
            .attr('id', (d) => {
                return 'popover-' + d.id
            })
            .each((d, i) => {
                d.visible = false
                d.createPop = setPopover
                d.createPop(config.colors[2])
            })

        points.exit().remove()
    }

    /* ----------------------------渲染节点连线------------------------  */
    function renderLinks() {
        const lines = chart
            .body()
            .insert('g', 'g.node-box-group')
            .attr('class', 'line-box')
            .selectAll('line')
            .data(links)

        lines
            .enter()
            .append('line')
            .attr('stroke', config.lineColor)
            .attr('stroke-width', config.lineWidth)
            .attr('marker-end', 'url(#fore-marker-gray)')
            .attr('marker-start', (d) => {
                return d.type === '并列' ? 'url(#fore-marker-start-gray)' : null
            })

        lines
            .exit()
            .transition()
            .on('end', (d) => {
                //删除线，并重新绑定links
                links.splice(links.indexOf(d), 1)
                force.force('link', d3.forceLink(links).strength(1).distance(200))
                force.restart()
            })
            .remove()
    }

    /* ----------------------------渲染节点连线文本------------------------  */
    function renderLinkTexts() {
        const group = chart
            .body()
            .insert('g', 'g.node-box-group')
            .attr('class', 'line-text-box')
            .selectAll('text')
            .data(links)

        group
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', 12)
            .attr('fill', '#606266')
            .classed('color-gray-6', true)
            .attr('dy', -5)
            .attr('opacity', 0)
    }

    /* ----------------------------绑定鼠标交互事件------------------------  */
    function addNodeMouseOn() {
        const drag = d3
            .drag()
            .on('start', (d) => {
                console.log('start')
                //开启拖拽后,mousedown失效,start事件生效
                moving.value = true
                d.visible = false
                d.createPop()
                d.fx = d.x
                d.fy = d.y
                // force.alphaMin(0.001).restart()
                force.alphaTarget(0.002) //该值大于end后设置的值,可解决拖拽过程中力导图突然停止仿真问题

                force.restart()
            })
            .on('drag', (d) => {
                d.fx = d3.event.x
                d.fy = d3.event.y
            })
            .on('end', (d) => {
                force.alphaTarget(0.001)
                d.fx = null
                d.fy = null
                force.alphaDecay(0.01).velocityDecay(0.4).alpha(0.01).alphaMin(0.0015).restart()
                moving.value = false
            })

        chart.body().selectAll('g.node-box').call(drag)
        // 绑定点击事件

        chart
            .svg()
            .on('click', () => {
                // 修改连接节点的颜色
                chart.body().selectAll('g.node-box').attr('color', config.colors[2])

                chart
                    .body()
                    .selectAll('line')
                    .style('stroke', config.lineColor)
                    .attr('marker-end', 'url(#fore-marker-gray)')
                    .attr('marker-start', (d) => {
                        if (d.type === '并列') {
                            return 'url(#fore-marker-start-gray)'
                        }
                        return null
                    })
                chart.body().selectAll('g.line-text-box > text').attr('opacity', 0)
            })
            .on('mousedown', () => {
                moving.value = true
                const selection = window.getSelection()
                selection.removeAllRanges()
            })
            .on('mouseup', () => {
                moving.value = false
            })

        chart
            .body()
            .selectAll('g.node-box')
            .on('mouseenter', (d) => {
                if (!moving.value) {
                    d.visible = true
                    d.createPop()
                }
            })
            .on('mouseleave', (d) => {
                d.visible = false
                setTimeout(() => {
                    d.createPop()
                }, 500)
            })
            // .on('mousedown', (d) => {
            //     d.visible = false
            //     d.createPop()
            // })
            .on('click', (d) => {
                d.visible = false
                d3.event.stopPropagation()
                const nodeId = d.id
                currentNodeId.value = nodeId
                /**
                 * 现阶段选中节点不更新下方列表
                 */
                // emits('select', d)

                // 根据节点ID找到所有相关的连线
                const connectedNodes = new Map()

                links.forEach((link) => {
                    if (link.source.id === nodeId || link.target.id === nodeId) {
                        connectedNodes.set(link.source.id, true)
                        connectedNodes.set(link.target.id, true)
                    }
                })

                // 修改这些连线的颜色
                chart
                    .body()
                    .selectAll('line')
                    .style('stroke', (d) => {
                        if (d.target.id === nodeId || d.source.id === nodeId) {
                            return config.colors[0]
                        }
                        return config.lineColor
                    })
                    .attr('marker-end', (d) => {
                        if (d.target.id === nodeId || d.source.id === nodeId) {
                            return 'url(#fore-marker-yellow)'
                        }
                        return 'url(#fore-marker-gray)'
                    })
                    .attr('marker-start', (d) => {
                        if (d.type === '并列') {
                            if (d.target.id === nodeId || d.source.id === nodeId) {
                                return 'url(#fore-marker-start-yellow)'
                            }
                            return 'url(#fore-marker-start-gray)'
                        }
                        return null
                    })

                // 修改连接节点的颜色
                chart
                    .body()
                    .selectAll('g.node-box')
                    .attr('color', (d) => {
                        let result = config.colors[2]
                        if (connectedNodes.get(d.id)) {
                            result = config.colors[1]
                        }
                        if (d.id === nodeId) {
                            result = config.colors[0]
                        }
                        return result
                    })

                // 修改连接线上的文字透明度
                chart
                    .body()
                    .selectAll('g.line-text-box > text')
                    .attr('opacity', (d) => {
                        if (d.source.id === nodeId || d.target.id === nodeId) {
                            return 1
                        }
                        return 0
                    })
                    .text((d) => {
                        if (d.type === '并列') {
                            return $t('enum.ProjectRelateType.' + ProjectRelateType['并列'])
                        } else {
                            if (d.target.id === nodeId) {
                                return $t('enum.ProjectRelateType.' + ProjectRelateType['前置'])
                            } else {
                                return $t('enum.ProjectRelateType.' + ProjectRelateType['后续'])
                            }
                        }
                    })
            })
    }

    /* ----------------------------绑定画布拖拽放大缩小事件------------------------  */
    function addBodyMouseOn() {
        chart.svg().attr('style', 'cursor:pointer')

        const zoomHandler = chart.getZoomHandler()

        zoomHandler.scaleExtent([minScale, maxScale]).on('end', () => {
            moving.value = false
        })

        //wheel.zoom设为null,可以禁用滚动缩放

        /**手动计算以画布中心缩放 */
        // manualZoom.value = function (type) {
        //     const { x, y, k } = d3.zoomTransform(chart.svg().node())
        //     // 以中心点缩放
        //     const centerX = chart.width() / 2
        //     const centerY = chart.height() / 2
        //     let factor
        //     if (type === 'add') {
        //         factor = 1.25
        //     } else {
        //         factor = 0.8
        //     }
        //     const newK = k * factor

        //     const newX = (x - centerX) * factor + centerX
        //     const newY = (y - centerY) * factor + centerY
        //     chart.svg().transition().call(zoomHandler.transform, d3.zoomIdentity.translate(newX, newY).scale(newK))
        // }
        /**使用scaleTo以画布中心缩放 */
        manualZoom.value = function (type) {
            // 以中心点缩放
            const centerX = chart.width() / 2
            const centerY = chart.height() / 2
            let factor
            if (type === 'add') {
                factor = 1.25
            } else {
                factor = 0.8
            }

            chart.svg().transition().call(zoomHandler.scaleBy, factor, [centerX, centerY])
        }

        //缩放scale到1，并移动指定点位到中心
        manualPosition.value = function ({ x, y }) {
            const cx = chart.width() / 2
            const cy = chart.height() / 2

            // 目标：把 g 的缩放设为 1，并让 (x, y) 映射到画布中心 (cx, cy)
            const target = d3.zoomIdentity
                .translate(cx - x, cy - y) // 先平移（以 k=1 的坐标系）
                .scale(1) // 缩放为 1

            chart.svg().transition().call(zoomHandler.transform, target)
        }
    }
    function addMouseOn() {
        addNodeMouseOn()

        addBodyMouseOn()
    }

    /* ----------------------------绑定tick事件------------------------  */
    function addForceTick() {
        force.on('tick', function () {
            chart
                .body()
                .selectAll('line')
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y)

            chart
                .body()
                .selectAll('g.line-text-box > text')
                .attr('x', (d) => (d.source.x + d.target.x) / 2)
                .attr('y', (d) => (d.source.y + d.target.y) / 2)
                .attr('transform', (d) => {
                    // const x = '90deg'
                    const centerX = (d.source.x + d.target.x) / 2
                    const centerY = (d.source.y + d.target.y) / 2
                    const dx = d.source.x - d.target.x
                    const dy = d.source.y - d.target.y
                    let deg = 0
                    if (dx === 0) {
                        deg = dy > 0 ? -90 : 90
                    } else {
                        deg = (Math.atan(dy / dx) * 180) / Math.PI
                    }
                    return `rotate(${deg},${centerX},${centerY})`
                })

            chart
                .body()
                .selectAll('g.node-box')
                .attr('transform', (d) => {
                    return `translate(${d.x},${d.y})`
                })
        })
        force.on('end', () => {
            chart.zoomToFit()
        })
    }

    chart.render = function () {
        renderTitle()

        renderNodes()

        renderLinks()

        renderLinkTexts()

        addMouseOn()

        addForceTick()

        initNodeSelect()
    }

    chart.render()
}

function initNodeSelect() {
    d3.select('#node-box' + originId.value)
        .node()
        .dispatchEvent(new MouseEvent('click'))
}
</script>

<style lang="scss">
.link-tool {
    width: 40px;
    right: 24px;
    bottom: 24px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
}

.link-popover-box {
    .el-form-item {
        margin-bottom: -4px;
    }
    .el-form-item__label {
        color: $gray-6;
    }
}
// '#FFCD2A', '#BEE3FF', '#E7E7E7'
.node-box[color='#FFCD2A'] {
    :hover {
        color: #ffc300;
    }
}
.node-box[color='#BEE3FF'] {
    :hover {
        color: #a6d9ff;
    }
}
.node-box[color='#E7E7E7'] {
    :hover {
        color: #d6d6d6;
    }
}
</style>
