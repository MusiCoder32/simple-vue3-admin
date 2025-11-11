import req from '../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const linkApi = {
    get(data) {
        return req.post({
            url: business + '/procRelate/getProjectRelatePageList',
            data,
        })
    },

    del(data) {
        return req.post({
            url: business + '/procRelate/deleteProjectRelate',
            data,
        })
    },

    getMap(data) {
        return req.get({
            url: business + '/procRelate/getProjectRelateMap',
            data,
        })
    },
    getLinkList(data) {
        return req.post({
            url: business + '/procRelate/getProjectDetailRelateList',
            data,
        })
    },
    getRecord(data) {
        return req.post({
            url: business + '/relateChangeRecord/queryChangeRecordList',
            data,
        })
    },
    updateReadStatus(data) {
        const url = '/relateChangeRecord/updateFlag'
        return req.post({
            url: business + url,
            data,
        })
    },
    getRecordDetail(data) {
        const url = '/recordCompare/queryRecordByBusinessId'
        return req.get({
            url: business + url,
            data,
        })
    },
}
