<template>
    <DragItem :data="list" />
</template>
<script setup lang="tsx">
import Draggable from 'vuedraggable-es'
import { copyItems, deleteItem, changeItems } from '../index.ts'
import FormItem from '../form-item.vue'
import { omit } from 'lodash'

const emit = defineEmits('add', 'select')
const props = defineProps({
    list: null,
})

const hoverId = ref()
const current = inject('$current')
const schema = inject('$schema')

const rightBottomActions = [
    {
        icon: 'copy',
        handle: (element) => {
            schema.value.items = copyItems(schema.value.items, element.designKey)
        },
    },
    {
        icon: 'delete',
        handle: (element) => {
            schema.value.items = deleteItem(schema.value.items, element.designKey)
        },
    },
]

function DragItem({ data }) {
    return (
        <Draggable
            style={{ 'min-height': '150px' }}
            class=""
            list={data}
            group={{ name: 'formDesign', pull: true, put: true }}
            itemKey="name"
            chooseClass="choose"
            ghostClass="ghost"
            dragClass="drag"
            handle=".canvas-move"
            animation={300}
            onAdd={() => add()}
            scrollSensitivity={1}>
            {{
                item({ element }) {
                    return element.designKey ? designFormItemFn(element) : null
                },
            }}
        </Draggable>
    )
}

function designFormItemFn(element) {
    const { label, name, component, props, children, designKey, hideLabel, required, style, help, hidden } = element
    const canvasItemClass = {
        'canvas-item': true,
        active: designKey === current.value?.designKey,
        hover: designKey === hoverId.value,
        mask: designKey === hoverId.value && !children,
    }

    return (
        <div
            class={canvasItemClass}
            onClick={(e) => {
                e.stopPropagation()
                handleSelect(element)
            }}
            onMouseMove={(e) => {
                e.stopPropagation()
                handleHoverEnter(designKey)
            }}
            onMouseLeave={(e) => {
                e.stopPropagation()
                handleHoverLeave()
            }}>
            {designKey === current.value?.designKey && (
                <div className="actions-left-top">
                    <div className="canvas-move" size="small" type="primary">
                        <svg-icon name="form-engine-move" />
                    </div>
                </div>
            )}

            {hidden && (
                <div className="hidden-ico">
                    <svg-icon name="form-engine-hidden" />
                </div>
            )}

            {designKey === current.value?.designKey && (
                <ul className="actions-right-bottom">
                    {rightBottomActions.map(({ icon, handle }) => (
                        <li
                            key={icon}
                            onClick={(e) => {
                                e.stopPropagation()
                                handle(element)
                            }}>
                            <svg-icon name={`form-engine-${icon}`} />
                        </li>
                    ))}
                </ul>
            )}

            <FormItem {...element} props={checkProps(props)} hidden={false} design={true} />
        </div>
    )
}

function handleHoverEnter(id) {
    hoverId.value = id
}

function handleHoverLeave() {
    hoverId.value = ''
}

function handleSelect(element) {
    current.value = element
}

function add() {
    schema.value.items = changeItems(schema.value.items)
    emit('add')
}

function checkProps(props) {
    return omit(props, ['multiple', 'autoSelectedFirst', 'api'])
}
</script>
