<template>
    <div class="z8 br8 p-a v-between-center full-screen-btn no-print">
        <el-button type="info" text class="m0 p0 w-full" @click="fullScreenChange" style="height: 40px; color: #606266">
            <svg-icon class="f24" :name="isFull ? 'links-exit-full-screen' : 'links-full-screen'"></svg-icon>
        </el-button>
    </div>
</template>

<script setup>
import { fullScreenChange, isFullScreen } from '@/utils/general'

const isFull = ref(isFullScreen())
const emits = defineEmits('fullScreenChange')

onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onBeforeUnmount(() => {
    window.removeEventListener('fullscreenchange', handleFullscreenChange)
})

function handleFullscreenChange() {
    isFull.value = isFullScreen()
    emits('fullScreenChange', isFull.value)
}
</script>
<style>
.full-screen-btn {
    width: 40px;
    right: 40px;
    bottom: 80px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.1);
}
</style>
