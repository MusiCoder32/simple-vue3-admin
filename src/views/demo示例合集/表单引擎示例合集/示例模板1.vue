<template>
    <div class="p4 bg-white">
        <simple-form route-path="/demos" path="demo1" v-model="model"></simple-form>
        <el-button type="primary" @click="clickHandle">提交</el-button>
    </div>
</template>
<script lang="ts" setup>
const model = ref({
    age: 18,
})
function clickHandle() {
    alert(JSON.stringify(model.value))
}
</script>
