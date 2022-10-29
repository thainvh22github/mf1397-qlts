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
            <button @blur="hideInfoUser" @click="showInfoUser()" class="btn-dropdown">
                <div class="m-icon-dropdown"></div>
            </button>
        </div>
        <div v-if="showInfo" class="info-user">
            <div class="info-user__title">
                <span>Sở tài chính</span>
            </div>
            <div class="info-user__header">
                <span>Thainvh22@gmail.com</span>
            </div>
            <div class="list-info list-change-password">
                <div class="icon m-icon-change-password"></div>
                <span>Đổi mật khẩu</span>
            </div>
            <div class="list-info list-setting-user">
                <div class="icon m-icon-infomations"></div>
                <span>Thiết lập tài khoản</span>
            </div>
            <div class="line"></div>
            <div class="list-info list-access-QLTSV1">
                <div class="icon m-icon-access-QLTSV1"></div>
                <span>Truy cập QLTS V1</span>
            </div>
            <div class="list-info list-customer-survey">
                <div class="icon m-icon-customer-survey"></div>
                <span>Khảo sát ý kiến khách hàng</span>
            </div>
            <div @mousedown="logOut" class="list-info list-log-out" >
                <div class="icon m-icon-logout"></div>
                <span>Đăng xuất</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",

    methods: {
        showInfoUser(){
            this.showInfo = !this.showInfo;
        },
        hideInfoUser(){
            this.showInfo = false;
        },
        logOut(){
            sessionStorage.clear();
            this.$router.push("/");
            this.showInfo = false;
        }
    },
    data() {
        return {
            showInfo:false,
        }
        
    },
}
</script>

<style scoped>
@import url(../css/components/header.css);


</style>