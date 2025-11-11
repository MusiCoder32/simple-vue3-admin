<template>
    <el-alert
        v-bind="{ ...$attrs }"
        :title="$t(title)"
        :description="$t(description)"
        :class="$attrs.class"
        :style="$attrs.style" />
</template>

<script setup>
import { ElAlert } from 'element-plus'
defineProps({
    title: String,
    description: String,
})
</script>

<style></style>
