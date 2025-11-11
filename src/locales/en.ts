export default {
    'error message': {
        default: 'System error, please try again later',
        '401': 'Authentication failed en, unable to access system resources',
        '403': 'The current operation does not have permission',
        '404': 'Access resource does not exist',
        // 404: 'Request path error',
        '500': 'Server error',
        70001: 'The project has been terminated or completed and cannot be changed',
        70002: 'During the project change approval process, it is not allowed to initiate it repeatedly. Please initiate it after the change approval process is completed',
        70003: 'The project has been paused. Please restart the project before initiating again',
        70004: 'The current project status cannot initiate a change in project information. Please initiate it after the project approval is completed',
        70005: 'The project is currently under approval and cannot initiate changes to project information',
        70006: 'The project is currently undergoing pre-approval and cannot initiate changes to project information',
        70007: 'The project has not been paused and cannot be restarted',
        90001: 'The approval process has been closed, and viewing approval attachments is not supported',
        QueryFaild: 'Project information interface query failed, project data is empty',
        SaveProjectInstError: 'Failed to save project instance data',
        ParamInvalid: 'The input object or data is empty',
        SecrecyParamError: 'Data is empty, no encryption or decryption information was found for the project',
        SecrecyFlowHandleError: 'Failed to process encryption and decryption process',
        EncryptOrDecryptError: 'Project encryption or decryption failed',
        QueryProjectError: 'Query failed, no project information found',
        SaveProjectRelateError: 'The associated project has already been added, please do not add it again',
        SaveMajorRiskError:
            'There are currently no risk items that require significant risk notification. Please confirm again',
        EntrustAddError: 'Within the same effective period, the same principal cannot be added',
        30001: 'Failed to initiate OA project approval',
        30002: 'Data exception, please contact the administrator',
        30003: 'This process has been rejected by others. Please refresh the page and check',
        30004: 'The current node does not have permission to operate',
        30005: 'Failed to create OA process',
        30006: 'The project is currently undergoing information change approval and cannot initiate pre-approval',
        30007: 'The role of liaison for the review department does not exist. Please configure and change the role in team management',
        30008: 'Abnormal query of contract information',
        30009: 'The project has been completed and cannot be operated',
        30010: 'Save failed, the current project status does not support modifying the fulfillment plan',
        70008: 'The current change status does not support this operation',
        70009: 'No changes in project information detected, unable to submit',
        10001: 'Failed to query project status',
        10002: 'Please log in and proceed with the operation',
        SaveSelfRelateError: 'Query failed, please do not enter the current project number',
        110001: 'Your current network is undefined, please contact the administrator',
        110002: 'The current user is not the current process handler',
        110003: 'The current node does not allow submission',
        110004: 'The current node does not allow rejection',
        110005: 'The current node does not allow termination',
        110006: "There is no responsible person in the current applicant's department",
        EntrustInfoError: 'The information of the entrusted party cannot be empty',
        defaultRequestErrorMessage: 'Unknown system error, please provide feedback to the administrator',
    },
    common: {
        projectName: 'Legal Affairs Management Platform (Major Project)',
        uploadText: 'Upload',
        inputText: 'Enter',
        selectText: 'Select',
        selectDate: 'Please select a date',
        selectAll: 'Select All',
        clearSelected: 'Clear Selection',
        operations: 'Operation',
        deal: 'Handle',
        view: 'View',
        edit: 'Edit',
        number: 'SN',
        query: 'Search',
        reset: 'Reset',
        add: 'Add',
        append: 'Add',
        addNewLine: 'Add Row',
        save: 'Save',
        unsave: 'Not Save',
        yes: 'Yes',
        no: 'No',
        done: 'Terminate',
        confirm: 'Confirm',
        determine: 'Confirm',
        submit: 'Submit',
        resubmit: 'Resubmit',
        cancel: 'Cancel',
        delete: 'Delete',
        alter: 'Modify',
        time: 'Time',
        fold: 'Collapse',
        unfold: 'Expand',
        close: 'Close',
        reject: 'Reject',
        detail: 'Details',
        next: 'Next Step',
        last: 'Previous',
        back: 'Return',
        init: 'Project Initiation',
        transmit: 'Pass On',
        allot: 'Allocation',
        withdraw: 'Withdraw',
        approval: 'Approval',
        publish: 'Release',
        perform: 'Fulfill',
        nothing: 'No Data',
        more: 'More',
        clickView: 'Click to view',
        existChange: 'Modified',
        beforeChange: 'Before modification',
        afterChange: 'After modification',
        unconfirm: 'Unconfirmed',
        upload: 'Upload',
        batchDownload: 'Batch Download',
        downloadSelected: 'Download Selected Files',
        downloadAll: 'Download All Files',
        download: 'Download',
        notStarted: 'Not Started',
        inProcess: 'In Progress',
        confirmed: 'Confirmed',
        noOptions: 'No Options Available',
        noData: 'No Data',
        titleName: 'This is a title',
        secretTooltip: 'Confidential Project',
        oaView: 'Access OA for Details',
        initiate: 'Initiate',
        batchDelete: 'Batch Delete',
        select: 'Select',
        refresh: 'Refresh',
        closeOthers: 'Close Other',
        closeLeft: 'Close the left side',
        closeRight: 'Close the right side',
        closeAll: 'Close all',
        logout: 'Log Out',
        exportPreview: 'Export Preview',
        escExportPreview: 'Exit Preview',
        inputContractName: 'Please enter the contract name',
        // other: 'Other',
        other: '其他',
        guide: 'Guide',
    },
    // 菜单
    menus: {
        '/workbench': 'Workspace',
        '/workbench/workbench': 'Personal Workbench',
        '/workbench/task': 'My Tasks',
        '/workbench/project': 'My Projects',
        '/workbench/handover': 'Project handover',
        '/workbench/mandate': 'Entrusted matters',

        '/init': 'Project Initiation',
        '/init/create': 'Project Creation',
        '/init/confirm': 'Project Confirmation',

        '/team': 'Project Team Management',
        '/team/member': 'Member Management',
        '/team/progress': 'Member Change Progress Inquiry',
        '/team/approval': 'Member Change Approval',

        '/evaluate': 'Project Evaluation',
        '/evaluate/items': 'Assessment Item Management',
        '/evaluate/tasks': 'Task Release Management',
        '/evaluate/pre-approval': 'Approval Pre-review Management',
        '/evaluate/progress': 'Evaluation Progress Inquiry',

        '/approval': 'Project Approval',
        '/approval/init': 'Initiate Project Approval',
        '/approval/progress': 'Approval Progress Inquiry',
        '/approval/finish': 'Approval Closure',

        '/perform': 'Project Fulfillment',
        '/perform/contract': 'Project Contract',
        '/perform/plan': 'Fulfillment Plan',
        '/perform/abnormal': 'Fulfillment Exception',
        '/perform/risk': 'Fulfillment Risk',
        '/perform/finish': 'Fulfillment Completion',

        '/risk': 'Project Risk Management',
        '/risk/evaluate': 'Risk Assessment',
        '/risk/confirm': 'Risk Confirmation',
        '/risk/inform': 'Notification of Significant Risks',
        '/risk/inform/init': 'Notification of Significant Risks Initiation',
        '/risk/inform/list': 'Notification of Significant Risks List',

        '/outsource': 'Outsourced Situation Management',

        '/change': 'Project Change Management',
        '/change/init': 'Project Change Initiation',
        '/change/progress': 'Project Change Progress Inquiry',

        '/project-link': 'Associated Project Management',

        '/secrecy': 'Confidential Project Management',
        '/secrecy/init': 'Confidential Project Management',
        '/secrecy/approval': 'Confidential Project Approval',
        '/secrecy/approval-progress': 'Confidential Project Approval Inquiry',

        '/synthesis': 'Comprehensive Project Inquiry',
        '/synthesis/library': 'Project Repository Query',
        '/synthesis/file': 'Project Files Management',

        '/background': 'Backstage Management',
        '/background/authority': 'Permission Management',
        '/background/authority/roles': 'Role Management',
        '/background/authority/users': 'User Management',
        '/background/authority/network': 'Permission Application',

        '/board': 'Data Board',

        // 统计分析
        '/statistics-analysis': 'Statistical Analysis',
        //数据概览
        '/statistics-analysis/overview': 'Data Overview',
        '/statistics-analysis/overview/base': 'Basic Data Overview',
        '/statistics-analysis/overview/distribution': 'Overview of Project Distribution',
        '/statistics-analysis/overview/type': 'Overview of Project Types',
        //变化趋势
        '/statistics-analysis/trend': 'Trend',
        '/statistics-analysis/trend/increase': 'Project Growth Trend',
        '/statistics-analysis/trend/change': 'Trends in Investment Projects',
        //处理分析
        '/statistics-analysis/analysis': 'Processing Analysis',
        '/statistics-analysis/analysis/method': 'Closing Method',
        '/statistics-analysis/analysis/outsource': 'Outsourcing Situation',
        '/statistics-analysis/analysis/duration': 'Processing Time',
        //数据统计
        '/statistics-analysis/statistics': 'Statistics of Data',
        '/statistics-analysis/statistics/evaluation': 'Assessment Data',
        '/statistics-analysis/statistics/brief': 'Briefing Data',
        '/statistics-analysis/statistics/project': 'Project Data',

        '/system': '系统管理',
        '/system/menus': '菜单权限管理',

        '/form-manage': '表单管理',

        '/demo': 'demo',
        '/demo/home': '综合',
        '/demo/ellipsis': 'ellipsis',
        '/demo/files': '文件mino',
        '/demo/files-mock': '文件mock',
        '/demo/table': 'table',
        '/demo/merge': 'table-merge',
        '/demo/force': 'force',
        '/demo/charts': 'charts',
    },
    // 枚举
    enum: {
        initTime: 'Project Initiation Time',
        applyTime: 'Application Date',

        // item_release_task: 'Publish Task',
        item_release_task: '发布任务',

        // ProjectRelateType: {
        //     relate_before: 'Front',
        //     relate_parallel: 'Coordinate',
        //     relate_after: 'Follow-up',
        // },
        ProjectRelateType: {
            relate_before: '前置',
            relate_parallel: '并列',
            relate_after: '后续',
        },

        // MemberChangeTypeEnum: {
        //     insert: 'Add Member',
        //     delete: 'Remove Member',
        //     update_privilege: 'Modify member permissions',
        // },
        MemberChangeTypeEnum: {
            insert: '新增成员',
            delete: '删除成员',
            update_privilege: '修改成员权限',
        },

        ProjectDataAuthEnum: {
            '0': '仅本人参与项目',
            '1': '本人及下级参与项目',
            '2': '全集团项目',
        },

        EnableStatusEnum: {
            '0': '未启用',
            '1': '已启用',
        },

        JobStatusEnum: {
            inJob: '在职',
            outJob: '离职',
        },

        ChargeFormEnum: {
            outChargeHourRate: '小时费率',
            outChargeCapPrice: '封顶价',
            outChargeFixUnitPrice: '固定单价',
            outChargeFixTotalPrice: '固定总价',
            outChargeOther: '其他',
        },

        XmxqTypeEnum: {
            0: '项目可行性分析',
            1: '项目方案设计及风险评估',
            2: '尽职调查',
            3: '文书的起草、评审、谈判',
            4: '咨询',
        },

        SffxTypeEnum: {
            0: '收款',
            1: '付款',
            2: '收款+付款',
            3: '无',
        },

        ProjectInvestEnum: {
            0: '半导体',
            1: '新材料',
            2: '整车',
            3: '汽车零部件',
            4: '电池',
            5: '电池零部件',
            6: '人工智能',
            7: '轨道交通',
            8: '电子',
            9: '金融',
            10: '储能',
            11: '矿产资源',
        },

        // EvaluateItemEnum: {
        //     item_meeting_minutes: 'Meeting Minutes',
        //     item_survey_report: 'Due Diligence Report',
        //     item_contract: 'Contract',
        //     item_other_resource: 'Other Process Materials Affecting Investment Decisions',
        //     item_other_matter: 'Other Matters',
        // },
        EvaluateItemEnum: {
            item_meeting_minutes: '会议纪要',
            item_survey_report: '尽调报告',
            item_contract: '合同',
            item_other_resource: '其他影响投资决策的过程性资料',
            item_other_matter: '其他事宜',
        },

        // DeliverablesTypeEnum: {
        //     release_deliverables_report: 'Due Diligence Report',
        //     release_deliverables_other: 'Other',
        // },

        DeliverablesTypeEnum: {
            release_deliverables_report: '尽调报告',
            release_deliverables_other: '其他',
        },

        readEnum: {
            unread: 'Unread',
            read: 'Read',
            all: 'All',
        },

        // YesOrNoEnum: {
        //     0: 'No',
        //     1: 'Yes',
        // },
        YesOrNoEnum: {
            0: '否',
            1: '是',
        },

        PlanStatusEnum: {
            '0': '未维护',
            '1': '已维护',
        },

        // WithOrWithoutEnum: {
        //     0: 'No',
        //     1: 'Yes',
        // },
        WithOrWithoutEnum: {
            0: '无',
            1: '有',
        },

        // RightOrWrongEnum: {
        //     0: 'Wrong',
        //     1: 'Correct',
        // },
        RightOrWrongEnum: {
            0: '错误',
            1: '正确',
        },

        // LineOrOfflineEnum: {
        //     0: 'Online',
        //     1: 'Offline',
        // },
        LineOrOfflineEnum: {
            0: '线上',
            1: '线下',
        },

        MessageReadStatusEnum: {
            0: 'Unread',
            1: 'Read',
        },

        // ProjectStageEnum: {
        //     proc_build_stage: 'Project Initiation',
        //     proc_estimate_stage: 'Project Evaluation',
        //     proc_approve_stage: 'Project Approval',
        //     proc_perform_stage: 'Project Fulfillment',
        // },
        ProjectStageEnum: {
            proc_build_stage: '项目立项en',
            proc_estimate_stage: '项目评估',
            proc_approve_stage: '项目审批',
            proc_perform_stage: '项目履行',
        },

        ProjectInitStatus: {
            sub_build_unsubmit: '未提交',
            sub_build_approve: '立项审批',
            sub_build_confirm: '立项确认',
            sub_build_reject: '立项驳回',
            sub_build_return: '立项退回',
            sub_build_done: '已终止',
            sub_build_achieve: '已立项',
        },

        ProjectEvaluateStatus: {
            sub_estimate_pending: '待评估',
            sub_estimate_doing: '评估中',
            sub_estimate_preapprove: '审批预审',
            sub_estimate_preapprove_reject: '预审驳回',
            sub_estimate_approve_reject: '审批驳回',
            sub_estimate_achieve: '已评估',
        },

        ProjectApprovalStatus: {
            sub_approve_pending: '待审批',
            sub_approve_doing: '审批中',
            sub_approve_reject: '审批驳回',
            sub_approve_close: '审批结案',
            sub_approve_achieve: '已结案',
        },

        ProjectPerformStatus: {
            sub_perform_pending: '待履行',
            sub_perform_doing: '履行中',
            sub_perform_confirm: '履行确认',
            sub_perform_reject: '履行确认驳回',
            sub_perform_normal_done: '履行完结',
            sub_perform_exception_done: '异常履行完结',
        },
        // 项目状态
        ProjectStatus: {
            main_build_pending: '待立项',
            main_build_done: '立项终止',
            main_estimate_pending: '已立项',
            main_estimate_doing: '评估中',
            main_approve_pending: '已评估',
            main_approve_doing: '审批中',
            main_perform_pending: '已结案',
            main_perform_doing: '履行中',
            main_perform_done: '项目完结',
            main_flow_pause: '项目暂停',
            main_flow_done: '项目终止',
        },
        // 是否修改项目信息
        // ModifyProjectInfoEnum: {
        //     1: 'Modify',
        //     0: 'Do Not Modify',
        // },
        ModifyProjectInfoEnum: {
            1: '修改',
            0: '不修改',
        },
        // 项目审批结果
        // ProjectApproveResultEnum: {
        //     PASS: 'Approval Granted',
        //     REJECT: 'Approval Denied',
        // },
        ProjectApproveResultEnum: {
            PASS: '审批通过',
            REJECT: '审批驳回',
        },
        // 变更类型
        ChangeTypeEnum: {
            content: '项目信息变更',
            pause: '项目暂停',
            restart: '项目重启',
            done: '项目终止',
        },

        ProjectChangeTypeEnum: {
            content: '信息变更',
            pause: '项目暂停',
            restart: '项目重启',
            done: '项目终止',
        },
        // 变更方式
        ProjectChangeMethodEnum: {
            MEN: '成员发起',
            SYS: '系统识别',
        },
        // 变更状态
        ProjectChangeStatusEnum: {
            submit: '审批中',
            pass: '已通过',
            reject: '已驳回',
            terminate: '已终止',
            submitoff: '已提交',
        },
        // 审批类型
        ProjectApprovalType: {
            encrypt: '加密',
            decrypt: '解密',
        },
        // 审批状态
        ApprovalStatusEnum: {
            appr_doing: '审批中',
            appr_reject: '已驳回',
            appr_achieve: '已通过',
            appr_done: '已终止',
        },
        // 合同状态
        ContractStatusEnum: {
            draft: '起草中',
            reviewing: '评审中',
            approvaling: '审批中',
            abnormalClosure: '异常结案',
            seal: '待用印',
            sealing: '用印中',
            sign: '待签订',
            signed: '已签订',
            no_sign: '不签订',
            performing: '履行中',
            performed: '履行结束',
            removed: '已解除',
            closed: '已关闭',
            not_passed: '审批不通过',
        },
        //合同上传状态
        UploadStatus: {
            NONE: '未上传',
            PART: '部分上传',
            ALL: '全部上传',
        },
        //合同类型
        // ContractType: {
        //     MAIN: 'Main Contract',
        //     SUB: 'Accessories Contract',
        // },
        ContractType: {
            MAIN: '主合同',
            SUB: '附属合同',
        },
        //合同变更类型
        // ContractChangeType: {
        //     INSERT: 'Add New Contract',
        //     DELETE: 'Delete Contract',
        // },
        ContractChangeType: {
            INSERT: '新增合同',
            DELETE: '删除合同',
        },
        //风险处理状态
        riskHandleStatus: {
            PENDING: '待处理',
            DOING: '处理中',
            RELEASED: '已解除',
            NONE: '无需处理',
        },

        // alterTypes: {
        //     ADD: 'Add',
        //     DELETE: 'Delete',
        //     UPDATE: 'Edit',
        // },
        alterTypes: {
            ADD: '新增',
            DELETE: '删除',
            UPDATE: '编辑',
        },

        // exceptionSources: {
        //     SYSTEM: 'System Identification',
        //     MAN: 'Manually Created',
        // },
        exceptionSources: {
            SYSTEM: '系统识别',
            MAN: '人工创建',
        },

        PerformTypeEnum: {
            0: '交货',
            1: '收货',
            2: '付款',
            3: '交割',
            4: '工商变更',
            5: '公司设立',
            6: '建设',
        },

        performRiskType: {
            UPGRADE: '改善类',
            WARNING: '警示类',
        },

        riskSourceEnum: {
            UN_INTERCEPT_RISK: '未拦截风险同步',
            PERFORM_EXCEPTION: '履行异常创建',
            MAN: '人工创建',
        },
        // 完成情况
        CompleteStatusEnum: {
            UNPUB: '未发布',
            DOING: '进行中',
            UNSTART: '未开始',
            STOPED: '已终止',
            FINISHED: '已完成',
        },
        // 变更类型
        AlterTypeEnum: {
            ADD: '新增',
            DELETE: '删除',
            UPDATE: '编辑',
            STOP: '终止',
        },

        AbnormalStatusEnum: {
            '0': '正常',
            '1': '异常',
        },

        RiskStatusEnum: {
            '0': '正常',
            '1': '风险',
        },
        // 项目风险等级
        RiskLevelEnum: {
            0: '红线',
            1: '黄线',
            2: '黑线',
        },
        // 项目风险大类
        RiskCategoriesEnum: {
            56: '退出风险【C】',
            57: '业务承诺风险【C】',
            58: '资金风险【C】',
            59: '资金风险【L】',
            60: '知识产权风险【IP】',
            61: '治理结构及议事规则风险【C】',
            62: '股东权利风险【C】',
            63: '出资风险【C】',
            64: '设立风险【C】',
            65: '设立风险【L】',
            67: '合同风险【C】',
            68: '合同风险【L】',
            70: '环保及安全生产风险【L】',
            71: '纠纷及责任【L】',
            72: '财税风险【C】',
            73: '特殊权利风险【C】',
            74: '公司董监高及劳动人事风险【L】',
            75: '公司资产风险【L】',
            76: '关联交易及同业竞争风险【C】',
            77: '公司业务及投资风险【C】',
            78: '公司业务及投资风险【L】',
            79: '公司股东及股权风险【L】',
            80: '公司注册资本风险【L】',
            81: '公司设立及存续风险【L】',
            82: '其他风险【L】',
            83: '违约责任风险【L】',
            84: '权利限制风险【C】',
            85: '过度承诺风险【C】',
            86: '资金风险【C】',
            87: '资金风险【L】',
            88: '项目建设风险【C】',
            89: '收购风险【L】',
            90: '资产风险【C】',
            91: '资产风险【L】',
            92: '其他商务风险【C】',
            93: '其他风险【L】',
            94: '授权风险【L】',
            95: '适用及争议管辖风险【L】',
            96: '合同解除/终止风险【L】',
            97: '违约赔偿风险【C】',
            98: '救济权受限风险【L】',
            99: '商务限制风险【C】',
            100: '知识产权风险【IP】',
            101: '担保风险【L】',
            102: '合规风险(强迫劳工)【LC】',
            103: '（合作方）资信风险【C】',
            104: '主体风险【L】',
            105: '经营者集中风险【L】',
            106: '合规风险(反垄断及不正当竞争)【LC】',
            107: '合规风险(反商业贿赂)【LC】',
            108: '合规风险(个人隐私及数据保护)【LC】',
            109: '合规风险(出口管制及经济制裁)【LC】',
        },
        // 风险汇报层级
        ReportLevelEnum: {
            0: '总裁',
            1: '事业群CEO',
            2: '副总裁/总经理',
            3: '工厂厂长/高级经理',
            4: '部门经理',
        },
        //项目变更-审批结果
        ApprovalResult: {
            '0': '未通过',
            '1': '通过',
        },
        //任务类型
        taskTypeEnum: {
            '0': 'Pending Tasks',
            '1': 'Completed',
            '2': 'Overdue Tasks',
            '3': 'Paused Tasks',
            '4': 'Terminated Tasks',
        },

        SendStatusEnum: {
            0: '未发起',
            1: '已发起',
        },

        initStatusEnum: {
            submit: '已发起',
            exception_terminate: '异常终止',
            init_pending: '待发起',
            init_done: '终止发起',
            pass: '已通过',
            terminate: '已终止',
        },

        handoverStatusEnum: {
            draft: '草稿',
            submitted: '已提交',
        },
        // 项目委托 状态
        MandateStatusEnum: {
            draft: '草稿 ',
            submit: '已提交',
            entrust_doing: '委托中',
            entrust_end: '委托结案',
        },
        //当前所处网络类型
        NetworkEnum: {
            VPN: 'VPN',
            INN_INTER: '国内内网',
            INN_OUTER: '海外内网',
        },
        //生效状态
        EffectEnum: {
            '00': '待生效',
            '10': '生效中',
            '20': '已失效',
        },

        // 项目角色
        ProjectRoles: {
            '21': '合同上传人',
            '18': '申请事业部参与人',
            '19': '评审事业部参与人',
            '15': '申请人',
            '20': '评审事业部对接人',
            '17': '协办律师',
            '16': '主办律师',
        },
        // 角色类型
        // RoleTypeEnum: {
        //     SYSTEM: 'System Role',
        //     PROJECT: 'Project Role',
        // },
        RoleTypeEnum: {
            SYSTEM: '系统角色',
            PROJECT: '项目角色',
        },
        // 配置方式
        UserGrantMethodEnum: {
            '0': '人工配置',
            '1': '项目配置',
            '2': '系统识别',
        },
    },
    // 提示
    message: {
        tooltip: 'Prompt',
        delModalTitle: 'Delete prompt',
        backModalTitle: 'Return prompt',
        rejectModalTitle: 'Reject prompt',
        terminateInitTitle: 'Terminate initiation prompt',
        publishTitle: 'Post prompt',
        doneTitle: 'Termination prompt',
        saveTooltip: 'Save prompt',
        submitTooltip: 'Submit prompt',

        publishItemConfirm: 'Please confirm whether to release the performance item?',
        tooltipModal: 'Are you sure to perform this operation?',
        delModalMessage: 'Are you sure to delete?',
        projectDelMessage: 'Please confirm whether to delete the project?',
        backModalMessage: "Please confirm whether to return to the applicant's node?",
        rejectModalMessage: 'Please confirm whether to reject to the applicant node?',
        reRaiseConfirmMessage: 'Please confirm whether to initiate again?',
        terminateInitMessage: 'Please confirm whether to terminate the initiation?',
        deleteConfirm: 'Please confirm whether to delete it?',
        submitConfirm: 'Please confirm whether to submit?',
        rejectConfirm: 'Please confirm whether to reject it?',
        doneConfirm: 'Please confirm whether to terminate?',
        saveConfirm: 'Please confirm if you want to save it?',
        transferConfirm:
            'Please confirm whether to transfer? (The uploaded deliverables en will be lost after transfer.)',
        doneTaskConfirm: 'Please confirm whether to terminate this task?',
        cancelConfirm: 'Your changes have not been saved, please confirm if you need to cancel them?',
        cancelConfirmTwo: 'After cancellation, the filled content will not be saved. Please confirm whether to cancel?',
        closeConfirm: 'The content you edited has not been submitted yet, please confirm whether to close?',
        preApprovalConfirm: 'Please confirm whether to submit for pre-approval?',

        terminateInitToolTip:
            'After terminating the initiation, the system will not push the OA major risk notification process. If there are any modifications to the risk information, the project risk information will be updated after confirmation.',
        backModalInfo:
            'If you choose to return, after the applicant modifies the information, it will be returned to the current node, and the project does not need to go through the project approval process again.',
        rejectModalInfo:
            'Please communicate fully with the project applicant to confirm the modification suggestions for the selected project type and other information.If rejected, the applicant will modify the information and the project will re-enter the project approval process.',
        planDoneModalInfo:
            'Please confirm whether to terminate this performance item? After termination, the performance item will no longer be able to maintain its performance status.',

        riskSubmitTooltip:
            'After submission, the information will be pushed to the OA major risk notification process to generate a draft manuscript.',
        riskReRaiseTooltip:
            'After resubmission, the information will be pushed to the OA major risk notification process to generate a draft manuscript.',
        unsaveTooltip: 'Your changes have not been saved. Please confirm if you need to save them?',
        unsubmitTooltip: 'Your changes have not been submitted. Please confirm if you need to submit them?',
        doneTooltip:
            'Please confirm if you want to terminate this project, as it cannot be resubmitted after termination.',
        initTooltipOne: 'Please confirm whether',
        initTooltipTwo: 'will serve as the lead lawyer for this project and complete the project proposal?',
        rejectTooltip: 'When rejecting, it is necessary to fill in the handling opinion.',
        riskConfirmTooltip:
            'There are currently no risk items that require significant risk notification. Please confirm again.',
        suggestionTooltip: 'Please fill in the handling suggestion.',
        downloadAllTooltip: 'Please confirm whether to download all files?',
        downloadFilesTooltip: 'Please confirm if you have downloaded the following files.',
        downloadProFilesTooltip: 'Please confirm if you have downloaded the files for the following items.',
        confirmDelPerformAbnormal: 'Are you sure you want to delete the performance exception?',
        confirmDelPerformRisk: 'Are you sure you want to delete this performance risk?',

        saveSuccess: 'Save successful',
        initiateSuccess: 'Initiate successful',
        terminateInitiateSuccess: 'Termination initiate successful',
        submitSuccess: 'Submit successful',
        delSuccess: 'Delete successful',
        controlSuccess: 'Operation successful',
        configSuccess: 'Authorization successful',
        doneSuccess: 'Termination successful',
        withdrawSuccess: 'Withdrawal successful',
        allotSuccess: 'Allocation successful',
        transmitSuccess: 'Transmit successful',
        backSuccess: 'Return successful',
        rejectSuccess: 'Reject successful',
        initSuccess: 'Project approval successful',
        alterSuccess: 'Modify successful',
        selectSuccess: 'Select successful',
        operateSuccess: 'Operation successful',
        publishSuccess: 'Publish successful',
        handleSuccess: 'Processing successful',
        addSuccess: 'New successfully added',

        withdrawFail: 'Withdrawal failed',

        delLastRecordFail:
            "Delete failed, please keep at least 1 piece of data. To terminate the change, click the 'Terminate' button below.",
        withdrawFailInfo:
            'The next node handler has started processing/The current process status does not support withdrawal.',
        initConfirmFormError: 'The content of the project confirmation form is incorrect',
        selectRequireError: 'There are mandatory fields not selected, please confirm again!',
        repeatRoleError: 'This member already has the same role in this project, please delete it!',
        doNotSelectMyselfError: 'Cannot choose oneself!',
        rejectRequire:
            'Reject required fields: Project Type (If the Project Type is incorrect, the Project Type should be selected as required), Processing Opinion.',
        backRequire:
            'Return required fields: Project type(If the Project Type is incorrect, the Project Type should be selected as required), Processing Opinion.',
        initRequire:
            'Required fields for project initiation: Project Type, Confidential Project, Project Approval Method.\nAttention: When the project type is incorrect, please return/reject the process and have the applicant modify it to the correct project type before proceeding with the project proposal.',

        queryCondition: 'Please enter the query criteria!',
        inputSuggestion: 'Please enter your Processing Opinion',
        roleNameRequire: 'Please fill in the role name',
        approverRequire: 'Please select approver!',
        annexRequire: 'Please upload the deliverables!',
        presetApproverRequire: 'Please preset approver!',
        selectFileRequire: 'Please select attachment viewing permission',
        suggestionRequire: 'Please fill in the Processing Opinion!',
        selectProjectRequire: 'Please select the project that requires downloading files!',
        chooseTooltip: 'Please make your selection first!',
        selectProjectFirst: 'Please select the evaluation project first!',
        chooseAllotPerson: 'Select the allocator',
        noAllotPerson: 'Please select the allocator first!',
        chooseTransmitPerson: 'Select the recipient',
        noTransmitPerson: 'Please select the recipient first!',
        selectProjectRoleFirst: 'Please select the project role first!',
        selectAddMemberFirst: 'Please select the project team members that need to be added first!',
        selectDeleteMemberFirst: 'Please select the project team members to be deleted first!',
        selectDeleteFileFirst: 'Please select the attachment that needs to be deleted first!',

        loading: 'Loading...',
        noMore: 'There is no more data available',
        noMoreSelect: 'There are no more options available',
        scrollLoadMore: 'Scroll to the end to load more options',

        selectRequire: 'This item is mandatory',
        validFail: 'Some fields are incorrect, please check!',
        sameProjectType: 'The selected option is consistent with the existing one!',

        pageError: 'Page count(enrowCount) not returned, page display abnormal!',

        videoBrowserTooltip: 'Your browser does not support video tags.',
        audioBrowserTooltip: 'Your browser does not support the audio tag.',

        fileViewFail: 'File preview failed, please try again later!',
        fileViewError: 'This file does not support preview!',

        projectCodeNull: 'Please enter the project number!',
        projectCodeError: 'The project number starts with PRyear(4 digits)-',
        projectTypeError: 'The project type selection is incorrect. The expected project type is:',
        projectNoExist: 'The project does not exist, please re-enter!',
        relatedProjectExist: 'The project has already been associated, please select again!',
        noFilesTooltip: 'There are no files under this project.',
        phoneNumberFormatError: 'Phone number format error',
        numberFormatError: 'Please enter pure numbers',
        percentFormatError: 'Please enter the correct percentage',
        requireTooltip: 'This field is mandatory',

        projectTypeHelp:
            "The rules for dividing project types can be consulted by name: Domestic 方锐 (fang.rui1{'@'}byd.com), Overseas 胡雪曼 (hu.xueman{'@'}byd.com)",
        exchangeRateHelp:
            'Calculate based on real-time exchange rate before project closure. After the project is closed, it will be calculated based on the exchange rate at the time of closure.',
        outsourceExchangeRateHelp: 'Calculated based on real-time exchange rates',
        jebzHelp: 'Please indicate the composition of the project amount in the amount remarks',
        projectRoleTooltip: 'Project role users only support configuration through project team management',

        membersAlterSuccess:
            'The application for change of project team members has been submitted to the lead lawyer for approval. Once approved, it will take effect!',
        deleteMembersTooltip: 'Please confirm if you want to delete the following members?',
        deleteForbidTooltip: 'This user has a task that is currently being processed and cannot be deleted.',
        addMembersSuccess:
            'The application for change of project team members has been submitted to the lead lawyer for approval. Once approved, it will take effect.',
        backNeedSubApproval:
            'After returning, the project needs to be resubmitted for pre-approval. Only after approval can the project be initiated for approval.',
        confirmBackReassess: 'Please confirm whether to return the project to the evaluation stage?',
        processNoTips:
            'After entering the new process number, the system will capture the approval records and related information of the OA major risk notification process with the newly entered process number.',
        coCounselAddTooltip:
            'Co organizing lawyers can view all project files, but modification is not currently supported.',
        contractSearchTip: 'Please enter the complete contract number for query',
        selectContractTip: 'Please select the main contract data first',
        contractDelTip: 'Please confirm whether to delete the selected main contract and subsidiary contract?',
        contractDelEmptyTip: 'Please check the contract data that needs to be deleted',
        riskEvaluateSaveTip:
            'When adding or modifying risk information, the system will push a message to remind the applicant to view it',
        riskConfirmSaveTip:
            'When adding or deleting risks, the system will push a message to remind the applicant of the updated project risks after submission',

        planStartTimeAfterError: 'The start time of the plan cannot be later than the end time of the plan!',
        planEndTimeBeforeError: 'The end time of the plan cannot be earlier than the start time of the plan!',
        approvalResultNotPassTip: 'The approval result has not been approved and cannot be submitted',
        notEditRiskViewTip:
            'The current project has not undergone a risk assessment. Please confirm if you want to enter the edit risk assessment page?',
        preApprovalEntryOANoTip:
            'After entering the OA process number, the system will capture the relevant field information in the OA process and update it to the field content corresponding to the project information.',
        changeInitEntryOANoTip:
            'After entering the OA process number and submitting the termination, the system will query the approval status of the OA process. When the process is closed, it will trigger the termination of the major project platform project.',
        synthesisFileEntryOANoTip:
            'After entering the OA process number, the system will query the approval status of the OA process. When the process is completed, the system will automatically archive the OA process approval PDF file to the item.',
        OAUnfinishedSaveTip:
            'The OA process has not been approved and closed yet. Please submit after the OA process has been approved and closed. Do you need to save the modified content?',
        OAUnfinishedSubmitTip:
            'The OA process approval has not been closed yet. Please confirm if you want to submit it? ',
        entryOANoFirst: 'Please enter the OA process number first',

        otherOptionTip: 'You have selected other options, please enter the content you need',

        createAlert1:
            'The project you have selected is currently undergoing pre-approval, and creating evaluation items is not allowed!',
        createAlert2:
            'The project you have selected has completed the evaluation and cannot continue to create evaluation items!',
        publishTaskError1:
            'The project you have selected is currently undergoing pre-approval and task publishing is not allowed!',
        publishTaskError2:
            'The project you have selected has completed evaluation and cannot continue to publish tasks!',
        preApprovalAlert1:
            'Please confirm that the approval process for all evaluation items has been completed before initiating the pre-approval review!',
        existProcessingItems: 'There are ongoing evaluation issues',
        preApprovalAlert2:
            'Please add a liaison for the review department in the project team management before initiating the pre-approval process!',
        noReviewPerson: 'There is currently no liaison for the review department',

        exportPdfButtonText:
            'Click here to export PDF, select "Save as PDF" in the target printer option. If the export is abnormal, please refer to the help',
        exportPdfHelp:
            '1. Use the latest Chrome browser; 2. Choose A4 paper size; 3. Set the number of pages on each worksheet to 1; 4. Set the margin to none',
        noPermission: 'No permission at present',

        offlineApprovalTip: `If the following situations occur during the offline approval process of the project, the project needs to be returned to the evaluation stage and cannot be submitted for approval:\n1. The online project information is not the final version and needs to be modified.\n2. The offline approval result of the project is "rejected"`,

        noAccessPermissionTip: 'No permission to access,Please contact the administrator',
    },
}
