<template>
    <div class="p-20px h-[400px] w-full bg-white">
        <simple-chart class="w-full" :options="ChinaMapOption" :mapData="{ name: 'China', data: ChinaGeoJson }" />
    </div>
</template>
<script lang="ts" setup>
import ChinaGeoJson from '../../../src/views/demo示例合集/charts示例合集/data/China.json'
import SimpleChart from '../../../src/components/simple-chart/simple-chart.vue'

const ChinaMapOption = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}',
    },
    series: [
        {
            name: 'CHINA',
            type: 'map',
            map: 'China',
            roam: true,
            label: {
                // show: true,
                fontSize: 10,
                color: '#333',
            },
            itemStyle: {
                areaColor: '#7fbbf7ff',
                borderColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#FFFFFF' },
                        { offset: 1, color: '#A9A9A9' },
                    ],
                },
                borderWidth: 1,
                borderType: 'solid',
            },
            emphasis: {
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#FFD700',
                    shadowOffsetX: 1,
                    shadowOffsetY: 1,
                },
            },
            data: [],
        },
    ],
}
</script>

<style lang="scss" scoped></style>
