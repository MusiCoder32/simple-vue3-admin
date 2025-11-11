import { noticeApi } from '@/api/workbench'
import { ChangeTypeEnum, MessageTaskEnum, TaskHandleStatusEnum } from '@/enums'
import router from '@/router'

export async function messageJump(row) {
    //更新消息通知状态
    noticeApi.changeStatus({ id: row.id })
    if (row.state == 20) {
        return ElMessage.error($t('message.noPermission'))
    }

    const linkInfo = JSON.parse(row.linkInfo)
    let messageInfo = linkInfo.messageInfo
    if (
        row.isHandler == MessageTaskEnum['已处理'] ||
        (row.isHandler == MessageTaskEnum['未处理'] &&
            [ChangeTypeEnum['项目暂停'], ChangeTypeEnum['项目终止']].includes(row.alterType))
    ) {
        messageInfo = JSON.parse(messageInfo)
        messageInfo.optionType = 'view'
        messageInfo = JSON.stringify(messageInfo)
    }
    router.push({
        path: '/redirect' + linkInfo.messagePath,
        query: {
            messageInfo,
        },
    })
}
export function taskJump(row) {
    if (row.state == 20) {
        return ElMessage.error($t('message.noPermission'))
    }
    const linkInfo = JSON.parse(row.linkInfo)
    let messageInfo = linkInfo.taskInfo

    //当状态为已办，将optionType强制改为view
    if (row.taskType !== TaskHandleStatusEnum['待办']) {
        messageInfo = JSON.parse(messageInfo)
        messageInfo.optionType = 'view'
        messageInfo = JSON.stringify(messageInfo)
    }

    router.push({
        path: '/redirect' + linkInfo.taskPath,
        query: {
            messageInfo,
        },
    })
}
