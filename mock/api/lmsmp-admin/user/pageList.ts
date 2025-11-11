import { jsonRead, simpleSend } from 'simple-mock-proxy'
const url = '/lmsmp-admin/user/pageList'
export default [
    {
        url: '/mock' + url,
        method: 'post',
        rawResponse: async (req, res) => {
            const jsonData = await jsonRead('/mock/database' + url + '.json')
            simpleSend(req, res, jsonData)
        },
    },
]
