import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const secrecyApi = {
    get(data) {
        return req.post({
            // url: business + '/secrecy/approval',
            url: business + '/secrecy/querySecrecyApproveList',
            data,
        })
    },
    getProjectDetailInfo(data) {
        return req.post({
            url: business + '/secrecy/queryProjectSecrecyDetail',
            data,
        })
    },
    //  获取汇率
    getRate(data) {
        return req.get({
            url: business + '/sap/queryExchangeRate',
            data,
        })
    },
    // 查看获取关联项目标签
    getRelateProjects(data) {
        return req.get({
            url: business + '/procRelate/getProjectRelateList',
            data,
        })
    },
    // 保密流程审批
    handleSecrecyFlow(data) {
        return req.post({
            url: business + '/secrecy/handleSecrecyFlow',
            data,
        })
    },
}
