import req from '../../../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const changeApi = {
    get(data) {
        return req.post({
            url: business + '/projectAlter/projectPage',
            // url: business + '/change/init',
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
    //  获取项目变更记录-弹框-列表数据
    getChangeRecord(data) {
        return req.get({
            // url: business + '/change/recordList',
            url: business + '/projectAlter/getAlterRecord',
            data,
        })
    },
    // 发起变更校验
    checkChange(data) {
        return req.get({
            // url: business + '/projectAlter/checkAlterable',
            url: business + '/projectAlter/checkAlterable',
            data,
        })
    },
    // 发起变更，获取变更项目及申请人信息
    getChangeProjectInfo(data) {
        return req.get({
            url: business + '/projectAlter/getAlterProjectInfo',
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
    // 提交变更
    submitChange(data) {
        return req.post({
            url: business + '/projectAlter/alterProject',
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
    // OA对接过来的项目提交变更过
    alterProject(data) {
        return req.post({
            url: business + '/projectAlter/alterProject',
            data,
        })
    },
}
