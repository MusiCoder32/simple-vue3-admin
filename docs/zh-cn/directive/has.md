---
title: v-has(权限控制)
outline: [2, 3]
---

# v-has权限控制指令

通过将后端返回的权限列表，整理组装到vue-router对象的meta属性中，在渲染页面时，与v-has中传递的权限数据进行对比实现

## 示例

```vue
<el-button v-has="'add'">
        新增
    </el-button>
```

## 指令源码



1. 在`menus.vue`中初始化菜单时，在vue-router对象中，为每个路由的`meta`属性组装该路由的权限集合`permissions`
2. 在指令的`mounted`阶段，获取传入的权限参数
3. 判断`permissions`中是否有传入的权限参数
4. 当不具备该权限时，设置元素的`display`属性为`none`

```ts
app.directive('has', {
    mounted: function (el, binding) {
        const { value } = binding
        if (typeof value !== 'string' || value === '') {
            return
        }
    
        const permissions: any[] = (router.currentRoute.value.meta.permissions as any[]) || []
        let permission
        for (let i = 0; i < permissions.length; i++) {
            const item = permissions[i]
            if (item.path === value) {
                permission = item
                break
            }
        }
        if (!permission) {
            el.style.display = 'none'
        }
    },
})
```


