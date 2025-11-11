<template>
    <ElDivider v-bind="$attrs">
        <span class="fw700">{{ $t(title) }}</span>
    </ElDivider>
</template>

<script setup>
defineProps({
    title: String,
})
</script>

<style></style>
