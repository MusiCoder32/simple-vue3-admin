<template>
    <div class="print-alert bg-white">
        <div class="h-between-center p2.5">
            <div></div>
            <div class="h-center-center w0 grow">
                <el-button
                    class="pr1 export-button"
                    @click="exportPdf"
                    type="primary"
                    text
                    style="max-width: calc(100% - 22px)">
                    <div class="w-full" v-ell:b>
                        {{ $t('message.exportPdfButtonText') }}
                    </div>
                </el-button>
                <div class="p0.5">
                    <svg-icon v-ell:t-a="$t('message.exportPdfHelp')" name="question" class="f14 color-gray-6" />
                </div>
            </div>
            <el-button text @click="escExportPdfHandle" type="退出预览">
                {{ $t('common.escExportPreview') }}
            </el-button>
        </div>

        <el-divider class="!mt0 !mb0"></el-divider>
    </div>
    <div class="z1 print-mask top-13 absolute h-full w-full"></div>
</template>

<script setup>
const emit = defineEmits(['escExportPdf'])

function escExportPdfHandle() {
    $loading.open()
    emit('escExportPdf')
    document.body.classList.remove('print')
    $loading.close()
}
function exportPdf() {
    window.print()
}
</script>
<style lang="scss">
.print-alert {
    .export-button > span {
        width: 100%;
    }
}
</style>
