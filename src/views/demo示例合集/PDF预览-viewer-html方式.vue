<template>
    <div class="v-center-center h-full w-full">
        <el-button size="large" @click="preview" type="primary">点我，预览PDFJS自带的pdf文件</el-button>
        <el-button class="mt5" size="large" @click="preview2" type="primary">点我，预览/public下的pdf文件</el-button>
        <el-button class="mt5" size="large" @click="preview3" type="primary">点我，预览base64格式的pdf文件</el-button>
    </div>
</template>

<script setup lang="tsx">
const pdfjsUrl = '/pdfjs/web/viewer.html' // pdfjs文件地址

async function preview() {
    window.open(pdfjsUrl)
}
async function preview2() {
    const fileUrl = '?file=/test.pdf'
    window.open(pdfjsUrl + fileUrl)
}

async function preview3() {
    const base64Str =
        'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
        'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
        'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
        'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
        'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
        'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
        'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
        'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
        'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
        'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
        'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
        'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
        'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G'

    // 解码 Base64 为二进制
    const binaryStr = atob(base64Str)
    const byteArray = new Uint8Array(binaryStr.length)
    for (let i = 0; i < binaryStr.length; i++) {
        byteArray[i] = binaryStr.charCodeAt(i)
    }
    const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
    // 3. 生成临时访问链接
    const pdfUrl = URL.createObjectURL(pdfBlob)
    const fileUrl = '?file=' + pdfUrl
    window.open(pdfjsUrl + fileUrl)
}
</script>
