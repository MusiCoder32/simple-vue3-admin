---
title: simple-layer
outline: [2, 3]
---

# simple-layer组件使用说明

基于el-dialog封装的弹窗表单组件，可通过与[simple-table](../guide/normal-list.md)组件配合使用，快速实现新增、编辑、查看弹窗，如[基本示例](../guide/normal-list.md)，亦可单独作为弹窗组件使用

## 基本用法

通过columns指定弹窗中表单组件 <demo vue="docs/examples/simple-layer/base.vue" />

## API

### 属性

| name    | 说明                                  | 类型       | 默认值 |
| :------ | :------------------------------------ | :--------- | :----- |
| columns | 设置表单项                            | ColumnType | --     |

### ColumnType

| name        | 说明                                           | 类型           | 默认值 |
| :---------- | :--------------------------------------------- | :------------- | :----- |
| title       | 列标题                                         | String         | --     |
| dataIndex   | 列字段名                                       | String         | --     |
| formItem    | 配置表单组件（同simple-table中的表单组件配置） | `FormItemType` | --     |
| layerHidden | 不渲染在弹窗中(仅在列表区域或者查询区域中)     | Boolean        | false  |

### FormItemType

| name | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type | 表单组件名,如ElInput、ElSelect或自定义组件 | Component | -- |
| opts | 所传入组件自身支持的各属性与方法,注意传入组件事件需加on前缀，如onClick代表原有的@click事件 | object | -- |
| value | 表单组件默认值 | object | -- |
| layerRules | 弹窗表单rules，参考element-plus中的FormRules写法 | FormRules | -- |
| layerSort | 字段顺序 | number | -- |
| col | 指定表单项占据一行的比例 | number | -- |
| required | 设置表单是否必填 | boolean | -- |

::: warning opts对象中额外支持一个slots属性，用于具备插槽功能的表单组件渲染插槽，参考示例中的下拉组件

::: 

### 对外提供属性与方法

| 事件/属性名称 | 说明                                                              |
| ------------- | ----------------------------------------------------------------- |
| add           | 打开新增弹窗，表单组件处于可编辑状态，接受一个`LayerType`对象参数 |
| edit          | 打开编辑弹窗，表单组件处于可编辑状态，接受一个`LayerType`对象参数 |
| look          | 打开查看弹窗，表单组件处于可编辑状态，接受一个`LayerType`对象参数 |
| update        | 更新表单数据，接受一个object参数，采用Object.assign方式更新表单   |
| close         | 关闭弹窗                                                          |

### LayerType

| name | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 弹窗标题 | String | 对应开启弹窗的add、edit、look三种方法，标题默认值分别为”新增“，”编辑“，”查看“ |
| col | 整体设置表单内组件占据一行的比例，优先级低于FormItemType中的col属性 | Number | 2 |
| model | 设置弹窗中表单默认值，优先级高于FormItemType中的value属性 | Object | -- |
| idKey | 用于后端更新数据接口中定义的id字段名 | Object | id |

### 支持事件

| 事件 | 说明 | 类型 |
| --- | --- | --- |
| confirm | 弹窗确认按钮事件 | (formModel,type) => void ，formModel为表单值，type值由开启开启弹窗的add、edit、look三种方法决定，分别为”add“，”update“，”look“ |
| close | 关闭弹窗 | () => void |

::: tip confirm事件结合[Axios封装中的最佳实践](../method/request.md#最佳实践)，可得到如下极简代码，实现对接后端的新增与编辑接口

```js{3} 
import { formsApi as httpApi } from '@/api/forms'
async function confirmHandel(data, type) {
    await httpApi[type](data)
    layerRef.value.close()
}
```

:::

### 支持插槽

| name    | 说明             |
| ------- | ---------------- |
| default | 渲染在表单前内容 |
| after   | 渲染在表单后内容 |
