<template>
    <component :is="type" class="Title" :style="{ fontStyle: italic ? 'italic' : 'common' }">
        {{ $t(title) }}
    </component>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    title: {
        type: String,
        default: 'common.titleName',
    },
    type: {
        type: String,
        default: 'h3',
    },
    italic: Boolean,
})
</script>
<style lang="scss" scoped>
.Title {
    font-weight: 600;
}
</style>
