import { jsonRead, simpleSend } from 'simple-mock-proxy'
const url = '/lmsmp-admin/webhealth'
export default [
    {
        url: '/mock' + url,
        method: 'get',
        rawResponse: async (req, res) => {
            const jsonData = await jsonRead('/mock/database' + url + '.json')
            simpleSend(req, res, jsonData)
        },
    },
]
