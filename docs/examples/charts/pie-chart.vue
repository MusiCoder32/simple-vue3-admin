<template>
    <div class="p-20px h-[300px] w-full bg-white" flex="~ row justify-evenly gap-5">
        <div class="relative h-full w-full">
            <simple-chart :options="pieOption1" :data="data" />
            <div class="p-center text-center">
                <div class="font-600 mb2 text-[1.5rem] leading-[1.5rem] text-[#212E44]">中间</div>
                <div class="text-[1rem] leading-[1rem] text-[#3A4A64]">我在中间</div>
            </div>
        </div>
        <div class="h-full w-full">
            <simple-chart :options="pieOption2" :data="data" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SimpleChart from '../../../src/components/simple-chart/simple-chart.vue'

const data = ref()
const pieOption1 = {
    series: [
        {
            name: '同比增长',
            type: 'pie',
            radius: [60, 80],
            avoidLabelOverlap: false,
            padAngle: 5,
            label: {
                show: false,
                position: 'center',
            },
            labelLine: {
                show: false,
            },
            data: [],
        },
    ],
}
const pieOption2 = {
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
}

onMounted(() => {
    data.value = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
    ]
})
</script>

<style lang="scss" scoped></style>
