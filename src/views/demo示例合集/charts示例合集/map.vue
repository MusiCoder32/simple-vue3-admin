<template>
    <div class="p-20px w-full bg-white">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="Hong Kong" name="1">
                <div class="h-[400px] w-full">
                    <simple-chart
                        class="w-full"
                        ref="HKMapRef"
                        :options="HKMapOption"
                        :data="HKData"
                        :mapData="{ name: 'HK', data: HKGeoJson }" />
                </div>
            </el-collapse-item>
            <el-collapse-item title="China" name="2">
                <div class="h-[400px] w-full">
                    <simple-chart
                        class="w-full"
                        ref="ChinaMapRef"
                        :options="ChinaMapOption"
                        :data="ChinaData"
                        :mapData="{ name: 'China', data: ChinaGeoJson }" />
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script lang="ts" setup>
import HKGeoJson from './data/HK.json'
import ChinaGeoJson from './data/China.json'
import { createHKMapOption, createChinaMapOption } from './options'

const HKMapOption = createHKMapOption('HK')
const ChinaMapOption = createChinaMapOption('China')

const activeNames = ref(['1', '2'])
const HKMapRef = ref()
const ChinaMapRef = ref()
const HKData = ref()
const ChinaData = ref([])

onMounted(() => {
    HKData.value = [
        { name: '中西区', value: 20057.34 },
        { name: '湾仔', value: 15477.48 },
        { name: '东区', value: 31686.1 },
        { name: '南区', value: 6992.6 },
        { name: '油尖旺', value: 44045.49 },
        { name: '深水埗', value: 40689.64 },
        { name: '九龙城', value: 37659.78 },
        { name: '黄大仙', value: 45180.97 },
        { name: '观塘', value: 55204.26 },
        { name: '葵青', value: 21900.9 },
        { name: '荃湾', value: 4918.26 },
        { name: '屯门', value: 5881.84 },
        { name: '元朗', value: 4178.01 },
        { name: '北区', value: 2227.92 },
        { name: '大埔', value: 2180.98 },
        { name: '沙田', value: 9172.94 },
        { name: '西贡', value: 3368 },
        { name: '离岛', value: 806.98 },
    ]
    // ChinaData.value = []
})
</script>

<style lang="scss" scoped></style>
