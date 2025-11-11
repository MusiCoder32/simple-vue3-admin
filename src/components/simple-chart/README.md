# simple-chart基本使用方法
## 普通图表 如：饼图、折线图、柱状图等
### 参数
- id: type: String 非必传 默认值 `echarts-${+new Date()}`
- options: type: Object 必传 与Echarts的option格式一致
- data: type: Array 必传 与Echarts中series的data一致 元素个数与series的元素个数一致
### 点击事件
-  clickChart
```
<div class="h-[400px]">
    <simple-chart class="w-full text-[1rem]" ref="lineRef" :options="lineOption" :data="lineData" @clickChart="clickChart"/>
</div>
```
- simple-chart的父元素必须有高度
## 地图
参数：比普通图表多一个mapData
- id: type: String 非必传 默认值 `echarts-${+new Date()}`
- options: type: Object 必传 与Echarts的option格式一致
- data: type: Array 必传 与Echarts中series的data一致 元素个数与series的元素个数一致
- mapData: type: Object 包含两个属性 
1. name[String 地图名称 与options中map属性值一致] 
2. data[地图数据]
```
<div class="h-[400px] w-full">
    <simple-chart
        class="w-full"
        ref="ChinaMapRef"
        :options="ChinaMapOption"
        :data="ChinaData"
        :mapData="{ name: 'China', data: ChinaGeoJson }" />
</div>
```