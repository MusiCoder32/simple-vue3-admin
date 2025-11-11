export enum LocalEnum {
    中文 = 'zh-cn',
    English = 'en',
}

export enum MenuType {
    菜单 = 'MENU',
    按钮 = 'BUTTON',
}
export enum RoleTypeEnum {
    系统角色 = 'SYSTEM',
    项目角色 = 'PROJECT',
}
export enum CreateMethodEnum {
    系统创建 = 'SYSTEM',
    人工创建 = 'MAN',
}
export enum UserGrantMethodEnum {
    人工配置 = '0',
    项目配置 = '1',
    系统识别 = '2',
}

export enum InitApprNodeEnum {
    申请人 = 'proc_create_confirm_01',
    项目法务部门负责人 = 'proc_create_confirm_02',
    主办律师 = 'proc_create_confirm_03',
    结案 = 'proc_create_confirm_00',
}

export enum ChangeApprNodeEnum {
    申请人 = 'proc_alter_approve_01',
    主办律师 = 'proc_alter_approve_02',
    结案 = 'proc_alter_approve_00',
}

export enum EvaluateItemEnum {
    会议纪要 = 'item_meeting_minutes',
    尽调报告 = 'item_survey_report',
    合同 = 'item_contract',
    其他影响投资决策的过程性资料 = 'item_other_resource',
    其他事宜 = 'item_other_matter',
}
export enum DeliverablesEnum {
    尽调报告 = 'release_deliverables_report',
    其他 = 'release_deliverables_other',
}

// 审批状态
export enum ApprovalStatusEnum {
    审批中 = 'appr_doing',
    已驳回 = 'appr_reject',
    已通过 = 'appr_achieve',
    已终止 = 'appr_done',
}

export enum ProjectRelateType {
    前置 = 'relate_before',
    并列 = 'relate_parallel',
    后续 = 'relate_after',
}
export enum ReleaseTasksApprEnum {
    发布人 = 'item_release_approve_01',
    责任人 = 'item_release_approve_02',
    责任部门负责人 = 'item_release_approve_03',
    结案 = 'item_release_approve_00',
}
export enum PlanStatusEnum {
    未维护 = '0',
    已维护 = '1',
}
//履行异常枚举
export enum AbnormalStatusEnum {
    异常 = '1',
    正常 = '0',
}
//履行风险
export enum RiskStatusEnum {
    风险 = '1',
    正常 = '0',
}

//项目变更进度-审批结果
export enum ApprovalResultEnum {
    通过 = '1',
    未通过 = '0',
}

export enum MemberChangeTypeEnum {
    新增成员 = 'insert',
    删除成员 = 'delete',
    修改成员权限 = 'update_privilege',
}
export enum ModifyProjectInfoEnum {
    修改 = '1',
    不修改 = '0',
}
export enum ProjectApproveResultEnum {
    审批通过 = 'PASS',
    审批驳回 = 'REJECT',
}

export enum WithOrWithoutEnum {
    有 = '1',
    无 = '0',
}

export enum RightOrWrongEnum {
    正确 = '1',
    错误 = '0',
}

export enum LineOrOfflineEnum {
    线下 = '1',
    线上 = '0',
}

export enum ChangeTypeEnum {
    项目信息变更 = 'content',
    项目暂停 = 'pause',
    项目重启 = 'restart',
    项目终止 = 'done',
}

export enum noticeStatusEnum {
    已读 = 'read',
    未读 = 'unread',
}
export const enum ProjectRoleEnum {
    申请人 = '15',
    主办律师 = '16',
    协办律师 = '17',
    合同上传人 = '21',
}
export enum ConstructStatusEnum {
    起草中 = 'draft',
    评审中 = 'reviewing',
    审批中 = 'approvaling',
    异常结案 = 'abnormalClosure',
    待用印 = 'seal',
    用印中 = 'sealing',
    待签订 = 'sign',
    已签订 = 'signed',
    不签订 = 'no_sign',
    履行中 = 'performing',
    履行结束 = 'performed',
    已解除 = 'removed',
    已关闭 = 'closed',
    审批不通过 = 'not_passed',
}

export enum YesOrNoEnum {
    是 = '1',
    否 = '0',
}

// 消息通知对应的任务是否已处理
export enum MessageTaskEnum {
    未处理,
    已处理,
}

