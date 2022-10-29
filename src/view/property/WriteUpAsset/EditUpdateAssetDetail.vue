<template>
  <div class="m-dialog">
    <div class="edit-form-detail">
      <div class="header">
        <span> Sửa tài sản {{ asset.fixed_asset_name }} </span>
        <button class="m-icon-xdetail"></button>
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
                v-for="fund in assetFund"
                :key="fund.budget_id"
              >
                <v-combobox
                  css="comboboxs"
                  type="text"
                  className="m-property-propertycodetype w-100"
                  :showValue="fund.budget_name"
                  v-model:budget_name="fund.budget_name"
                  v-model:budget_code="fund.budget_code"
                  v-model:budget_id="fund.budget_id"
                  itemID="budget_id"
                  itemCode="budget_name"
                  itemName="budget_code"
                  styleContent="height-150"
                  :items="items"
                >
                </v-combobox>
                <m-input
                  type="text"
                  className="cost"
                  maxlength="255"
                  v-model="fund.mount"
                ></m-input>
                <div class="icon">
                  <div class="m-icon-plus"></div>
                </div>
                <div class="icon">
                  <div class="m-icon-minus"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content__bottom">
          <input
            type="text"
            className="input mt-8 w-60"
            maxlength="255"
            value="Tổng"
            readonly
          />
          <input
            type="text"
            className="input mt-8 w-35"
            maxlength="255"
            v-model="assetDetail.cost"
          />
        </div>
      </div>
      <div class="bottom">
        <button class="btn btn-close" @click="btnCloseForm">Hủy</button>
        <button class="btn btn-save" @click="btnEditFund">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MInput from "../../../base/input/MInput.vue";
import Resource from "@/lib/resource";
import VCombobox from "@/base/combobox/VCombobox.vue";
export default {
  name: "EditUpdateAssetDetail",
  components: {
    MInput,
    VCombobox,
  },
  props: ["assetDetailID", "assetValue"],

  mounted() {
    this.getDataFundDetail();
    this.getApiPropertyByID(this.assetDetailID);
  },

  updated() {
    this.assetDetail.cost =
      parseFloat(this.assetDetail.fundCostSecond) +
      parseFloat(this.assetDetail.fundCostFirst);
  },

  methods: {
    /**
     * Hàm sửa thông tin nguồn hình thành
     */
    btnEditFund() {
      this.asset.budget = JSON.stringify(this.assetFund);
      this.putApiProperty();
    },
    /**
     * Hàm đóng form sửa nguồn tiền
     */
    btnCloseForm() {
      this.$parent.btnHideEditAsset();
    },

    /**
     * Hàm lấy dữ liệu các nguồn hình thành
     */
    getDataFundDetail() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(`https://localhost:44380/api/v1/Fund`)
          .then((response) => {
            me.fundDetailList = response.data;
          })
          .catch((response) => {
            console.log("erorr: ", response);
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
          .put(`${Resource.Url.Asset}/${me.assetDetailID}`, me.asset)
          .then((response) => {
            console.log(response);

            this.$parent.btnHideEditAsset();
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
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
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/editUpAssetDetail.css);
</style>