import req from '../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const libraryApi = {
    get(data) {
        return req.post({
            url: business + '/compositeProject/page',
            data,
        })
    },
    getDetails(data) {
        return req.get({
            url: business + '/compositeProject/getProjectInfo',
            data,
        })
    },
}

export const archivesApi = {
    get(data) {
        return req.post({
            url: business + '/compositefile/getcompfileproclist',
            data,
        })
    },
    getProjectFilesById(data) {
        return req.post({
            url: business + '/procRelate/getProcUserFileList',
            data,
        })
    },
    downloadOneProcfiles(data) {
        return req.get({
            url: business + '/compositefile/download/oneprocfiles',
            data,
        })
    },
    // 保存OA流程编号
    saveOaInfo(data) {
        return req.post({
            url: business + '/investment/saveOaInfo',
            data,
        })
    },
    // 根据OA流程编号查询OA同步过来的数据
    getOaFlowInfo(data) {
        return req.get({
            url: business + '/investment/getOaFlowInfo',
            data,
        })
    },
}
