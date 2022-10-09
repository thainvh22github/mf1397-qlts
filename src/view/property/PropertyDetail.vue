<template>
  <div class="m-dialog" @keydown.ctrl.f8="btnSaveFormOnclick()" @keydown.ctrl.f9="btnCloseFormOnclick()"
    @keydown.esc="btnCloseFormOnclick()">
    <div id="formadd" class="m-form-add">
      <div class="m-form-add__detail">
        <div class="m-form-add__header">
          <div class="m-form-add__titel" style="font-size: 20px">
            {{ titleForm }}
          </div>

          <el-tooltip :content="textTooltipClose" placement="top" show-after="400" effect="customized">
            <button id="btnX" class="btn-x" @click="btnCloseFormOnclick" tabindex="100">
              <div class="m-icon-x"></div>
            </button>
          </el-tooltip>
        </div>

        <div class="mt-20 m-propertycode-propertyname" style="display: flex">
          <div class="m-propertycode" style="width: 32%">
            <div class="m-text">{{ textAssetCode }} <span style="color: red">*</span></div>
              <m-input type="text" focusInput="propertycode" className="mt-8 w-100 m-input-propertycode" v-model="property.fixed_asset_code"
                tabindex="101" :checkInputValidate="checkInputValidate">
              </m-input>
          </div>

          <div class="m-propertyname" style="width: calc(68% - 16px); margin-left: 16px">
            <div class="m-text">{{ textAssetName }} <span style="color: red">*</span></div>
            <m-input type="text" className="mt-8 w-100 m-input-propertyname" v-model="property.fixed_asset_name"
              tabindex="102" :checkInputValidate="checkInputValidate" :placeholder=textPAssetName>
            </m-input>
          </div>
        </div>

        <div class="mt-15 m-positioncode-positionname" style="display: flex">
          <div class="m-positioncode" style="width: 32%">
            <div class="m-text">{{textAssetDepartmentCode}} <span style="color: red">*</span></div>

            <m-combobox css="mt-8" type="text" className="m-property-positioncode w-100"
              :placeholder=textPDepartmentCode :showValue="property.department_code"
              v-model:department_id="property.department_id" v-model:department_code="property.department_code"
              v-model:department_name="property.department_name" tabindex="103" :url="urlDepartment"
              :itemID="ItemIDDepartment" :itemName="ItemNameDepartment" :itemCode="ItemCodeDepartment"
              styleContent="height-150" :checkInputValidate="checkInputValidate">
            </m-combobox>
          </div>

          <div class="m-positionname" style="width: calc(68% - 16px); margin-left: 16px">
            <div class="m-text">{{textAssetDepartmentName}}</div>

            <el-tooltip :content="property.department_name" :disabled="property.department_name == null" placement="top"
              show-after="400" effect="customized">
              <m-input type="text" className="mt-8 w-100 input__disable m-input-positionname"
                v-model="property.department_name" readonly>
              </m-input>
            </el-tooltip>
          </div>
        </div>

        <div class="mt-15 m-propertycodetype-propertynametype" style="display: flex">
          <div class="m-propertycodetype" style="width: 32%">
            <div class="m-text">{{textAssetCategoryCode}} <span style="color: red">*</span></div>

            <m-combobox css="mt-8" type="text" className="m-property-propertycodetype w-100"
              :placeholder="textPAssetCategoryCode" :showValue="property.fixed_asset_category_code"
              v-model:fixed_asset_category_id="property.fixed_asset_category_id"
              v-model:fixed_asset_category_code="property.fixed_asset_category_code"
              v-model:fixed_asset_category_name="property.fixed_asset_category_name"
              v-model:depreciation_rate="property.depreciation_rate" v-model:life_time="property.life_time"
              tabindex="104" :url="urlCategoryAsset" :itemID="ItemIDCategoryAsset" :itemCode="ItemCodeCategoryAsset"
              :itemName="ItemNameCategoryAsset" styleContent="height-150" :checkInputValidate="checkInputValidate">
            </m-combobox>
          </div>

          <div class="m-propertynametype" style="width: calc(68% - 16px); margin-left: 16px">
            <div class="m-text">{{textAssetCategoryName}} </div>

            <el-tooltip :content="property.fixed_asset_category_name" placement="top" show-after="400"
              effect="customized" :disabled="property.fixed_asset_category_name == null">
              <m-input type="text" className="mt-8 w-100 input__disable m-input-propertynametype"
                v-model="property.fixed_asset_category_name" readonly>
              </m-input>
            </el-tooltip>
          </div>
        </div>

        <div class="mt-15 m-amount-cost-longevity" style="display: flex">
          <div class="m-amount" style="width: 32%">
            <div class="m-text">{{textQuanlity}} <span style="color: red">*</span></div>

            <div class="m-input-amount">
              <m-input type="number" className="mt-8 w-100" v-model="property.quantity" tabindex="105"
                style="text-align: right; padding-right: 40px" @keydown="validateNumber($event)"
                :checkInputValidate="checkInputValidate" min="0">
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

          <div class="m-cost" style="width: 32%; margin-left: 16px">
            <div class="m-text">{{textCost}} <span style="color: red">*</span></div>
            <m-input type="text" className="mt-8 w-100 m-input-cost" :value="formartNumber(property.cost)"
              v-model="property.cost" tabindex="106" style="text-align: right" @input="showValueCost()"
              @keydown="validateNumber($event)" :checkInputValidate="checkInputValidate">
            </m-input>
          </div>

          <div class="m-longevity" style="width: calc(36% - 32px); margin-left: 16px">
            <div class="m-text">{{DepreciationRate}} <span style="color: red">*</span></div>
            <m-input type="text" className="mt-8 w-100 m-input-longevity"
              :value="formartRate(property.depreciation_rate)" v-model="property.depreciation_rate" tabindex="107"
              style="text-align: right" @keydown="validateNumber($event)" :checkInputValidate="checkInputValidate"
              @input="changeValueLossYear()"></m-input>
          </div>
        </div>

        <div class="mt-15 m-buyingdate-usingdate-trackingyear" style="display: flex">
          <div class="m-buyingdate" style="width: 32%">
            <div class="m-text">{{textBuyingDate}} <span style="color: red">*</span></div>
            <el-date-picker v-model="property.purchase_date" type="date" popper-class="custom-date-picker"
              class="mt-8 w-100 m-input-buyingdate" format="DD/MM/YYYY" value-format="YYYY-MM-DD" tabindex="108">
            </el-date-picker>
          </div>

          <div class="m-usingdate" style="width: 32%; margin-left: 16px">
            <div class="m-text">{{textUsingDate}} <span style="color: red">*</span>
            </div>
            <el-date-picker v-model="property.production_date" type="date" popper-class="custom-date-picker"
              class="mt-8 w-100 m-input-usingdate" format="DD/MM/YYYY" value-format="YYYY-MM-DD" tabindex="109">
            </el-date-picker>
          </div>
          <div class="m-trackingyear" style="width: calc(36% - 32px); margin-left: 16px">
            <div class="m-text">Năm theo dõi</div>
            <m-input type="text" className="mt-8 w-100 input__disable m-input-trackingyear"
              v-model="property.tracked_year" readonly style="text-align: right">
            </m-input>
          </div>
        </div>

        <div class="mt-15 m-lossrate-lossyear" style="display: flex">
          <div class="m-lossrate" style="width: 32%">
            <div class="m-text">{{textLifeTime}} <span style="color: red">*</span></div>
            <div class="m-input-lossrate">
              <m-input type="number" className="mt-8 w-100" v-model="property.life_time" tabindex="110"
                style="text-align: right; padding-right: 40px" :checkInputValidate="checkInputValidate">
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

          <div class="m-lossyear" style="width: 32%; margin-left: 16px">
            <div class="m-text">{{textDepreciationRate}} <span style="color: red">*</span>
            </div>
            <m-input type="text" className="mt-8 w-100 input m-input-lossyear"
              :value="formartNumber(property.loss_year)" v-model="property.loss_year" tabindex="111"
              style="text-align: right" :checkInputValidate="checkInputValidate" @input="showValueLossYear()"></m-input>
          </div>
        </div>
      </div>

      <div class="m-form-add__bottom">
        <button class="btn btn-close" tabindex="112" @click="btnCloseFormOnclick">
          {{textBClose}}
        </button>
        <button class="btn btn-save" tabindex="113"  @keydown.tab="loopFocus" @click="btnSaveFormOnclick">
          {{textBSave}}
        </button>
      </div>
    </div>

    <ToastMessageAdd v-if="isShowToastAdd" />
    <ToastMessageEdit v-if="isShowToastEdit" :checkTitleForm="checkTitleForm" />
    <ToastMessageValid v-if="isShowDialogToastValid" :moreInfo="moreInfo" :titleFormValid="titleFormValid" />
    <ToastMessageException v-show="isShowDialogToastException" :titleFormException="titleFormException" />
  </div>
