<template>
    <el-tree
        class="auth-tree h-full"
        ref="treeRef"
        check-strictly
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        @check="handleCheckChange"
        :props="defaultProps">
        <template #default="{ node, data }">
            <div>{{ data.name }}</div>
        </template>
    </el-tree>
</template>

<script lang="tsx" setup>
import { rolesApi } from '@/api/users'
import { getTreeData } from '@/utils/general'

const treeData = ref([])
const form = ref({
    projectView: '',
    secretProjectView: '',
    projectAttachmentView: '',
    fileView: '',
})
const treeRef = ref([])
const defaultProps = {
    children: 'children',
    label: 'label',
}

const selectedKeyList = computed(() => {
    const result = treeRef.value.getCheckedKeys()
    return result
})

function downDeep(node, checked) {
    treeRef.value.setChecked(node.id, checked)
    if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
            downDeep(child, checked)
        })
    }
}

function upDeep(node, checked) {
    let status = false
    node.childNodes.forEach((child) => {
        if (child.checked) {
            status = true
        }
    })
    //为true,代表存在某个子节点被选中,此时节点本身也要被选中
    treeRef.value.setChecked(node.data.id, status)
    if (node.parent) {
        upDeep(node.parent, checked)
    }
}

function handleCheckChange(node) {
    const checked = treeRef.value.getNode(node.id).checked
    downDeep(node, checked)
    const parentNode = treeRef.value.getNode(node.pid)
    if (parentNode) {
        //当子节点为最后一层的按钮时,按钮被取消不更改父节点状态,其他情形需要设置父节点状态
        if (node.mtype != 'BUTTON' || checked) {
            upDeep(parentNode, checked)
        }
    }
}
// 获取角色拥有的权限
async function roleAuth(id: '') {
    if (id) {
        let params = {
            roleId: id,
        }
        const data = await rolesApi.getRolePermissions(params)
        const { menuList = [], roleMenuFileViewDTO } = data
        treeData.value = getTreeData({ data: menuList })

        const permissionIds = menuList.filter((item) => item.isChecked).map((item) => item.id)
        treeRef.value.setCheckedKeys(permissionIds)
        form.value = roleMenuFileViewDTO
    }
}
defineExpose({
    selectedKeyList,
    form,
    roleAuth,
})
</script>

<style lang="scss" scoped>
.auth-layer {
    height: calc(80vh - 170px);
    .auth-tree {
        overflow: auto;
    }
}
.line {
    background-color: #e5e7e9;
    width: 1px;
    height: calc(100% + 50px);
    transform: translateY(-20px);
}
</style>
