---
title: v-throttle(节流)
outline: [2, 3]
---

# v-throttle节流指令

相较于使用js封装的方式，使用起来更加方便高效

stopImmediatePropagation调用后，会阻止该dom元素下，注册的其他回调事件

默认节流时间为`1000ms`

## 示例

<div class="color-blue mb5 cursor-pointer select-none"  v-throttle="2000" @click="clickHandle">点击</div>

<textarea class="w-full" placeholder="节流演示，持续点击会发现输入框每两秒变更内容" :value="value"></textarea>


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
    v-throttle="2000"
    @click="clickHandle" placeholder="节流演示，持续点击会发现输入框每两秒变更内容">
        点击测试
</div>
<textarea :value="value"></textarea>

<script setup>
    import {ref} from 'vue'
    const value = ref('')
    function clickHandle(){
        value.value +='-- |'
    }
</script>

```

## 指令源码

```ts
app.directive('throttle', {
    mounted: (el, binding) => {
        let throttleTime = binding.value
        if (!throttleTime) {
            throttleTime = 1000
        }
        let timer
        el.addEventListener(
            'click',
            (event) => {
                if (!timer) {
                    timer = setTimeout(() => {
                        timer = null
                    }, throttleTime)
                } else {
                    event && event.stopImmediatePropagation()
                }
            },
            true,
        )
    },
})
```
