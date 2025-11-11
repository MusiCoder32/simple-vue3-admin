---
title: 简介
outline: [2, 3]
sort: 1
---

# Simple Vue3 Admin 是什么？

**Simple Vue3 Admin**是一个基于`Vue3`与`Vite`构建的轻量级Web管理端框架模板。它摒弃冗余功能，聚焦核心需求，提供简洁直观的代码结构和模块化设计，便于快速开发与自定义扩展，适用于从基础到复杂程度不等的管理后台项目。

使用到的技术栈`Vue3` `Vite` `Element Plus` `Unocss` `Pinia` `Vue Router` 

## TypeScript

虽然框架中使用了`TypeScript`，但仅用于公共方法与核心组件的关键类型标注，其他模块保持`TS`文件格式以充分利用`enum`语法特性(非常爱`enum`)。

通过多个项目实践表明，在常规代码中编写TS类型往往收效甚微，且降低开发效率、增加新手门槛。因此，本框架秉持“若无必要，不写类型”的核心理念。

::: tip 建议在`VS Code`中关闭`TypeScript`校验
将 `"typescript.validate.enable": false,` 添加到设置中即可禁用TS报错提示。
:::

## 图标

### Element-Plus图标

::: warning
`Element-Plus`图标全量引入会导入大量无用图标，而自动导入的配置和使用又较为复杂，且会为图标添加`ep`前缀。
:::

在本框架中通过`import()`函数按需加载`Element Plus`图标库，再统一注册为`Vue`的全局组件。配置步骤：只需将项目所需的`Element Plus`图标名称添加至`iconArr`数组即可。

::: details 点我查看代码
```js
//src/configs/ep-icons.ts
const iconArr = ['Edit', 'Search', 'EditPen', 'Plus', 'Delete', 'Close', 'ArrowDown', 'User']

export function epIcons(app) {
    iconArr.forEach(async (item) => {
        const { [item]: IconComponent } = await import('@element-plus/icons-vue')
        app.component(item, IconComponent)
    })
}
```
:::

### SVG图标

因SVG图标具备体积小、无损缩放和灵活配色三大核心优势。本框架所有设计稿图标/图片均采用SVG格式。

新增的图标放置在该路径`src/assets/images/`下方，通过`vite-plugin-svg-icons`插件自动生成图标名称，通过自定义组件`src/components/svg-icon.vue`使用。

**配置方法**
::: details 点我查看代码
```ts
// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig((envObj) => {
    const { mode, command } = envObj
    const { PORT, VITE_PROXY_TARGET } = loadEnv(mode, process.cwd(), '')

    const plugins = [
        // ...
        createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/images')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__',
        }),
        // ...
    ]
    return {
        plugins,    
    }
})
```
:::

**使用方法**
::: details 点我查看代码
```vue
<!-- name与svg文件名相同，font-size控制图标大小，color控制图标颜色 -->
<svg-icon class="p-center f60 danger-color" name="home" />
```
:::


## 自动导入

本框架已在`vite.config.ts`中配置如下自动导入方案。使用下方内容时，无需再使用`import`手动导入。
- `vue`
- `pinia`
- `vue-router`
- `useI18n`
- `dayjs`
- `element-plus`组件
- `src/components`
- `utils/index.ts`

::: details 点我查看代码
<<< ../../../vite.config.ts#AutoImport{2,9,10,11,13,17,18,31}
:::

::: warning 需要注意
在`JSX/TSX`文件中，`Element Plus`组件的自动导入可能失效，此时需手动导入所需组件。
:::

### 自定义自动导入

除已自动导入的模块外，若项目中仍存在大量需手动导入的模块，可通过`customResolver`自定义自动导入逻辑。

::: details 点我查看代码
<<< ../../../vite.config.ts#customResolver{3}
:::

::: danger 需要注意
变量名应避开`customResolver`中的匹配正则，否则将引发错误自动导入致使运行时报错。
:::

## mock相关

框架模板中已配置好mock，并引入[simple-proxy-mock](https://www.npmjs.com/package/simple-mock-proxy)抓取后端接口数据。

::: details 点我查看代码
<<< ../../../vite.config.ts#mockProxy{4}
:::

## 全局loading

### 使用方式

::: details 点我查看代码
```ts
$loading.open()
//...
$loading.close()
```
:::

### 样式修改

若需要修改全局`loading`的样式，可在`/index.html`中，调整以下部分代码

::: danger 需要注意
灰色区域的`id="full-screen-loading-self"`一定要保留！！！
:::

::: details 点我查看代码
<<< ../../../index.html#loading{2}
:::
