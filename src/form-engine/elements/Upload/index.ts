import Upload from './Upload.vue'
import attr from './attr'

export default {
    name: '文件上传',
    component: Upload,
    icon: 'upload',
    type: 'basic',
    order: 13,
    attr,
    initialValues: {
        label: '文件上传',
        component: 'Upload',
        props: {
            uploadKey: 'fileArr',
            size: 1024,
            limit: 999,
            showFileList: true,
        },
    },
}
