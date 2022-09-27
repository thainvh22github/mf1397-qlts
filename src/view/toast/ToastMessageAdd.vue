<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-add">
            <div class="m-dialog-toast__attention-add">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Bạn có muốn hủy bỏ khai báo tài sản này?</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline" ref="btnClose" v-on:click="btnCloseToastnAddOnclick()">Không</div>
                    <div class="ml-8 btn" v-on:click="btnDetroyToastAddOnclick()">Hủy bỏ</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToastMessageAdd",
    props: ['isDialogToastAttentionAdd', 'isDialogToastAttentionEdit'],


    methods: {
        /**
        * Hàm focus vào thẻ mong muốn 
        * Author(24/09/2022)
        */
        focus() {
            this.$nextTick(function () {
                this.$refs.btnClose.focus();
            })
        },
        /**
         * Hàm nếu click vào pupup hủy thì sẽ đóng cả form add
         * Author: NVHThai (09/09/2022)
         */
        btnDetroyToastAddOnclick() {
            this.$parent.btnDetroyToastAttentionAddOnclick();
        },


        /**
         * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu 
         * Author: NVHThai (09/09/2022)
         */
        btnCloseToastnAddOnclick() {
            this.$parent.btnCloseToastAttentionAddOnclick();
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>