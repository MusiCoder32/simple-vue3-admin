import { fileUploadApi } from '@/api'
const SERVER = import.meta.env.VITE_PROXY_TARGET
export function download(content, fileName) {
    const blob = new Blob([content])
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
}
export async function downloadFiles(path, fileName) {
    const res = await fileUploadApi.downMinioFile({ fileName: path })
    return new Promise((resolve) => {
        download(res, fileName)
        if (res) {
            resolve(res)
        }
    })
}
