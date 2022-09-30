<template>
    <div class="m-toast-main">
        <div class="m-dialog-toast-attention-delete">
            <div class="m-dialog-toast__attention-delete">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <div class="text"><span v-show="ishows">{{total}}</span> {{titleFormDelete}}
                        <span v-show="ishow"> {{tmpPropertyCode}} - {{tmpPropertyName}} ?</span>
                        <span v-show="ishows"> </span>
                    </div>
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
import { ElNotification } from 'element-plus';

export default {

    name: "ToastMessageDelete",
    props: ['checkboxList', 'tmpPropertyName', 'tmpPropertyCode', 'titleFormDelete', 'totalCountAsset'],
    computed: {
        /**
         * Hàm kiểm tra totalCountAsset có < 10 không? nếu < 10 thì thêm số 0 ở trước
         * Author: NVHThai (27/09/2022)
         */
        total: function () {
           let total = this.totalCountAsset;
            total = total < 10 ? `0${total}` : total;
            return total;
        },

        /**
         * Hàm kiểm tra totalCountAsset = 1 không? nếu = 1 thì mở title xóa 1 tài sản
         * Author: NVHThai (27/09/2022)
         */
        ishow: function () {
            if (this.totalCountAsset == 1) {
                return true;
            }
            return false;
        },

        /**
         * Hàm kiểm tra totalCountAsset > 1 không? nếu > 1 thì mở title xóa nhiều tài sản
         * Author: NVHThai (27/09/2022)
         */
        ishows: function () {
            if (this.totalCountAsset > 1) {
                return true;
            }
            return false;
        },
    },
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
                    .delete(`https://localhost:7242/api/v1/Assets/${propertyID}`)
                    .then(() => {
                        //tải lại trang
                        me.$parent.getDataAPI();

                        // đóng popup hỏi có xóa không?
                        this.$parent.btnCloseToastDeleteOnclick();

                        // thông báo xóa thành công
                        ElNotification({
                            duration: 1500,
                            message: "Xóa dữ liệu thành công",
                            position: 'bottom-right',
                            type: 'success',
                        })

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
.text {
    padding-left: 50px;
}

.text span {
    padding-left: 0 !important;
    font-weight: 700;
}

.m-dialog-toast__attention-delete {
    width: 450px;
    left: calc(50% - 225px);
}
</style>