import req from '../request'

const business = '/lmsmp-business'

export function getProjectTypeList(data) {
    return req.get({
        url: business + '/project/getProjectTypeList',
        data,
    })
}

//用于通知后端该条数据已修改,无法撤回
export function postEditMsg(data) {
    return req.get({
        url: business + '/procbuild/backEditLogSave',
        data,
    })
}
export function getDepartmentOnly(data) {
    return req.get({
        url: '/lmsmp-admin/org/queryUserSelect',
        data,
    })
}

// 国家/地区
export function getCountryList(data) {
    return req.get({
        url: business + '/third/getCountryList',
        data,
    })
}

// 保存项目文件关联接口
export function saveProcUserRelateFile(data) {
    return req.post({
        url: business + '/procRelate/saveProcUserRelateFile',
        data,
    })
}
// 查询项目文件管连接口
export function getProcUserFileList(data) {
    return req.post({
        url: business + '/procRelate/getProcUserFileList',
        data,
    })
}
