import { jsonRead, jsonWrite, simpleSend, bodyParser, getRandomId } from 'simple-mock-proxy'
import qs from 'qs'
import fs from 'fs-extra'
import path from 'path'

const jsonPath = '/mock/database/forms/list.json'
const TEMPLATE_PATH = path.resolve(__dirname, '../database/forms/template')

const url = '/mock'
export default [
    {
        url: url + `/forms`,
        method: 'get',
        rawResponse: async (req, res) => {
            const result = await jsonRead(jsonPath)

            simpleSend(req, res, {
                code: '200',
                message: '成功',
                data: result,
            })
        },
    },
    {
        url: url + `/forms`,
        method: 'post',
        rawResponse: async (req, res) => {
            const body = await bodyParser(req)
            const data = await jsonRead(jsonPath)
            const id = getRandomId()
            const filename = body.filePath
            const outputPath = path.join(TEMPLATE_PATH, filename)

            const hasFile = fs.pathExistsSync(outputPath)
            if (hasFile) {
                return simpleSend(req, res, {
                    code: '999',
                    message: 'mock文件名重复,请重新设置',
                })
            }

            await fs.writeFile(outputPath, JSON.stringify({}))

            data.push({ ...body, id })
            await jsonWrite(jsonPath, data)

            simpleSend(req, res, {
                code: '200',
                message: '成功',
            })
        },
    },
    {
        url: url + `/forms`,
        method: 'put',
        rawResponse: async (req, res) => {
            const body = await bodyParser(req)
            const data = await jsonRead(jsonPath)
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if (item.id === body.id) {
                    Object.assign(item, body)
                }
            }
            await jsonWrite(jsonPath, data)
            simpleSend(req, res, {
                code: '200',
                message: '成功',
            })
        },
    },
    {
        url: url + `/forms`,
        method: 'delete',
        rawResponse: async (req, res) => {
            const body = await bodyParser(req)
            const data = await jsonRead(jsonPath)
            let delFilePath
            const result = data.filter((item) => {
                if (item.id !== body.id) {
                    return true
                }
                delFilePath = item.filePath
                return false
            })

            fs.unlink(path.join(TEMPLATE_PATH, delFilePath))
            await jsonWrite(jsonPath, result)
            simpleSend(req, res, {
                code: '200',
                message: '成功',
            })
        },
    },
    {
        url: url + `/forms/template`, //保存保单设计
        method: 'post',
        rawResponse: async (req, res) => {
            const { path, route, template } = await bodyParser(req)
            const data = await jsonRead(jsonPath)
            let filePath
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if ((item.route ? item.route == route : true) && item.path == path) {
                    filePath = item.filePath
                }
            }
            // await jsonWrite\(jsonPath, data)
            await jsonWrite('/mock/database/forms/template/' + filePath, template)
            simpleSend(req, res, {
                code: '200',
                message: '成功',
            })
        },
    },
    {
        url: url + `/forms/template/publish`,
        method: 'post',
        rawResponse: async (req, res) => {
            const { formId, versionId } = await bodyParser(req)
            const data = await jsonRead(jsonPath)
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if (item.id === formId) {
                    item.history.forEach((child) => {
                        child.status = 0
                        if (child.id === versionId && !child.versionName) {
                            child.status = 1
                            child.publishTime = +new Date()
                            child.publishUser = 'admin'
                            child.versionName = item.history.length
                        } else {
                            child.status = 0
                        }
                    })
                }
            }
            await jsonWrite(jsonPath, data)
            simpleSend(req, res, {
                code: '200',
                message: '成功',
            })
        },
    },
    {
        url: url + `/forms/template/id`,
        method: 'get',
        rawResponse: async (req, res) => {
            const query = qs.parse(req._parsedUrl.query)
            const data = await jsonRead(jsonPath)
            let filePath
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if (item.id == query.id) {
                    filePath = item.filePath
                }
            }
            const template = await jsonRead('/mock/database/forms/template/' + filePath)

            simpleSend(req, res, {
                code: '200',
                message: '成功',
                data: template,
            })
        },
    },
    {
        url: url + `/forms/template/history`,
        method: 'get',
        rawResponse: async (req, res) => {
            const query = qs.parse(req._parsedUrl.query)

            const data = await jsonRead(jsonPath)
            let result
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if (item.id == query.id) {
                    result = item
                }
            }

            simpleSend(req, res, {
                code: '200',
                message: '成功',
                data: result?.history,
            })
        },
    },
    {
        url: url + `/forms/template/path`, //通过表单path获取模板内容
        method: 'get',
        rawResponse: async (req, res) => {
            const query = qs.parse(req._parsedUrl.query)
            const data = await jsonRead(jsonPath)
            let filePath
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if ((item.route ? item.route == query.route : true) && item.path == query.path) {
                    filePath = item.filePath
                }
            }
            if (filePath) {
                const template = await jsonRead('/mock/database/forms/template/' + filePath)
                simpleSend(req, res, {
                    code: '200',
                    message: '成功',
                    data: template,
                })
            } else {
                simpleSend(req, res, {
                    code: '200',
                    message: '成功',
                    data: '未创建',
                })
            }
        },
    },
]
