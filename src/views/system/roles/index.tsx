import { ElPopconfirm, ElSwitch } from 'element-plus'
import { RoleTypeEnum, EnableStatusEnum, ProjectDataAuthEnum, YesOrNoEnum } from '@/enums'

export default function createColumns(change) {
    const rolesColumns = computed(() => {
        return [
            {
                dataIndex: 'name',
                title: $t('authority.roles.roleName'),
                width: '220px',
                overflow: true,
                maxlength: '50',
                formItem: {
                    type: ElInput,
                    required: true,
                },
            },
            {
                dataIndex: 'type',
                title: $t('authority.roles.roleType'),
                width: '150px',
                layerHidden: true,
                formItem: {
                    type: ElSelect,
                    opts: {
                        slots: {
                            ...utils.setSelectOption(RoleTypeEnum),
                        },
                    },
                },

                customRender(text) {
                    if (text) {
                        let status = ''
                        switch (text) {
                            case RoleTypeEnum['系统角色']:
                                status = 'basic-color-mintgreen'
                                break
                            case RoleTypeEnum['项目角色']:
                                status = 'basic-color-purple'
                                break
                            default:
                                status = 'basic-color-mintgreen'
                                break
                        }
                        return <div class={status}>{$t('enum.RoleTypeEnum.' + text)}</div>
                    }
                },
            },
            {
                dataIndex: 'statues',
                title: $t('authority.roles.enableStatus'),
                layerHidden: true,
                minWidth: 100,
                formItem: {
                    type: ElSelect,
                    opts: {
                        slots: {
                            ...utils.setSelectOption(EnableStatusEnum),
                        },
                    },
                },
                customRender(text, row) {
                    return (
                        <ElPopconfirm
                            title={$t('message.tooltipModal')}
                            onConfirm={() => change(text, row.id)}
                            disabled={row.enableBtn === 0}>
                            {{
                                reference: () => (
                                    <ElSwitch modelValue={text === '1' ? true : false} disabled={row.enableBtn === 0} />
                                ),
                            }}
                        </ElPopconfirm>
                    )
                },
            },
            {
                dataIndex: 'creator',
                title: $t('authority.roles.creator'),
                overflow: true,
                minWidth: 100,
            },
            {
                dataIndex: 'modifier',
                title: $t('authority.roles.regenerator'),
                overflow: true,
                minWidth: 100,
            },
            {
                dataIndex: 'modifyTime',
                title: $t('authority.roles.updateTime'),
                width: '220px',
            },
            {
                dataIndex: 'desc',
                title: $t('authority.roles.roleDescription'),
                tableHidden: true,
                queryHidden: true,
                formItem: {
                    type: ElInput,
                    col: 1,
                    opts: {
                        type: 'textarea',
                        maxlength: '500',
                    },
                },
            },
        ]
    })
    const dataAuthList = ref([
        {
            dataIndex: 'projectView',
            tooltip: 'authority.authConfigModal.projectDataTooltip',
            label: 'authority.authConfigModal.projectDataView',
            options: {
                data: Object.keys(ProjectDataAuthEnum).map((key) => {
                    return {
                        label: 'enum.ProjectDataAuthEnum.' + ProjectDataAuthEnum[key],
                        value: ProjectDataAuthEnum[key],
                    }
                }),
                valueKey: 'value',
                labelKey: 'label',
            },
        },
        {
            dataIndex: 'secretProjectView',
            tooltip: 'authority.authConfigModal.secretProjectTooltip',
            label: 'authority.authConfigModal.secretProjectView',
            options: {
                data: Object.keys(YesOrNoEnum).map((key) => {
                    return {
                        label: 'enum.YesOrNoEnum.' + YesOrNoEnum[key],
                        value: YesOrNoEnum[key],
                    }
                }),
                valueKey: 'value',
                labelKey: 'label',
            },
        },
        {
            dataIndex: 'projectAttachmentView',
            tooltip: 'authority.authConfigModal.projectAnnexTooltip',
            label: 'authority.authConfigModal.projectAnnexView',
            options: {
                data: Object.keys(YesOrNoEnum).map((key) => {
                    return {
                        label: 'enum.YesOrNoEnum.' + YesOrNoEnum[key],
                        value: YesOrNoEnum[key],
                    }
                }),
                valueKey: 'value',
                labelKey: 'label',
            },
        },
        {
            dataIndex: 'fileView',
            tooltip: 'authority.authConfigModal.archivedFileTooltip',
            label: 'authority.authConfigModal.archivedFileView',
            options: {
                data: Object.keys(YesOrNoEnum).map((key) => {
                    return {
                        label: 'enum.YesOrNoEnum.' + YesOrNoEnum[key],
                        value: YesOrNoEnum[key],
                    }
                }),
                valueKey: 'value',
                labelKey: 'label',
            },
        },
    ])

    const userRolesListColumns = computed(() => {
        return [
            {
                dataIndex: 'name',
                title: $t('authority.roleUsersModal.name'),
                query: true,
                type: 'input',
                value: '',
                overflow: true,
            },
            {
                dataIndex: 'staffCode',
                title: $t('authority.roleUsersModal.code'),
            },
            {
                dataIndex: 'email',
                title: $t('authority.roleUsersModal.email'),
                overflow: true,
            },
            {
                dataIndex: 'orgName',
                title: $t('authority.roleUsersModal.division'),
                overflow: true,
                query: true,
                type: 'input',
                value: '',
            },
            {
                dataIndex: 'deptName',
                title: $t('authority.roleUsersModal.dept'),
                query: true,
                type: 'input',
                value: '',
                overflow: true,
            },
        ]
    })
    const userRolesRightColumns = computed(() => {
        return [
            {
                dataIndex: 'name',
                title: $t('authority.roleUsersModal.name'),
                width: '120px',
                overflow: true,
            },
            {
                dataIndex: 'staffCode',
                title: $t('authority.roleUsersModal.code'),
                width: '120px',
            },
            {
                dataIndex: 'email',
                title: $t('authority.roleUsersModal.email'),
                width: '180px',
                overflow: true,
            },
            {
                dataIndex: 'orgName',
                title: $t('authority.roleUsersModal.division'),
                width: '140px',
                overflow: true,
            },
            {
                dataIndex: 'deptName',
                title: $t('authority.roleUsersModal.dept'),
                width: '140px',
                overflow: true,
            },
        ]
    })
    const userRolesLeftColumns = computed(() => {
        return [
            {
                dataIndex: 'name',
                title: $t('authority.roleUsersModal.name'),
                width: '120px',
                overflow: true,
            },
            {
                dataIndex: 'staffCode',
                title: $t('authority.roleUsersModal.code'),
                width: '120px',
            },
            {
                dataIndex: 'email',
                title: $t('authority.roleUsersModal.email'),
                width: '180px',
                overflow: true,
            },
            {
                dataIndex: 'orgName',
                title: $t('authority.roleUsersModal.division'),
                width: '140px',
                overflow: true,
            },
            {
                dataIndex: 'deptName',
                title: $t('authority.roleUsersModal.dept'),
                width: '140px',
                overflow: true,
                fixed: 'right',
            },
        ]
    })

    return { rolesColumns, dataAuthList, userRolesListColumns, userRolesRightColumns, userRolesLeftColumns }
}
