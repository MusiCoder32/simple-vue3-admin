import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const approvalProgressApi = {
    get(data) {
        return req.post({
            url: business + '/projectProgress/pageList',
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
    // 获取前往OA查看链接地址
    getOALink(data) {
        return req.get({
            url: business + '/toOAView/getJumpUrl',
            data,
        })
    },
}
