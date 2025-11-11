import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const secrecyApi = {
    get(data) {
        return req.post({
            // url: business + '/secrecy/init',
            url: business + '/procRelate/getProjectRelatePageList',
            data,
        })
    },
    // 项目保密记录查看
    encryptRecord(data) {
        return req.get({
            // url: business + '/secrecy/recordList',
            url: business + '/secrecy/querySecrecyRecords',
            data,
        })
    },
    // 项目加解密校验
    validateEncryptOrDecrypt(data) {
        return req.post({
            url: business + '/secrecy/validateEncryptOrDecrypt',
            data,
        })
    },
    // 项目加解密
    encryptOrDecrypt(data) {
        return req.post({
            url: business + '/secrecy/encryptOrDecrypt',
            data,
        })
    },
}
