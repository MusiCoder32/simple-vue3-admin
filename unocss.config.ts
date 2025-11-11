import { defineConfig, presetUno, presetAttributify, transformerVariantGroup, transformerDirectives } from 'unocss'
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
    safelist: [],
    presets: [presetIcons(), presetUno(), presetAttributify(), transformerVariantGroup(), transformerDirectives()],
    rules: [],
    shortcuts: {
        ...generateFlexShortcuts(),
        'p-center': 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform',
    },
})

function generateFlexShortcuts() {
    const shortcuts = {}

    // 主轴类型映射
    const axisMap = {
        h: 'flex-row', // 水平主轴
        v: 'flex-col', // 垂直主轴
    }

    // 主轴对齐映射
    const mainAlignMap = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    }

    // 交叉轴对齐映射
    const crossAlignMap = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    }

    Object.keys(axisMap).forEach((axis) => {
        Object.keys(mainAlignMap).forEach((main) => {
            Object.keys(crossAlignMap).forEach((cross) => {
                const className = `${axis}-${main}-${cross}`
                const styles = ['flex', axisMap[axis], mainAlignMap[main], crossAlignMap[cross]].join(' ')

                shortcuts[className] = styles
            })
        })
    })

    return shortcuts
}
