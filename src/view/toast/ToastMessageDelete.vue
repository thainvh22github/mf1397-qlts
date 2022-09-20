<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-delete">
            <div class="m-dialog-toast__attention-delete">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Bạn có muốn xóa tài sản (mã tên tài sản) </span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline" @click="btnCloseToastDeleteOnclick()">Không</div>
                    <div class="ml-8 btn" @click="btnDelete()">Xóa</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import Enum from '../../assets/lib/enum.js';
export default {

    name: "ToastMessageDelete",
    props: ['checkboxList'],

    methods: {
        /**
         * Hàm click vào nút hủy thì popup delete đóng form pop up
         * Author: NVHThai (09/09/2022)
         */

        btnCloseToastDeleteOnclick() {
            this.$parent.btnCloseToastDeleteOnclick();
        },

        /**
         * Hàm xóa tài sản
         * Author: NVHThai
         */
        btnDelete() {
            for (let idcheck of this.checkboxList) {
                this.deleteDataPropertyApi(idcheck);
            }
            this.$parent.btnCloseToastDeleteOnclick();
            this.$parent.showToastDone();
        },

        /**
        * Hàm xóa tài sản 
        * Author: NVHThai (20/09/2022)
        * @param {guid} propertyID 
        */
        deleteDataPropertyApi(propertyID) {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .delete(`https://localhost:7285/api/v1/Employees/${propertyID}`)
                    .then(() => {
                        //tải lại trang
                        me.$parent.getDataAPI();


                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

    },


    
}
</script>

<style scoped>

</style>