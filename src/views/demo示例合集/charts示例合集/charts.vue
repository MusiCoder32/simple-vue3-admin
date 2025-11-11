<template>
    <div class="p-20px w-full bg-white">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="饼图" name="1">
                <div class="h-[400px] w-full" flex="~ row justify-evenly gap-5">
                    <template v-for="item in data" :key="item.id">
                        <div class="h-full flex-1" flex="~ col">
                            <div
                                class="h24"
                                bg="[linear-gradient(180deg,rgb(201,231,255)0%,rgb(255,255,255)100%)]"
                                flex="~ col justify-evenly items-center"
                                border="rounded-[10px]">
                                <p class="text-[1.5rem] font-bold">{{ item.value }}</p>
                                <p class="font-500 text-[1rem]">{{ item.label }}</p>
                            </div>
                            <div class="relative grow">
                                <simple-chart ref="pieRef" :options="item.option" :data="item.data" :id="item.id" />
                                <div v-if="item.id == 'doing'" class="p-center text-center">
                                    <div class="font-600 mb2 text-[1.5rem] leading-[1.5rem] text-[#212E44]">
                                        {{ item.rate + '%' }}
                                    </div>
                                    <div class="text-[1rem] leading-[1rem] text-[#3A4A64]">同比增长</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </el-collapse-item>
            <el-collapse-item title="折线图" name="2">
                <div class="h-[400px]">
                    <simple-chart class="w-full text-[1rem]" ref="lineRef" :options="lineOption" :data="lineData" />
                </div>
            </el-collapse-item>
            <el-collapse-item title="柱状图" name="3">
                <div class="h-[400px]">
                    <simple-chart class="w-full text-[1rem]" ref="barRef" :options="barOption" :data="barData" />
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import { pieOption1, pieOption2, pieOption3, lineOption, barOption } from './options'

const activeNames = ref(['1', '2', '3'])

const lineData = ref([])
const barData = ref([])

const pieRef = ref()
const lineRef = ref()
const barRef = ref()

const data = ref([
    { id: 'doing', label: '在处理', value: '1540', rate: '68', option: pieOption1, data: [] },
    { id: 'newDone', label: '新受理', value: '3584', rate: '75', option: pieOption2, data: [] },
    { id: 'finished', label: '结案', value: '48672', rate: '34', option: pieOption3, data: [] },
])

onMounted(() => {
    lineData.value = [
        [10, 12, 21, 54, 260, 830, 710],
        [30, 182, 434, 791, 390, 30, 10],
        [1320, 1132, 601, 234, 120, 90, 20],
    ]
    lineOption.value.xAxis[0].data = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']

    barData.value = [10, 52, 200, 334, 390, 330, 220]

    data.value[0].data = [{ value: 68 }, { value: 34 }]
    data.value[1].data = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
    ]
    data.value[2].data = [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' },
    ]
})
</script>

<style lang="scss" scoped></style>
