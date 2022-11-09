<template>
  <div class="m-dialog">
    <div class="edit-form-detail">
      <div class="header">
        <span> Sửa tài sản {{ asset.fixed_asset_name }} </span>
        <el-tooltip content="Đóng" effect="customized">
          <button class="m-icon-xdetail"></button>
        </el-tooltip>
      </div>
      <div class="content">
        <div class="content__header">
          <div class="text">Bộ phận sử dụng</div>
          <m-input
            type="text"
            className="mt-8 w-70 input__disable m-input-positionname"
            :value="asset.department_name"
            readonly
          >
          </m-input>
        </div>
        <div class="content__mid">
          <div class="title">Nguyên giá</div>
          <div class="text">Nguồn hình thành</div>
          <div class="content__mid--main">
            <div class="m-input">
              <div
                class="content__mid--top"
                v-for="(fund, index) in assetFund"
                :key="fund.budget_id"
              >
                <div class="row-frist">
                  <v-combobox
                    css="comboboxs"
                    type="text"
                    className="w-100"
                    :showValue="fund.budget_name"
                    v-model:budget_name="fund.budget_name"
                    v-model:budget_code="fund.budget_code"
                    v-model:budget_id="fund.budget_id"
                    itemID="budget_id"
                    itemCode="budget_name"
                    itemName="budget_code"
                    styleContent="height-150"
                    :items="items"
                    :tmpCheck="tmpCheck"
                    :checkSaveCbb="checkSaveCbb"
                    :index="index"
                    @changeFalse="checkSaveValidate = false"
                    @changeTrue="checkSaveValidate = true"
                  >
                  </v-combobox>
                </div>
                <div class="row-second">
                  <v-input
                    type="text"
                    className="w-100 text-rigth"
                    v-model="fund.mount"
                    :checkSaveCbb="checkSaveCbb"
                  >
                  </v-input>
                </div>
                <div class="icon" @click="addBudget">
                  <div class="m-icon-plus"></div>
                </div>
                <div
                  class="icon"
                  @click="minusBudget(fund)"
                  v-show="isShowMinusBudget"
                >
                  <div class="m-icon-minus"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content__bottom">
          <input
            type="text"
            className="input mt-8"
            maxlength="255"
            value="Tổng"
            readonly
            style="width: 240px"
          />
          <v-input
            type="text"
            className="input mt-8 text-rigth"
            maxlength="255"
            v-model="asset.cost"
            :value="formartNumber(asset.cost)"
            readonly
            style="width: 140px; margin-right: 65px"
          />
        </div>
      </div>
      <div class="bottom">
        <button class="btn btn-close" @click="btnCloseForm">Hủy</button>
        <button
          class="btn btn-save"
          @mousedown="validateEmply"
          @click="btnEditFund"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MInput from "../../../base/input/MInput.vue";
import Resource from "@/lib/resource";
import VCombobox from "@/base/combobox/VCombobox.vue";
import VInput from "@/base/input/VInput.vue";
import { ElNotification } from "element-plus";
import BaseMethod from "@/lib/baseMethod";

export default {
  name: "EditUpdateAssetDetail",
  components: {
    MInput,
    VCombobox,
    VInput,
  },
  props: ["assetDetailID", "assetValue", "checkProperty"],

  mounted() {
    this.getApiPropertyByID(this.assetDetailID);
  },

  updated() {
    if (this.assetFund.length < 2) {
      this.isShowMinusBudget = false;
    } else {
      this.isShowMinusBudget = true;
    }

    let sum = 0;
    for (let i of this.assetFund) {
      if (i.mount != "") {
        sum = sum + BaseMethod.handleDataToNumberTypeFloat(i.mount);
      }
    }
    this.asset.cost = sum;
  },

  methods: {
    /**
     * Hàm formart số
     * Author: NVHTHai (12/09/2022)
     * @param {int} number
     */
    formartNumber(number) {
      return BaseMethod.formartNumber(number);
    },

    /**
     * validate rỗng cho chi phí
     * @param {*} value
     */
    validateEmply() {
      this.checkSaveCbb = !this.checkSaveCbb;
      for (let i of this.assetFund) {
        this.tmpCheck.push(i.budget_code);
      }
      if (this.fund.mount == "") {
        this.checkSave == false;
      }
    },
    /**
     * Hàm validate
     */
    validateSlove() {
      //kiểm tra
      if (this.asset.cost < this.asset.loss_year) {
        this.$alert("Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá", {
          confirmButtonText: "Đóng",
        });
        this.checkSave = false;
      } else {
        this.checkSave = true;
      }
    },

    /**
     * Hàm giảm nguồn
     */
    minusBudget(fund) {
      this.assetFund = this.assetFund.filter(function (element) {
        return element !== fund;
      });
    },

    /**
     * hàm làm rỗng mảng tmpCheck
     */
    deleteArrTmpCheck() {
      this.tmpCheck = [];
    },

    /**
     * Hàm thêm nguồn
     */
    addBudget() {
      this.assetFund.push(this.budgetTmp);
      this.budgetTmp = {
        budget_id: "",
        budget_code: "",
        budget_name: "",
        mount: "",
      };
    },
    /**
     * Hàm sửa thông tin nguồn hình thành
     */
    btnEditFund() {
      this.validateSlove();
      if (this.checkSave && this.checkSaveValidate) {
        this.asset.budget = JSON.stringify(this.assetFund);
        this.putApiProperty();
      }
    },

    /**
     * Hàm đóng form sửa nguồn tiền
     */
    btnCloseForm() {
      this.$parent.btnHideEditAsset();
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
          .put(`${Resource.Url.Asset}/${me.assetDetailID}`, me.asset)
          .then((response) => {
            if (response.status == 200) {
              me.$parent.btnHideEditAsset();
              if (this.checkProperty) {
                this.$parent.changCost(me.asset.cost,me.asset.budget);
              } else {
                this.$parent.getDataLicenseDetailByID();
                this.$parent.btnDeleteAssetOfList(me.assetValue);
                this.$parent.addAssetForAssetListDetail(me.asset);
              }
              // hiện thông báo thêm thành công
              ElNotification({
                duration: 1500,
                message: `${me.textDDone}`,
                position: "bottom-right",
                type: "success",
              });
            }
          })
          .catch((response) => {
            console.log("response: ", response);
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
            me.asset = response.data;
            let test = response.data.budget;
            me.assetFund = JSON.parse(test);
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     *
     * @param {*} string
     */
    changStringToNumber(string) {
      if (string == "") {
        return 0;
      } else {
        return parseFloat(string);
      }
    },
  },

  data() {
    return {
      valueFirst: "",
      valueSecond: "",
      costFirst: 0,
      costSecond: 0,
      total: 0,
      fundIDFirst: null,
      fundIDSecond: null,
      fundDetailList: [],
      name: null,
      code: null,
      assetDetail: {},
      asset: {},
      assetFund: {},
      fund: {},
      budgetTmp: {
        budget_id: "",
        budget_code: "",
        budget_name: "",
        mount: "",
      },
      isShowMinusBudget: true,
      borderRed: false,
      checkSave: true,
      textDDone: Resource.TitleToast.TitleFormDone,

      tmpCheck: [],
      checkSaveCbb: false,
      checkSaveValidate: true,
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/editUpAssetDetail.css);
</style>