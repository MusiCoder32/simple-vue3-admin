import req from '../request'

const business = '/lmsmp-business'

export const memberApi = {
    get(data) {
        return req.post({
            url: business + '/memberManager/pageList',
            data,
        })
    },
    getProjectMemberList(data) {
        return req.post({
            url: business + '/memberManager/projectMemberList',
            data,
        })
    },
    addProjectMemberList(data) {
        return req.post({
            url: business + '/memberManager/affirmInsert',
            data,
        })
    },
    getProjectRoleList(data) {
        return req.get({
            url: '/lmsmp-admin/role/queryProjectRoleSelect',
            data,
        })
    },
    getMemberAlterRecords(data) {
        return req.get({
            url: business + '/memberManager/getMemberAlterRecords',
            data,
        })
    },
    getCurrentUserFilePrivilege(data) {
        return req.post({
            url: business + '/memberManager/getCurrentUserFilePrivilege',
            data,
        })
    },
    deleteProjectMembers(data) {
        return req.post({
            url: business + '/memberManager/affirmDelete',
            data,
        })
    },
    getUpdateUserFilePrivilege(data) {
        return req.post({
            url: business + '/memberManager/getUpdateUserFilePrivilege',
            data,
        })
    },
    affirmUpdate(data) {
        return req.post({
            url: business + '/memberManager/affirmUpdate',
            data,
        })
    },
    getMemberAlterRecordDetails(data) {
        return req.post({
            url: business + '/memberManager/getMemberAlterRecordDetails',
            data,
        })
    },
    checkProjectFile(data) {
        return req.get({
            url: business + '/memberManager/checkProjectFile',
            data,
        })
    },
}
export const progressApi = {
    get(data) {
        return req.post({
            url: business + '/memberProgress/pageList',
            data,
        })
    },
    getMemberAlterRecordDetails(data) {
        return req.post({
            url: business + '/memberProgress/getMemberAlterRecordDetails',
            data,
        })
    },
    getAlterBAFilePrivilege(data) {
        return req.post({
            url: business + '/memberManager/getAlterBAFilePrivilege',
            data,
        })
    },
    getComments(data) {
        return req.get({
            url: business + '/memberProgress/queryDraftComments',
            data,
        })
    },
    save(data) {
        return req.post({
            url: business + '/memberProgress/save',
            data,
        })
    },
    submit(data) {
        return req.post({
            url: business + '/memberProgress/submit',
            data,
        })
    },
    done(data) {
        return req.post({
            url: business + '/memberProgress/done',
            data,
        })
    },
}
export const approvalApi = {
    get(data) {
        return req.post({
            url: business + '/memberApprove/pageList',
            data,
        })
    },
    submit(data) {
        return req.post({
            url: business + '/memberApprove/submit',
            data,
        })
    },
    reject(data) {
        return req.post({
            url: business + '/memberApprove/reject',
            data,
        })
    },
}
