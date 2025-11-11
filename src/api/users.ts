import req from './request'

export const getUserInfo = () => {
    return req.get({
        url: '/lmsmp-admin/user/queryUerPrivilage',
    })
}
export const getProjectAuth = (data) => {
    return req.get({
        url: '/lmsmp-business/detailPageButtonPrivilege/getPrivilege',
        data,
    })
}
export const getNetworkAuth = (data) => {
    return req.get({
        url: '/lmsmp-business/privapply/getTypes',
        data,
    })
}
export const logout = (data) => {
    return req.get({
        url: '/sso/logout',
        data,
    })
}
export const orgApi = {
    getOrgTree(data) {
        return req.get({
            url: '/lmsmp-admin/org/queryOrgTree',
            data,
        })
    },
    getOrgTable(data) {
        return req.post({
            url: '/lmsmp-admin/org/orgTreeSearchPageList',
            data,
        })
    },
}
export const rolesApi = {
    get(data) {
        return req.post({
            url: '/lmsmp-admin/role/pageList',
            data,
        })
    },
    add(data) {
        return req.post({
            url: '/lmsmp-admin/role/addManBase',
            data,
        })
    },
    update(data) {
        return req.post({
            url: '/lmsmp-admin/role/updateBase',
            data,
        })
    },
    del(data) {
        return req.get({
            url: '/lmsmp-admin/role/deleteById',
            data,
        })
    },
    details(data) {
        return req.get({
            url: '/lmsmp-admin/role/queryBaseById',
            data,
        })
    },
    getRolePermissions(data) {
        return req.get({
            url: '/lmsmp-admin/role/queryRoleMenu',
            data,
        })
    },
    giveRolePermissions(data) {
        return req.post({
            url: '/lmsmp-admin/role/saveRoleMenu',
            data,
        })
    },
    updateRoleEnable(data) {
        return req.post({
            url: '/lmsmp-admin/role/updateEnable',
            data,
        })
    },
    getRoleUsers(data) {
        return req.post({
            url: '/lmsmp-admin/role/roleUserPageList',
            data,
        })
    },
    delRoleUser(data) {
        return req.get({
            url: '/lmsmp-admin/role/deleteRoleUser',
            data,
        })
    },
    saveRoleUsers(data) {
        return req.post({
            url: '/lmsmp-admin/role/saveRoleUser',
            data,
        })
    },
    getRoleOrgTree(data) {
        return req.get({
            url: '/lmsmp-admin/role/queryRoleOrgTree',
            data,
        })
    },
    getRoleOrgTable(data) {
        return req.post({
            url: '/lmsmp-admin/role/roleOrgTreeSearchPageList',
            data,
        })
    },
}
export const usersApi = {
    get(data) {
        return req.post({
            url: '/lmsmp-admin/user/pageList',
            data,
        })
    },
    getOrg(data) {
        return req.post({
            url: '/lmsmp-admin/org/queryUserSelect',
            data,
        })
    },
    getConfigUserRole(data) {
        return req.post({
            url: '/lmsmp-admin/user/queryConfigUserRole',
            data,
        })
    },
    saveConfigUserRole(data) {
        return req.post({
            url: '/lmsmp-admin/user/saveUserRole',
            data,
        })
    },
    getBaseInfo(data) {
        return req.get({
            url: '/lmsmp-admin/user/queryUserById',
            data,
        })
    },
    getRoleList(data) {
        return req.get({
            url: '/lmsmp-admin/user/queryUserRoleById',
            data,
        })
    },
    getProjectList(data) {
        return []
    },
    getOperateLog(data) {
        return req.get({
            url: '/lmsmp-admin/user/queryOperateLogVO',
            data,
        })
    },
    getOrgSelectData(data) {
        return req.post({
            url: '/lmsmp-admin/org/queryUserSelect',
            data,
        })
    },
    getMockOrgData(data) {
        return req.get({
            url: '/user/mockOrgData',
            data,
        })
    },
}
export const menusApi = {
    get() {
        return req.post({
            url: '/lmsmp-admin/menu/list',
        })
    },
    add(data) {
        return req.post({
            url: '/lmsmp-admin/menu/add',
            data,
        })
    },
    del(data) {
        return req.get({
            url: '/lmsmp-admin/menu/deleteById',
            data,
        })
    },
    update(data) {
        return req.post({
            url: '/lmsmp-admin/menu/update',
            data,
        })
    },
    updateSort(data) {
        return req.post({
            url: '/lmsmp-admin' + '/menu/updateSortNumber',
            data,
        })
    },
}
export const networkAuthApi = {
    add(data) {
        return req.post({
            url: '/lmsmp-business/privapply/save',
            data,
        })
    },
    update(data) {
        return req.post({
            url: '/lmsmp-business/privapply/submit',
            data,
        })
    },
    reject(data) {
        return req.post({
            url: '/lmsmp-business/privapply/reject',
            data,
        })
    },
    done(data) {
        return req.post({
            url: '/lmsmp-business/privapply/done',
            data,
        })
    },
    get(data) {
        return req.post({
            url: '/lmsmp-business/privapply/pageList',
            data,
        })
    },
    getDetails(data) {
        return req.get({
            url: '/lmsmp-business/privapply/getdetail',
            data,
        })
    },
    //获取核心商务条件中的项目金额原币、项目金额人民币、土地价格原币、土地价格人民币明文
    async getProcJe(data) {
        let result = {}
        try {
            result = await req.get({
                url: '/lmsmp-business/privapply/getProcJe',
                data,
            })
            //去除接口中值为空的数据，值为空时表时该项目未使用到为空的字段
            for (const key in result) {
                if (result[key] === null || result[key] === undefined) {
                    delete result[key]
                }
            }
        } catch (e) {
            console.log(e)
        }
        return result
    },
}
export const logApi = {
    get(data) {
        // return req.post({
        //     url: '/lmsmp-business/log',
        //     data,
        // })
        return {
            list: [],
            total: 0,
        }
    },
}
