<template>
    <el-upload
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :on-remove="uploadRemove"
        :before-upload="beforeUpload"
        :disabled="disabled || design"
        drag
        :auto-upload="true"
        :show-file-list="true"
        multiple
        :http-request="upload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>

        <div class="el-upload__text">
            <div class="h-center-center">
                <span class="color-gray-4" style="white-space: pre">{{ $t('attachments.uploadTooltip') }}</span>
                <em>{{ $t(buttonText) }}</em>
            </div>

            <div v-if="sizeTitle" class="color-gray-4">{{ $t('attachments.fileSizeLimitTooltip') }}{{ sizeTitle }}</div>
        </div>
    </el-upload>
</template>

<script setup lang="tsx">
import { remove } from 'lodash'

const formValues = inject('$formValues', {})
const flowBlockName = inject('$flowBlockName', null)

const emits = defineEmits(['update:modelValue', 'uploadSuccess'])
const props = defineProps({
    action: String,
    modelValue: Boolean, //为false代表文件正在上传,在fort-item中判断该值为true,才允许校验通过
    height: Number,
    width: Number,
    disabled: Boolean,
    design: Boolean,
    fileTypes: { type: Array, default: () => [] },
    size: Number,
    dataPath: {
        type: String,
        default: 'data',
    },
    uploadKey: {
        type: String,
        default: 'file',
    },
    buttonText: {
        type: String,
        default: 'attachments.clickUpload',
    },
    limit: {
        type: Number,
        default: 2,
    },
})
const isDestroyed = ref(false) // 销毁递归标志
const fileList = ref([])

const sizeTitle = computed(() => {
    return formatFileSize(props.size)
})

onBeforeUnmount(() => {
    isDestroyed.value = true
    fileList.value = []
})

function formatFileSize(bytes) {
    const k = 1024
    const sizes = ['MB', 'GB', 'TB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    const roundedBytes = Math.round(bytes / Math.pow(k, i)) //计算该单位下的文件实际大小
    return `${roundedBytes}${sizes[i]}`
}

function beforeUpload(rawFile) {
    // 校验与正在上传中的文件存在同名
    for (let i = 0; i < fileList.value.length; i++) {
        let item = fileList.value[i]
        if (rawFile.name === item.file.name) {
            ElMessage.warning(
                $t('attachments.existTooltip') + '《' + rawFile.name + '》，' + $t('attachments.noRepeatUpload'),
            )
            return false
        }
    }

    //本项目中，指定文件列表name值为fileArr
    const arr = formValues.value[props.uploadKey]
    if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            if (rawFile.name === item.fileName) {
                ElMessage.warning(
                    $t('attachments.existTooltip') + '《' + rawFile.name + '》，' + $t('attachments.noRepeatUpload'),
                )
                return false
            }
        }
    }

    const [, type] = rawFile.name.split('.')
    //不传fileTypes代表支持任意格式文件
    if (props.fileTypes?.length > 0 && !props.fileTypes.includes(type)) {
        ElMessage.error($t('attachments.noSupportFormat'))
        return false
    }

    if (rawFile.size / 1024 / 1024 > props.size) {
        ElMessage.error(`${$t('attachments.fileSizeNoExceed')}${props.size}MB！`)
        return false
    }

    return true
}

function uploadProgress(percent, file, files) {
    // console.log(percent, file, files)
    emits('update:modelValue', false)
}
function uploadSuccess(percent, file, files) {
    //将上传完成的文件称除
    for (let i = 0; i < files.length; i++) {
        const item = files[i]
        if (file.uid === item.uid) {
            files.splice(i, 1)
        }
    }
}
function uploadRemove(file, files) {
    //将上传中的文件称除
    if (files?.length === 0) emits('update:modelValue', true)
    //由于后续中断正在上传中的请求,请求中的fileList.value.shift()未能执行
    //故手动执行
    remove(fileList.value, (item) => item.file.name === file.name)
}

function upload(fileObj) {
    fileObj.onProgress({ percent: 0 })
    fileList.value.push(fileObj)
    uploadServer()
}
/**
 * 现有的逻辑是先对文件分片，用一个对象储存分片上传方法及分片号，并将其存入数组Arr中，然后取前六个，开启六个promise，在promise中执行上传接口，上传成功后，在该promise中继续从Arr中取出剩余要上传的分片，直到取完才在该promise中执行resolve ，然后使用promise.all一直等待这六个promise均结束，才执行后续逻辑
 */
function uploadServer() {
    const fileObj = fileList.value.shift()
    if (fileObj) {
        let percent = 0
        const inter = setInterval(() => {
            percent += 30 * Math.random()
            if (percent > 100) {
                fileObj.onProgress({ percent: 100 })
                updateFileList(fileObj.file)
                uploadServer()
                fileObj.onSuccess()
                clearInterval(inter)
            } else {
                fileObj.onProgress({ percent })
            }
        }, 1000)
    }
}

function updateFileList(file) {
    const arr = formValues.value[props.uploadKey]
    if (Array.isArray(arr)) {
        arr.push({
            fileName: file.name,
            username: 'admin',
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
    } else {
        formValues.value[props.uploadKey] = [
            {
                fileName: file.name,
                username: 'admin',
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            },
        ]
    }
}
</script>

<style lang="scss"></style>
