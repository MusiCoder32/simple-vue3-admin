import req from '../../request'

const business = '/lmsmp-business'

export const evaluateApi = {
    get(data) {
        return req.post({
            url: business + '/risk/page',
            data,
        })
    },
    getEditInfo(data) {
        return req.get({
            url: business + '/risk/editView',
            data,
        })
    },
    getViewInfo(data) {
        return req.get({
            url: business + '/risk/view',
            data,
        })
    },
    save(data) {
        return req.post({
            url: business + '/risk/save',
            data,
        })
    },
    getHistoryRecord(data) {
        return req.get({
            url: business + '/risk/viewHisRecord',
            data,
        })
    },
    getNoticeById(data) {
        return req.get({
            url: business + '/notice/getNoticeByProInstId',
            data,
        })
    },
    // 根据项目类型查风险类型列表
    getByProjectTypeCode(data) {
        return req.get({
            url: business + '/risk/getByProjectTypeCode',
            data,
        })
    },
    // 根据项目id查询项目是否编辑过风险评估
    getEditStatusByPid(data) {
        return req.get({
            url: business + '/risk/getEditStatusByPid',
            data,
        })
    },
}
