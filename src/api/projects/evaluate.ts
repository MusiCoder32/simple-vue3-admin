import req from '../request'

const business = '/lmsmp-business'

export const itemsApi = {
    get(data) {
        return req.post({
            url: business + '/projectEstimate/pageList',
            data,
        })
    },
    // 新增提交
    add(data) {
        return req.post({
            url: business + '/projectEstimate/submit',
            data,
        })
    },
    update(data) {
        return req.post({
            url: business + '/projectEstimate/flowSubmit',
            data,
        })
    },
    getProjects(data) {
        return req.post({
            url: business + '/projectEstimate/estimateProjectPageList',
            data,
        })
    },
    // 参与人员
    queryParticipant(data) {
        return req.post({
            url: business + '/projectEstimate/queryParticipantByProjectInstId',
            data,
        })
    },
    getItemStatus(data) {
        return req.get({
            url: '/evaluate/items/itemStatus',
            data,
        })
    },
    getProjectMembers(data) {
        return req.get({
            url: '/evaluate/items/projectMembers',
            data,
        })
    },
    getDetails(data) {
        return req.get({
            url: business + '/projectEstimate/queryEstimateByEstimateInstId',
            data,
        })
    },
    reject(data) {
        return req.post({
            url: business + '/projectEstimate/reject',
            data,
        })
    },
    done(data) {
        return req.post({
            url: business + '/projectEstimate/done',
            data,
        })
    },
}

export const tasksApi = {
    get(data) {
        return req.post({
            url: business + '/taskRelease/pageList',
            data,
        })
    },
    add(data) {
        return req.post({
            url: business + '/taskRelease/submit',
            data,
        })
    },
    update(data) {
        return req.post({
            url: business + '/taskRelease/flowSubmit',
            data,
        })
    },
    getDetails(data) {
        return req.get({
            url: business + '/taskRelease/queryReleaseByReleaseInstId',
            data,
        })
    },
    // 驳回
    reject(data) {
        return req.post({
            url: business + '/taskRelease/reject',
            data,
        })
    },
    // 转交
    transfer(data) {
        return req.post({
            url: business + '/taskRelease/transfer',
            data,
        })
    },
    // 终止
    done(data) {
        return req.post({
            url: business + '/taskRelease/done',
            data,
        })
    },
}
export const preApprovalApi = {
    get(data) {
        return req.post({
            url: business + '/projectPreAppr/getprocpreapprlist',
            data,
        })
    },
    add(data) {
        return req.post({
            url: business + '/projectPreAppr/submit',
            data,
        })
    },
    update(data) {
        return req.post({
            url: business + '/projectPreAppr/flowSubmit',
            data,
        })
    },
    reject(data) {
        return req.post({
            url: business + '/projectPreAppr/reject',
            data,
        })
    },
    getEvaluateList(data) {
        return req.get({
            url: business + '/projectPreAppr/getAffirmProjectEstimateList',
            data,
        })
    },
    getProjectDetails(data) {
        return req.get({
            url: business + '/projectPreAppr/getPreApprDetailByProjectInstId',
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
    // OA对接过来的项目提交审批预审
    submitInvestment(data) {
        return req.post({
            url: business + '/projectPreAppr/submitInvestment',
            data,
        })
    },
}

export const progressApi = {
    get(data) {
        return req.post({
            url: business + '/evaluatSchedule/pageList',
            data,
        })
    },
    getEvaluateList(data) {
        return req.get({
            url: business + '/evaluatSchedule/getEvaluateAndReleaseList',
            data,
        })
    },
}

progressApi.getApprovalRecord = function (data) {
    return req.get({
        url: '/evaluate/progress/approval-record',
        data,
    })
}
