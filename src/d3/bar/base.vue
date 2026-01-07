<template>
    <div :id="id"></div>
</template>

<script setup>
import Chart from '@/d3/chart.ts'
import * as d3 from 'd3'

const props = defineProps({
    id: {
        required: true,
        default: 'd3_svg_' + Math.floor(new Date().getTime() * Math.random()),
    },
    data: {
        required: true,
        default() {
            return [
                {
                    date: '2025-01',
                    value: 33,
                },
                {
                    date: '2025-02',
                    value: 13,
                },
                {
                    date: '2025-03',
                    value: 53,
                },
                {
                    date: '2025-04',
                    value: 83,
                },
                {
                    date: '2025-05',
                    value: 43,
                },
            ]
        },
    },
    width: {},
    height: {},
    modelValue: {},
})

watch(
    props.data,
    (value) => {
        initMap(value)
    },
    { deep: true },
)

onMounted(() => {
    initMap(props.data)
})
function initMap(data) {
    const config = {
        barPadding: 0.4,
        barColor: '#296FFF7F',
        textColor: '#303133',
        gridColor: 'gray',
        tickShowGrid: [60, 120, 180],
        title: '基础柱状图',
        hoverColor: '#296FFF',
        animateDuration: 1000,
    }

    const chart = new Chart({
        id: props.id,
        margin: { top: 16, left: 40, bottom: 40, right: 15 },
    })

    /* ----------------------------尺度转换------------------------  */
    chart.scaleX = d3
        .scaleBand()
        .domain(data.map((d) => d.date))
        .range([0, chart.getBodyWidth()])
        .padding(config.barPadding)

    const maxValue = d3.max(data, (d) => d.value)

    const minYMax = 5
    let yMax = Math.max(minYMax, maxValue)
    const numTicks = 5
    // d3.ticks会返回“理想等距”刻度，覆盖数据区间
    const ticks = d3.ticks(0, yMax, numTicks)
    const tickMax = ticks[ticks.length - 1]
    const tickDistance = ticks[1]
    // 获取最靠上的刻度（最大刻度）
    yMax = yMax > tickMax ? tickMax + tickDistance : tickMax

    chart.scaleY = d3.scaleLinear().domain([0, yMax]).range([chart.getBodyHeight(), 0]).nice()

    /* ----------------------------渲染柱形------------------------  */
    chart.renderBars = function () {
        const bars = chart.body().selectAll(`.${props.id}-bar`).data(data)

        bars.enter()
            .append('rect')
            .attr('class', `${props.id}-bar`)
            .classed('pointer', true)
            .merge(bars)
            .attr('x', (d) => chart.margin().left + chart.scaleX(d.date))
            .attr('y', chart.margin().top + chart.scaleY(0))
            .attr('width', chart.scaleX.bandwidth())
            .attr('height', 0)
            .attr('fill', config.barColor)
            .transition()
            .duration(config.animateDuration)
            .attr('height', (d) => chart.getBodyHeight() - chart.scaleY(d.value))
            .attr('y', (d) => chart.margin().top + chart.scaleY(d.value))

        bars.exit().remove()
    }

    /* ----------------------------渲染坐标轴------------------------  */
    chart.renderX = function () {
        const xTick = d3
            .axisBottom(chart.scaleX)
            .tickSize(5) //刻度线尺寸
            .tickPadding(10)
            .tickFormat((d) => {
                return parseInt(d)
            })
        const xAxis = chart
            .svg()
            .insert('g', '.body')
            .attr(
                'transform',
                'translate(' + chart.margin().left + ',' + (chart.margin().top + chart.getBodyHeight()) + ')',
            )
            .attr('class', 'xAxis')
            .call(xTick)

        // xAxis.select('path').remove() //移除坐标轴中的横线
        xAxis.selectAll('text').attr('opacity', 0.5).attr('style', 'font-size:8px')
    }

    chart.renderY = function () {
        const yTick = d3.axisLeft(chart.scaleY).ticks(numTicks).tickSize(5).tickPadding(10)
        const yAxis = chart
            .svg()
            .insert('g', '.body')
            .attr('transform', 'translate(' + chart.margin().left + ',' + chart.margin().top + ')')
            .attr('class', 'yAxis')
            .call(yTick)

        // yAxis.select('path').remove()
        yAxis.selectAll('text').attr('opacity', 0.5).attr('style', 'font-size:8px')
    }

    chart.renderAxis = function () {
        chart.renderX()
        chart.renderY()
    }

    /* ----------------------------渲染文本标签------------------------  */
    chart.renderText = function () {
        d3.select('.xAxis')
            .append('text')
            .attr('class', 'axisText')
            .attr('x', chart.getBodyWidth())
            .attr('y', 0)
            .attr('fill', config.textColor)
            .attr('dy', 22)
            .text('日期')

        d3.select('.yAxis')
            .append('text')
            .attr('class', 'axisText')
            .attr('x', 5)
            .attr('y', 20)
            .attr('fill', config.textColor)
            .attr('transform', 'rotate(-90)')
            .attr('dy', 0)
            .attr('text-anchor', 'end')
            .text('每日收入（元）')
    }

    /* ----------------------------渲染网格线------------------------  */
    chart.renderGrid = function () {
        d3.selectAll('.yAxis .tick').each(function () {
            d3.select(this) //d3的回调this会指向当前dom
                .append('line')
                .attr('class', 'grid')
                .attr('stroke', '#ecf4ff')
                .attr('stroke-width', '1px')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', chart.getBodyWidth())
                .attr('y2', 0)
        })
    }

    /* ----------------------------渲染图标题------------------------  */
    chart.renderTitle = function () {
        chart
            .svg()
            .append('text')
            .classed('title', true)
            .attr('x', chart.width() / 2)
            .attr('y', 0)
            .attr('dy', '2em')
            .text(config.title)
            .attr('fill', config.textColor)
            .attr('text-anchor', 'middle')
    }

    /* ----------------------------绑定鼠标交互事件------------------------  */
    chart.addMouseOn = function () {
        d3.selectAll(`.${props.id}-bar`)
            .on('mouseover', function (d, i) {
                const e = d3.event
                const position = d3.mouse(chart.svg().node())
                d3.select(e.target)
                    .transition()
                    .duration(config.animateDuration / 2)
                    .attr('fill', config.hoverColor)

                chart
                    .svg()
                    .append('text')
                    .classed('tip', true)
                    .attr('x', () => {
                        let x = position[0] + 15
                        if (i > props.dataLength / 2) {
                            x = position[0] - 15
                        }
                        return x
                    })
                    .attr('y', position[1] - 10)
                    .transition()
                    .duration(config.animateDuration / 2)
                    .attr('fill', config.textColor)
                    .text(d.date + ' 销量:' + d.value)
                    .attr('text-anchor', () => {
                        let textAnchor = 'start'
                        if (i > props.dataLength / 2) {
                            textAnchor = 'end'
                        }
                        return textAnchor
                    })
            })
            .on('mouseleave', function () {
                const e = d3.event

                d3.select(e.target)
                    .transition()
                    .duration(config.animateDuration / 2)
                    .attr('fill', config.barColor)

                d3.select('.tip').remove()
            })
            .on('mousemove', function (d, i) {
                const position = d3.mouse(chart.svg().node())
                d3.select('.tip')
                    .attr('x', () => {
                        let x = position[0] + 15
                        if (i > props.dataLength / 2) {
                            x = position[0] - 15
                        }
                        return x
                    })
                    .attr('y', position[1] - 10)
            })
            .on('click', function (d, i) {
                props.$emit('update:modelValue', i)
            })
    }

    chart.render = function () {
        chart.renderAxis()

        chart.renderText()

        chart.renderGrid()

        chart.renderBars()

        chart.addMouseOn()

        chart.renderTitle()
    }

    chart.render()
}
</script>

<style lang="scss" scoped></style>
