<template>
    <div class="m-toast-main">
        <div class="m-toast-message">
            <div class="m-toast m-toast-done">
                <div class="m-icon-success m-toast__icon"></div>
                <div class="m__text-toast-message">Lưu dữ liệu thành công</div>
                <button class="m__icon m__icon-x " @click="hideForm()">
                    <div class="m-icon-x-toast"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"ToastMessageDone",
        methods: {
            /**
             * Hàm đóng thông báo
             * Author: NVHThai (20/09/2022)
             */
            hideForm(){
                this.$parent.hideToastDone();
            }
        },
    }
</script>

<style scoped>
    @import url(../../css/details/toast.css);
</style>