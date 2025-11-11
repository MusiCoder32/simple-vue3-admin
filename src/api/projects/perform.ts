import req from '../request'

const business = '/lmsmp-business'
// const business = '/mock'

export const contractApi = {
    get(data) {
        return req.post({
            url: business + '/projectContract/pageList',
            data,
        })
    },
    //项目合同——列表
    getContractList(data) {
        return req.get({
            url: business + '/projectContract/getContractList',
            data,
        })
    },
    //项目合同——子列表
    getContractChildList(data) {
        return req.get({
            url: business + '/projectContract/getContractItemList',
            data,
        })
    },
    //项目合同——变更记录
    getAlterRecord(data) {
        return req.get({
            url: business + '/projectContract/getAlterRecord',
            data,
        })
    },
    //项目合同—新增弹窗——查询合同信息
    queryContractInfo(data) {
        return req.get({
            url: business + '/projectContract/queryContractInfo',
            data,
        })
    },
    //项目合同——新增弹窗——确定
    saveContract(data) {
        return req.post({
            url: business + '/projectContract/saveContract',
            data,
        })
    },
    //项目合同——批量删除
    delContract(data) {
        return req.post({
            url: business + '/projectContract/deleteBatch',
            data,
        })
    },
    //项目合同——上传用印后更新用印数量
    updateCount(data) {
        return req.post({
            url: business + '/projectContract/updateItemCount',
            data,
        })
    },
}
export const planApi = {
    //履行计划——分页列表
    get(data) {
        return req.post({
            url: business + '/performPlan/pageList',
            data,
        })
    },
    getPerformPlanList(data) {
        return req.get({
            url: business + '/performPlan/getPlanList',
            data,
        })
    },
    getAlterList(data) {
        return req.get({
            url: business + '/performPlan/getAlterList',
            data,
        })
    },
    savePlanItems(data) {
        return req.post({
            url: business + '/performPlan/save',
            data,
        })
    },
    publish(data) {
        return req.get({
            url: business + '/performPlan/publish',
            data,
        })
    },
    perform(data) {
        return req.post({
            url: business + '/performPlan/perform',
            data,
        })
    },
    getAlterRecordList(data) {
        return req.get({
            url: business + '/performPlan/getAlterRecordList',
            data,
        })
    },
    getPlanByInstId(data) {
        return req.get({
            url: business + '/performPlan/getPlanByInstId',
            data,
        })
    },
}
export const abnormalApi = {
    get(data) {
        return req.post({
            url: business + '/performException/pageList',
            data,
        })
    },
    //统计头
    getERStatistic(data) {
        return req.get({
            url: business + '/performException/getERStatistic',
            data,
        })
    },
    saveExceptionList(data) {
        return req.post({
            url: business + '/performException/save',
            data,
        })
    },
    saveAndUpdateRisk(data) {
        return req.post({
            url: business + '/performException/saveAndUpdateRisk',
            data,
        })
    },
    handleRisk(data) {
        return req.post({
            url: business + '/performException/handle',
            data,
        })
    },
    getPlanList(data) {
        return req.post({
            url: business + '/performPlan/getPlanPageList',
            data,
        })
    },
    //获取风险详情
    getRiskByExceptionInstId(data) {
        return req.get({
            url: business + '/performException/getRiskByExceptionInstId',
            data,
        })
    },
    //获取履行异常列表
    getAbnormalData(data) {
        return req.get({
            url: business + '/performException/getExceptionList',
            data,
        })
    },
    //获取异常详情
    getExceptionByInstId(data) {
        return req.get({
            url: business + '/performException/getExceptionByInstId',
            data,
        })
    },
    getAlterList(data) {
        return req.get({
            url: business + '/performException/getAlterList',
            data,
        })
    },
    getAlterRecordList(data) {
        return req.get({
            url: business + '/performException/getAlterRecordList',
            data,
        })
    },
}
export const riskApi = {
    get(data) {
        return req.post({
            url: business + '/performRisk/pageList',
            data,
        })
    },
    getRiskList(data) {
        return req.get({
            url: business + '/performRisk/getRiskList',
            data,
        })
    },
    handleRisk(data) {
        return req.post({
            url: business + '/performRisk/handle',
            data,
        })
    },
    saveExceptionList(data) {
        return req.post({
            url: business + '/performRisk/save',
            data,
        })
    },
    //统计头
    getERStatistic(data) {
        return req.get({
            url: business + '/performException/getERStatistic',
            data,
        })
    },
    getAlterList(data) {
        return req.get({
            url: business + '/performRisk/getAlterList',
            data,
        })
    },
    getAlterRecordList(data) {
        return req.get({
            url: business + '/performRisk/getAlterRecordList',
            data,
        })
    },
    getExceptionByInstId(data) {
        return req.get({
            url: business + '/performException/getExceptionByInstId',
            data,
        })
    },
    getRiskByInstId(data) {
        return req.get({
            url: business + '/performRisk/getRiskByInstId',
            data,
        })
    },
}
export const finishApi = {
    //履行完结——分页列表
    get(data) {
        return req.post({
            url: business + '/performFinish/pageList',
            data,
        })
    },
    //履行完结——统计
    getStatistic(data) {
        return req.get({
            url: business + '/performFinish/getStatistic',
            data,
        })
    },
    //履行完结——完结校验
    verify(data) {
        return req.get({
            url: business + '/performFinish/verify',
            data,
        })
    },
    //履行完结——履行完结按钮
    finish(data) {
        return req.post({
            url: business + '/performFinish/performFinish',
            data,
        })
    },
    //履行完结——主办律师驳回
    reject(data) {
        return req.post({
            url: business + '/performFinish/lawyerReject',
            data,
        })
    },
    //履行完结——主办律师提交
    submit(data) {
        return req.post({
            url: business + '/performFinish/lawyerSubmit',
            data,
        })
    },
}
