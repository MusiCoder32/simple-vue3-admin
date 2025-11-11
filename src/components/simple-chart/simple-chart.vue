<template>
    <div ref="chartDom" class="h-full w-full" :id="id"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { cloneDeep, isEmpty } from 'lodash'

const props = defineProps({
    id: {
        type: String,
        default: `echarts-${+new Date()}`,
    },
    options: {
        type: Object,
        require: true,
        default: () => ({}),
    },
    data: {
        type: Array,
        // require: true,
        default: () => [],
    },
    mapData: {
        type: Object,
    },
})

const emits = defineEmits(['clickChart'])

const chartInstance = shallowRef(null)
const chartDom = ref()
const observer = ref()

const optionsAll = computed(() => {
    let result = cloneDeep(props.options)
    if (props.data && props.data.length > 0) {
        for (let i = 0; i < result.series.length; i++) {
            const item = result.series[i]
            //当传入的props.data子元素不为数组时,说明仅有一个series,直接props.data赋值给item.data
            if (Array.isArray(props.data[i])) {
                item.data = props.data[i]
            } else {
                item.data = props.data
            }
        }
    }
    return result
})

watch(
    () => optionsAll,
    () => {
        if (!isEmpty(optionsAll.value)) {
            chartInstance.value.setOption(optionsAll.value)
            chartInstance.value.hideLoading()
        } else {
            chartInstance.value.showLoading()
        }
    },
    { deep: true },
)

onMounted(() => {
    observer.value = new ResizeObserver(resizeHandler)
    observer.value.observe(chartDom.value)

    initCharts()
})

onActivated(() => {
    resizeHandler()
})

onBeforeUnmount(() => {
    observer.value.disconnect()
    if (chartInstance.value) {
        chartInstance.value.dispose()
        chartInstance.value = null
    }
})

// 初始化echart
function initCharts() {
    if (chartDom.value) {
        chartInstance.value = echarts.init(chartDom.value)
        if (props.mapData) {
            const { name, data } = props.mapData
            echarts.registerMap(name, data)
        }
        chartInstance.value.setOption(props.options)
        chartInstance.value.on('click', clickHandler)
    }
}
function clickHandler(params) {
    emits('clickChart', params)
    console.log('prarms', params)
}
function resizeHandler() {
    if (chartInstance.value) {
        chartInstance.value.resize()
    }
}

defineExpose({
    resizeHandler,
})
</script>

<style scoped></style>
