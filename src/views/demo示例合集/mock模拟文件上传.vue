<template>
    <el-upload
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :on-preview="preview"
        drag
        :auto-upload="true"
        :show-file-list="true"
        multiple
        :http-request="uploadMock">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            <em>mock</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
    </el-upload>
</template>

<script setup lang="tsx">
import { fileUpload } from '@/api'

function uploadProgress(percent, file, files) {
    console.log(percent, file, files)
}
function uploadSuccess() {
    ElMessage.success('文件上传成功，可在/mock/files/merged文件夹下查看上传文件')
}

async function uploadMock(fileObj) {
    const file = fileObj.file
    const chunkSize = 1024 * 1024 // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize)

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize
        const end = Math.min(start + chunkSize, file.size)
        const chunk = file.slice(start, end)

        const formData = new FormData()
        formData.append('chunk', chunk, `chunk-${i}`)
        formData.append('filename', file.name)
        formData.append('chunkNumber', i + 1)
        formData.append('totalChunks', totalChunks)

        try {
            await fileUpload(formData)
            fileObj.onProgress({ percent: ((i + 1) * 100) / totalChunks })
        } catch (error) {
            console.error(`Error uploading chunk ${i + 1}:`, error)
            break
        }
    }
}
</script>
