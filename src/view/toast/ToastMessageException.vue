<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-add">
            <div class="m-dialog-toast__attention-add">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>{{titleFormException}}</span>
                </div>
                <div class="m-dialog-toast__attention--btn">
                    <div class="ml-8 btn" v-on:click="btnClose()">Đóng</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToastMessageException",
    props: ['titleFormException'],


    methods: {
        
       

        /**
         * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu 
         * Author: NVHThai (09/09/2022)
         */
         btnClose() {
            this.$parent.closeToastException();
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>