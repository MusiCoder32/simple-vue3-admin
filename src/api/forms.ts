import req from './request'
import ApiClass from './api-class'

export const formsApi = new ApiClass('/forms')
formsApi.getFormTemplateById = function (data) {
    return req.get({
        url: '/forms/template/id',
        data,
    })
}
formsApi.getFormTemplateByPath = function (data) {
    return req.get({
        url: '/forms/template/path',
        data,
    })
}

formsApi.saveFormTemplate = function (data) {
    return req.post({
        url: '/forms/template',
        data,
    })
}

formsApi.publish = function (data) {
    return req.post({
        url: '/forms/template/publish',
        data,
    })
}
formsApi.getHistory = function (data) {
    return req.get({
        url: '/forms/template/history',
        data,
    })
}
