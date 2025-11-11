<template>
    <el-image-viewer v-if="showImage" @close="close" :url-list="[fileUrl]"></el-image-viewer>
    <div v-if="showVideo || showAudio" class="p-f h-center-center video-preview-box z3 h-full w-full" style="">
        <div v-if="showVideo" class="w60 relative">
            <video controls controlslist="nodownload" class="layer-video w-full" :src="fileUrl">
                {{ $t('message.videoBrowserTooltip') }}
            </video>
            <div @click="close" class="p-a tp0 rt0 p10">
                <el-icon color="white" size="20">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div v-if="showAudio" class="w60 relative">
            <audio controlslist="nodownload" class="layer-video w-full" :src="fileUrl" controls>
                {{ $t('message.audioBrowserTooltip') }}
            </audio>
            <div @click="close" class="p-a p10" style="top: -30px; right: -30px">
                <el-icon color="white" size="20">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
const props = defineProps({
    fileObj: Object,
    remove: null,
})

const pdfjsUrl = '/pdfjs/web/viewer.html?file=' // pdfjs文件地址

const fileUrl = ref()
const fileType = ref()

const showImage = ref(false)
const showVideo = ref(false)
const showAudio = ref(false)

onMounted(() => {
    open()
})

function stopDefault(e) {
    e.preventDefault() // 禁用右键菜单
}
function stopKeyboard(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
        // F12, Ctrl+Shift+I (Chrome DevTools), Ctrl+U (View Source)
        e.preventDefault()
    }
}

function setStop() {
    document.addEventListener('contextmenu', stopDefault)

    // 尝试阻止F12键按下
    document.addEventListener('keydown', stopKeyboard, false)
}
function removeStop() {
    document.removeEventListener('contextmenu', stopDefault)

    // 尝试阻止F12键按下
    document.removeEventListener('keydown', stopKeyboard)
}

async function open() {
    const { fileInstId = +new Date(), fileName, filePath, fileSize, creatorId, creatorName } = props.fileObj

    fileType.value = filePath.split('.').pop()
    if (['mp4', 'mp3'].includes(fileType.value)) {
        setStop()
        try {
            const res = await fileUploadApi.getFileUrl({ fileName: filePath })
            fileUrl.value = res
        } catch (e) {
            console.log(e)
            ElMessage.error($t('message.fileViewFail'))
        }
    }

    if (fileType.value === 'pdf' || fileType.value === 'PDF') {
        window.open(pdfjsUrl + encodeURIComponent(fileUrl.value))

        if (typeof props.remove === 'function') {
            props.remove()
        }
    }
    if (['mp4'].includes(fileType.value)) {
        showVideo.value = true
    } else if (['mp3'].includes(fileType.value)) {
        showAudio.value = true
    } else if (['png', 'jpeg', 'jpg'].includes(fileType.value)) {
        showImage.value = true
    } else {
        const params = { fileInstId, fileName, filePath, fileSize, creatorId, creatorName }
        nextTick(props.remove)
        window.open(location.origin + '/wps-preview/' + encodeURIComponent(JSON.stringify(params)))
    }
}

function close() {
    showImage.value = false
    showVideo.value = false
    showAudio.value = false
    fileUrl.value = null
    fileType.value = null
    removeStop()
    if (typeof props.remove === 'function') {
        props.remove()
    }
}
</script>

<style lang="scss">
.video-preview-box {
    background-color: var(--el-overlay-color-lighter);
    left: 0;
    top: 0;
}
</style>
