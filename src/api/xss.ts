import req from './request'

export const xssApi = {}
xssApi.getScript = function () {
    return req.get({
        url: '/xss/script',
    })
}
xssApi.getImg = function () {
    return req.get({
        url: '/xss/img',
    })
}
xssApi.getHref = function () {
    return req.get({
        url: '/xss/href',
    })
}
