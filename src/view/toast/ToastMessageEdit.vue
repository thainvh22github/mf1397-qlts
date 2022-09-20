<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-edit">
            <div class="m-dialog-toast__attention-edit">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi
                        này?</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline" v-on:click="btnDetroyToastEdit()">Hủy bỏ</div>
                    <div class="ml-8 btn btn__sub" v-on:click="btnNotSaveToastEdit()">Không lưu</div>
                    <div class="ml-8 btn" v-on:click="btnSaveToastEdit()">Lưu</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"ToastMessageEdit",

    methods: {
        /**
         * click vào nút hủy bỏ trong toast thì đóng cả form add và toast  
         *
         */
        btnDetroyToastEdit(){
            this.$parent.detroyToastAttentionEdit();
        },



        /**
         * click vào nút không lưu trong toast thì đóng toast  
         *
         */
        btnNotSaveToastEdit(){
            this.$parent.closeToastAttentionEdit();
        },


        /**
         * 
         *
         */
        btnSaveToastEdit(){

        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>