<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-add">
            <div class="m-dialog-toast__attention-add">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>{{titleFormException}}</span>
                </div>
                <div class="m-dialog-toast__attention--btn">
                    <div class="ml-8 btn" tabindex="211" id="btnClose" @keydown="btnClose()" @click="btnClose()">{{textBtnClose}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Resource from "@/lib/resource";
export default {
    name: "ToastMessageException",
    props: ['titleFormException'],
    mounted() {
        /**
         * Focus vào btnClose khi mở form add
         * Author: NVHThai
         */
        try {
            document.getElementById("btnClose").focus();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        /**
         * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu 
         * Author: NVHThai (09/09/2022)
         */
        btnClose() {
            try {
                this.$parent.closeToastException();
            } catch (error) {
                console.log(error);
            }
        }
    },

    data() {
        return {
            textBtnClose: Resource.TitleToast.Close
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>