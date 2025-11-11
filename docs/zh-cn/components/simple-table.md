---
title: simple-table
outline: [2, 3]
---

# simple-table组件使用说明

用于table列表页面，包含查询区域、普通列表、**行列合并、纯前端导出excel等功能** <br/> 其列表属性columns还能应用于新增、编辑表单，可查看[基本示例](../guide/normal-list.md)了解

1. [基本示例](../guide/normal-list.md)

## 基本用法

表格列通过`columns`指定，通过list属性传入表格数据 <demo vue="docs/examples/simple-table/base.vue" />

## 单选

设置属性`showRadio`为true <demo vue="docs/examples/simple-table/radio.vue" />

## 多选

设置属性`showCheckbox`为true <demo vue="docs/examples/simple-table/checkbox.vue" />

## getTableData属性

不配置list属性时，可通过配置`getTableData`属性，类型为`(params)=>{list:[]}`，使组件从getTableData的返回值中获取数据

> [!TIP] 当列表执行分页、查询、重置、页面缓存下再次激活页面时，均会自动调用getTableData方法，更新列表数据且提供initTable（页码重置为1）和renderTable两个方法，手动触发getTable方法

> [!IMPORTANT] getTableData中能获取到分页参数、查询区参数，以及手动执行initTable、renderTable时传入的对象参数，getTableData必须以对象{list:[]}形式返回列表数据

<demo vue="docs/examples/simple-table/get-table-data.vue" />

## 分页

设置`showPage`属性为true即可开启分页功能

> [!IMPORTANT] 当使用getTableData获取列表数据时，必须以{list:[],total:0}形式返回分页总数total

<demo vue="docs/examples/simple-table/show-page.vue" />

## 开启查询区域

设置columns列元素中的`formItem`属性开启列表上方查询区域

::: tip `queryHidden`设置为true时，会在查询区域隐藏该组件，该设计是为了统筹列表、查询、弹窗三者关系设计，可查看[基本示例](../guide/normal-list.md)源码进行了解

:::

<demo vue="docs/examples/simple-table/query.vue" />

## 行合并

设置columns列元素中的`merge`属性为true

> [!IMPORTANT] 需要将数据按merge的字段进行排序，如使用lodash的sortBy方法

<demo vue="docs/examples/simple-table/row-merge.vue" />

## 表头合并

通过columns列元素中的`children`属性实现

<demo vue="docs/examples/simple-table/header-merge.vue" />

::: tip 复杂行列合并，可以通过传入otherOptions.otherSpanMethod方法实现可查看[复杂列表页](../guide/merge-excel-list.md)中的示例

:::

## 导出excel

### 基本用法

设置`showExport`为true，会在表格右上方显示一个导出按钮，点击即可导出表格内容为excel

<demo vue="docs/examples/simple-table/excel/base.vue" />

### 使用Api导出

为simple-table配置`ref`，则可通过列表实例中的`exportExcel`方法导出excel

<demo vue="docs/examples/simple-table/excel/export.vue" />

### 勾选导出列

通过设置`showExportField`为true，可开启选择导出excel列功能

::: danger 注意：该功能无法应用在表头合并的表格！！！

:::

<demo vue="docs/examples/simple-table/excel/column.vue" />

### 勾选导出行

当设置`showCheckbox`为true，可勾选数据导出

<demo vue="docs/examples/simple-table/excel/row.vue" />

### 勾选导出行列

当同时设置`showCheckbox`与`showExportField`为true，可同时勾选行列数据导出

<demo vue="docs/examples/simple-table/excel/row-column.vue" />

### 自定义导出文件名

通过`excelFileName`自定义导出的文件名

<demo vue="docs/examples/simple-table/excel/file-name.vue" />

### 自定义导出excel列宽

通过`excelColInfo`自定义导出excel列宽

<demo vue="docs/examples/simple-table/excel/width.vue" />

## 嵌套表格

### 通过具名插槽`expand`实现

<demo vue="docs/examples/simple-table/expand-slot.vue" />

### 通过columnType为`expand`实现

<demo vue="docs/examples/simple-table/expand-type.vue" />

## 统计

### 小计

::: tip

1. 需在columns列元素中的某列中，设置`subTotalTitle`的值，该值为小计标题
2. 在columns列元素中的某列中，设置`subTotal`的值为true，可设置多个列元素

:::

<demo vue="docs/examples/simple-table/total/sub.vue" />

### 总计

::: tip

1. 需在columns列元素中的某列中，设置`grandTotalTitle`的值，该值为小计标题
2. 在columns列元素中的某列中，设置`subTotal`的值为true，可设置多个列元素

::: <demo vue="docs/examples/simple-table/total/grand.vue" />

### 小计-总计-单元格合并-导出excel

::: warning

:::

<demo vue="docs/examples/simple-table/total/all.vue" />

## API

### simple-table支持属性

