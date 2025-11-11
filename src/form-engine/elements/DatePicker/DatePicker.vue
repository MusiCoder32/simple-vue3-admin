<template>
    <el-date-picker :disabled-date="disabledDate" style="width: 100%" :placeholder="$t(placeholder)" v-bind="$attrs" />
</template>

<script setup lang="ts">
enum DateSelectType {
    以当前时间开始,
    以当前时间结束,
}
const props = defineProps({
    placeholder: String,
    startOrEnd: null,
})

function disabledDate(date) {
    if (props.startOrEnd == DateSelectType['以当前时间开始']) {
        return dayjs(dayjs().format('YYYY-MM-DD')).diff(date, 'day') > 0
    }
    if (props.startOrEnd == DateSelectType['以当前时间结束']) {
        return dayjs(dayjs().format('YYYY-MM-DD')).diff(date, 'day') < 0
    }
    return false
}
</script>

<style scoped></style>
