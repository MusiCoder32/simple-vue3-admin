import req from './request'

const business = '/lmsmp-business'
export function getProjectFiles(data) {
    return req.post({
        url: business + '/procRelate/third/file/getProcFiles',
        data,
    })
}
export function getProjectBaseInfo(data) {
    return req.get({
        url: business + '/procRelate/third/file/getProcInfo',
        data,
    })
}
