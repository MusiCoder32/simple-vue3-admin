export enum ProjectNodeLabelEnum {
    proc_build_stage = '项目立项',
    proc_estimate_stage = '项目评估',
    proc_approve_stage = '项目审批',
    proc_perform_stage = '项目履行',
    sub_build_unsubmit = '未提交',
    sub_build_approve = '立项审批',
    sub_build_confirm = '立项确认',
    sub_build_reject = '立项驳回',
    sub_build_return = '立项退回',
    sub_build_done = '已终止',
    sub_build_achieve = '已立项',
    sub_estimate_pending = '待评估',
    sub_estimate_doing = '评估中',
    sub_estimate_preapprove = '审批预审',
    sub_estimate_preapprove_reject = '预审驳回',
    sub_estimate_approve_reject = '审批驳回',
    sub_estimate_achieve = '已评估',
    sub_approve_pending = '待审批',
    sub_approve_doing = '审批中',
    sub_approve_reject = '审批驳回',
    sub_approve_close = '审批结案',
    sub_approve_achieve = '已结案',
    sub_perform_pending = '待履行',
    sub_perform_doing = '履行中',
    sub_perform_confirm = '履行确认',
    sub_perform_reject = '履行确认驳回',
    sub_perform_normal_done = '履行完结',
    sub_perform_exception_done = '异常履行完结',
    main_flow_pause = '项目暂停',
    main_flow_done = '项目终止',
}
export const ProjectStageEnum = {
    项目立项: 'proc_build_stage',
    项目评估: 'proc_estimate_stage',
    项目审批: 'proc_approve_stage',
    项目履行: 'proc_perform_stage',
}
// 项目子状态
export const ProjectSubstateEnum = {
    项目立项: {
        未提交: 'sub_build_unsubmit',
        立项审批: 'sub_build_approve',
        立项确认: 'sub_build_confirm',
        立项驳回: 'sub_build_reject',
        立项退回: 'sub_build_return',
        已终止: 'sub_build_done',
        已立项: 'sub_build_achieve',
    },
    项目评估: {
        待评估: 'sub_estimate_pending',
        评估中: 'sub_estimate_doing',
        审批预审: 'sub_estimate_preapprove',
        预审驳回: 'sub_estimate_preapprove_reject',
        审批驳回: 'sub_estimate_approve_reject',
        已评估: 'sub_estimate_achieve',
    },
    项目审批: {
        待审批: 'sub_approve_pending',
        审批中: 'sub_approve_doing',
        审批驳回: 'sub_approve_reject',
        审批结案: 'sub_approve_close',
        已结案: 'sub_approve_achieve',
    },
    项目履行: {
        待履行: 'sub_perform_pending',
        履行中: 'sub_perform_doing',
        履行确认: 'sub_perform_confirm',
        履行确认驳回: 'sub_perform_reject',
        履行完结: 'sub_perform_normal_done',
        异常履行完结: 'sub_perform_exception_done',
    },
    // 项目暂停: 'main_flow_pause',
    // 项目终止: 'main_flow_done',
}
// 项目状态
export enum ProjectStatusEnum {
    待立项 = 'main_build_pending',
    立项终止 = 'main_build_done',
    已立项 = 'main_estimate_pending',
    评估中 = 'main_estimate_doing',
    已评估 = 'main_approve_pending',
    审批中 = 'main_approve_doing',
    已结案 = 'main_perform_pending',
    履行中 = 'main_perform_doing',
    项目完结 = 'main_perform_done',
    项目暂停 = 'main_flow_pause',
    项目终止 = 'main_flow_done',
}

// 变更类型
export const ProjectChangeTypeEnum = {
    信息变更: 'content',
    项目暂停: 'pause',
    项目重启: 'restart',
    项目终止: 'done',
}
// 变更方式
export const ProjectChangeMethodEnum = {
    成员发起: 'MEN',
    系统识别: 'SYS',
}
// 变更状态
export const ProjectChangeStatusEnum = {
    审批中: 'submit',
    已通过: 'pass',
    已驳回: 'reject',
    已终止: 'terminate',
    已提交: 'submitoff',
}

// 审批类型
export const ProjectApprovalType = {
    加密: 'encrypt',
    解密: 'decrypt',
}

//发起状态
export const initStatusEnum = {
    已发起: 'submit',
    异常终止: 'exception_terminate',
    待发起: 'init_pending',
    终止发起: 'init_done',
    已终止: 'terminate',
    已通过: 'pass',
}

//历时区间
export const costTimeKindEnum = {
    0: '0-2天',
    1: '2-5天',
    2: '5-10天',
    3: '10-15天',
    4: '15天以上',
}