// 完成情况
export enum CompleteStatusEnum {
    未发布 = 'UNPUB',
    进行中 = 'DOING',
    未开始 = 'UNSTART',
    已终止 = 'STOPED',
    已完成 = 'FINISHED',
}

//合同上传状态
export enum UploadStatus {
    未上传 = 'NONE',
    部分上传 = 'PART',
    全部上传 = 'ALL',
}

//合同类型
export enum ContractType {
    主合同 = 'MAIN',
    附属合同 = 'SUB',
}

//合同变更类型
export enum ContractChangeType {
    新增合同 = 'INSERT',
    删除合同 = 'DELETE',
}
export enum riskHandleStatus {
    待处理 = 'PENDING',
    处理中 = 'DOING',
    已解除 = 'RELEASED',
    无需处理 = 'NONE',
}
// 收费形式
export enum ChargeFormEnum {
    小时费率 = 'outChargeHourRate',
    封顶价 = 'outChargeCapPrice',
    固定单价 = 'outChargeFixUnitPrice',
    固定总价 = 'outChargeFixTotalPrice',
    其他 = 'outChargeOther',
}

export enum performRiskTypeEnum {
    改善类 = 'UPGRADE',
    警示类 = 'WARNING',
}
// 履行类型
export enum PerformTypeEnum {
    交货 = '0',
    收货 = '1',
    付款 = '2',
    交割 = '3',
    工商变更 = '4',
    公司设立 = '5',
    建设 = '6',
}

export enum riskSourceEnum {
    未拦截风险同步 = 'UN_INTERCEPT_RISK',
    履行异常创建 = 'PERFORM_EXCEPTION',
    人工创建 = 'MAN',
}

// 项目风险等级
export enum RiskLevelEnum {
    红线 = '0',
    黄线 = '1',
    黑线 = '2',
}
// 风险汇报层级
export enum ReportLevelEnum {
    总裁 = '0',
    事业群CEO = '1',
    '副总裁/总经理' = '2',
    '工厂厂长/高级经理' = '3',
    部门经理 = '4',
}
// 发起状态
export enum SendStatusEnum {
    未发起 = '0',
    已发起 = '1',
}

export enum handoverStatusEnum {
    草稿 = 'draft',
    已提交 = 'submitted',
}

export enum A4Size {
    height = 1123,
    width = 794,
}
// 项目委托 状态
export enum MandateStatusEnum {
    草稿 = 'draft',
    已提交 = 'submit',
    委托中 = 'entrust_doing',
    委托结案 = 'entrust_end',
}
//所处网格类型
export enum NetworkEnum {
    VPN = 'VPN',
    国内内网 = 'INN_INTER',
    海外内网 = 'INN_OUTER',
    未知网络 = 'UNKNOWN',
}
export enum EffectEnum {
    待生效 = '00',
    生效中 = '10',
    已失效 = '20',
}

// 项目需求
export enum XmxqTypeEnum {
    项目可行性分析,
    项目方案设计及风险评估,
    尽职调查,
    '文书的起草、评审、谈判',
    咨询,
}
// 收付方向
export enum SffxTypeEnum {
    收款,
    付款,
    '收款+付款',
    无,
}
// 项目投资领域
export enum ProjectInvestEnum {
    半导体,
    新材料,
    整车,
    汽车零部件,
    电池,
    电池零部件,
    人工智能,
    轨道交通,
    电子,
    金融,
    储能,
    矿产资源,
}
// 交付物类型
export enum DeliverablesTypeEnum {
    尽调报告 = 'release_deliverables_report',
    其他 = 'release_deliverables_other',
}
// 在职状态 枚举inJob outJob为前端定义，用于国际化，后端要的value值为中文
export enum JobStatusEnum {
    在职 = 'inJob',
    离职 = 'outJob',
}
// 启用状态
export enum EnableStatusEnum {
    未启用 = '0',
    已启用 = '1',
}
// 项目数据权限
export enum ProjectDataAuthEnum {
    仅本人参与项目 = '0',
    本人及下级参与项目 = '1',
    全集团项目 = '2',
}

//任务办理状态
export enum TaskHandleStatusEnum {
    待办 = 'to_do',
    已办 = 'done',
    暂停 = 'pause',
    终止 = 'terminate',
}
//任务办理状态
export enum MessageReadStatusEnum {
    已读 = '1',
    未读 = '0',
}

//任务办理状态
export enum LangEnum {
    中文 = 'zh-cn',
    英文 = 'en',
}
