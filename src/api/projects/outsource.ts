import req from '../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const outsourceApi = {
    get(data) {
        return req.post({
            url: business + '/procout/page',
            data,
        })
    },
    add(data) {
        return req.post({
            url: business + '/procout/save',
            data,
        })
    },
    getDetails(data) {
        return req.get({
            url: business + '/procout/detail',
            data,
        })
    },
    getRecords(data) {
        return req.get({
            url: business + '/procout/query/records',
            data,
        })
    },
    getRecordsDetails(data) {
        return req.get({
            url: business + '/procout/detail/his',
            data,
        })
    },
}
