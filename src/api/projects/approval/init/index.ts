import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const approvalApi = {
    get(data) {
        return req.post({
            // url: business + '/approval/init',
            url: business + '/projectStartApprove/pageList',
            data,
        })
    },
    // 获取详情
    getDetail(data) {
        return req.get({
            url: business + '/projectStartApprove/detail',
            data,
        })
    },
    // 获取审批结论
    // getConclusion(data) {
    //     return req.get({
    //         url: business + '/projectStartApprove/getApproveConclusion',
    //         data,
    //     })
    // },
    // 查询审批记录
    getProcessApprNodes(data) {
        return req.post({
            url: business + '/proBuild/getProcessApprNodes',
            data,
        })
    },
    // 查询关联文件列表
    queryRelateFile(data) {
        return req.post({
            url: business + '/procRelate/getProcUserFileList',
            data,
        })
    },
    // 线上提交审批
    onLineSubmit(data) {
        return req.post({
            url: business + '/projectStartApprove/submitOnline',
            data,
        })
    },
    // 线下提交审批
    offLineSubmit(data) {
        return req.post({
            url: business + '/projectStartApprove/submitOffline',
            data,
        })
    },
    // 发起项目审批——获取审批结论
    getApproveConclusion(data) {
        return req.get({
            url: business + '/projectStartApprove/getApproveConclusion',
            data,
        })
    },
    // 退回评估阶段
    backToEvaluate(data) {
        return req.post({
            url: business + '/projectStartApprove/returnEstimateStage',
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
    // 发起项目审批——主办律师驳回
    lawyerReject(data) {
        return req.post({
            url: business + '/projectStartApprove/lawyerReject',
            data,
        })
    },
    // 发起项目审批——主办律师提交
    lawyerSubmit(data) {
        return req.post({
            url: business + '/projectStartApprove/lawyerSubmit',
            data,
        })
    },
}
