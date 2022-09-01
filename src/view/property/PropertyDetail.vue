<template>
    <div class="m-dialog" :class="{isShowDialog: isShowDialog}">
        <div id="formadd" class="m-form-add">
            <div class="m-form-add__detail">
                <div class="m-form-add__header">
                    <div class="m-form-add__titel" style="font-size: 20px;">Sửa tài sản</div>
                    <button class="btn-x" @click="btnCloseFormOnclick">
                        <div class="m-icon-x"></div>
                    </button>
                </div>

                <div class="mt-20 m-propertycode-propertyname" style="display: flex;">
                    <div class="m-propertycode" style="width: 30%;">
                        <div class="m-text">Mã tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertycode">
                    </div>
                    <div class="m-propertyname" style="width: calc(70% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                </div>

                <div class="mt-20 m-positioncode-positionname" style="display: flex;">
                    <div class="m-positioncode" style="width: 30%;">
                        <div class="m-text">Mã bộ phận sử dụng <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertycode">
                    </div>
                    <div class="m-positionname" style="width: calc(70% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên bộ phận sử dụng</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-propertyname">
                    </div>
                </div>

                <div class="mt-20 m-propertycodetype-propertynametype" style="display: flex;">
                    <div class="m-propertycode" style="width: 30%;">
                        <div class="m-text">Mã loại tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertycode">
                    </div>
                    <div class="m-propertyname" style="width: calc(70% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên loại tài sản</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-propertyname">
                    </div>
                </div>

                <div class="mt-20 m-amount-cost-longevity" style="display: flex;">
                    <div class="m-amount" style="width: 32%;">
                        <div class="m-text">Số lượng <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    <div class="m-cost" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Nguyên giá <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    <div class="m-longevity" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Số năm sử dụng <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                </div>

                <div class="mt-20 m-lossrate-lossyear-trackingyear" style="display: flex;">
                    <div class="m-lossrate" style="width: 32%;">
                        <div class="m-text">Tỷ lệ hao mòn (%) <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    <div class="m-lossyear" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Giá trị hao mòn năm <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    <div class="m-trackingyear" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Năm theo dõi</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-propertyname">
                    </div>
                </div>
                <div class="mt-20 m-buyingdate-usingdate" style="display: flex;">
                    <div class="m-buyingdate" style="width: 32%;">
                        <div class="m-text">Ngày mua <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    <div class="m-usingdate" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Ngày bắt đầu sử dụng <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                    
                </div>

            </div>
            <div class="m-form-add__bottom">
                <button class="btn btn-close" @click="btnCloseFormOnclick">Hủy</button>
                <button class="btn btn-save" >Lưu</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['isShowDialog'],
        
        methods:{
            btnCloseFormOnclick(){
               this.$emit("isShowDialog",false);
            }
        },

        data() {
            return {
                
            }
        },
    }
</script>

<style scoped>
    @import url(../../css/details/propertydetail.css)
</style>