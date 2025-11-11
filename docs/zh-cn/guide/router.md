---
title: 路由-菜单-权限控制
outline: [2, 3]
sort: 6
---

# 路由、菜单、权限

对框架的路由进行设计时，完全基于菜单管理与权限控制的需要，几者间强关联性，请仔细阅读

## 相关概念

1. 路由`Vue Router 4`

    **是什么：** 决定了哪个**组件**（即页面内容，如demo.vue）对应哪个**URL**（如/demo）<br> **技术栈：** 我们使用`Vue Router 4`（专为`Vue 3`设计）<br> **核心文件：** `src/router/index.ts`

2. 菜单`Menu`

    **是什么：** 是用户看到的可视化导航结构（通常是侧边栏或顶栏），点击菜单项会改变URL，从而触发路由切换页面。<br> **技术栈：** 我们使用`Element Plus`的`el-menu` 组件。<br> **核心文件：** `src/views/menus.vue`

3. 权限`Permissions`

    **是什么：** 一套规则系统，用于控制用户能看到哪些菜单和能访问哪些路由（页面）。<br> **如何表示：** 用户登录后，后端会返回一个权限列表。 <br>**核心思想：** 前端控制显隐，后端校验权限。

4. 页面缓存`keep-alive`

    **是什么：** `Vue`的内置组件，用来保留组件状态或避免重新渲染，从而优化页面切换性能。<br> **如何实现：** 在布局组件（`src/views/index.vue`）中，用`<keep-alive>`包裹可能被销毁和重新创建的需要缓存的动态组件。

## 关联文件

| 文件路径 | 作用 |
| --- | --- |
| /src/route/index | 1、创建路由，设定路由为`hash`模式还是`history`模式<br>2、初始化无需权限管理的路由数据<br>3.设置路由beforeEach和afterEach回调事件 |
| /src/route/router-map.ts | 1、创建路由地址与组件映射表`routerMap`<br>2、设置仅在`开发环境`下显示的示例代码`demoMenus` |
| /src/views/index.vue | 1、`列表页面主入口文件`，各菜单页面均挂载在此处`RouterView`组件下 <br>2、页面缓存`keep-alive`逻辑处理 |
| /src/views/tag-nav.vue | 1、`菜单访问历史记录`，可实现菜单刷新、关闭等操作 |
| /src/views/system/menus/index.vue | 1、`管理数据库中菜单及按钮数据`,与后端接口交互<br>2、支持同级菜单拖动排序 |
| /src/views/system/roles/index.vue | 1、`角色管理`，管理某个角色具备的菜单及按钮权限<br>2、支持同级菜单拖动排序 |
| /src/views/App.vue | 1、`获取用户具备的菜单数据`，存入`usersStore`中 |
| /src/views/menus.vue | 1、`处理用户菜单数据与router-map.ts中定义的数据`，得到提供给左侧el-menus的菜单数据和提供给Vue Router的路由数据 |

## 核心逻辑

### 菜单权限控制

1. 在router-map中生成`路由path`与vue组件文件的对应关系对象`routerMap`，数据结构如下
    ```ts
    /**可采用这种原始写法，虽笨但直观，维护时，通过路由能快速找到对应文件，可以采用源码中采用vite提供的import.meta.glob方法，一次性导入所有模块*/
    const routerMap = {
        '/xxxA':()=>import('/src/xxxA.vue')
        '/xxxB':()=>import('/src/xxxB.vue')
    }
    ```
2. 根据routerMap，通过`/src/views/system/menus.vue`页面，将菜单信息写入数据库
3. 在角色管理页面，勾选每个角色可访问菜单
4. 在用户登录时，后端返回该用户所有可访问的菜单数据产`userMenus`，在`/src/utils/menu.ts`中对比处理`routerMap`与`userMenus`，生成最终的路由数据，利用`router.addRoute`方法，动态添加进路由对象中，这样用户只能访问具备权限的路由页面
5. 第4步会同时生成`el-menu`菜单组件需要的数据，生成左侧菜单

### 页面局部区域/按钮权限控制逻辑

1. 菜单权限控制逻辑的第2步中，将对应菜单下的权限按钮一同写入数据库，`父id`为`菜单id`
2. 菜单权限控制逻辑的第3步中，勾选角色可访问菜单时，一同`勾选菜单下的权限按钮`
3. 菜单权限控制逻辑的第4步中，创建路由时，根据权限按钮的`父id`，将权限按钮的数据，写入对应路由下`route.meta.permissions`属性中
4. 通过自定义指令`v-has`，在组件的mounted阶段，对比`v-has`中定义的按钮权限，是否在当前路由`route.meta.permissions`属性中，若不存在，则设置`el.style.display = 'none'`，隐藏页面局部区域/按钮
5. 同`v-has`，`v-disabled`指令会设置`el.style.opacity = '0.6'`，同时`阻止点击事件`，实现`disabled效果`

### 浏览器刷新页面

刷新后需要保留当前访问路径但不保留路径中参数1.在src/route/index.ts中，配置router对象的beforeEach事件，在该事件中，记录了当前访问页面的路由地址

