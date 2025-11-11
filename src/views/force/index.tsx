export default function createColumns(event, layerStatus) {
    const projectColumns = computed(() => {
        return [
            { ...projectInstCodeColumn.value },
            { ...projectNameColumn.value },
            { ...projectTypeColumn.value },
            { ...projectStageColumn.value, dataIndex: 'projectStageCode' },
            { ...projectStatusColumn.value },
            {
                dataIndex: 'applicantName',
                title: $t('init.applicant'),
            },
            { ...orgColumn.value },
        ]
    })

    function checkProjectCode(rule, value, callback) {
        const regExp = /^PR\d{4}-\d{4}$/
        if (value && !regExp.test(value)) {
            callback(new Error($t('message.projectCodeError')))
        } else {
            callback()
        }
    }
    const projectLinkColumns = computed(() => {
        return [
            {
                dataIndex: 'relateProjectCode',
                title: $t('link.projectNo'),
                type: 'input',
                required: true,
                on: {
                    input: event,
                },
                disabled: layerStatus.value === 'edit',
                width: 120,
                layerRules: [{ validator: checkProjectCode }],
            },
            {
                dataIndex: 'relateProjectName',
                title: $t('link.projectName'),
                overflow: true,
                type: 'input',
                disabled: true,
            },
            { ...relateConditionColumn.value },
            {
                dataIndex: 'relateProjectMainLawyerName',
                title: $t('link.leadLawyer'),
                type: 'input',
                disabled: true,
            },
            {
                dataIndex: 'relateProjectCreatorDeptName',
                title: $t('link.applyDivision'),
                type: 'input',
                disabled: true,
            },
            {
                dataIndex: 'relateProjectCreateTime',
                title: $t('link.initTime'),
                width: 160,
                disabled: true,
                type: 'input',
                customRender(text) {
                    if (text) {
                        return dayjs(text).format('YYYY-MM-DD')
                    }
                    return '--'
                },
            },

            {
                dataIndex: 'relateProjectComments',
                title: $t('link.remark'),
                overflow: true,
                type: 'textarea',
                layerAttr: {
                    maxlength: '500',
                },
                minWidth: '150',
                customRender(text) {
                    return text ?? '--'
                },
                column: 1,
            },
        ]
    })

    const alterRecordColumns = computed(() => {
        return [
            {
                dataIndex: 'changeSource',
                title: $t('link.changeSource'),
                minWidth: 140,
                customRender(text, row) {
                    return <span class={row.updateFlag == 1 ? 'has-update' : null}>{text}</span>
                },
            },
            {
                dataIndex: 'changeType',
                title: $t('link.changeType'),
                width: 120,
            },
            {
                dataIndex: 'relateProjectInstCode',
                title: $t('link.projectNo'),
                value: null,
                type: 'input',
                overflow: true,
                width: 120,
            },
            {
                dataIndex: 'relateProjectInstName',
                title: $t('link.projectName'),
                width: 150,
                overflow: true,
                value: null,
                type: 'input',
            },
            { ...relateConditionColumn.value },
            {
                dataIndex: 'creatorName',
                title: $t('team.memberDetail.changePerson'),
            },
            {
                dataIndex: 'gmtCreate',
                title: $t('team.memberDetail.changeTime'),
                width: 160,
                customRender(text) {
                    try {
                        return dayjs(text).format('YYYY-MM-DD')
                    } catch (error) {
                        return text
                    }
                },
            },
        ]
    })

    return { projectColumns, projectLinkColumns, alterRecordColumns }
}
