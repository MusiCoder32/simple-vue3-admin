import req from './request'
import ApiClass from './api-class'

export const processApi = new ApiClass('/process')
processApi.getProcessTemplateById = function (data) {
    return req.get({
        url: '/process/template/id',
        data,
    })
}
processApi.saveProcessTemplate = function (data) {
    return req.post({
        url: '/process/template',
        data,
    })
}

export const processChildApi = new ApiClass('/process/child')
processChildApi.getByParentId = function (data) {
    return req.get({
        url: '/process/child/byParentId',
        data,
    })
}

processChildApi.getProcessTemplateById = function (data) {
    return req.get({
        url: '/process/child/template/id',
        data,
    })
}
processChildApi.saveProcessTemplate = function (data) {
    return req.post({
        url: '/process/child/template',
        data,
    })
}
