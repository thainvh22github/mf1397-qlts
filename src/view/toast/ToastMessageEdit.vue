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
import Enum from '../../lib/enum.js'

export default {

    name: "ToastMessageEdit",
    props: ['checkTitleForm'],

    methods: {
        /**
         * click vào nút hủy bỏ trong toast thì đóng cả form add và toast  
         * Author: NVHThai (19/09/2022)
         */
        btnDetroyToastEdit() {
            this.$parent.detroyToastAttentionEdit();
        },



        /**
         * click vào nút không lưu trong toast thì đóng toast  
         * Author: NVHThai (19/09/2022)
         */
        btnNotSaveToastEdit() {
            this.$parent.closeToastAttentionEdit();
        },


        /**
         * Hàm lưu dữ liệu vào db khi sửa dữ liệu từ form
         * Author: NVHThai (27/09/2022)
         */
        btnSaveToastEdit() {
            switch (this.checkTitleForm) {
                case Enum.FormMode.Edit:
                    this.$parent.handleInsertData();
                    this.$parent.putApiProperty();
                    break;
                case Enum.FormMode.Duplicate:
                    this.$parent.handleInsertData();
                    this.$parent.postApiProperty();
                    break;
            }
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>