```ts
// 追踪重定向来源,若发生链式重定向（A → B → C），redirectedFrom始终指向最初触发重定向的路由
// 此处用于在刷新等情形下，保留上一次携带的参数
//路径中有中文时，会被自动编码，故需要使用decodeURIComponent转回中文
if (to.redirectedFrom) {
    sessionStorage.setItem('historyRouter', decodeURIComponent(to.redirectedFrom.fullPath))
} else if (to.meta.title) {
    //菜单页面路由在menu.vue中初始化时，均会设置title属性
    sessionStorage.setItem('historyRouter', decodeURIComponent(to.fullPath))
} else {
    sessionStorage.removeItem('historyRouter')
}
```

2.  在`/src/views/menu.vue`的`setMenu`方法中，初始化`vue-router路由数据`及`el-menu菜单数据`时，会对比`sessionStorage.getItem('historyRouter')`，当用户具备历史路由权限时，跳转到历史路由，否则跳转到第一个具备权限的路由，详细逻辑见下方代码。

    ```ts
    /**
     * 注意事项：设置defaultRoute时，由于经过前端排序处理，可能与后端返回顺序不同，
     * 此时可根据项目实际情况，写死一个默认路由地址，保证在找不到历史路由情况下，能跳转到指定路由
     * 该指定路由一定是所有用户都有权限访问的页面
     */
    async function setMenus() {
        try {
            const data = cloneDeep(menuList.value)

            if (import.meta.env.MODE === 'development') {
                data.unshift(...demoMenus)
            }
            if (data?.length > 0) {
                const result = formatRouter(data)
                menus.value = result.menu
                pathLabelMap.value = result.pathLabelMap

                // 动态设置路由
                let defaultRoute = '/404' //目前仅生效于没有任何权限的情况
                for (let i = 0; i < result.router.length; i++) {
                    // 设置重定向，防止默认的重定向路径无权限
                    let item = result.router[i]
                    if (i === 0) {
                        defaultRoute = `${item.path}`
                        router.addRoute({
                            name: 'root',
                            path: '/',
                            component: () => import('./index.vue'),
                            redirect: defaultRoute,
                            children: [item],
                        })
                    } else {
                        router.addRoute('root', item)
                    }
                }

                //用于覆盖route.ts中已配置置的not-found路由
                //项目初始化时应该跳转到根/路径，这样才能进入到menu.vue中
                //进入到menu.vue进行重组路由后，此时让无法匹配的路由，跳转到404
                router.addRoute({
                    name: 'not-found',
                    path: '/:pathMatch(.*)*',
                    redirect: '/404',
                })
                // await router.push(sessionStorage.getItem('historyRouter') || defaultRoute) //保留url参数
                await router.push({ path: sessionStorage.getItem('historyRouter') || defaultRoute }) //不保留url参数
            }
        } catch (e) {
            console.log(e)
        }
    }
    ```

### 历史菜单栏选中菜单刷新同时保留参数

刷新后需要保留url中的参数，同时更新组件

1.  刷新回调事件中，执行以下逻辑，使用`NProgress`模拟加载效果，并抛出`change`事件到`/src/views/index.vue`，触发其中的`tagChange`方法
    ```ts
    NProgress.start()
    emits('change', tagArr.value, route.path)
    setTimeout(() => {
        NProgress.done()
    }, 1 * 1000)
    ```
2.  tagChange代码如下
    ```ts{7,8}
    function tagChange(tagArr, refreshPath) {
        const obj = {}
        tagArr.forEach((item) => {
            const key = item.path
            obj[key] = keepAliveInfo.value[key] ?? +new Date()
        })
        if (refreshPath) {
            obj[refreshPath] = +new Date()
        }
        keepAliveInfo.value = obj
    }
    ```
3.  主路由入口核心代码
    ```vue{5}
    <RouterView v-slot="{ Component, route }">
        <KeepAlive :include="keepAliveInclude">
            <component
                :is="Component"
                :key="keepAliveInfo[route.path]"></component>
        </KeepAlive>
    </RouterView>
    ```
4.  由2、3步的代码可知，更新`keepAliveInfo.value[refreshPath]`的值，通过`:key="keepAliveInfo[route.path]"`触发组件更新，至此实现当前菜单页面的刷新功能！

## 重要知识点

::: tip 

由于`keep-alive`的`include`属性依赖组件的`name`进行缓存判断，而在使用`setup`语法糖时，组件`name`会默认被设置为文件名。本项目中的单文件组件均自动生成`name`为`“index”`，导致无法通过`include`灵活控制缓存。手动为每个文件设置`name`则效率低下，并非理想方案。

查阅vue.js官网文档发现，可通过`RouterView`插槽，获取到组件实例`Component`，手动修改`Component`对象中的`name`属性，即可实现在`keep-alive`中精准控制组件缓存，具体代码如下。

```vue
<template>
    <!-- ... -->
    <RouterView v-slot="{ Component, route }">
        <!-- 可查看doc/重要逻辑说明.md文档第2点 -->
        <KeepAlive :include="keepAliveInclude">
            <component
                :class="isFull ? 'p-f tp0 lf0' : ''"
                :componentName="changeComponentName(Component)"
                :is="Component"
                :key="keepAliveInfo[route.path]"></component>
        </KeepAlive>
        <full-screen v-if="showFullScreenBtn" @fullScreenChange="fullScreenChangeHandle" />
    </RouterView>
    <!-- ... -->
</template>
<script lang="ts" setup>
// ...
function changeComponentName(com) {
    if (com?.type) {
        com.type.name = route.path
            .split('/')
            .filter((item) => item)
            .join('-')
    }
}
// ...
</script>
```

:::

