<template>
    <form-item :design="false" v-for="item in formItems" :key="item.name" v-bind="item" />
</template>

<script setup>
import FormItem from './form-item.vue'

const props = defineProps({
    formItems: Array,
})
</script>
