import fs from 'fs-extra'
import path from 'path'
import { simpleSend, bodyParser } from 'simple-mock-proxy'

const CHUNK_DIR = path.resolve(__dirname, '../files/chunks')
const MERGED_DIR = path.resolve(__dirname, '../files/merged')

if (!fs.existsSync(CHUNK_DIR)) {
    await fs.mkdirpSync(CHUNK_DIR)
}
if (!fs.existsSync(MERGED_DIR)) {
    await fs.mkdirpSync(MERGED_DIR)
}

async function saveChunk(chunkInfo, filename, chunkNumber) {
    const originalFilePath = chunkInfo.filepath // 使用传入的chunk对象的filepath属性
    const targetChunkPath = path.join(CHUNK_DIR, `${filename}_${chunkNumber}`)
    await fs.copyFile(originalFilePath, targetChunkPath)
}

async function mergeChunks(filename, totalChunks) {
    const outputPath = path.join(MERGED_DIR, filename)
    const writeStream = fs.createWriteStream(outputPath)

    // 创建一个用于顺序处理每个块的函数
    async function processChunk(i) {
        if (i >= totalChunks) {
            // 如果没有更多的块要处理，关闭写入流
            return writeStream.end()
        }

        const chunkPath = path.join(CHUNK_DIR, `${filename}_${i + 1}`)
        try {
            // 读取块并写入到输出流
            const data = await fs.readFile(chunkPath)
            writeStream.write(data)
            fs.remove(chunkPath)
            // 递归处理下一个块
            return processChunk(i + 1)
        } catch (error) {
            // 如果发生错误，关闭写入流并抛出错误
            writeStream.close()
            throw error
        }
    }

    // 开始处理第一个块
    try {
        await processChunk(0)
    } catch (error) {
        // 如果有错误，确保关闭写入流并重新抛出错误
        writeStream.close()
        throw error
    }
}

export default [
    {
        url: '/mock/upload',
        method: 'post',
        rawResponse: async (req, res) => {
            try {
                const body = await bodyParser(req)
                const chunk = body.chunk[0]
                const filename = body.filename[0]
                const chunkNumber = body.chunkNumber[0]
                const totalChunks = body.totalChunks[0]

                let singleTime = +body.singleTime
                let uploadStatus = body.uploadStatus
                if (singleTime) {
                    singleTime = singleTime[0]
                }
                if (uploadStatus) {
                    uploadStatus = uploadStatus[0]
                }

                await saveChunk(chunk, filename, chunkNumber)

                // // 检查是否所有分片都已上传
                if (chunkNumber == totalChunks) {
                    mergeChunks(filename, totalChunks)
                }
                if (uploadStatus == 500 && chunkNumber == 3) {
                    simpleSend(req, res, {
                        code: '500',
                        message: filename + '上传失败',
                    })
                } else {
                    if (singleTime) {
                        setTimeout(() => {
                            simpleSend(req, res, {
                                code: '200',
                                message: 'uploaded successfully',
                            })
                        }, singleTime)
                    } else {
                        simpleSend(req, res, {
                            code: '200',
                            message: 'uploaded successfully',
                        })
                    }
                }
            } catch (error) {
                console.error(error)
                simpleSend(req, res, {
                    code: '500',
                    message: 'uploaded fail',
                })
            }
        },
    },
    {
        url: '/mock/download',
        method: 'post',
        rawResponse: async (req, res) => {
            try {
                const filename = 'KPI绩效考核规范.mp4'
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
                res.setHeader('Content-Type', 'application/octet-stream')
                // 创建可读流
                const filePath = path.join(MERGED_DIR, filename)
                const readStream = fs.createReadStream(filePath)

                // 将文件流.pipe到response对象，从而实现下载
                // 如果文件流打开成功，则管道化到HTTP响应
                readStream.on('open', () => {
                    console.log('File streaming started')
                    readStream.pipe(res)
                })
            } catch (error) {
                console.error(error)
                simpleSend(req, res, {
                    code: '500',
                    message: 'uploaded fail',
                })
            }
        },
    },
]
