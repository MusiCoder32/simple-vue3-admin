<template>
    <div class="p10 relative">
        <el-button class="p-a" style="right: 10px; top: 15px" @click="drawerVisible = true">使用模板</el-button>
        <el-drawer v-model="drawerVisible" title="模板列表" size="60%" class="template-drawer" :append-to-body="false">
            <el-space wrap>
                <el-button :key="name" v-for="{ name, schema } in template" @click="useTemplate(schema)">
                    {{ name }}
                </el-button>
            </el-space>
        </el-drawer>

        <div v-for="{ title, children } in menus" :key="title">
            <h4 class="type-title">{{ title }}</h4>
            <draggable
                class="list"
                :list="children"
                :group="{ name: 'formDesign', pull: 'clone', put: false }"
                :sort="false"
                ghost-class="ghost"
                drag-class="drag"
                fallback-class="fallback"
                item-key="designKey">
                <template #item="{ element }">
                    <li class="form-item-btn">
                        <svg-icon class="f20" :name="'form-engine-' + element.icon" />
                        <div class="name">{{ element.name }}</div>
                    </li>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="tsx">
import draggable from 'vuedraggable-es'

import template from './template'

const simpleFormItems = inject('$simpleFormItems', null)

const menus = [
    {
        title: '基础字段',
        children: getChildren('basic'),
    },
    {
        title: '高级字段',
        children: getChildren('high'),
    },
    {
        title: '布局字段',
        children: getChildren('layout'),
    },
    {
        title: '功能字段',
        children: getChildren('assist'),
    },
]

const drawerVisible = ref(false)

const schema = inject('$schema', {})

const useTemplate = (templateSchema) => {
    schema.value = templateSchema
}

function getChildren(type) {
    return Object.values(simpleFormItems)
        .filter((item) => item?.type === type)
        .sort((a, b) => {
            return a.order - b.order
        })
}
</script>

<style lang="scss">
.template-drawer {
    position: absolute;
    text-align: center;
}
.el-overlay {
    // position: absolute;
}

.ghost,
.fallback,
.drag {
    list-style: none;
}

.type-title {
    margin-bottom: 10px;
    margin-top: 10px;
}
.list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
    }
    gap: 10px;
    width: 100%;
    padding-left: 0;
    .form-item-btn {
        list-style: none;
        padding: 5px 0px;
        cursor: move;
        border: 1px dashed transparent;
        transition: 0.3s all;
        &:hover {
            // border: 1px dashed var(--el-color-primary);
            box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
            color: var(--el-color-primary);
        }
        background-color: var(--el-color-primary-light-9);
        // display: flex;
        text-align: center;
        .ico {
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 20px;
            justify-content: center;
        }
        .name {
            font-size: 13px;
        }
    }
}
</style>
