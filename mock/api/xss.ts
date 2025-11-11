import { simpleSend } from 'simple-mock-proxy'

export default [
    {
        url: `/mock/xss/script`,
        method: 'get',
        rawResponse: async (req, res) => {
            const data = "<h1 >搜索结果：<script>alert('XSS3333');</script></h1>"
            res.end(data)
        },
    },
    {
        url: `/mock/xss/img`,
        method: 'get',
        rawResponse: async (req, res) => {
            const data = "<img src=1 onerror=alert('XSS')>"
            simpleSend(req, res, {
                code: '200',
                data,
                message: '成功',
            })
        },
    },
    {
        url: `/mock/xss/href`,
        method: 'get',
        rawResponse: async (req, res) => {
            const data = "<a href='javascript:alert(1)'>点我</a>"
            simpleSend(req, res, {
                code: '200',
                data,
                message: '成功',
            })
        },
    },
]
