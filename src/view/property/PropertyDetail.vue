<template>
    <div class="m-dialog" :class="{ isShowDialog: isShowDialog }">
        <div id="formadd" class="m-form-add">
            <div class="m-form-add__detail">
                <div class="m-form-add__header">
                    <div class="m-form-add__titel" style="font-size: 20px;">Sửa tài sản</div>
                    <button class="btn-x" @click="btnCloseFormOnclick">
                        <div class="m-icon-x"></div>
                    </button>
                </div>

                <div class="mt-20 m-propertycode-propertyname" style="display: flex;">
                    <div class="m-propertycode" style="width: 32%;">
                        <div class="m-text">Mã tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertycode">
                    </div>
                    <div class="m-propertyname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname">
                    </div>
                </div>

                <div class="mt-15 m-positioncode-positionname" style="display: flex;">
                    <div class="m-positioncode" style="width: 32%;">
                        <div class="m-text">Mã bộ phận sử dụng <span style="color: red;">*</span></div>
                        <div class="mt-8 m-combobox">
                            <input type="text" class="combobox w-100 m-input-positioncode">
                            <button class="btn_combobox">
                                <div class="m-icon-dropdown"></div>
                            </button>
                        </div>
                    </div>


                    <div class="m-positionname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên bộ phận sử dụng</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-positionname">
                    </div>
                </div>

                <div class="mt-15 m-propertycodetype-propertynametype" style="display: flex;">

                    <div class="m-propertycodetype" style="width: 32%;">
                        <div class="m-text">Mã loại tài sản <span style="color: red;">*</span></div>
                        <div class="mt-8 m-combobox">
                            <input type="text" class="combobox w-100 m-input-propertycodetype">
                            <button class="btn_combobox">
                                <div class="m-icon-dropdown"></div>
                            </button>
                        </div>
                    </div>

                    <div class="m-propertynametype" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên loại tài sản</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-propertynametype">
                    </div>

                </div>

                <div class="mt-15 m-amount-cost-longevity" style="display: flex;">
                    <div class="m-amount" style="width: 32%;">
                        <div class="m-text">Số lượng <span style="color: red;">*</span></div>

                        <div class="m-input-amount">
                            <input type="number" class="mt-8 w-100 input " :value="valueAmount">
                            <div class="m-drop">
                                <button class="btn__up" v-on:click="onclickStepAmount(0)">
                                    <div class="m-icon-dropup"></div>
                                </button>
                                <button class="btn__down">
                                    <div class="m-icon-down" v-on:click="onclickStepAmount(1)"></div>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="m-cost" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Nguyên giá <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-cost">
                    </div>
                    <div class="m-longevity" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Số năm sử dụng <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-longevity">
                    </div>
                </div>

                <div class="mt-15 m-lossrate-lossyear-trackingyear" style="display: flex;">

                    <div class="m-lossrate" style="width: 32%;">
                        <div class="m-text">Tỷ lệ hao mòn (%) <span style="color: red;">*</span></div>
                        <div class="m-input-lossrate">
                            <input type="number" class="mt-8 w-100 input" :value="valueLossRate">
                            <div class="m-drop">
                                <button class="btn__up" v-on:click="onclickStepLossRate(0)">
                                    <div class="m-icon-dropup"></div>
                                </button>
                                <button class="btn__down" v-on:click="onclickStepLossRate(1)">
                                    <div class="m-icon-down"></div>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div class="m-lossyear" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Giá trị hao mòn năm <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-lossyear">
                    </div>
                    <div class="m-trackingyear" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Năm theo dõi</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-trackingyear">
                    </div>
                </div>
                <div class="mt-15 m-buyingdate-usingdate" style="display: flex;">
                    <div class="m-buyingdate" style="width: 32%;">
                        <div class="m-text">Ngày mua <span style="color: red;">*</span></div>
                        <input type="date" class="mt-8 w-100 input m-icon-date m-input-buyingdate" :value="curDate">

                    </div>
                    <div class="m-usingdate" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Ngày bắt đầu sử dụng <span style="color: red;">*</span></div>
                        <input type="date" class="mt-8 w-100 input m-icon-date m-input-usingdate" :value="curDate">

                    </div>
                </div>

            </div>
            <div class="m-form-add__bottom">
                <button class="btn btn-close" @click="btnCloseFormOnclick">Hủy</button>
                <button class="btn btn-save">Lưu</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isShowDialog'],
    created() {
        this.formartDate();
    },
    methods: {
        btnCloseFormOnclick() {
            this.$emit("isShowDialog", false);
        },
        
        onclickStepLossRate(check) {
            let me = this;
            switch (check) {
                case 0:
                    me.valueLossRate = me.valueLossRate + 1;
                    break;
                case 1:
                    if (me.valueLossRate < 1) {
                        break;
                    } else {
                        me.valueLossRate = me.valueLossRate - 1;
                        break;
                    }
            }
        },

        onclickStepAmount(check) {
            let me = this;
            switch (check) {
                case 0:
                    me.valueAmount = me.valueAmount + 1;
                    break;
                case 1:
                    if (me.valueAmount < 1) {
                        break;
                    } else {
                        me.valueAmount = me.valueAmount - 1;
                        break;
                    }
            }


        },

        formartDate() {
            var curDate = new Date();
            let day = curDate.getDate();
            day = day < 10 ? `0${day}` : day;
            let month = curDate.getMonth() + 1;
            month = month < 10 ? `0${month}` : day;
            let fullYear = curDate.getFullYear();

            this.curDate = `${fullYear}-${month}-${day}`
            console.log(curDate);
        }
    },

    data() {
        return {
            valueAmount: 0,
            valueLossRate: 0,
            curDate: null,
        }
    },
}
</script>

<style scoped>
@import url(../../css/details/propertydetail.css)
</style>