<template>
    <div class="m-dialog">
        <div id="formadd" class="m-form-add">
            <div class="m-form-add__detail">
                <div class="m-form-add__header">
                    <div class="m-form-add__titel" style="font-size: 20px;">{{ titleForm }}</div>
                    <el-tooltip content="Đóng" placement="top" show-after="400" effect="customized">
                        <button class="btn-x" @click="btnCloseFormOnclick" tabindex="114" @keyup.tab="focus">
                            <div class="m-icon-x"></div>
                        </button>
                    </el-tooltip>

                </div>

                <div class="mt-20 m-propertycode-propertyname" style="display: flex;">
                    <div class="m-propertycode" style="width: 32%;">
                        <div class="m-text">Mã tài sản <span style="color: red;">*</span></div>
                        <input ref="propertycode" type="text" class="mt-8 w-100 input m-input-propertycode"
                            :class="{borderred: borderRedPropertyCode}" v-model="property.fixed_asset_code"
                            tabindex="-1">
                    </div>
                    <div class="m-propertyname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên tài sản <span style="color: red;">*</span></div>
                        <m-input type="text" className="mt-8 w-100 m-input-propertyname"
                            v-model="property.fixed_asset_name" tabindex="102"></m-input>
                    </div>

                    <datepicker v-model="selected" :locale="locale" :upperLimit="to" :lowerLimit="from"
                        :clearable="true" />
                </div>

                <div class="mt-15 m-positioncode-positionname" style="display: flex;">
                    <div class="m-positioncode" style="width: 32%;">
                        <div class="m-text">Mã bộ phận sử dụng <span style="color: red;">*</span></div>
                        <m-combobox css="mt-8" type="text" className="m-property-positioncode w-100"
                            placeholder="Chọn mã bộ phận sử dụng" :showValue="property.department_code"
                            v-model:department_id="property.department_id"
                            v-model:department_code="property.department_code"
                            v-model:department_name="property.department_name" tabindex="103" :url="urlDepartment"
                            :itemID="ItemIDDepartment" :itemName="ItemNameDepartment" :itemCode="ItemCodeDepartment"
                            styleContent="height-150">
                        </m-combobox>
                    </div>
                    <div class="m-positionname" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên bộ phận sử dụng</div>
                        <el-tooltip :content="property.department_name" 
                        :disabled="property.department_name == null"
                        placement="top" show-after="400"
                            effect="customized">
                            <m-input type="text" className="mt-8 w-100 input__disable m-input-positionname"
                                v-model="property.department_name" readonly>
                            </m-input>
                        </el-tooltip>
                    </div>
                </div>

                <div class="mt-15 m-propertycodetype-propertynametype" style="display: flex;">
                    <div class="m-propertycodetype" style="width: 32%;">
                        <div class="m-text">Mã loại tài sản <span style="color: red;">*</span></div>
                        <m-combobox css="mt-8" type="text" className="m-property-propertycodetype w-100"
                            placeholder="Chọn mã loại tài sản" :showValue="property.fixed_asset_category_code"
                            v-model:fixed_asset_category_id="property.fixed_asset_category_id"
                            v-model:fixed_asset_category_code="property.fixed_asset_category_code"
                            v-model:fixed_asset_category_name="property.fixed_asset_category_name"
                            v-model:depreciation_rate="property.depreciation_rate"
                            v-model:life_time="property.life_time" tabindex="103" :url="urlCategoryAsset"
                            :itemID="ItemIDCategoryAsset" :itemCode="ItemCodeCategoryAsset"
                            :itemName="ItemNameCategoryAsset" styleContent="height-150">
                        </m-combobox>
                    </div>
                    <div class="m-propertynametype" style="width: calc(68% - 16px); margin-left: 16px;">
                        <div class="m-text">Tên loại tài sản</div>

                        <el-tooltip :content="property.fixed_asset_category_name" placement="top" show-after="400"
                            effect="customized" :disabled="property.fixed_asset_category_name == null">
                            <m-input type="text" className="mt-8 w-100 input__disable m-input-propertynametype"
                                v-model="property.fixed_asset_category_name" readonly>
                            </m-input>
                        </el-tooltip>
                    </div>
                </div>

                <div class="mt-15 m-amount-cost-longevity" style="display: flex;">
                    <div class="m-amount" style="width: 32%;">
                        <div class="m-text">Số lượng <span style="color: red;">*</span></div>
                        <div class="m-input-amount">
                            <m-input type="number" className="mt-8 w-100" v-model="property.quantity" tabindex="105"
                                style="text-align: right; padding-right: 40px;" @keydown="validateNumber($event)">
                            </m-input>
                            <div class="m-drop">
                                <button class="btn__up" @click="onclickStepAmount(0)">
                                    <div class="m-icon-dropup"></div>
                                </button>
                                <button class="btn__down">
                                    <div class="m-icon-down" @click="onclickStepAmount(1)"></div>
                                </button>
                            </div>
                        </div>


                    </div>
                    <div class="m-cost" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Nguyên giá <span style="color: red;">*</span></div>
                        <m-input type="text" className="mt-8 w-100 m-input-cost" :value="formartNumber(property.cost)"
                            v-model="property.cost" tabindex="106" style="text-align: right;" @input="showValueCost()"
                            @keydown="validateNumber($event)">
                        </m-input>

                    </div>
                    <div class="m-longevity" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Tỷ lệ hao mòn (%) <span style="color: red;">*</span></div>
                        <m-input type="text" className="mt-8 w-100 m-input-longevity"
                            v-model="property.depreciation_rate" tabindex="107" style="text-align: right;"
                            @keydown="validateNumber($event)"
                            ></m-input>
                    </div>
                </div>

                <div class="mt-15 m-buyingdate-usingdate-trackingyear" style="display: flex;">
                    <div class="m-buyingdate" style="width: 32%;">
                        <div class="m-text">Ngày mua <span style="color: red;">*</span></div>
                        <el-date-picker v-model="property.purchase_date" type="date" popper-class="custom-date-picker"
                            class="mt-8 w-100 m-input-buyingdate" format="DD/MM/YYYY" value-format="YYYY-MM-DD"
                            tabindex="108">
                        </el-date-picker>
                    </div>
                    <div class="m-usingdate" style="width: 32%; margin-left: 16px;">
                        <div class="m-text">Ngày bắt đầu sử dụng <span style="color: red;">*</span></div>
                        <el-date-picker v-model="property.production_date" type="date" popper-class="custom-date-picker"
                            class="mt-8 w-100 m-input-usingdate" format="DD/MM/YYYY" value-format="YYYY-MM-DD"
                            tabindex="109">
                        </el-date-picker>

                    </div>
                    <div class="m-trackingyear" style="width: calc(36% - 32px); margin-left: 16px;">
                        <div class="m-text">Năm theo dõi</div>
                        <m-input type="text" className="mt-8 w-100 input__disable m-input-trackingyear"
                            v-model="property.tracked_year" readonly style="text-align: right;">
                        </m-input>
                    </div>
                </div>

                <div class="mt-15 m-lossrate-lossyear" style="display: flex;">
                    <div class="m-lossrate" style="width: 32%;">
                        <div class="m-text">Số năm sửa dụng <span style="color: red;">*</span></div>
                        <div class="m-input-lossrate">
                            <m-input type="number" className="mt-8 w-100" v-model="property.life_time" tabindex="110"
                                style="text-align: right; padding-right: 40px;">
                            </m-input>
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
                        <m-input type="text" className="mt-8 w-100 input m-input-lossyear"
                            :value="formartNumber(lossYear)" v-model="lossYear" tabindex="111"
                            style="text-align: right;"></m-input>
                    </div>
                </div>

            </div>

            <div class="m-form-add__bottom">
                <button class="btn btn-close" tabindex="112" @click="btnCloseFormOnclick">Hủy</button>
                <button class="btn btn-save" tabindex="113" @click="btnSaveFormOnclick">Lưu</button>
            </div>

        </div>

        <ToastMessageAdd v-if="isShowToastAdd" />
        <ToastMessageEdit v-show="isShowToastEdit" :checkTitleForm="checkTitleForm" />
        <ToastMessageValid v-show="isShowDialogToastValid" :moreInfo="moreInfo" :titleFormValid="titleFormValid" />
        <ToastMessageException v-show="isShowDialogToastException" :titleFormException="titleFormException" />
    </div>
