<template>
    <div class="relative h-full w-full">
        <div :id="id" class="h-full w-full"></div>

        <div id="company-info-modal" class="company-info-modal absolute z-30 p-1" style="display: none">
            <div v-ell class="color-white">{{ currentMarker.name }}</div>
            <div class="p-a close-white" style="right: 14px; top: 13px" @click="closeTeamModal"></div>
        </div>
        <svg class="hidden">
            <filter
                x="-3.4%"
                y="-7.9%"
                width="106.6%"
                height="115.9%"
                filterUnits="objectBoundingBox"
                id="point-map-filter">
                <feGaussianBlur stdDeviation="12" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                <feComposite
                    in="shadowOffsetInner1"
                    in2="SourceAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    result="shadowInnerInner1"></feComposite>
                <feColorMatrix
                    values="0 0 0 0 0.349019608   0 0 0 0 0.57254902   0 0 0 0 0.866666667  0 0 0 1 0"
                    type="matrix"
                    in="shadowInnerInner1"></feColorMatrix>
            </filter>
        </svg>
    </div>
</template>
<script lang="ts" setup>
import * as topojson from 'topojson'
import topoData from './geo/china_topo.json'

import Chart from '@/d3/chart.ts'

let projection

const currentMarker = ref({
    name: '',
})
const id = 'd3_svg_' + Math.floor(new Date().getTime() * Math.random())
const iconWidth = 3

