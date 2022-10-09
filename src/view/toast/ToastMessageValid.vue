<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-validate">
            <div class="m-dialog-toast__attention-validate">
                <div class="m-dialog-toast__attention--content">
                    <span>{{titleFormValid}}</span>
                </div>
                <div class="m-dialog-valid">
                    <div class="m-dialog-valid-list" v-for="(valid,index) of moreInfo" :key="index">
                        - {{valid}}
                    </div>
                </div>
                <div class="m-dialog-toast__attention--btn">
                    <div id="btnClose" tabindex="211" @keydown="btnCloseToastnAddOnclick" class="btn"
                        @click="btnCloseToastnAddOnclick()">{{textBtnClose}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Resource from "@/lib/resource";
export default {
    name: "ToastMessageAdd",
    props: ['moreInfo', 'titleFormValid'],
    mounted() {
        document.getElementById("btnClose").focus();
    },


    methods: {
        /**
         * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu 
         * Author: NVHThai (09/09/2022)
         */
        btnCloseToastnAddOnclick() {
            try {
                this.$parent.closeToastValid();
                this.$parent.deleteDataInMoreInfo();
                this.$parent.changeCheckInputValidate();
            } catch (error) {
                console.log(error);
            }
        }
    },
    data() {
        return {
            textBtnClose:Resource.TitleToast.Close
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);

.m-dialog-toast__attention-add {
    height: auto;
}

.m-dialog-valid {
    margin-top: 24px;
    margin-left: 24px;
    width: calc(100% - 48px);
    margin-bottom: 84px;

}

.m-dialog-valid-list {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
}

.m-dialog-toast__attention--content span {
    padding-left: 0 !important;
    font-size: 20px;
    font-weight: 700;
}
</style>