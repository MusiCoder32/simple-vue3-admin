import req from './request'

export function get200() {
    return req.get({
        url: '/200',
    })
}
export function downloadTest(type) {
    return req.get({
        url: '/test.' + type,
        otherConfig: {
            responseType: 'blob',
        },
    })
}
export function fileUpload(data) {
    return req.post({
        url: '/upload',
        data,
        otherConfig: {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    })
}

export const fileUploadApi = {
    sliceStart(data) {
        return req.get({
            url: '/lmsmp-file/file/initMul',

            data,
        })
    },
    sliceUpload(data) {
        return req.post({
            url: '/lmsmp-file/file/uploadMul',

            data,
            otherConfig: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        })
    },
    mergeUpload(data) {
        return req.post({
            url: '/lmsmp-file/file/completeMul',

            data,
        })
    },
    singleUpload(data) {
        return req.post({
            url: '/lmsmp-file/file/uploadSmall',

            data,
            otherConfig: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        })
    },
    getFileUrl(data) {
        return req.get({
            url: '/lmsmp-file/file/getObjectUrl',

            data,
        })
    },
    downMinioFile(data) {
        return req.get({
            url: '/lmsmp-file/file/download',
            otherConfig: {
                responseType: 'blob',
            },
            data,
        })
    },
    downPackageFile(data) {
        return req.post({
            url: '/lmsmp-file/file/downloadPackage',
            otherConfig: {
                responseType: 'blob',
            },
            data,
        })
    },
    getWpsPreview(data) {
        return req.post({
            url: '/lmsmp-file/wps/getPreviewUrl',
            data,
        })
    },
}

export function delFile(data) {
    return req.get({
        url: '/lmsmp-file/file/removeObject',
        data,
    })
}

export function getOrgApi(data) {
    return req.post({
        url: '/lmsmp-org/saveOrUpdateOrg',
        data,
    })
}

//查询项目文件可见范围接口【附件公共组件】
export function getFileRange(data) {
    return req.post({
        url: '/lmsmp-business/procRelate/getProcFileViewUserList',
        data,
    })
}

// 获取前往OA查看的链接地址
export function getJumpOaUrl(data) {
    return req.get({
        url: '/lmsmp-business/toOAView/getJumpUrl',
        data,
    })
}

// 获取州数据
export function getContinentList(data) {
    return req.get({
        url: '/lmsmp-business/third/getContinentList',
        data,
    })
}

//心跳接口

export function getHealth() {
    return req.get({ url: '/lmsmp-admin/webhealth', showError: false })
}

//获取消息或者任务详情
export function getTaskOrMessageInfo(data) {
    return req.get({ url: '/lmsmp-business/task/queryByTaskInstId', data })
}