</template>

<script>
import axios from "axios";
import ToastMessageAdd from "../toast/ToastMessageAdd.vue";
import ToastMessageEdit from "../toast/ToastMessageEdit.vue";
import Enum from "../../lib/enum.js";
import BaseMethod from "../../lib/baseMethod";
import Resource from "@/lib/resource";
import MInput from "../../base/input/MInput.vue";
import MCombobox from "@/base/combobox/MCombobox.vue";
import { ElNotification } from "element-plus";
import ToastMessageValid from "../toast/ToastMessageValid.vue";
import ToastMessageException from "../toast/ToastMessageException.vue";
export default {
  name: "PropertyDetail",
  components: {
    ToastMessageAdd,
    ToastMessageEdit,
    MInput,
    MCombobox,
    ToastMessageValid,
    ToastMessageException,
  },

  props: [
    "isShowDialog",
    "propertyIDSelected",
    "propertyCodeSelected",
    "checkTitleForm",
    "propertyCodeList",
  ],

  updated() {
    this.getCurrentDate();
    this.validateMax();
  },
  watch: {
    messageValid: function (value) {
      this.moreInfo.push(value);
    },
  },
  mounted() {
    if (this.property.fixed_asset_code != null) {
      this.tmpAssetCode = this.property.fixed_asset_code;
    }

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
    } else if (this.checkTitleForm == Enum.FormMode.Duplicate) {
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
        break;
    }
  },

  methods: {
    /**
     * Hàm để khi hết trang thêm thì focus qoay lại
     * Author: NVHThai (03/10/2022)
     */
    loopFocus(){
      document.getElementById("btnX").focus();
    },

    /**
     * Hàm sử lý tỷ lệ hao mòn dấu chấm thành dấu phẩy vd 6.67 thành 6,67
     * Author: NVHThai (03/10/2022)
     */
    sloveDepreciationRateToString() {
      try {
        if (this.property.depreciation_rate != null) {
          let arrayStrig = this.property.depreciation_rate.toString(10).split(".");
          if (arrayStrig[1] != null) {
            this.property.depreciation_rate = arrayStrig[0] + "," + arrayStrig[1];
          } else {
            this.property.depreciation_rate = arrayStrig[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm sử lý dấu phẩy thành dấu chấm vd 6,67 thành 6.67
     * Author: NVHThai (03/10/2022)
     */
    formartRate(number) {
      try {
        if (number != null) {
          let arrayStrig = number.toString(10).split(".");
          if (arrayStrig[1] != null) {
            return arrayStrig[0] + "," + arrayStrig[1];
          } else {
            return arrayStrig[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm sử lý tỷ lệ hao mòn dấu chấm thành dấu phẩy vd 6.67 thành 6,67
     * Author: NVHThai (03/10/2022)
     */
    sloveDepreciationRateToNumber() {
      try {
        if (this.property.depreciation_rate != null) {
          let arrayStrig = this.property.depreciation_rate.toString(10).split(",");
          if (arrayStrig[1] != null) {
            this.property.depreciation_rate = arrayStrig[0] + "." + arrayStrig[1];
          } else {
            this.property.depreciation_rate = arrayStrig[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm tính toán giá trị hao mòn năm
     * Author: NVHThai (02/10/2022)
     */
    solveLossYear() {
      try {
        this.sloveDepreciationRateToNumber();
        if (this.property.depreciation_rate != null && this.property.cost == 0) {
          this.property.loss_year = "0";
        } else if (this.property.depreciation_rate == 0 && this.property.cost != null) {
          this.property.loss_year = "0";
        } else if (
          this.property.depreciation_rate == null ||
          this.property.depreciation_rate == "" ||
          this.property.cost == null ||
          this.property.cost == ""
        ) {
          this.property.loss_year = null;
        } else if (typeof this.property.cost == "number") {
          this.property.cost = parseFloat(this.property.cost);
          this.property.depreciation_rate = parseFloat(this.property.depreciation_rate);
          this.property.loss_year = (
            (this.property.depreciation_rate * this.property.cost) /
            100
          ).toString(10);
          this.sloveDepreciationRateToString();
        } else if (typeof this.property.cost == "string") {
          this.property.cost = parseFloat(this.property.cost.replace(/[^0-9]/g, ""));
          this.property.depreciation_rate = parseFloat(this.property.depreciation_rate);
          this.property.loss_year = (
            (this.property.depreciation_rate * this.property.cost) /
            100
          ).toString(10);
          this.sloveDepreciationRateToString();
        }
      } catch (error) {
        console.log(error);
      }
    },

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
      if (BaseMethod.inputOnlyNumber(e)) {
        e.preventDefault();
      }
    },

    /**
     * Hàm nhập số giá trị hao mòn năm vào ô thì tự format số
     * Author: NVHThai (27/09/2022)
     */

    showValueLossYear() {
      try {
        this.checkLossYear = false;
        let lossYear = this.property.loss_year;
        if (lossYear != 0) {
          let tmpCost = lossYear.replace(/[^0-9]/g, "");
          let showCost = this.formartNumber(tmpCost);
          this.property.loss_year = showCost;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm tính toán lại giá trị hao mòn năm khi thay đổi tỷ lệ hao mòn
     * Author: NVHThai (03/10/2022)
     */
    changeValueLossYear() {
      this.solveLossYear();
    },

    /**
     * Hàm nhập số tiền vào ô thì tự format số
     * Author: NVHThai (27/09/2022)
     */
    showValueCost() {
      try {
        let cost = this.property.cost;
        if (cost != 0) {
          let tmpCost = cost.replace(/[^0-9]/g, "");
          let showCost = this.formartNumber(tmpCost);
          this.property.cost = showCost;
        }
        this.solveLossYear();
      } catch (error) {
        console.log(error);
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
     * Hàm lấy dữ liệu mã tài sản lớn nhất
     * Author: NVHThai (19/09/2022)
     */
    getApiPropertyMaxCode() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(Resource.Url.NewCode)
          .then((response) => {
            me.property.fixed_asset_code = response.data;
          })
          .catch((error) => {
            console.log("Error: ", error);
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
          .get(`${Resource.Url.Asset}/${propertyID}`)
          .then((response) => {
            me.property = response.data;

            // Lấy mã tài sản lớn nhất nếu là form nhân bản còn sửa thì không
            if (me.checkTitleForm == Enum.FormMode.Duplicate) {
              me.getApiPropertyMaxCode();
            }
          })
          .catch((error) => {
            console.log("Error: ", error);
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
                position: "bottom-right",
                type: "success",
              });
            }
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
            BaseMethod.handleException(
              response.response.status,
              response.response.data.moreInfo,
              response.response.data.userMsg
            );
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
          .put(`${Resource.Url.Asset}/${me.propertyIDSelected}`, me.property)
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
                position: "bottom-right",
                type: "success",
              });
            }
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
            me.handleException(
              response.response.status,
              response.response.data.moreInfo,
              response.response.data.userMsg
            );
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
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào btn Hủy thì form detail sẽ hiện lên popup hỏi người dùng
     *  Author: NVHThai (08/09/2022)
     */
    btnCloseFormOnclick() {
      try {
        this.checkInputValidate = true;
        if (this.checkTitleForm == Enum.FormMode.Add) {
          this.isShowToastAdd = true;
        } else if (this.checkTitleForm == Enum.FormMode.Edit) {
          this.isShowToastEdit = true;
        } else if (this.checkTitleForm == Enum.FormMode.Duplicate) {
          this.isShowToastEdit = true;
        }
      } catch (error) {
        console.log(error);
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
     * Thay đổi để theo dõi input 
     *  Author: NVHThai (26/09/2022)
     */
    changeCheckInputValidate() {
      this.checkInputValidate = false;
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
      try {
        switch (check) {
          case 0:
            this.property.life_time = parseInt(this.property.life_time) + 1;
            this.property.life_time =
              parseInt(this.property.life_time) < 10
                ? `0${parseInt(this.property.life_time)}`
                : parseInt(this.property.life_time);
            break;
          case 1:
            if (this.property.life_time < 1) {
              break;
            } else {
              this.property.life_time = parseInt(this.property.life_time) - 1;
              this.property.life_time =
                parseInt(this.property.life_time) < 10
                  ? `0${parseInt(this.property.life_time)}`
                  : parseInt(this.property.life_time);
              break;
            }
        }
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
      try {
        switch (check) {
          case 0:
            this.property.quantity = parseInt(this.property.quantity) + 1;
            this.property.quantity =
              parseInt(this.property.quantity) < 10
                ? `0${parseInt(this.property.quantity)}`
                : parseInt(this.property.quantity);
            break;
          case 1:
            if (this.property.quantity < 1) {
              break;
            } else {
              this.property.quantity = parseInt(this.property.quantity) - 1;
              this.property.quantity =
                parseInt(this.property.quantity) < 10
                  ? `0${parseInt(this.property.quantity)}`
                  : parseInt(this.property.quantity);
              break;
            }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lấy dữ liệu ngày hiện tại
     * Author: NVHThai (09/08/2022)
     */
    getCurrentDate() {
      try {
        if (this.checkTitleForm == Enum.FormMode.Add) {
          this.property.purchase_date = BaseMethod.getCurrentDate();
          this.property.production_date = BaseMethod.getCurrentDate();
          this.property.tracked_year = BaseMethod.getCurrentFullYear();
        }
      } catch (error) {
        console.log(error);
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
      try {
        if (typeof this.property.cost == "number") {
          this.property.cost = parseFloat(this.property.cost);
        } else {
          this.property.cost = parseFloat(this.property.cost.replace(/[^0-9]/g, ""));
        }
        if (this.property.quantity != null) {
          this.property.quantity = parseInt(this.property.quantity);
        }
        if (this.property.life_time != null) {
          this.property.life_time = parseInt(this.property.life_time);
        }
        if (this.property.depreciation_rate != null) {
          //xử lý , thành .
          let arrayStrig = this.property.depreciation_rate.split(",");
          this.property.depreciation_rate = arrayStrig[0] + "." + arrayStrig[1];
          this.property.depreciation_rate = parseFloat(this.property.depreciation_rate);
        }
        if (typeof this.property.loss_year == "number") {
          this.property.loss_year = parseFloat(this.property.loss_year);
        } else {
          this.property.loss_year = parseFloat(
            this.property.loss_year.replace(/[^0-9]/g, "")
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý dữ liệu đầu vào để validate
     * Author: NVHThai (01/10/2022)
     */
    fomartDataToString() {
      try {
        this.property.cost = BaseMethod.forMartDataToString(this.property.cost);
        this.property.quantity = BaseMethod.forMartDataToString(this.property.quantity);
        this.property.life_time = BaseMethod.forMartDataToString(this.property.life_time);
        this.property.depreciation_rate = BaseMethod.forMartDataToString(this.property.depreciation_rate);
        this.property.loss_year = BaseMethod.forMartDataToString(this.property.loss_year);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa các phần tử trong mảng thông báo
     * Author: NVHThai (30/09/2022)
     */
    deleteDataInMoreInfo() {
      this.moreInfo.splice(0, 100);
    },

    /**
     * Hàm lưu form
     * Author: NVHThai (14/09/2022)
     */
    btnSaveFormOnclick() {
      try {
        this.checkInputValidate = true;
        this.validateEmpty();
        if (this.checkValidate == true) {
          switch (this.checkTitleForm) {
            case Enum.FormMode.Add:
              this.validateDuplicateCode();
              if (this.checkValidate == true) {
                this.handleInsertData();
                this.validateDetail();
                if (this.checkValidate == true) {
                  this.postApiProperty();
                }
              }
              break;
            case Enum.FormMode.Edit:
              this.validateDuplicateCodeForEdit();
              if (this.checkValidate == true) {
                this.handleInsertData();
                this.validateDetail();
                if (this.checkValidate == true) {
                  this.putApiProperty();
                }
              }
              break;
            case Enum.FormMode.Duplicate:
              this.validateDuplicateCode();
              if (this.checkValidate == true) {
                this.handleInsertData();
                this.validateDetail();
                if (this.checkValidate == true) {
                  this.postApiProperty();
                }
              }
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate nghiệp vụ tỷ lệ hao mòn phải bằng 1 / số năm sử dụng
     * Author: NVHThai (02/10/2022)
     */
    validateDetail() {
      try {
        if (this.property.life_time != 0) {
          if (
            this.property.depreciation_rate !=
            ((1 / this.property.life_time) * 100).toFixed(2)
          ) {
            this.moreInfo.push(Resource.MessageValidate.DepreciationRateError);
            this.checkValidate = false;
            this.isShowDialogToastValid = true;
            this.titleFormValid = Resource.TitleToast.TitleFormValidate;
          }
        } else if (this.property.life_time == 0 && this.property.depreciation_rate != 0) {
          this.moreInfo.push(Resource.MessageValidate.DepreciationRateError);
          this.checkValidate = false;
          this.isShowDialogToastValid = true;
          this.titleFormValid = Resource.TitleToast.TitleFormValidate;
        }
        if (this.property.loss_year > this.property.cost) {
          this.moreInfo.push(Resource.MessageValidate.ValidateLossYear);
          this.checkValidate = false;
          this.isShowDialogToastValid = true;
          this.titleFormValid = Resource.TitleToast.TitleFormValidate;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm validate mã tài sản xem có tồn tại không cho form thêm và nhân bản
     * Author: NVHThai (02/10/2022)
     */
    validateDuplicateCode() {
      try {
        if (this.property.fixed_asset_code) {
          var resultFind = this.propertyCodeList.find((code) =>
            code.startsWith(this.property.fixed_asset_code)
          );
          if (resultFind) {
            this.moreInfo.push(Resource.MessageValidate.AssetCodeDuplicate);
            this.checkValidate = false;
            this.isShowDialogToastValid = true;
            this.titleFormValid = Resource.TitleToast.TitleFormValidate;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm validate mã tài sản xem có tồn tại không cho sửa
     * Author: NVHThai (02/10/2022)
     */
    validateDuplicateCodeForEdit() {
      try {
        if (this.property.fixed_asset_code == this.propertyCodeSelected) {
          this.checkValidate == true;
        } else if (this.property.fixed_asset_code) {
          var resultFind = this.propertyCodeList.find((code) =>
            code.startsWith(this.property.fixed_asset_code)
          );
          if (resultFind) {
            this.moreInfo.push(Resource.MessageValidate.AssetCodeDuplicate);
            this.checkValidate = false;
            this.isShowDialogToastValid = true;
            this.titleFormValid = Resource.TitleToast.TitleFormValidate;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate dữ liệu xem trường nào null hoặc rỗng, mã tài sản có trùng không
     * Author: NVHThai (28/09/2022)
     */
    validateEmpty() {
      try {
        this.fomartDataToString();
        if (
          !BaseMethod.checkValidEmpty(this.property.fixed_asset_code) ||
          !BaseMethod.checkValidEmpty(this.property.fixed_asset_name) ||
          !BaseMethod.checkValidEmpty(this.property.department_code) ||
          !BaseMethod.checkValidEmpty(this.property.fixed_asset_category_code) ||
          !BaseMethod.checkValidEmpty(this.property.quantity) ||
          !BaseMethod.checkValidEmpty(this.property.cost) ||
          !BaseMethod.checkValidEmpty(this.property.depreciation_rate) ||
          !BaseMethod.checkValidEmpty(this.property.life_time) ||
          !BaseMethod.checkValidEmpty(this.property.loss_year)
        ) {
          this.checkValidate = false;
          this.isShowDialogToastValid = true;
          this.titleFormValid = Resource.TitleToast.TitleFormValidate;
        } else {
          this.checkValidate = true;
        }
        if (!BaseMethod.checkValidEmpty(this.property.fixed_asset_code)) {
          this.moreInfo.push(Resource.MessageValidate.AssetCode);
        }
        if (!BaseMethod.checkValidEmpty(this.property.fixed_asset_name)) {
          this.moreInfo.push(Resource.MessageValidate.AssetName);
        }
        if (!BaseMethod.checkValidEmpty(this.property.department_code)) {
          this.moreInfo.push(Resource.MessageValidate.DepartmentCode);
        }
        if (!BaseMethod.checkValidEmpty(this.property.fixed_asset_category_code)) {
          this.moreInfo.push(Resource.MessageValidate.AssetCategoryCode);
        }
        if (!BaseMethod.checkValidEmpty(this.property.quantity)) {
          this.moreInfo.push(Resource.MessageValidate.Quanlity);
        }
        if (!BaseMethod.checkValidEmpty(this.property.cost)) {
          this.moreInfo.push(Resource.MessageValidate.Cost);
        }
        if (!BaseMethod.checkValidEmpty(this.property.depreciation_rate)) {
          this.moreInfo.push(Resource.MessageValidate.DepreciationRate);
        }
        if (!BaseMethod.checkValidEmpty(this.property.life_time)) {
          this.moreInfo.push(Resource.MessageValidate.LifeTime);
        }
        if (!BaseMethod.checkValidEmpty(this.property.loss_year)) {
          this.moreInfo.push(Resource.MessageValidate.LossYear);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      tmpAssetCode: null,
      checkInputValidate: false,
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

      checkLossYear: true,



      // Text sử dụng ở form detail
      textAssetCode: Resource.TextVi.Detail.AssetCode,
      textAssetName: Resource.TextVi.Detail.AssetName,
      textAssetCategoryCode: Resource.TextVi.Detail.AssetCategoryCode,
      textAssetCategoryName: Resource.TextVi.Detail.AssetCategoryName,
      textAssetDepartmentCode: Resource.TextVi.Detail.AssetDepartmentCode,
      textAssetDepartmentName: Resource.TextVi.Detail.AssetDepartmentName,
      textCost: Resource.TextVi.Detail.Cost,
      textBuyingDate: Resource.TextVi.Detail.BuyingDate,
      textQuanlity: Resource.TextVi.Detail.Quanlity,
      textTrackedYear: Resource.TextVi.Detail.TrackedYear,
      textUsingDate: Resource.TextVi.Detail.UsingDate,
      textDepreciationRate: Resource.TextVi.Detail.DepreciationRate,
      textLifeTime: Resource.TextVi.Detail.LifeTime,
      textLossYear: Resource.TextVi.Detail.LossYear,
      textTooltipClose: Resource.TextVi.Tooltip.Close,
      textPDepartmentCode:Resource.TextVi.PlaceHolder.DepartmentCode,
      textPAssetCategoryCode:Resource.TextVi.PlaceHolder.AssetCategoryCode,
      textPAssetName:Resource.TextVi.PlaceHolder.AssetName,
      textBClose:Resource.TextVi.Button.Close,
      textBSave:Resource.TextVi.Button.Save,
      
    };
  },
};
</script>

<style scoped>
@import url(../../css/details/propertydetail.css);
</style>
