<template>
    <div class="m-header">
        <div class="m-text-title">Danh sách tài sản</div>

        <div class="m-header__rigth">
            <div class="m-text-header">Sở tài chính</div>
            <div class="ml-20 m-combobox-year">
                <span>Năm</span>
                <input type="text" value="2021">
                <div class="m-drop">
                    <button class="btn__up">
                        <div class="m-icon-dropup"></div>
                    </button>
                    <button class="btn__down">
                        <div class="m-icon-down"></div>
                    </button>
                </div>
            </div>

            <el-tooltip :disabled="disabled" content="Thông báo" placement="bottom" show-after="400" effect="customized">
                <div class="ml-18 m-icon-notification m-notification"></div>
            </el-tooltip>
            <el-tooltip :disabled="disabled" content="Hệ thống" placement="bottom" show-after="400" effect="customized">
                <div class="ml-18 m-icon-toggle m-toggle"></div>
            </el-tooltip>
            <el-tooltip :disabled="disabled" content="Hỗ trợ" placement="bottom" show-after="400" effect="customized">
                <div class="ml-18 m-icon-question m-question"></div>
            </el-tooltip>
            <el-tooltip :disabled="disabled" content="Người dùng" placement="bottom" show-after="400" effect="customized">
                <div class="ml-18 m-icon-infomation m-infomation"></div>
            </el-tooltip>
            <button class="btn-dropdown">
                <div class="m-icon-dropdown"></div>
            </button>
        </div>


    </div>
</template>

<script>
export default {
    name: "TheHeader",
}
</script>

<style scoped>
@import url(../css/components/header.css);
.el-popper.is-customized {
    padding: 4px 6px;
    background: #fff;
    border: 1px solid #bbb;
    box-shadow: 0px 2px 2.5px 2px rgba(0, 0, 0, 0.168);
    
}

.el-popper.is-customized .el-popper__arrow::before {
    background: #fff;
    right: 0;
    border: 1px solid #bbb;
}
</style>