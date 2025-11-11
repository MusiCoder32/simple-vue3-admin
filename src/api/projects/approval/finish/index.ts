import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const approvalFinishApi = {
    get(data) {
        return req.post({
            url: business + '/projectClose/pageList',
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
    // 根据合同编号查询合同信息
    queryContractInfoByNo(data) {
        return req.get({
            url: business + '/contract/queryByCondition',
            data,
        })
    },
    // 查询结案确认详情
    getFinishDetail(data) {
        return req.get({
            url: business + '/projectClose/detail',
            data,
        })
    },
    // 自动结案
    autoFinish(data) {
        return req.post({
            url: business + '/projectClose/autoClose',
            data,
        })
    },
    // 取消自动结案
    cancelAutoFinish(data) {
        return req.get({
            url: business + '/projectClose/cancelAutoClose',
            data,
        })
    },
    // 确认结案
    confirmFinish(data) {
        return req.post({
            url: business + '/projectClose/affirmClose',
            data,
        })
    },
}
