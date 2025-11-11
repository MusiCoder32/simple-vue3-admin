import req from './request'

const business = '/lmsmp-business'

export const statisticsApi = {
    getBriefData(data) {
        return req.post({
            url: business + '/report/simple/query',
            data,
        })
    },
}
