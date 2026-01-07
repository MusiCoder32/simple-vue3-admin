<template>
    <div grid="~ cols-3 gap-2" class="children:(border-(~ gray-2 solid) rounded-1) p2 bg-white">
        <forceBase class="aspect-square" />
        <forceLinkArrow :model-value="321" class="aspect-square" />
        <barBase class="aspect-square" />
        <mapBase class="aspect-square" />
        <mapLayer class="aspect-square" />
    </div>
</template>
<script setup>
import forceBase from '@/d3/force/base.vue'
import forceLinkArrow from '@/d3/force/link-arrow.vue'
import barBase from '@/d3/bar/base.vue'
import mapBase from '@/d3/map/base.vue'
import mapLayer from '@/d3/map/layer.vue'
</script>