| name | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| list | 用于传递tableData，优先于getTableData | Array | -- |
| columns | 设置表格列 | `ColumnType` | -- |
| getTableData | 获取表格数据的函数 | Function | - |
| showIndex | 是否展示索引列，默认是 | Boolean | true |
| showCheckbox | 是否展示选择框，默认否 | Boolean | false |
| reserveSelection | 是否翻页时保留已选择项 | Boolean | false |
| showRadio | 是否展示单选框，默认否 | Boolean | false |
| loading | 组件内部自动维护loading，当不满足要求是，可通过该属性开启loading，默认否 | Boolean | false |
| showPage | 是否展示分页组件，默认否 | Boolean | false |
| showAdd | 是否展示添加按钮，默认否 | Boolean | false |
| showExport | 是否展示导出 Excel 按钮，默认否 | Boolean | false |
| isInitData | 是否自动请求后台数据，默认是 | Boolean | true |
| isResetQuery | 组件销毁时是否清空查询区，默认否 | Boolean | false |
| otherOptions | 通过 `v-bind` 绑定的表格其他属性 | Object | - |
| selectedIds | 已选择的 ID 数组 | Array | - |
| selectedId | 已选择的单个 ID | String | - |
| select | 已选择的数据，与 `selection` 结合使用 | Array | - |
| page | 分页配置对象 | Object | - |
| pageLayout | 分页需要显示的东西，默认全部 | String | - |
| pageSizes | 分页大小选项数组 | Array | - |
| addBtnName | 新增按钮名称 | String | - |
| labelWidth | 查询区表单组件标题宽度 | String | - |
| indexWidth | 序号列宽度 | String | - |
| autoHeight | 表格默认高度是否按页面高度自适义，默认是 | Boolean | true |
| isDelayLoading | 是否需要延迟关闭loading效果，防止loading闪现，默认是 | Boolean | true |
| excelFileName | Excel 导出文件名 | Boolean | - |
| excelColInfo | Excel 导出列信息 | `ColInfo[]` | - |
| showExportField | 是否开启选择Excel 导出列功能 | Boolean | false |
| otherSpanMethod | 设置表格单元格合并逻辑 | ({row,column})=>[number,number] | - |

### simple-table对外提供属性与方法

| 事件/属性名称 | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| initTable     | 重新请求列表数据，并将当前页码置为1，接受一个对象作为补充的查询参数 |
| renderTable   | 重新请求列表数据，不改变页码，接受一个对象作为补充的查询参数        |
| exportExcel   | 导出表格数据为Excel                                                 |
| table         | 获取 `el-table` 实例，以调用 `el-table` 支持的各种方法              |
| tableData     | 获取列表数据                                                        |

### ColumnType属性

| name         | 说明                                                        | 类型           | 默认值 |
| :----------- | :---------------------------------------------------------- | :------------- | :----- |
| title        | 列标题                                                      | String         | --     |
| dataIndex    | 列字段名                                                    | String         | --     |
| formItem     | 配置查询区表单组件（同simple-layer中的表单组件配置）        | `FormItemType` | --     |
| queryIndex   | 查询区字段名，用于某些接口查询字段名与列表字段名不同的情况  | String         | --     |
| merge        | 该列是否执行单元格合并逻辑                                  | Boolean        | false  |
| tableHidden  | 不渲染在列表中(仅渲染在查询区域或者弹窗中)                  | Boolean        | false  |
| queryHidden  | 不渲染在查询区域中(仅在列表区域或者弹窗中)                  | Boolean        | false  |
| layerHidden  | 不渲染在弹窗中(仅在列表区域或者查询区域中)                  | Boolean        | false  |
| customRender | 自定义该列渲染逻辑                                          | function       | --     |
| columnType   | el-table-column的属性type，可选值selection / index / expand | String         | --     |
| columnAttr   | 以对象的形式绑定el-table支持的其他属性                      | Object         | --     |

### FormItemType

| name | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type | 表单组件名,如ElInput、ElSelect或自定义组件 | Component | -- |
| opts | 所传入组件自身支持的各属性与方法,注意传入组件事件需加on前缀，如onClick代表原有的@click事件 | object | -- |
| value | 表单组件默认值 | object | -- |

::: warning opts对象中额外支持一个slots属性，用于具备插槽功能的表单组件渲染插槽，参考 [开启查询区域](#开启查询区域)中的下拉组件，其写法可查询vue.js文档中的jsx插槽语法

:::

### FormItemType中查询区域专用属性

| name       | 说明        | 类型      | 默认值 |
| :--------- | :---------- | :-------- | :----- |
| queryRules | 查询区rules | FormRules | --     |
| querySort  | 字段顺序    | number    | --     |

### FormItemType中[弹窗表单专用属性](./simple-layer.md#formitemtype)

### 支持事件

| 事件           | 说明                              | 类型                   |
| -------------- | --------------------------------- | ---------------------- |
| add            | 设置showAdd为true后的新增按钮事件 | ()=>void               |
| selectChange   | 同el-table中的selectChange事件    | (row)=>void            |
| rowSelect      | 同el-table中的select事件          | (selection, row)=>void |
| selectAll      | 同el-table中的selectAll事件       | (selection)=>void      |
| checkboxSelect | 多选事件                          | (selection)=>void      |
| radioSelect    | 单选事件                          | (row)=>void            |
| expandChange   | 同el-table中的expand-change事件   | (row, expandedRow)     |

::: tip 由于el-table中的select与selectAll动作都是在进行勾选checkbox，进行多选操作，故同时抛出一个checkboxSelect做为多选事件

:::

### 支持插槽

| name         | 说明                                            |
| ------------ | ----------------------------------------------- |
| default      | 常用于从外部传于table列到尾部，常用于传入操作列 |
| beforeColumn | 常用于从外部传于table列到首部位置               |
| afterQuery   | 渲染在查询区与按钮区之间的内容                  |
| left         | 常用于在按钮区左侧的渲染额外按钮                |
| right        | 常用于在按钮区左侧的渲染额外按钮                |
| expand       | 用于渲染表格展开行内容，常用于嵌套子表格        |


