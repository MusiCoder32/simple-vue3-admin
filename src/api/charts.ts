import req from './request'
import ApiClass from './api-class'

export const chartsApi = new ApiClass('/charts')
chartsApi.getChartData = function (data) {
    return req.get({
        url: '/charts/chart',
        data,
    })
}
chartsApi.getTimeEnum = function () {
    return req.get({
        url: '/charts/time',
    })
}
chartsApi.getRingData = function () {
    return req.get({
        url: '/charts/pie',
    })
}

chartsApi.getPieData = function () {
    return req.get({
        url: '/charts/data',
    })
}