</template>

<script>
import axios from 'axios'
import ToastMessageAdd from '../toast/ToastMessageAdd.vue';
import ToastMessageEdit from '../toast/ToastMessageEdit.vue';
import Enum from '../../lib/enum.js'
import Resource from '@/lib/resource';
import MInput from '../../base/input/MInput.vue';
import MCombobox from '@/base/combobox/MCombobox.vue';
import { ElNotification } from 'element-plus';
import ToastMessageValid from '../toast/ToastMessageValid.vue';
import ToastMessageException from '../toast/ToastMessageException.vue';



export default {
    name: 'PropertyDetail',
    components: {
        ToastMessageAdd,
        ToastMessageEdit,
        MInput,
        MCombobox,
        ToastMessageValid,
        ToastMessageException
    },

    props: ['isShowDialog', 'propertyIDSelected', 'checkTitleForm'],

    computed: {
        /**
         * Hàm tự động tính giá trị hao mòn
         * Author NVHThai (27/09/2022)
         */
        lossYear: function () {
            try {
                let depreciationRate = this.property.depreciation_rate;
                if (this.property.cost != 0 && !isNaN(this.property.cost)) {
                    let cost = this.property.cost;

                    let lossYear = cost * depreciationRate / 100;
                    return lossYear.toFixed(0);
                }
                else if (isNaN(this.property.cost)) {
                    let cost = this.property.cost;
                    let cost1 = cost.replace(/[^0-9]/g, '');
                    let lossYear = cost1 * depreciationRate / 100;
                    return lossYear.toFixed(0);
                }
            } catch (error) {
                return 0;
            }
            return 0;
        },


    },
    updated() {
        /**
         * Hàm lắng nghe sự kiện của bàn phím khi click vào nút insert
         * Author NVHThai(29/09/2022)
         */
        //  let me = this;
        document.addEventListener('keyup', function(event){
            if(event.code == "Escape"){
               console.log(2);                
            }
        });


        this.formartDate();
        this.validateMax();

        // this.validateDetail();
    },
    mounted() {

        /**
         * focus vào thẻ đầu tiên
         * Author: NVHThai (09/09/2022)
         */
        this.$nextTick(function () {
            this.$refs.propertycode.focus();
        })

        /**
         * Kiểm tra formMode đầu vào
         * Author: NVHThai (09/09/2022)
         */
        if (this.checkTitleForm == Enum.FormMode.Add) {
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Resource.FormModeTitle.Add;
        } else if (this.checkTitleForm == Enum.FormMode.Edit) {
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Resource.FormModeTitle.Edit;
        }
        else if (this.checkTitleForm == Enum.FormMode.Duplicate) {
            this.checkToastAdd = this.checkTitleForm;
            this.titleForm = Resource.FormModeTitle.Duplicate;
        }


        /**
         * check formmode để lấy dữ liệu vào form
         * Author: NVHThai (09/09/2022)
         */

        switch (this.checkTitleForm) {
            case Enum.FormMode.Edit:
                if (this.propertyIDSelected) {
                    this.getApiPropertyByID(this.propertyIDSelected);
                }
                break;
            case Enum.FormMode.Duplicate:
                if (this.propertyIDSelected) {
                    this.getApiPropertyByID(this.propertyIDSelected);
                }
                break;
            case Enum.FormMode.Add:
                this.property = {};
                this.getApiPropertyMaxCode();
                this.property.cost = 0;
                break;
        }

    },


    methods: {

        /**
         * hàm xét tỷ lệ hao mòn không được lớn hơn 100 
         * Author: NVHThai (28/09/2022)
         */
        validateMax() {
            if (this.property.depreciation_rate > 100) {
                this.property.depreciation_rate = 100;
            }
        },

        

        /**
         * hàm validate dữ liệu đầu vào của thẻ input number
         * @param {$event} e : sự kiện để lấy key code
         */
        validateNumber(e) {
            if ((e.keyCode > 9 && e.keyCode < 37) || (e.keyCode > 40 && e.keyCode < 46) || e.keyCode == 47 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105 || e.keyCode < 7) {
                e.preventDefault();
            }
        },
        
        
        /**
         * Hàm nhập số tiền vào ô thì tự format số 
         * Author: NVHThai (27/09/2022)
         */
        showValueCost() {

            let cost = this.property.cost;
            if (cost != 0) {
                let tmpCost = cost.replace(/[^0-9]/g, '');
                let showCost = this.formartNumber(tmpCost);
                this.property.cost = showCost;
            }


        },
        /**
         * Hàm formart số  
         * Author: NVHTHai (12/09/2022)
         * @param {int} number 
         */
        formartNumber(number) {
            try {
                if (number && !isNaN(number)) {
                    return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
                } else {
                    return number;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Hàm focus vào thẻ mong muốn 
         * Author(24/09/2022)
         */
        focus() {
            this.$nextTick(function () {
                this.$refs.propertycode.focus();
            })
        },
        /**
         * Hàm lấy dữ liệu mã tài sản lớn nhất
         * Author: NVHThai (19/09/2022)
         */
        getApiPropertyMaxCode() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(`https://localhost:7242/api/v1/Assets/new-code`)
                    .then((response) => {
                        me.property.fixed_asset_code = response.data;
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
        getApiPropertyByID(propertyID) {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(`https://localhost:7242/api/v1/Assets/${propertyID}`)
                    .then((response) => {
                        me.property = response.data;

                        // Lấy mã tài sản lớn nhất nếu là form nhân bản còn sửa thì không
                        if (me.checkTitleForm == Enum.FormMode.Duplicate) {
                            me.getApiPropertyMaxCode();
                        }

                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Thêm 1 bản ghi vào bảng tài sản
         * Author: NVHThai (25/09/2022)
         * @param {*} property 
         */
        postApiProperty() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .post(Resource.Url.Asset, me.property)
                    .then((response) => {
                        if (response.status == Enum.StatusCode.CREATED) {

                            //đóng form add
                            this.btnDetroyToastAttentionAddOnclick();

                            // tải lại dữ liệu
                            this.$parent.getDataAPI();

                            // hiện thông báo thêm thành công
                            ElNotification({
                                duration: 1500,
                                message: "Lưu dữ liệu thành công",
                                position: 'bottom-right',
                                type: 'success',
                            })
                        }
                    }).catch(response => {
                        console.log('response: ', response.response.status);
                        me.handleException(response.response.status, response.response.data.moreInfo, response.response.data.userMsg);
                    });
            } catch (error) {
                console.log(error);
            }
        },


        /**
         * Sửa 1 bản ghi vào bảng tài sản
         * Author: NVHThai (26/09/2022)
         * @param {Obj} property: 1 đối tượng chứa thông tin tài sản
         */
        putApiProperty() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .put(`https://localhost:7242/api/v1/Assets/${me.propertyIDSelected}`, me.property)
                    .then((response) => {
                        if (response.status == Enum.StatusCode.CREATED) {

                            //đóng form add
                            this.btnDetroyToastAttentionAddOnclick();

                            // tải lại dữ liệu
                            this.$parent.getDataAPI();

                            // hiện thông báo thêm thành công
                            ElNotification({
                                duration: 1500,
                                message: "Lưu dữ liệu thành công",
                                position: 'bottom-right',
                                type: 'success',
                            })
                        }
                    }).catch(response => {
                        console.log('response: ', response.response.status);
                        me.handleException(response.response.status, response.response.data.moreInfo, response.response.data.userMsg);
                    });
            } catch (error) {
                console.log(error);
            }
        },


        /**
         * Hàm xử lý exception gửi về từ backend hiện ra cho người dùng
         * Author: NVHThai(26/09/2022)
         * @param {int} status: trạng thái bên backend trả về 
         * @param {arr} moreInfo: Mảng các lỗi do người dùng nhập thiếu từ backend trả về 
         * @param {string} userMsg: Lỗi từ backend trả về hiển thị cho người dùng 
         */
        handleException(status, moreInfo, userMsg) {
            switch (status) {
                case Enum.StatusCode.BADREQUEST:
                    this.moreInfo = moreInfo;
                    this.titleFormValid = userMsg;
                    this.isShowDialogToastValid = true;
                    break;
                case Enum.StatusCode.FORBIDDEN:
                    this.titleFormException = Resource.TitleException.FORBIDDEN;
                    this.isShowDialogToastException = true;
                    break;
                case Enum.StatusCode.NOTFOUND:
                    this.titleFormException = Resource.TitleException.NOTFOUND;
                    this.isShowDialogToastException = true;
                    break;
                case Enum.StatusCode.UNAUTHORIZED:
                    this.titleFormException = Resource.TitleException.UNAUTHORIZED;
                    this.isShowDialogToastException = true;
                    break;
                case Enum.StatusCode.NTERNALSERVERERROR:
                    this.titleFormException = Resource.TitleException.NTERNALSERVERERROR;
                    this.isShowDialogToastException = true;
                    break;
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
            else if (this.checkTitleForm == Enum.FormMode.Edit) {
                this.isShowToastEdit = true;
            }
            else if (this.checkTitleForm == Enum.FormMode.Duplicate) {
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
         *  Hàm đóng popup nếu click vào nút hủy trên toast message valid
         *  Author: NVHThai (26/09/2022)
         */
        closeToastValid() {
            this.isShowDialogToastValid = false;
        },

        /**
         *  Hàm đóng popup nếu click vào nút hủy trên toast message Exception
         *  Author: NVHThai (26/09/2022)
         */
        closeToastException() {
            this.isShowDialogToastException = false;
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
            switch (check) {
                case 0:
                    this.property.life_time = parseInt(this.property.life_time) + 1;
                    this.property.life_time = parseInt(this.property.life_time) < 10 ? `0${parseInt(this.property.life_time)}` : parseInt(this.property.life_time);
                    break;
                case 1:
                    if (this.property.life_time < 1) {
                        break;
                    } else {
                        this.property.life_time = parseInt(this.property.life_time) - 1;
                        this.property.life_time = parseInt(this.property.life_time) < 10 ? `0${parseInt(this.property.life_time)}` : parseInt(this.property.life_time);
                        break;
                    }
            }
        },


        /**
         * Hàm tính toán valueAmount
         * Author: NVHThai (10/09/2022)
         * @param {*} check 
         */
        onclickStepAmount(check) {
            switch (check) {
                case 0:
                    this.property.quantity = parseInt(this.property.quantity) + 1;
                    this.property.quantity = parseInt(this.property.quantity) < 10 ? `0${parseInt(this.property.quantity)}` : parseInt(this.property.quantity);
                    break;
                case 1:
                    if (this.property.quantity < 1) {
                        break;
                    } else {
                        this.property.quantity = parseInt(this.property.quantity) - 1;
                        this.property.quantity = parseInt(this.property.quantity) < 10 ? `0${parseInt(this.property.quantity)}` : parseInt(this.property.quantity);
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
            if (this.checkTitleForm == Enum.FormMode.Add) {
                this.property.purchase_date = `${fullYear}-${month}-${day}`;
                this.property.production_date = `${fullYear}-${month}-${day}`;
                this.property.tracked_year = fullYear;
            }
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

        /**
         * Hàm để hiển thị thông tin lên thẻ input ở cbx
         * Author: NVHThai (08/09/2022)
         * @param {string} department 
         */
        onClickCbbDepartment(department) {
            this.departmentName = department;
            this.isShowmComboboxContentDepartment = false;
        },


        /**
         * Hàm xử lý dữ liệu đầu vào
         * Author: NVHThai (26/09/2022)
         */
        handleInsertData() {

            if (!isNaN(this.property.cost)) {
                this.property.cost = parseFloat(this.property.cost);
            }
            else {
                this.property.cost = parseFloat(this.property.cost.replace(/[^0-9]/g, ''));
            }
            this.property.quantity = parseInt(this.property.quantity);
            this.property.life_time = parseInt(this.property.life_time);
            if (this.property.depreciation_rate != null) {
                this.property.depreciation_rate = parseFloat(this.property.depreciation_rate);
            }
        },


        deleteDataInMoreInfo() {
            this.moreInfo.splice(0, 100);
        },

        /**
         * Hàm lưu form
         * Author: NVHThai (14/09/2022)
         */
        btnSaveFormOnclick() {
            this.validateEmpty();
            if (this.checkValidate == true) {
                switch (this.checkTitleForm) {
                    case Enum.FormMode.Add:
                        this.handleInsertData();
                        this.postApiProperty();
                        break;
                    case Enum.FormMode.Edit:
                        this.handleInsertData();
                        this.putApiProperty();
                        break;
                    case Enum.FormMode.Duplicate:
                        this.handleInsertData();
                        this.postApiProperty();
                        break;
                }
            }

        },

        /**
         * Validate dữ liệu xem trường nào null hoặc rỗng
         * Author: NVHThai (28/09/2022)
         */
        validateEmpty() {

            if (this.property.fixed_asset_code == null || this.property.fixed_asset_name == null || this.property.department_code == null ||
                this.property.fixed_asset_category_code == null || this.property.quantity == null || this.property.cost == null ||
                this.property.depreciation_rate == null || this.property.life_time == null || this.lossYear == null ||
                this.property.fixed_asset_code == "" || this.property.fixed_asset_name == "" || this.property.department_code == "" ||
                this.property.fixed_asset_category_code == "" || this.property.quantity == "" || this.property.cost == "" ||
                this.property.depreciation_rate == "" || this.property.life_time == "" || this.lossYear == ""
            ) {
                this.isShowDialogToastValid = true;
                this.titleFormValid = Resource.TitleToast.TitleFormValidate;
                this.checkValidate = false;
            } else {
                this.checkValidate = true;
            }


            if (this.property.fixed_asset_code == null || this.property.fixed_asset_code == "") {
                this.moreInfo.push(Resource.MessageValidate.AssetCode);
            }
            if (this.property.fixed_asset_name == null || this.property.fixed_asset_name == "") {
                this.moreInfo.push(Resource.MessageValidate.AssetName);
            }
            if (this.property.department_code == null || this.property.department_code == "") {
                this.moreInfo.push(Resource.MessageValidate.DepartmentCode);
            }
            if (this.property.fixed_asset_category_code == null || this.property.fixed_asset_category_code == "") {
                this.moreInfo.push(Resource.MessageValidate.AssetCategoryCode);
            }
            if (this.property.quantity == null || this.property.quantity == "") {
                this.moreInfo.push(Resource.MessageValidate.Quanlity);
            }
            if (this.property.cost == null || this.property.cost == "") {
                this.moreInfo.push(Resource.MessageValidate.Cost);
            }
            if (this.property.depreciation_rate == null || this.property.depreciation_rate == "") {
                this.moreInfo.push(Resource.MessageValidate.DepreciationRate);
            }
            if (this.property.life_time == null || this.property.life_time == "") {
                this.moreInfo.push(Resource.MessageValidate.LifeTime);
            }
            if (this.lossYear == null || this.property.null == "") {
                this.moreInfo.push(Resource.MessageValidate.LossYear);
            }
        },

    },


    data() {
        return {
            checkValidate: false,
            // biến show khi backend trả về lỗi 401,404,500
            isShowDialogToastException: false,
            // biến show khi backend trả về lỗi 400
            isShowDialogToastValid: false,
            // title của toast validate
            titleFormValid: null,
            // title của toast validate
            titleFormException: null,
            //kiểm tra nút lưu
            FormModeCheck: null,
            // show form sau khi hủy form thêm tài sản
            isShowToastAdd: false,
            // show form sau khi hủy form sửa tài sản
            isShowToastEdit: false,

            //giá trị số lượng
            valueAmount: 0,

            //
            valueLossRate: 0,

            //ngày hiện tại
            productionDate: null,
            purchaseDate: null,
            //năm hiện tại
            curYear: null,

            moreInfo: [],

            //tài sản
            property: {},
            // mã loại tài sản
            positions: {},
            //ẩn hiện cbxx
            isShowmComboboxContentAssetType: false,
            isShowmComboboxContentDepartment: false,

            //title form
            titleForm: Resource.FormModeTitle.Add,

            //
            urlCategoryAsset: Resource.Url.CategoryAsset,
            urlDepartment: Resource.Url.Department,

            //
            ItemCodeCategoryAsset: Resource.ItemCode.ItemCodeCategoryAsset,
            ItemIDCategoryAsset: Resource.ItemID.ItemIDCategoryAsset,
            ItemCodeDepartment: Resource.ItemCode.ItemCodeDepartment,
            ItemIDDepartment: Resource.ItemID.ItemIDDepartment,
            ItemNameDepartment: Resource.ItemName.ItemNameDepartment,
            ItemNameCategoryAsset: Resource.ItemName.ItemNameCategoryAsset,

        }
    },
}
</script>

<style scoped>
@import url(../../css/details/propertydetail.css);
</style>