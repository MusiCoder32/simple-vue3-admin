export function validGraph(graphData) {
    if (graphData.cells.length === 0) {
        ElMessage.warning('当前流程未设置！')
        return false
    }
    const nodes = graphData.cells.filter((m) => m.shape != 'edge')
    const edges = graphData.cells.filter((m) => m.shape === 'edge')
    // 开始节点的数量已经结束节点的数量
    const beginNode = nodes.filter((n) => n.shape === 'custom-start')
    const endNode = nodes.filter((n) => n.shape === 'custom-end')
    // 开始节点作为边的source节点数量只能有一个
    // 审批节点的数量
    const taskNode = nodes.filter((n) => n.shape === 'custom-task')
    // 边的来源和目标相同的数量
    const errorEdge = edges.filter((e) => e.source.cell === e.target.cell)
    // 判断有无开始节点以及结束节点 且只能有一个开始节点以及结束节点
    // 边的来源和目标不能相同
    // 判断有无审批节点,必须至少有一个审批节点
    if (beginNode.length !== 1 || endNode.length !== 1 || taskNode.length === 0 || errorEdge.length > 0) {
        ElMessage.warning('当前流程设置有误，请检查！')
        return false
    }

    // 开始节点只能有输出边且必须有，结束节点只能有输入边且必须有
    // 开始节点的边不能直接指向结束节点
    // 审批节点只能有一条输出边
    // 开始节点的边只能有一条
    const beginEdges = edges.filter((m) => m.source.cell === beginNode[0].id)
    const beginTargetEdges = edges.filter((m) => m.target.cell === beginNode[0].id)
    const endEdges = edges.filter((m) => m.source.cell === endNode[0].id)
    const beginToEndEdges = edges.filter((m) => m.source.cell === beginNode[0].id && m.target.cell === endNode[0].id)

    // 审批节点只能 有一条输出边
    const nodeEdges = []
    let nodeParamsIsNull = false
    for (const node of taskNode) {
        const nodeEdge = edges.filter((edge) => edge.source.cell == node.id)
        if (nodeEdge.length > 1) {
            nodeEdges.push(true)
        } else {
            nodeEdges.push(false)
        }
        // if (!node.attrs.hasOwnProperty('customText')) {
        //     nodeParamsIsNull = true
        // }
    }
    const hasExistMultipleEdge = nodeEdges.filter((m) => m)
    if (
        beginEdges.length !== 1 ||
        beginTargetEdges.length !== 0 ||
        endEdges.length !== 0 ||
        beginToEndEdges.length !== 0 ||
        hasExistMultipleEdge.length > 0 ||
        nodeParamsIsNull
    ) {
        ElMessage.warning('当前流程设置有误，请检查！')
        return false
    }

    // 分支条件只有一个输入边，且边要有条件设置
    return true
}
export function toBpmn(graphData) {
    let bpmn = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_0kosu2f" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.19.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.20.0">
        <bpmn:process id="Process_file_approve_1" name="文件审批流程-0418-1" processType="None" isClosed="false" isExecutable="true" camunda:historyTimeToLive="180">`
    const nodes = graphData.cells.filter((m) => m.shape != 'edge')
    const edges = graphData.cells.filter((m) => m.shape === 'edge')
    for (const node of nodes) {
        if (node.shape === 'custom-start' || node.shape === 'custom-end') {
            // 开始或者结束
            if (node.attrs.label.text === '开始') {
                bpmn += `<bpmn:startEvent id="n${node.id}">
                <bpmn:outgoing>s${getEdgeId(node.id)}</bpmn:outgoing>
                </bpmn:startEvent>`
            } else {
                const inList = getInputEdgeTargets(node.id)
                let str = ''
                for (const inLine of inList) {
                    str += `<bpmn:incoming>s${inLine.id}</bpmn:incoming>`
                }
                bpmn += `<bpmn:endEvent id="n${node.id}">
            ${str}
            </bpmn:endEvent>`
            }
        } else if (node.shape === 'custom-task') {
            console.log(node.attrs?.customText?.value)
            if (node.attrs?.customText?.name) {
                const list = JSON.parse(node.attrs.customText.value).map((m) => {
                    return {
                        roleVariety: m.roleVariety,
                        roleList: m.roleList,
                    }
                })
                bpmn += `<bpmn:userTask id="n${node.id}">
                <bpmn:extensionElements>
                <camunda:inputOutput>
                    <camunda:inputParameter name="${node.attrs.customText.name}">
                        ${JSON.stringify(list)}
                    </camunda:inputParameter>
                </camunda:inputOutput>
                </bpmn:extensionElements>
                <bpmn:incoming>s${getEdgeTargetId(node.id)}</bpmn:incoming>
                <bpmn:outgoing>s${getEdgeId(node.id)}</bpmn:outgoing>
            </bpmn:userTask>`
            } else if (!getEdgeTargetId(node.id) && !getEdgeId(node.id)) {
                bpmn += `<bpmn:userTask id="n${node.id}">
                </bpmn:userTask>`
            } else if (getEdgeTargetId(node.id) && !getEdgeId(node.id)) {
                bpmn += `<bpmn:userTask id="n${node.id}">
                <bpmn:incoming>s${getEdgeTargetId(node.id)}</bpmn:incoming>
                </bpmn:userTask>`
            } else if (!getEdgeTargetId(node.id) && getEdgeId(node.id)) {
                bpmn += `<bpmn:userTask id="n${node.id}">
                <bpmn:outgoing>s${getEdgeId(node.id)}</bpmn:outgoing>
                </bpmn:userTask>`
            } else {
                bpmn += `<bpmn:userTask id="n${node.id}">
                <bpmn:incoming>s${getEdgeTargetId(node.id)}</bpmn:incoming>
                <bpmn:outgoing>s${getEdgeId(node.id)}</bpmn:outgoing>
                </bpmn:userTask>`
            }
        }
        //  else if (node.shape === 'custom-condition') {
        //     const conditionList = getConditionEdgeTargets(node.id)
        //     let str = ''
        //     for (let condition of conditionList) {
        //         str += `<bpmn:outgoing>s${condition.id}</bpmn:outgoing>`
        //     }
        //     bpmn += `<bpmn:exclusiveGateway id="n${node.id}">
        //             <bpmn:incoming>s${getEdgeTargetId(node.id)}</bpmn:incoming>
        //             ${str}
        //         </bpmn:exclusiveGateway>`
        // }
    }
    for (const edge of edges) {
        if (edge?.attrs?.condition?.value) {
            bpmn += `<bpmn:sequenceFlow id="s${edge.id}" name="${edge.labels[0]}" sourceRef="n${edge.target.cell}" targetRef="n${edge.target.cell}">
            <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${JSON.stringify(edge?.attrs?.condition?.value)}</bpmn:conditionExpression>
            </bpmn:sequenceFlow>`
        } else {
            bpmn += `<bpmn:sequenceFlow id="s${edge.id}" sourceRef="n${edge.source.cell}" targetRef="n${edge.target.cell}" />`
        }
    }
    bpmn += `</bpmn:process>
        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_file_approve_1">`

    for (const cell of nodes) {
        bpmn += `<bpmndi:BPMNShape id="n${cell.id}_di" bpmnElement="n${cell.id}">
                <dc:Bounds x="${cell.position.x}" y="${cell.position.y}" width="${cell.size.width}" height="${cell.size.height}" />
            </bpmndi:BPMNShape>`
    }
    for (const cell of edges) {
        bpmn += `<bpmndi:BPMNEdge id="s${cell.id}_di" bpmnElement="s${cell.id}">
                <di:waypoint x="210" y="118" />
                <di:waypoint x="210" y="165" />
            </bpmndi:BPMNEdge>`
    }
    bpmn += `</bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
        </bpmn:definitions>`

    // 获取输入的边数组
    function getInputEdgeTargets(targetId) {
        const edges = graphData.cells.filter((m) => m.shape === 'edge')
        const source = edges.filter((m) => m.target.cell === targetId)
        return source
    }

    function getEdgeTargetId(targetId) {
        const edges = graphData.cells.filter((m) => m.shape === 'edge')
        const source = edges.filter((m) => m.target.cell === targetId)
        if (source.length === 0) return
        return source[0].id
    }
    // 获取 输出的边数组
    function getConditionEdgeTargets(sourceId) {
        const edges = graphData.cells.filter((m) => m.shape === 'edge')
        const source = edges.filter((m) => m.source.cell === sourceId)
        return source
    }

    function getEdgeId(sourceId) {
        const edges = graphData.cells.filter((m) => m.shape === 'edge')
        const source = edges.filter((m) => m.source.cell === sourceId)
        if (source.length === 0) return
        return source[0].id
    }

    return bpmn
}
