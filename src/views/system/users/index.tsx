import { JobStatusEnum } from '@/enums'

export default function createColumns() {
    const usersColumns = computed(() => {
        return [
            {
                dataIndex: 'name',
                title: $t('authority.users.name'),
                query: true,
                value: null,
                type: 'input',
                minWidth: 150,
                overflow: true,
            },
            {
                dataIndex: 'staffCode',
                title: $t('authority.users.code'),
                query: true,
                value: null,
                type: 'input',
                minWidth: 120,
            },
            {
                dataIndex: 'ownerCom',
                title: $t('authority.users.company'),
                minWidth: 120,
            },

            {
                dataIndex: 'orgName',
                pCode: 'orgGroupName',
                title: $t('authority.users.division'),
                change(val, model) {
                    model.deptName = null
                },
            },
            {
                dataIndex: 'deptName',
                title: $t('authority.users.dept'),
                pCode: 'orgName',
            },
            {
                dataIndex: 'onjobStatus',
                title: $t('authority.users.status'),
                query: true,
                value: null,
                type: 'select',
                minWidth: 120,
                options: {
                    labelKey: 'label',
                    valueKey: 'value',
                    data: [
                        {
                            label: 'enum.JobStatusEnum.' + JobStatusEnum['在职'],
                            value: '在职',
                        },
                        {
                            label: 'enum.JobStatusEnum.' + JobStatusEnum['离职'],
                            value: '离职',
                        },
                    ],
                },
                customRender(text) {
                    if (text) {
                        return $t('enum.JobStatusEnum.' + JobStatusEnum[text])
                    }
                },
            },
            {
                dataIndex: 'systemRoleList',
                title: $t('authority.users.systemRoles'),
                width: '160px',
                overflow: true,
                customRender(text) {
                    return text?.map((element, index) => {
                        return (
                            <div id={index} class={'ellipsis'}>
                                {element}
                            </div>
                        )
                    })
                },
            },
            {
                dataIndex: 'projectRoleList',
                title: $t('authority.users.projectRoles'),
                width: '160px',
                overflow: true,
                customRender(text) {
                    return text?.map((element, index) => {
                        return (
                            <div id={index} class={'ellipsis'}>
                                {element}
                            </div>
                        )
                    })
                },
            },
        ]
    })

    return { usersColumns }
}
