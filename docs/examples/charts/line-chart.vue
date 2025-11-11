<template>
    <div class="p-20px h-[300px] w-full bg-white">
        <simple-chart class="h-full w-full text-[1rem]" :options="lineOption" :data="data" />
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import SimpleChart from '../../../src/components/simple-chart/simple-chart.vue'

const data = ref([])
const lineOption = {
    legend: {
        data: ['在处理', '新受理', '结案'],
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 30,
        textStyle: {
            fontSize: '1em',
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
    },
    grid: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            boundaryGap: true,
            axisLabel: {
                fontSize: '1em',
            },
            axisTick: {
                show: false,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: '单位：个',
            nameGap: 20,
            scale: true,
            axisLabel: {
                fontSize: '1em',
            },
            nameTextStyle: {
                fontSize: '1em',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    color: '#9EB3C8',
                    width: 1,
                    dashOffset: 0,
                },
            },
        },
    ],
    series: [
        {
            name: '在处理',
            type: 'line',
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgb(152, 193, 250)' },
                    { offset: 1, color: 'rgb(152, 193, 250, 0)' },
                ]),
            },
            emphasis: {
                focus: 'series',
            },
            lineStyle: {
                color: '#3974C7',
            },
            itemStyle: {
                color: '#3974C7',
            },
            data: [],
        },
        {
            name: '新受理',
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(249, 171, 36, 0.3)' },
                    { offset: 1, color: 'rgba(249, 171, 36, 0)' },
                ]),
            },
            smooth: true,
            emphasis: {
                focus: 'series',
            },
            lineStyle: {
                color: '#F9AB24',
            },
            itemStyle: {
                color: '#F9AB24',
            },
            data: [],
        },
        {
            name: '结案',
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgb(140, 224, 183)' },
                    { offset: 1, color: 'rgba(139, 224, 183, 0)' },
                ]),
            },
            smooth: true,
            emphasis: {
                focus: 'series',
            },
            lineStyle: {
                color: '#26BF75',
            },
            itemStyle: {
                color: '#26BF75',
            },
            data: [],
        },
    ],
}

onMounted(() => {
    data.value = [
        [10, 12, 21, 54, 260, 830, 710],
        [30, 182, 434, 791, 390, 30, 10],
        [1320, 1132, 601, 234, 120, 90, 20],
    ]
})
</script>

<style lang="scss" scoped></style>
