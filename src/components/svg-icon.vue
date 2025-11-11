<template>
    <div style="width: 1em; height: 1em; display: inline-flex">
        <svg aria-hidden="true" class="svg-icon">
            <use :xlink:href="'#icon-' + name" />
        </svg>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
})
</script>
<style>
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
}
</style>
