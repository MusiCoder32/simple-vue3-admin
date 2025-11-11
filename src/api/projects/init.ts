import req from '../request'

const business = '/lmsmp-business'

export const initCreateApi = {
    get(data) {
        return req.post({
            url: business + '/procbuild/getproccreatelist',
            data,
        })
    },
    add(data) {
        return req.post({
            url: business + '/procbuild/saveProject',
            data,
        })
    },
    update(data) {},
    del(data) {
        return req.get({
            url: business + '/project/delProject',
            data,
        })
    },
    saveRelateProjects(data) {
        return req.post({
            url: business + '/procRelate/saveProjectRelateList',
            data,
        })
    },
    updateRelateProjects(data) {
        return req.post({
            url: business + '/procRelate/updateProjectRelate',
            data,
        })
    },
    saveRelateFiles(data) {
        return req.post({
            url: business + '/procRelate/saveProjectRelateFile',
            data,
        })
    },
    createApprFlowToOA(data) {
        return req.get({
            url: business + '/procbuild/createApprFlowToOA',
            data,
        })
    },
    // 终止
    doneProject(data) {
        return req.get({
            url: business + '/procbuild/doneProject',
            data,
        })
    },
    getRelateProjects(data) {
        return req.get({
            url: business + '/procRelate/getProjectRelateList',
            data,
        })
    },
    queryRelateProjects(data) {
        return req.get({
            url: business + '/project/getProjectRelateByCode',
            data,
        })
    },
    queryRelateProjectsNew(data) {
        return req.get({
            url: business + '/project/getProjectRelateByCodeNew',
            data,
        })
    },
    // 查询关联文件列表
    queryRelateFile(data) {
        return req.post({
            url: business + '/procRelate/getProjectFileList',
            data,
        })
    },
    getDetails(data) {
        return req.post({
            url: business + '/project/getProjectInfoById',
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
}

export const confirmApi = {
    get(data) {
        return req.post({
            url: business + '/procbuild/getprocconfirmlist',
            data,
        })
    },
    queryProAlterContent(data) {
        return req.post({
            url: business + '/procbuild/queryProAlterContent',
            data,
        })
    },
    // 驳回
    rejectProject(data) {
        return req.post({
            url: business + '/procbuild/rejectProject',
            data,
        })
    },
    // 退回
    returnProject(data) {
        return req.post({
            url: business + '/procbuild/returnProject',
            data,
        })
    },
    // 转交
    transferProject(data) {
        return req.post({
            url: business + '/procbuild/transferProject',
            data,
        })
    },
    // 分配
    assignProject(data) {
        return req.post({
            url: business + '/procbuild/assignProject',
            data,
        })
    },
    // 立项
    confirmProject(data) {
        return req.post({
            url: business + '/procbuild/confirmProject',
            data,
        })
    },
    // 法人系统-商事业务数据对接的项目 立项
    confirmProjectBusiness(data) {
        return req.post({
            url: business + '/procbuild/confirmProjectBusiness',
            data,
        })
    },
    // 撤回
    cancelNodeOpt(data) {
        return req.post({
            url: business + '/procbuild/cancelNodeOpt',
            data,
        })
    },
    // 获取退回重新提交后的内容变更
    getChange(data) {
        return req.get({
            url: business + '/procbuild/queryProAlterContent',
            data,
        })
    },
    // 更新项目实例是否关联项目字段
    updateProjectIsRelate(data) {
        return req.get({
            url: business + '/project/updateProjectIsRelateById',
            data,
        })
    },
}
