<template>
    <el-form
        class="canvas p5 relative grow"
        :style="`max-width: ${schema.formWidth}`"
        :label-position="schema.labelAlign"
        :size="schema.size"
        :label-suffix="schema.labelSuffix"
        hide-required-asterisk
        :disabled="schema.disabled">
        <div class="tip" v-if="!schema.items.length">
            <div class="text-7.5 mb4">
                <el-icon><Plus /></el-icon>
            </div>
            <div class="text">请从左侧拖拽字段来组成表单</div>
        </div>
        <DragItem style="padding-bottom: 80%" :list="schema.items" />
    </el-form>
</template>

<script setup lang="tsx">
import DragItem from './drag-item.vue'

const schema = inject('$schema')
</script>

<style lang="scss">
.canvas {
    border: 1px solid #c7c7c7;
    overflow-y: auto;
    overflow-x: hidden;
    .tip {
        color: #999;
        font-size: 18px;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 40%;
        transform: translateY(-50%);
    }

    .ghost {
        border-top: 5px solid rgb(248, 47, 47);
        list-style: none;
    }
    .canvas-item {
        width: 100%;
        border: 2px solid transparent;
        margin-bottom: 5px;
        padding: 10px;
        position: relative;
        z-index: 2;
        &::before {
            content: '';
            z-index: -1;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            border: 1px dashed #c0bdbd;
        }

        .actions-left-top {
            position: absolute;
            left: -1px;
            top: -1px;
            z-index: 20;
            background-color: var(--el-color-primary);
            .canvas-move {
                font-size: 16px;
                box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
                color: #fff;
                padding: 0 11px;
                line-height: 24px;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }
        }

        .hidden-ico {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 10;
            padding: 0px 5px;
            font-size: 13px;
            background-color: var(--el-color-primary);
            color: #fff;
        }
        .actions-right-bottom {
            position: absolute;
            right: 0;
            bottom: -1px;
            z-index: 20;
            color: #fff;
            list-style: none;
            padding: 1px;
            display: flex;

            li {
                padding: 2px 4px;
                background-color: var(--el-color-primary);
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
                margin-left: 3px;
                box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
                &:hover {
                    opacity: 0.7;
                }
            }
        }

        .default {
            border: 2px dashed var(--el-color-primary);
            margin: 10px;
            position: relative;
            padding: 5px;
            .title {
                position: absolute;
                left: 0;
                top: -20px;
                padding: 1px 5px;
                background-color: var(--el-color-primary);
                font-size: 12px;
                color: #fff;
                z-index: 10;
            }
        }

        .childContainer {
            min-height: 150px;
        }
    }

    .hover {
        border: 2px solid var(--el-color-primary-light-5);
        background-color: var(--el-color-primary-light-9);
    }

    .mask {
        &::before {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            content: '';
            background-color: transparent;
            z-index: 15;
        }
    }

    .active {
        border: 2px solid var(--el-color-primary) !important;

        &:hover {
            border: 2px solid var(--el-color-primary) !important;
        }
    }
}
</style>
