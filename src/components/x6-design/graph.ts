import { Graph, Shape } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'

export default function initGraph(id: string) {
    const graph = new Graph({
        container: document.getElementById(id),
        grid: {
            visible: true,
            type: 'dot',
            args: {
                color: '#a0a0a0', // 网点颜色
                thickness: 1, // 网点大小
            },
        },
        panning: true,
        autoResize: true,
        mousewheel: {
            enabled: true,
            zoomAtMousePosition: true,
            modifiers: 'ctrl',
            minScale: 0.5,
            maxScale: 3,
        },
        connecting: {
            router: 'manhattan',
            connector: {
                name: 'rounded',
                args: {
                    radius: 8,
                },
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowBlank: false,
            snap: {
                radius: 20,
            },
            createEdge() {
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#A2B1C3',
                            strokeWidth: 2,
                            targetMarker: {
                                name: 'block',
                                width: 12,
                                height: 8,
                            },
                        },
                    },
                    zIndex: 0,
                })
            },
            validateConnection({ targetMagnet }) {
                return !!targetMagnet
            },
        },
        highlighting: {
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#5F95FF',
                        stroke: '#5F95FF',
                    },
                },
            },
        },
    })

    // #region 使用插件
    graph
        .use(
            new Transform({
                resizing: true,
                rotating: true,
            }),
        )
        .use(
            new Selection({
                rubberband: true,
                showNodeSelectionBox: true,
            }),
        )
        .use(new Snapline())
        .use(new Keyboard())
        .use(new Clipboard())
        .use(new History())

    // #region 快捷键与事件
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.copy(cells)
        }
        return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.cut(cells)
        }
        return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
            const cells = graph.paste({ offset: 32 })
            graph.cleanSelection()
            graph.select(cells)
        }
        return false
    })

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
            graph.undo()
        }
        return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
            graph.redo()
        }
        return false
    })

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
            graph.select(nodes)
        }
    })

    // delete
    graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.removeCells(cells)
        }
    })

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
            graph.zoom(0.1)
        }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
            graph.zoom(-0.1)
        }
    })

    // 控制连接桩显示/隐藏
    function showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i += 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
    }

    graph.on('node:mouseenter', (e) => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body')
        // 不需要展示控制桩的节点
        const notControlPoint = []
        if (notControlPoint.includes(e.cell.shape)) {
            showPorts(ports, false)
            return
        }
        showPorts(ports, true)
    })

    graph.on('node:mouseleave', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, false)
    })

    // 边hover事件
    graph.on('edge:mouseenter', ({ edge }) => {
        const style = {
            line: {
                stroke: '#5F95FF',
                strokeWidth: 2,
            },
        }
        edge.attr(style)
    })
    graph.on('edge:mouseleave', ({ edge }) => {
        const style = {
            line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
            },
        }
        edge.attr(style)
    })

    return graph
}
