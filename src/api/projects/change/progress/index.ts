import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const changeProgressApi = {
    get(data) {
        return req.post({
            // url: business + '/change/progress',
            url: business + '/projectAlter/selectPage',
            data,
        })
    },
    // 项目变更进度查询——查看变更详情
    getDetailInfo(data) {
        return req.get({
            url: business + '/projectAlter/getAlterInfo',
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
    // 查询审批记录
    getProcessApprNodes(data) {
        return req.post({
            url: business + '/proBuild/getProcessApprNodes',
            data,
        })
    },
    //我方主体列表
    getCorpnList(data) {
        return req.get({
            url: business + '/corpn/list',
            data,
        })
    },
    //相对方主体列表
    getRelativeList(data) {
        return req.get({
            url: business + '/counterparty/list',
            data,
        })
    },
    //获取汇率
    getRate(data) {
        return req.get({
            url: business + '/sap/queryExchangeRate',
            data,
        })
    },
    // 终止
    terminateChange(data) {
        return req.get({
            url: business + '/projectAlter/terminate',
            data,
        })
    },
    // 重新提交
    reSubmit(data) {
        return req.post({
            url: business + '/projectAlter/recommit',
            data,
        })
    },
    // 主办律师驳回
    reject(data) {
        return req.post({
            url: business + '/projectAlter/reject',
            data,
        })
    },
    // 重新提交
    submit(data) {
        return req.post({
            url: business + '/projectAlter/lawyercommit',
            data,
        })
    },
}