onMounted(() => {
    initMap()
})
async function initMap() {
    const config = {
        id,
        margins: { top: 0, left: 0, bottom: 0, right: 0 },
        textColor: 'black',
        title: '多图层地图',
        hoverColor: 'white',
    }
    const chart = new Chart(config)

    /* ----------------------------尺度转换------------------------  */
    const boxLatLng = topojson.bbox(topoData)
    const center: [Number, Number] = [(boxLatLng[0] + boxLatLng[2]) / 2, (boxLatLng[1] + boxLatLng[3]) / 2]

    /* ----------------------------准备数据------------------------  */

    // 获取最外层轮廓路径的 GeoJSON
    const geo_border = topojson.merge(topoData, topoData.objects.geo.geometries)

    // 获取不包含最外层轮廓的其余边界路径的 GeoJSON，得到的是一个单一的路径，不存在边界重叠问题
    const geo_interiors = topojson.mesh(topoData, topoData.objects.geo, (a, b) => a !== b)

    //获取每个区域（省、市、区等）的独立 GeoJSON 数据
    const geoData = topojson.feature(topoData, topoData.objects.geo)

    //获取每个区域（省、市、区等）的独立 GeoJSON 数据
    const handleData = geoData.features

    // 获取边界值对应的投影中的xy
    projection = d3
        .geoMercator()
        .rotate([0, 0, 0])
        .angle(0)
        .center(center)
        .fitExtent(
            [
                [10, 10],
                [chart.width() - 10, chart.height() - 10],
            ],
            geoData,
        )

    /* ----------------------------定义过滤器 ------------------------  */

    /* ----------------------------渲染地图轮廓------------------------  */

    let mapTop

    //第一层（最底层），各区域面积，这一层仅仅渲染区域颜色，不包含边框
    chart.mapArea = function (y, opacity) {
        const path = d3.geoPath().projection(projection)

        let mapArea = mapTop
            .append('g')
            .attr('transform', `translate(0,${y})`)
            .attr('opacity', `${opacity}`)
            .selectAll('path')
            .data(handleData)
            .enter()

        mapArea
            .append('path')
            .attr('class', (d) => 'provinces ' + d.properties.name)
            .merge(mapArea)
            .attr('d', path)
            .attr('stroke', 'none')
            .attr('fill', '#0C2A55')
        mapArea
            .append('path')
            .attr('class', (d) => 'provinces ' + d.properties.name)
            .merge(mapArea)
            .attr('d', path)
            .attr('stroke', 'none')
            .attr('fill', 'black')
            .attr('filter', 'url(#point-map-filter)')

        mapArea
            .append('path')
            .attr('class', (d) => 'provinces ' + d.properties.name)
            .merge(mapArea)
            .attr('d', path)
            .attr('stroke', '#5992DD')
            .attr('stroke-width', 1)
            .attr('opacity', 1)
            .attr('fill', 'none')
        mapArea.exit().remove()
    }
    // 第二层，内部边界线路径
    chart.mapInterior = function () {
        const path = d3.geoPath().projection(projection)

        let mapInterior = mapTop.append('g').append('path').datum(geo_interiors)

        mapInterior.attr('d', path).attr('stroke', '#5992DD').attr('stroke-width', 1).attr('fill', 'none')
    }
    // 绘制第三层最外圈轮廓线
    chart.mapOutline = function () {
        const path = d3.geoPath().projection(projection)

        let mapOutline = mapTop.append('g').append('path').datum(geo_border)

        mapOutline
            .attr('class', 'layer-outline ')
            .merge(mapOutline)
            .attr('d', path)
            .attr('stroke', '#5992DD')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
    }
    // 绘制第四层交互层
    chart.mapOverlays = function () {
        const path = d3.geoPath().projection(projection)

        let mapOverlays = mapTop
            .append('g')
            .selectAll('g')
            .data(handleData)
            .enter()
            .append('g')
            .attr('class', (d) => 'mapOverlays-' + d.properties.name)
            .classed('pointer', false)
            .classed('mapOverlays', true)
            .attr('opacity', 0)

        mapOverlays
            .append('path')
            .merge(mapOverlays)
            .attr('d', path)
            .attr('fill', 'rgba(252,174,99,1)')
            .attr('stroke', 'rgba(255,153,0,1)')
            .attr('stroke-width', 2)
        mapOverlays
            .append('path')
            .merge(mapOverlays)
            .attr('d', path)
            .attr('fill', 'black')
            .attr('stroke', 'none')
            .attr('filter', 'url(#point-map-filter)')

        mapOverlays.exit().remove()
    }
    chart.renderTop = function () {
        mapTop = chart.body().append('g').attr('class', 'map-top')
        chart.mapArea(8, 0.5)
        chart.mapArea(7, 0.5)
        chart.mapArea(6, 0.5)
        chart.mapArea(5, 0.5)
        chart.mapArea(4, 0.6)
        chart.mapArea(3, 0.7)
        chart.mapArea(2, 0.8)
        chart.mapArea(1, 0.9)
        chart.mapArea(0, 1)
        chart.mapInterior()
        chart.mapOutline()
        chart.mapOverlays()
    }
    /* ----------------------------渲染省市中心点------------------------  */
    chart.renderCenter = function () {
        let iconArr = chart
            .body()
            .selectAll('map-icon')
            .data(geoData.features)
            .enter()
            .append('g')
            .attr('color', (d, i) => {
                return '#00ffff'
            }) // 给enter添加自身元素
            .attr('class', (d, i) => 'map-icon-' + i)
            .classed('map-icon', true)
            .classed('pointer', true)
            .attr('transform', (d) => {
                let centroid = d3.geoCentroid(d)
                let position = projection(centroid)
                return `translate(${position[0]},${position[1]})`
            })

        iconArr
            .append('circle')
            .attr('fill', (d, i) => d3.schemeSet2[i % 8])
            .attr('cx', iconWidth)
            .attr('cy', iconWidth)
            .attr('r', iconWidth)
            .attr('transform', `translate(${-iconWidth},${-iconWidth})`)
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
        d3.selectAll('.map-icon')
            .on('click', function (d) {})
            .on('mouseenter', function (d) {
                openIconModal(d)
            })
            .on('mouseleave', function (d) {
                closeTeamModal(d)
            })

        d3.selectAll('.mapOverlays')
            .on('mouseenter', function (d) {
                openIconModal(d)
            })
            .on('mouseleave', function (d) {
                closeTeamModal(d)
            })
    }

    chart.render = function () {
        chart.renderTitle()

        chart.renderTop()

        chart.renderCenter()
        chart.addMouseOn()
        chart.setZoom()
    }

    chart.render()
}

function openIconModal(d) {
    d3.select('.mapOverlays-' + d.properties.name).attr('opacity', 1)

    let centroid = d3.geoCentroid(d)
    let position = projection(centroid)
    d3.select('#company-info-modal').attr('style', `left:${position[0]}px;top:${position[1]}px;display:block`)

    currentMarker.value.name = d.properties.name
}

function closeTeamModal(d) {
    d3.select('.mapOverlays-' + d.properties.name).attr('opacity', 0)
    d3.select(`#company-info-modal`).node().style.display = 'none'
}
</script>
<style lang="scss" scoped>
.company-info-modal {
    position: absolute;
    height: 30px;
    background: linear-gradient(360deg, #0d2649, rgba(39, 72, 115, 0.7) 98%);
    border: 1px solid #ff9900;
    display: none;
    pointer-events: none; //设置后，鼠标经过弹窗，不会影响svg图层的鼠标事件，即一个dom元素设置该属性后，不会再遮挡其他元素的鼠标事件
}
.close-white {
    width: 26px;
    height: 26px;
    background: url('/src/assets/imgs/105.png') no-repeat center / 62%;
}
</style>
