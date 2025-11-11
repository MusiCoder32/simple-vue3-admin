---
title: PDF导出
outline: [2, 3]
sort: 5
---

# 浏览器自带打印功能实现PDF导出

## 概述

项目使用浏览器提供了`window.print()`方法，可以调起系统的打印对话框。用户可以选择"另存为`PDF`"选项将内容保存为`PDF`文件。这种方法无需第三方库，直接使用浏览器原生功能，适用于大多数现代浏览器。

## 操作流程

```mermaid
graph LR
    A[某需要导出的页面] -- 点击导出预览 -->B[预览页面]
    B -- 导出PDF --> C[打印对话框]
    B -- 退出预览 --> A
    C -- 打印 --> D[执行打印]
    D --> F[结束]
    C -- 取消 --> B
```

## 基本用法

| 方法 | 说明 |
| --- | --- |
| utils.exportPdfPreview | 调用此方法实现到处预览功能;若存在非表单引擎生成结构，可传入参数，参数与`document.querySelector`方法的参数一致。 |

## 常见问题

该方案能够得到高质量`PDF`，能够保留完整的`HTML`页面样式，但通常会面临以下问题

1. 横向页面内容显示不全
2. 纵向页面中间部分内容显示不全
3. 长页面中，只能显示前面少许页面
4. 分页异常

## 核心要点

1. 提供一个PDF预览页面，选中最外层的一个div元素作为容器元素，在预览页面中，设置容器元素宽度为A4纸宽度`width:210mm`，保证在容器横向范围内可见
2. 计算在当前宽度布局下，容器内全部元素所需要的页面高度`Height`，重设容器高度为`Height`，即不能出现纵向滚动条
3. 当出现分页异常或者中间内容显示不全时，需重设该部分元素某些父元素的`display`为`block`，如需将el-table中的`.el-table__inner-wrapper`布局从`flex`改为`block`

::: tip utils.exportPdfPreview方法的本质就是借助js与css，针对特定布局的页面，实现上述3个要点。当不满足时，请按核心要点排查
 :::


复杂列表页中集成了导出PDF功能，点击前往 [**查看示例代码**](./merge-excel-list.md)

## 示例用法

```vue
<template>
    // ... 需要导出的页面
    <el-button @click="exportPreviewHandle">导出预览</el-button>
</template>
<script>
async function exportPreviewHandle() {
    $loading.open()
    await utils.exportPdfPreview()
    $loading.close()
}
</script>
```

::: warning 特别注意在本项目中此方法需保证导出页面含有`print-alert`组件，此组件为预览页面的顶部功能栏。

-   表单引擎组件`simple-form`自带有；
-   其他未使用此组件的需要自行加上。:::
