<template>
    <div class="p-20px h-[300px] w-full bg-white" flex="~ row justify-evenly gap-5">
        <simple-chart class="w-full text-[1rem]" ref="barRef" :options="barOption" :data="data" />
    </div>
</template>

<script lang="ts" setup>
import SimpleChart from '../../../src/components/simple-chart/simple-chart.vue'

const data = ref()
const barOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [],
        },
    ],
}

onMounted(() => {
    data.value = [10, 52, 200, 334, 390, 330, 220]
})
</script>

<style lang="scss" scoped></style>
