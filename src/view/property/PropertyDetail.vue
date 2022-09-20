<template>
    <div class="m-dialog" :class="{ isShowDialog: isShowDialog }">
        <div id="formadd" class="m-form-add">
            <div class="m-form-add__detail">
                <div class="m-form-add__header">
                    <div class="m-form-add__titel" style="font-size: 20px;">{{ titleForm }}</div>
                    <button class="btn-x" @click="btnCloseFormOnclick">
                        <div class="m-icon-x"></div>
                    </button>
                </div>

                <div  class="mt-20 m-propertycode-propertyname" style="display: flex;">

                    <div class="m-propertycode" style="width: 32%;">
                        <div class="m-text">Mã tài sản <span style="color: red;">*</span></div>
                        <input ref="propertycode" type="text" class="mt-8 w-100 input m-input-propertycode"
                            @blur="inputValidateOnblur(1)" 
                            :class="{borderred: borderRedPropertyCode}"
                            v-model="property.employeesCode"
                            tabindex="101">
                    </div>

                    <div class="m-propertyname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên tài sản <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-propertyname" placeholder="Nhập tên tài sản"
                            @blur="inputValidateOnblur(2)" :class="{borderred: borderRedPropertyName}"
                            v-model="property.employeesName"
                            tabindex="102">
                    </div>
                </div>

                <div class="mt-15 m-positioncode-positionname" style="display: flex;">
                    <div class="m-positioncode" style="width: 32%;">
                        <div class="m-text">Mã bộ phận sử dụng <span style="color: red;">*</span></div>
                        <div class="mt-8 m-combobox">
                            <input type="text" class="w-100 combobox m-property-positioncode"
                                placeholder="Chọn mã bộ phận sử dụng" @blur="inputValidateOnblur(3)"
                                :class="{borderred: borderRedDepartmentCode}" :value="departmentName"
                                @click="btnOpenShowComboboxDepartment"
                                tabindex="103">

                            <button class="btn_combobox" @click="btnOpenShowComboboxDepartment" @blur="hideContentCbbBlur">
                                <div class="m-icon-dropdown"></div>
                            </button>
                            <div class="m-combobox__content" v-show="isShowmComboboxContentDepartment">
                                <div class="m-border">
                                    <div v-for="department in departments" :key="department.departmentsID"
                                        class="m-option-cbb"
                                        v-on:click="onClickCbbDepartment(department.departmentsName)">
                                        {{ department.departmentsName }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-positionname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên bộ phận sử dụng</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-positionname" readonly
                            v-model="property.identityNumber"
                            :class="{borderred: borderRedDepartmentCode}">
                    </div>
                </div>

                <div class="mt-15 m-propertycodetype-propertynametype" style="display: flex;">
                    <div class="m-propertycodetype" style="width: 32%;">
                        <div class="m-text">Mã loại tài sản <span style="color: red;">*</span></div>


                        <div class="mt-8 m-combobox">
                            <input type="text" class="w-100 combobox m-property-propertycodetype"
                                placeholder="Chọn mã loại tài sản" v-model="positionsName"
                                @click="btnOpenShowComboboxAssetType"
                                @blur="inputValidateOnblur(4)"
                                :class="{borderred: borderRedPropertyCodeType}"
                                tabindex="104">
                            <button class="btn_combobox" @click="btnOpenShowComboboxAssetType" @blur="hideContentCbbBlur">
                                <div class="m-icon-dropdown"></div>
                            </button>
                            <div class="m-combobox__content" v-show="isShowmComboboxContentAssetType">
                                <div class="m-border">
                                    <div v-for="position in positions" :key="position.positionsID"
                                        class="m-option-cbb"
                                        v-on:click="onClickCbbAssetType(position.positionsName)">
                                        {{ position.positionsName }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-propertynametype" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên loại tài sản</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-propertynametype" readonly
                        :class="{borderred: borderRedPropertyCodeType}">

                    </div>

                </div>

                <div class="mt-15 m-amount-cost-longevity" style="display: flex;">
                    <div class="m-amount" style="width: 32%;">
                        <div class="m-text">Số lượng <span style="color: red;">*</span></div>

                        <div class="m-input-amount">
                            <input type="number" class="mt-8 w-100 input " v-model="valueAmount"
                            tabindex="105">
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
                        <input type="text" class="mt-8 w-100 input m-input-cost"
                        tabindex="106">

                    </div>
                    <div class="m-longevity" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Tỷ lệ hao mòn (%) <span style="color: red;">*</span></div>
                        <input type="text" class="mt-8 w-100 input m-input-longevity"
                        tabindex="107">

                    </div>
                </div>
                <div class="mt-15 m-buyingdate-usingdate-trackingyear" style="display: flex;">
                    <div class="m-buyingdate" style="width: 32%;">
                        <div class="m-text">Ngày mua <span style="color: red;">*</span></div>
                        <input type="date" class="mt-8 w-100 input m-icon-date m-input-buyingdate" :value="curDate"
                        tabindex="108">

                    </div>
                    <div class="m-usingdate" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Ngày bắt đầu sử dụng <span style="color: red;">*</span></div>
                        <input type="date" class="mt-8 w-100 input m-icon-date m-input-usingdate" v-model="curDate"
                        tabindex="109">

                    </div>

                    <div class="m-trackingyear" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Năm theo dõi</div>
                        <input type="text" class="mt-8 w-100 input input__disable m-input-trackingyear" readonly
                            v-model="curYear">

                    </div>
                </div>
                <div class="mt-15 m-lossrate-lossyear" style="display: flex;">

                    <div class="m-lossrate" style="width: 32%;">
                        <div class="m-text">Số năm sửa dụng <span style="color: red;">*</span></div>
                        <div class="m-input-lossrate">
                            <input type="number" class="mt-8 w-100 input" v-model="valueLossRate"
                            tabindex="110">
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
                        <input type="text" value="" class="mt-8 w-100 input m-input-lossyear"
                        tabindex="111">
                    </div>

                </div>


            </div>
            <div class="m-form-add__bottom">
                <button class="btn btn-close" @click="btnCloseFormOnclick">Hủy</button>
                <button class="btn btn-save" @click="btnSaveFormOnclick">Lưu</button>
            </div>
        </div>

        <ToastMessageAdd v-show="isShowToastAdd" />
        <ToastMessageEdit v-show="isShowToastEdit" />
    </div>
</template>

<script>
import axios from 'axios'
import ToastMessageAdd from '../toast/ToastMessageAdd.vue';
import ToastMessageEdit from '../toast/ToastMessageEdit.vue';
import Enum from '../../assets/lib/enum.js' 



export default {
    name:'PropertyDetail',
    components: {
        ToastMessageAdd,
        ToastMessageEdit
    },

    /**
     * porps được truyền vào của PropertyList
     */
    props: ['isShowDialog', 'propertyIDSelected', 'checkTitleForm'],

    /**
     * created
     */
    created() {

        //lấy dữ liệu ngày tháng hiện tại cho form
        this.formartDate();

        // lấy dữ liệu từ api cho cbx 
        this.getDataDepartment();

        this.getDataPosition();
    },

    mounted() {
        console.log(2);
        //focus vào thẻ đầu tiên
        this.$nextTick(function () {
            this.$refs.propertycode.focus()
        })

        // check form mode
        if (this.checkTitleForm == Enum.FormMode.Add){
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Enum.FormModeTitle.Add;
        } else if(this.checkTitleForm == Enum.FormMode.Edit){
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Enum.FormModeTitle.Edit;
        }
        else if(this.checkTitleForm == Enum.FormMode.Duplicate){
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Enum.FormModeTitle.Duplicate;
        }


        // lấy dữ liệu 
        if (this.propertyIDSelected && this.checkTitleForm == Enum.FormMode.Edit) {
            try {
                this.getApiPropertyByID(this.propertyIDSelected)
            } catch (error) {
                console.log(error);
            }
        }
        else if(this.propertyIDSelected && this.checkTitleForm == Enum.FormMode.Duplicate){
            try {
                this.getApiPropertyByID(this.propertyIDSelected);

            } catch (error) {
                console.log(error);
            }
        }
        else {
            this.property = {};
            this.getApiPropertyMaxCode();
        }
    },

    /**
     * Validate dữ liệu
     * Author: NVHThai (10/09/2022)
     */
    updated() {
        if (this.property.employeesCode) {
            this.borderRedPropertyCode = false;
        }
        if (this.property.employeesName) {
            this.borderRedPropertyName = false;
        }

    },


    methods: {
        /**
         * Hàm lấy dữ liệu mã tài sản lớn nhất
         *
         */
        getApiPropertyMaxCode(){
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(`https://localhost:7285/api/v1/Employees/new-code`)
                    .then((response) => {
                        me.property.employeesCode = response.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },


        /**
         * Lấy dữ liệu api tài sản chi tiết 
         * Author: NVHThai (19/09/2022)
         * @param {*} propertyID 
         */
        getApiPropertyByID(propertyID){
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(`https://localhost:7285/api/v1/Employees/${propertyID}`)
                    .then((response) => {
                        me.property = response.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Hàm click vào btn Hủy thì form detail sẽ hiện lên popup hỏi người dùng
         *  Author: NVHThai (08/09/2022)
         */
        btnCloseFormOnclick() {
            if (this.checkTitleForm == Enum.FormMode.Add) {
                this.isShowToastAdd = true;
            }
            else if(this.checkTitleForm == Enum.FormMode.Edit) {
                this.isShowToastEdit = true;
            }
            else if(this.checkTitleForm == Enum.FormMode.Duplicate) {
                this.isShowToastEdit = true;
            }
        },

        /**
         *  Hàm đóng popup nếu click vào nút hủy trên toast message add
         *  Author: NVHThai (08/09/2022)
         */
        btnCloseToastAttentionAddOnclick() {
            this.isShowToastAdd = false;
        },



        /**
         *  Hàm đóng form add và cả popup toast message add khi click vào btn Hủy bỏ
         *  Author: NVHThai (08/09/2022)
         */
        btnDetroyToastAttentionAddOnclick() {
            this.isShowToastAdd = false;
            this.$parent.hideFormAdd();
        },


        /**
         * Hàm đóng popup nếu click vào nút hủy trên toast message edit
         * Author: NVHThai (10/09/2022)
         */
        closeToastAttentionEdit() {
            this.isShowToastEdit = false;
        },


        /**
        *  Hàm đóng form add và cả popup toast message edit khi click vào btn Hủy bỏ
        *  Author: NVHThai (08/09/2022)
        */
        detroyToastAttentionEdit() {
            this.isShowToastEdit = false;
            this.$parent.hideFormAdd();
        },


        /**
         * Hàm tính toán valueLossRate
         * Author: NVHThai (10/09/2022)
         * @param {*} check 
         */
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



        /**
         * Author: nvhthai (01/09/2022)
         * Lấy dữ liệu bảng phòng ban
         */
        getDataDepartment() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get("https://localhost:7285/api/Departments")
                    .then((response) => {
                        me.departments = response.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Author: nvhthai (01/09/2022)
         * Lấy dữ liệu bảng vị trí: sau này là mã loại tài sản
         */
         getDataPosition() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get("https://localhost:7285/api/v1/Positions")
                    .then((response) => {
                        me.positions = response.data;
                        console.log(me.positions);
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },




        /**
         * Hàm tính toán valueAmount
         * Author: NVHThai (10/09/2022)
         * @param {*} check 
         */
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




        /**
         * Hàm lấy dữ liệu ngày hiện tại
         * Author: NVHThai (09/08/2022)
         */
        formartDate() {
            let curDate = new Date();
            let day = curDate.getDate();
            day = day < 10 ? `0${day}` : day;
            let month = curDate.getMonth() + 1;
            month = month < 10 ? `0${month}` : day;
            let fullYear = curDate.getFullYear();

            this.curDate = `${fullYear}-${month}-${day}`;
            this.curYear = fullYear;
        },


        /**
         * Hàm click vào thì nội dung cbx hiện ra
         *  Author: NVHThai (08/09/2022)
         */
         btnOpenShowComboboxDepartment() {
            this.isShowmComboboxContentDepartment = !this.isShowmComboboxContentDepartment;
        },

         /**
         * Hàm click vào thì nội dung cbx hiện ra
         *  Author: NVHThai (08/09/2022)
         */
         btnOpenShowComboboxAssetType() {
            this.isShowmComboboxContentAssetType = !this.isShowmComboboxContentAssetType;
        },

        /**
         * Hàm để hiển thị thông tin lên thẻ input ở cbx
         * Author: NVHThai (08/09/2022)
         * @param {string} position 
         */
        onClickCbbAssetType(position) {
            this.positionsName = position;
            this.isShowmComboboxContentAssetType = false;
        },

        onClickCbbDepartment(department){
            this.departmentName = department;
            this.isShowmComboboxContentDepartment = false;
        },


        /**
         * Blur check rỗng trong form nhập
         * 
         */
        inputValidateOnblur(formModeValidate) {
            if (!this.property.employeesCode && formModeValidate == Enum.Validate.PropertyCode) {
                this.borderRedPropertyCode = true;
            }
            if (!this.property.employeesName && formModeValidate == Enum.Validate.PropertyName) {
                this.borderRedPropertyName = true;
            }
            if (!this.property.employeesName && formModeValidate == Enum.Validate.DepartmentCode) {
                this.borderRedDepartmentCode = true;
            }
            if (!this.property.employeesName && formModeValidate == Enum.Validate.DepartmentCode) {
                this.borderRedPropertyCodeType = true;
            }
            
        },

       

        /**
         * Hàm lưu form
         * Author: NVHThai (14/09/2022)
         */

        btnSaveFormOnclick() {
            console.log(this.property);
        },

        /**
         * hàm khi blur ra khỏi combobox thì content cbb sẽ ẩn
         * Author: NVHThai (14/09/2022)
         */
        //  hideContentCbbBlur(){
        //     this.isShowmComboboxContent = false;
        //  }
    },


    data() {
        return {
            // show form sau khi hủy form thêm tài sản
            isShowToastAdd: false,
            // show form sau khi hủy form sửa tài sản
            isShowToastEdit: false,

            //giá trị số lượng
            valueAmount: 0,

            //
            valueLossRate: 0,

            //ngày hiện tại
            curDate: null,

            //năm hiện tại
            curYear: null,

            //tài sản
            property: {},
            // mã loại tài sản
            positions:{},
            //ẩn hiện cbxx
            isShowmComboboxContentAssetType: false,
            isShowmComboboxContentDepartment: false,

            //title form
            titleForm: 'Thêm tài sản',

            //
            borderRedPropertyCode: false,
            borderRedPropertyName: false,
            borderRedDepartmentCode: false,
            borderRedPropertyCodeType: false,



        }
    },
}
</script>

<style scoped>
@import url(../../css/details/propertydetail.css)
</style>