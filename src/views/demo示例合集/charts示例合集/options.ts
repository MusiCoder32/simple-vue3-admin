import * as echarts from 'echarts'
export const lineOption = ref({
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
            data: [],
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
})
export const barOption = ref({
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
})
export const pieOption1 = ref({
    color: ['#3974C7', '#E9EEF3'],
    series: [
        {
            name: '同比增长',
            type: 'pie',
            radius: [60, 80],
            avoidLabelOverlap: false,
            emphasis: {
                disabled: true,
            },
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
})
export const pieOption2 = ref({
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
})
export const pieOption3 = ref({
    series: [
        {
            type: 'pie',
            radius: [10, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8,
            },
            data: [],
        },
    ],
})
export function createHKMapOption(mapName) {
    return {
        title: {
            text: 'Population Density of Hong Kong （2011）',
            subtext: 'Data from Wikipedia',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)',
        },

        visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered'],
            },
        },
        series: [
            {
                name: '香港18区人口密度',
                type: 'map',
                map: mapName,
                label: {
                    show: true,
                },
                data: [],
                // 自定义名称映射
                nameMap: {
                    'Central and Western': '中西区',
                    Eastern: '东区',
                    Islands: '离岛',
                    'Kowloon City': '九龙城',
                    'Kwai Tsing': '葵青',
                    'Kwun Tong': '观塘',
                    North: '北区',
                    'Sai Kung': '西贡',
                    'Sha Tin': '沙田',
                    'Sham Shui Po': '深水埗',
                    Southern: '南区',
                    'Tai Po': '大埔',
                    'Tsuen Wan': '荃湾',
                    'Tuen Mun': '屯门',
                    'Wan Chai': '湾仔',
                    'Wong Tai Sin': '黄大仙',
                    'Yau Tsim Mong': '油尖旺',
                    'Yuen Long': '元朗',
                },
            },
        ],
    }
}
export function createChinaMapOption(mapName) {
    return {
        title: {
            text: 'THE REPUBLIC OF CHINA',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}',
        },
        series: [
            {
                name: 'CHINA',
                type: 'map',
                map: mapName,
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
}
