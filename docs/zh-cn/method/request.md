---
title: Axios封装
outline: [2, 3]
---

# 封装Axios作为整个项目的Request

最简单的axios封装，核心代码仅70余行，对外提供`get、post、put、del`四git个方法，参数类型如下

```ts
type RequestConfig = {
    url: string //接口地址
    data?: object //接口所需参数
    showError?: boolean //是否弹出错误消息提示
    otherConfig?: object //其他axios配置
}
```

>[!IMPORTANT] 后端返回接口格式需如下

```ts
type ResponseType  = {
    code:number
    data?:null | undefined | string | object
    message?:string
}
{
    data:200,
    data:[],
    message:'success'
}
```

## 示例

```js
import req from '@/api/request'

export function download(type) {
    return req.get({
        url: '/download'
        data,
        otherConfig: {
        //当下载文件类接口时，替换默认的responseType // [!code warning]
            responseType: 'blob',// [!code warning]
        },
    })
}

export function upload(data) {
    return req.post({
        url: '/upload',
        data,
        otherConfig: {
            headers: {
                //替换默认的Content-Type // [!code warning]
                'Content-Type': 'multipart/form-data', // [!code warning]
            },
        },
    })
}
export function getApi(data) {
    return req.get({
        url: '/getList',
        data,
    })
}
export function addApi(data) {
    return req.post({
        url: '/getList',
        data,
    })
}
export function updateApi(data) {
    return req.update({
        url: '/getList',
        data,
    })
}
export function delApi(data) {
    return req.del({
        url: '/getList',
        data,
    })
}
```

## 源码说明

注意源码中高亮部分，可按照实际项目情况进行调整

### 修改请求超时时间及修改请求路径前缀

<<< ../../../src/api/request.ts#config{2,5}

### 修改默认Content-Type

<<< ../../../src/api/request.ts#Content-Type{6,7}

### 针对后端情况，对response提前分类处理

::: tip 默认当后端返回数据对象中的`code`值为`200`时，将数据对象中的data值返回

:::

<<< ../../../src/api/request.ts#response{7,8}

### 集中处理接口报错

<<< ../../../src/api/request.ts#error{2,11,12}

### 最佳实践

> [!TIP] 提供一个ApiClass,文件路径/src/api/api-class.ts，需与后端沟通接口采用restful风格<br/>对应列表页中的增、删、改、查

<<< ../../../src/api/api-class.ts

1. **定义前端接口文件**

```ts
import req from './request'
import ApiClass from './api-class'

export const formsApi = new ApiClass('/forms')
formsApi.other = function (data) {
    return req.get({
        url: '/forms/other',
        data,
    })
}
```

2. **Vue文件中使用接口文件**

```ts
<script lang="tsx" setup>
import { formsApi as httpApi } from '@/api/forms'

//获取列表数据
async function getTableData(params) {
     tableData.value  =  await httpApi.get(params)
}
//新增submit(data,'add'),更新 submit(data,'update')
async function submit(data, type) {
    await httpApi[type](data)
}

// 删除
async function handleDel({ id }) {
    await httpApi.del({ id })
    ElMessage.success('成功')
}
```

### 完整代码

<<< ../../../src/api/request.ts
