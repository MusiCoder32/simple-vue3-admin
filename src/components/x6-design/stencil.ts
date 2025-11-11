import { Graph } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import task from '@/assets/task.png'
import start from '@/assets/start.png'
import condition from '@/assets/condition.png'

const ports = {
    groups: {
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            group: 'top',
        },
        {
            group: 'right',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
    ],
}

// 开始节点
Graph.registerNode(
    'custom-start',
    {
        inherit: 'rect',
        width: 100,
        height: 30,
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'image',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            rect: {
                width: 100,
            },
            body: {
                stroke: 'rgb(210, 214, 220)',
                strokeWidth: 1,
                fill: '#ffffff',
            },
            image: {
                'xlink:href': start,
                width: 16,
                height: 16,
                x: 7,
                y: 7,
            },
            label: {
                ref: 'body',
                y: 0,
                refX: 30,
                textAnchor: 'left',
                fill: 'black',
                fontSize: 12,
            },
        },
        ports: { ...ports },
    },
    true,
)
// 结束节点
Graph.registerNode(
    'custom-end',
    {
        inherit: 'rect',
        width: 100,
        height: 30,
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'image',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            rect: {
                width: 100,
            },
            body: {
                stroke: 'rgb(210, 214, 220)',
                strokeWidth: 1,
                fill: '#ffffff',
            },
            image: {
                'xlink:href': task,
                width: 16,
                height: 16,
                x: 7,
                y: 7,
            },
            label: {
                ref: 'body',
                y: 0,
                refX: 30,
                textAnchor: 'left',
                fill: 'black',
                fontSize: 12,
            },
        },
        ports: { ...ports },
    },
    true,
)

// 任务节点
Graph.registerNode(
    'custom-task',
    {
        inherit: 'rect',
        width: 100,
        height: 30,
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'image',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            rect: {
                width: 100,
            },
            body: {
                stroke: 'rgb(210, 214, 220)',
                strokeWidth: 1,
                fill: '#ffffff',
            },
            image: {
                'xlink:href': task,
                width: 16,
                height: 16,
                x: 7,
                y: 7,
            },
            label: {
                ref: 'body',
                y: 0,
                refX: 30,
                textAnchor: 'left',
                fill: 'black',
                fontSize: 12,
            },
            customText: {
                name: '',
                value: '',
            },
        },
        ports: { ...ports },
    },
    true,
)

export default function initStencil(id, graph) {
    const stencil = new Stencil({
        title: '工具栏',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 240,
        collapsable: true,
        groups: [
            {
                title: '通用工具',
                name: 'group1',
                graphHeight: 1000,
            },
        ],
        layoutOptions: {
            columns: 1,
            columnWidth: 120,
            rowHeight: 55,
        },
    })
    const taskNode = graph.createNode({
        shape: 'custom-task',
        attrs: {
            label: {
                text: '审批节点',
            },
        },
    })

    const startNode = graph.createNode({
        shape: 'custom-start',
        attrs: {
            label: {
                text: '开始',
            },
        },
    })

    const endNode = graph.createNode({
        shape: 'custom-end',
        attrs: {
            label: {
                text: '结束',
            },
        },
    })
    stencil.load([startNode, taskNode, endNode], 'group1')
    document.getElementById(id).appendChild(stencil.container)
}
