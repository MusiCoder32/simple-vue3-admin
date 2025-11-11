---
title: simple-chart
outline: [2, 3]
---

# 图表快速开发示例

通过`simple-chart`组件统一管理页面中的图表，避免重复造轮子。

## 基础用法

### 饼图

<demo vue="docs/examples/charts/pie-chart.vue" />

### 折线图

<demo vue="docs/examples/charts/line-chart.vue" />

### 直方图

<demo vue="docs/examples/charts/bar-chart.vue" />

## 地图 

### `HongKong`(有数据源)

<demo vue="docs/examples/charts/HongKong-map.vue" />

### `China`(无数据源)

<demo vue="docs/examples/charts/China-map.vue" />

## `simple-chart` API

### 属性

| 属性名      | 说明                       | 类型 | 默认值 |
| -------- | ------------------------- | -------- | -------- |
| id  | 组件实例的唯一标识符 | `String` | `echarts-时间戳` |
| options  | 必传，图表配置项，可配置内容与Apache Echarts的option一致  | `Object` | {} |
| data  | 图表数据源,与Echarts中series的data一致。**元素个数与series的元素个数一致** | Array | [] |
| mapData  | 地图数据源，配置项type为map时必传。含两个属性： 1. name[String 地图名称 与options中map属性值一致] 2. data[地图数据]| Object | -- |

### 事件
|事件名      | 说明                       | 类型 |
| ----------- |--------------------------- | ------ |
| clickChart | 图表点击事件，参数与Apache Echarts一致 | `Function` |
