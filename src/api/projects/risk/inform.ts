import req from '../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const riskInitApi = {
    get(data) {
        return req.post({
            url: business + '/risk/page',
            data,
        })
    },
    getAttachmentList(data) {
        return req.post({
            url: business + '/procRisk/attachmentList',
            data,
        })
    },
    getProjectInfo(data) {
        return req.get({
            url: business + '/majorRisk/queryMajorDetailInfo',
            data,
        })
    },
    queryMajorRiskList(data) {
        return req.get({
            url: business + '/majorRisk/queryMajorRiskList',
            data,
        })
    },
    getMajorRecord(data) {
        return req.post({
            url: business + '/majorRisk/queryMajorRecord',
            data,
        })
    },
    saveRisk(data) {
        return req.post({
            url: business + '/risk/save',
            data,
        })
    },
    saveMajorRisk(data) {
        return req.post({
            url: business + '/majorRisk/saveMajorRisk',
            data,
        })
    },
    createMajorRiskFlow(data) {
        return req.post({
            url: business + '/majorRisk/createMajorRiskFlow',
            data,
        })
    },
    getProcessApprovalNodes(data) {
        return req.post({
            url: business + '/proBuild/getProcessApprNodes',
            data,
        })
    },
    // 获取前往OA查看链接地址
    getOALink(data) {
        return req.get({
            url: business + '/toOAView/getJumpUrl',
            data,
        })
    },
    saveOaFlowId(data) {
        return req.post({
            url: business + '/majorRisk/saveOaFlowId',
            data,
        })
    },
}

export const riskDisclosureApi = {
    get(data) {
        return req.post({
            url: business + '/risk/majorRiskPage',
            data,
        })
    },
    terminateMajorRisk(data) {
        return req.post({
            url: business + '/majorRisk/terminateMajorRisk',
            data,
        })
    },
}
