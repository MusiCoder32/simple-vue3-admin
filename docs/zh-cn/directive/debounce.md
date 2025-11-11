---
title: v-debounce(防抖)
outline: [2, 3]
---

# v-debounce防抖指令

相较于使用js封装的方式，使用起来更加方便高效

stopImmediatePropagation调用后，会阻止该dom元素下，**后续注册的其他回调事件**

默认防抖时间为`500ms`

::: tip
vue3中，自定义指令先于默认指令执行，故@click中注册的事件，会晚于v-debounce中注册的事件
:::

## 示例

<div class="color-blue mb5 cursor-pointer select-none"  v-debounce="2000" @click="clickHandle">点击测试</div>
<textarea class="w-full" placeholder="防抖演示，持续点击会发现输入框仅首次点击变更内容，间隔两秒以上点击才会再次变更内容" :value="value"></textarea>

<script setup>
    import {ref} from 'vue'
    const value = ref('')
    function clickHandle(){
        value.value +='-- |'
    }
</script>

```vue

<div 
    class="color-blue mb5 cursor-pointer select-none"  
    v-debounce="2000" 
    @click="clickHandle">
        点击测试
    </div>
<textarea :value="value" placeholder="防抖演示，持续点击会发现输入框仅首次点击变更内容，间隔两秒以上点击才会再次变更内容"></textarea>

<script setup>
    import {ref} from 'vue'
    const value = ref('')
    function clickHandle(){
        value.value +='-- |'
    }
</script>
```

## 指令源码
``` ts
     app.directive('debounce', {
            mounted: (el, binding) => {
                let debounceTime = binding.value
                if (!debounceTime) {
                    debounceTime = 500
                }
                let timer
                el.addEventListener(
                    'click',
                    (event) => {
                        if (!timer) {
                            timer = setTimeout(() => {
                                timer = null
                            }, debounceTime)
                        } else {
                            event && event.stopImmediatePropagation()
                            clearTimeout(timer)
                            timer = setTimeout(() => {
                                timer = null
                            }, debounceTime)
                        }
                    },
                    true,
                )
            },
        })
         
```


## el-button组件防抖原理

element-ui利用了button、input等原生表单元素的`disable`属性，当`loading`时，给原生 button, input, select 等元素加上 `disabled` 属性，浏览器会自动阻止用户与该元素的交互
