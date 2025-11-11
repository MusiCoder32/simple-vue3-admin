import req from './request'
const business = '/lmsmp-business'
const lmAdmin = '/lmsmp-admin'
// const business = '/mock'

export const taskApi = {
    get(data) {
        return req.get({
            url: business + '/task/queryTaskByUserId',
            data,
        })
    },
    getTaskByCondition(data) {
        return req.post({
            url: business + '/task/getTaskByCondition',
            data,
        })
    },
}

export const projectApi = {
    get(data) {
        return req.post({
            url: business + '/workspace/listProject',
            data,
        })
    },
}

export const noticeApi = {
    get(data) {
        return req.get({
            url: business + '/notice/getNoticeByUserId',
            data,
        })
    },
    getNoticeByCondition(data) {
        return req.post({
            url: business + '/notice/getNoticeByCondition',
            data,
        })
    },
    changeStatus(data) {
        return req.post({
            url: business + '/notice/updateIsReadById',
            data,
        })
    },
}

export const commonFunctionApi = {
    get() {
        return req.get({
            url: lmAdmin + '/commonFunction/queryMyFunction',
        })
    },
    getAll(data) {
        return req.get({
            url: lmAdmin + '/commonFunction/getAllFunctions',
            data,
        })
    },
    saveMyFunction(data) {
        return req.post({
            url: lmAdmin + '/commonFunction/saveMyFunction',
            data,
        })
    },
}

export const dataBoardApi = {
    getStageViewStatistic(data) {
        return req.post({
            url: business + '/dataBoard/getProjectStageViewStatistic',
            data,
        })
    },
    getListProject(data) {
        return req.post({
            url: business + '/dataBoard/listProject',
            data,
        })
    },
    getTaskCostTimeStatistic(data) {
        return req.post({
            url: business + '/dataBoard/getTaskCostTimeStatistic',
            data,
        })
    },
    getListTask(data) {
        return req.post({
            url: business + '/dataBoard/listTask',
            data,
        })
    },
    getTaskFinishStatistic(data) {
        return req.post({
            url: business + '/dataBoard/getTaskFinishStatistic',
            data,
        })
    },
    getListTaskFinish(data) {
        return req.post({
            url: business + '/dataBoard/listTaskFinish',
            data,
        })
    },
}

export const mandateApi = {
    get(data) {
        return req.post({
            url: business + '/entrust/queryEntrustInfo',
            data,
        })
    },
    queryEntrustDetail(data) {
        return req.get({
            url: business + '/entrust/queryEntrustDetail',
            data,
        })
    },
    save(data) {
        return req.post({
            url: business + '/entrust/saveEntrustInfo',
            data,
        })
    },
    submit(data) {
        return req.post({
            url: business + '/entrust/submitEntrustInfo',
            data,
        })
    },
}

export const handoverApi = {
    get(data) {
        return req.post({
            url: business + '/handover/pageList',
            data,
        })
    },
    getProjectList(data) {
        return req.post({
            url: business + '/handover/projectPage',
            data,
        })
    },
    getHandoverProjectList(data) {
        return req.post({
            url: business + '/handover/handoverProjectList',
            data,
        })
    },
    saveOrUpdate(data) {
        return req.post({
            url: business + '/handover/saveOrUpdate',
            data,
        })
    },
    submit(data) {
        return req.post({
            url: business + '/handover/submit',
            data,
        })
    },
    getDetail(data) {
        return req.get({
            url: business + '/handover/detail',
            data,
        })
    },
}
