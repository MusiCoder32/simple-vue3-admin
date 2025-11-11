<template>
    <div class="p4 bg-white">
        <simple-form route-path="/demos" path="demo3" :schemaContext="schemaContext" v-model="model"></simple-form>
        <div class="h-center-center">
            <el-button type="primary" @click="clickHandle">提交</el-button>
        </div>
        <simple-layer ref="layerRef" @confirm="confirmHandle">
            <simple-table
                :showCheckbox="true"
                :selectedIds="selectedIds"
                @checkboxSelect="checkboxSelect"
                :columns="columns"
                :list="list"></simple-table>
        </simple-layer>
    </div>
</template>
<script lang="ts" setup>
const model = ref({
    users: [
        {
            username: '张三',
        },
        {
            username: '李四',
        },
    ],
})
const columns = [
    {
        title: '角色名',
        dataIndex: 'roleName',
    },
    {
        title: '角色编号',
        dataIndex: 'roleCode',
    },
]
const list = [
    {
        roleName: '管理员',
        roleCode: '1',
        id: 1,
    },
    {
        roleName: '一般人员',
        roleCode: '22',
        id: 2,
    },
    {
        roleName: '领导',
        roleCode: '3',
        id: 3,
    },
]

const layerRef = ref()
const roleIndex = ref()
const selected = ref()
const selectedIds = ref([])

function addUser() {
    model.value.users.push({})
}
function clickHandle() {
    alert(JSON.stringify(model.value))
}

function openRoleLayer(index) {
    //index为通过模板{{ $item? ()=>openRoleLayer($index) : null }}传入的index参数
    roleIndex.value = index
    selectedIds.value = model.value.users[roleIndex.value]?.role?.map((item) => item.id) //组装已选择数据

    layerRef.value.add({
        title: '选择角色',
    })
}

function confirmHandle() {
    model.value.users[roleIndex.value].role = selected.value.map((item) => {
        return {
            label: item.roleName,
            value: item.roleCode,
            id: item.id,
        }
    })
    layerRef.value.close()
}

function checkboxSelect(data) {
    selected.value = data //获取已选择项
}

const schemaContext = { openRoleLayer, addUser }
</script>
