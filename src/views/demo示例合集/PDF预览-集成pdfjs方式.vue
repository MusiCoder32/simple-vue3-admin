<template>
    <h1>PDF.js 多页 base64 预览示例</h1>
    <div id="pdf-container">
        <div class="loading">正在加载 PDF 文件...</div>
    </div>
</template>

<script setup>
// PDF base64 字符串
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

onMounted(async () => {
    // 动态加载 pdf.js 模块
    const pdfjsLib = await import('./pdf.mjs')
    pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs'

    // 解码 base64 为 binary
    const pdfData = atob(base64Str)
    const byteNumbers = new Array(pdfData.length)
    for (let i = 0; i < pdfData.length; i++) {
        byteNumbers[i] = pdfData.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)

    // 加载 PDF
    const loadingTask = pdfjsLib.getDocument({ data: byteArray })
    loadingTask.promise.then(
        async function (pdf) {
            const container = document.getElementById('pdf-container')
            container.innerHTML = '' // 清空加载提示

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                // 创建包裹每页的 div
                const pageDiv = document.createElement('div')
                pageDiv.classList.add('pdf-page')
                container.appendChild(pageDiv)

                // 异步获取页面
                const page = await pdf.getPage(pageNum)

                // 设置缩放比例
                const scale = 1.5
                const viewport = page.getViewport({ scale })

                // 创建 canvas
                const canvas = document.createElement('canvas')
                canvas.width = viewport.width
                canvas.height = viewport.height
                pageDiv.appendChild(canvas)

                // 渲染页面到 canvas
                await page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport,
                }).promise
            }
        },
        function (reason) {
            // PDF 加载错误
            const container = document.getElementById('pdf-container')
            container.innerHTML = '<div class="loading">PDF 加载失败：' + reason + '</div>'
            console.error(reason)
        },
    )
})
</script>
