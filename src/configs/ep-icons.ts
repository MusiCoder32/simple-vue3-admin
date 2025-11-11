const iconArr = [
    'Edit',
    'Search',
    'EditPen',
    'Plus',
    'Delete',
    'Close',
    'ArrowDown',
    'ArrowUp',
    'User',
    'InfoFilled',
    'Minus',
    'Top',
    'Upload',
    'QuestionFilled',
    'UploadFilled',
    'Loading',
    'Expand',
    'Fold',
    'Warning',
    'WarningFilled',
    'Setting',
]

export default {
    install(app) {
        iconArr.forEach(async (item) => {
            const { [item]: IconComponent } = await import('@element-plus/icons-vue')
            app.component(item, IconComponent)
        })
    },
}
