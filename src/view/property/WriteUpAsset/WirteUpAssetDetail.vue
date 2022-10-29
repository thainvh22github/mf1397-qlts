<template>
  <div class="m-dialog">
    <div class="m-detail-wirte-up">
      <div class="m-text">
        <span> Thêm chứng từ ghi tăng </span>
        <button class="m-icon-xdetail" @click="hideFormLisenceDetail"></button>
      </div>
      <div class="m-title">
        <span>Thêm thông tin chứng từ</span>
      </div>
      <div class="m-input-add">
        <div class="m-input-detail">
          <div class="license license-code mt-20 w-30p">
            <div class="text">
              Mã chứng từ <span style="color: red">*</span>
            </div>
            <m-input
              className="mt-8 w-100"
              v-model="license.licenseCode"
            ></m-input>
          </div>
          <div class="license using-date mt-20 w-30p">
            <div class="text">
              Ngày bắt đầu sử dụng <span style="color: red">*</span>
            </div>
            <el-date-picker
              type="date"
              popper-class="custom-date-picker"
              class="mt-8 w-100"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
              v-model="license.licenseDay"
            >
            </el-date-picker>
          </div>
          <div class="license update-date mt-20 w-30p">
            <div class="text">
              Ngày ghi tăng <span style="color: red">*</span>
            </div>
            <el-date-picker
              type="date"
              popper-class="custom-date-picker"
              class="mt-8 w-100"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
              v-model="license.writeDay"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="m-note mt-20">
          <div class="text">Ghi chú</div>
          <input className="input mt-8 w-100" v-model="license.content" />
        </div>
      </div>
      <div class="m-title">
        <span>Thông tin chi tiết</span>
      </div>

      <div class="toolbar-detail">
        <input
          type="text"
          className="input input__icon m-icon-search-input input-serch-detail"
          v-model="keword"
          placeholder="Tìm kiếm theo mã, tên tài sản"
        />

        <button class="btn btn__outline" @click="btnShowAsset">
          Chọn tài sản
        </button>
      </div>
      <div class="table-up-asset-detail">
        <table>
          <thead>
            <tr>
              <th style="width: 80px" class="text-center">STT</th>

              <th style="width: 150px" class="text-left">Mã tài sản</th>

              <th style="width: 250px" class="text-left">Tên tài sản</th>

              <th style="width: 250px" class="text-left">Bộ phận sử dụng</th>

              <th style="width: 200px" class="text-rigth">Nguyên giá</th>

              <th style="width: 200px" class="text-rigth">Hao mòn năm</th>
              <th style="width: 200px" class="text-rigth">Giá trị còn lại</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(assetDetail, index) in assetListDetail"
              :key="assetDetail.fixed_asset_id"
              @dblclick="
                btnShowEditAsset(assetDetail.fixed_asset_id, assetDetail)
              "
            >
              <td>
                <span class="ml-24 text-center">{{ index + 1 }}</span>
              </td>
              <td class="text-left">{{ assetDetail.fixed_asset_code }}</td>
              <td class="text-left">
                <span>{{ assetDetail.fixed_asset_name }}</span>
              </td>
              <td class="text-left">
                <span>{{ assetDetail.department_name }}</span>
              </td>

              <td class="text-rigth">
                <span>{{ formartNumber(assetDetail.cost) }}</span>
              </td>
              <td class="text-rigth">
                {{ formartNumber(assetDetail.loss_year) }}
              </td>
              <td class="text-rigth">
                {{ formartNumber(assetDetail.cost - assetDetail.loss_year) }}
              </td>
            </tr>
            <div></div>
          </tbody>
        </table>
      </div>
      <div class="bottom-table-detail">
        <div class="m-table__bottom">
          <div class="m-total-property">
            Tổng số: &nbsp;<span style="font-weight: 700">{{ assetCount }}</span
            >&nbsp; bản ghi
          </div>

          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <div class="m-table__bottom--pagenavi">
            <button
              class="btn-pagenavi"
              @click="pageNumberClick(this.pageNumber, textPrev)"
            >
              <div class="m-icon-prev"></div>
            </button>

            <button
              class="btn-pagenavi"
              @click="pageNumberClick(1, 1)"
              :class="{ btnpagenaviactive: pageNumber == 1 }"
            >
              <span>1</span>
            </button>

            <button
              v-if="isShowNextPage"
              class="btn-pagenavi"
              @click="pageNumberClick(page, 1)"
              :class="{ btnpagenaviactive: pageNumber == page }"
            >
              <span>1</span>
            </button>

            <div class="ml-12" v-if="isShowThreeDot">...</div>

            <button
              v-if="isShowEndPage"
              class="btn-pagenavi"
              @click="pageNumberClick(this.endPageNumber, 1)"
              :class="{
                btnpagenaviactive: pageNumber == this.endPageNumber,
              }"
            >
              <span>3</span>
            </button>

            <button
              class="btn-pagenavi"
              @click="pageNumberClick(pageNumber, textNext)"
            >
              <div class="m-icon-next"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="bottom-detail">
        <button class="btn btn-close" @click="hideFormLisenceDetail">
          Hủy
        </button>
        <button class="btn btn-save" @click="btnSaveLicense">Lưu</button>
      </div>
    </div>

    <EditUpdateAssetDetail
      v-if="ishowEditUpAsset"
      :assetDetailID="assetDetailID"
      :assetValue="assetValue"
    />
    <SelectUpAssetDetail
      v-show="isShowSelectedLicense"
      :assetListDetail="assetListDetail"
    />
    <toast-message-exception
      v-if="ishowException"
      :titleFormException="titleFormException"
    ></toast-message-exception>
  </div>
</template>

<script>
import axios from "axios";
import BaseMethod from "@/lib/baseMethod";
import MInput from "../../../base/input/MInput.vue";
import EditUpdateAssetDetail from "./EditUpdateAssetDetail.vue";
import ToastMessageException from "@/view/toast/ToastMessageException.vue";
import SelectUpAssetDetail from "./SelectUpAssetDetail.vue";
import Resource from "@/lib/resource";
import { ElNotification } from "element-plus";

export default {
  name: "WirteUpAssetDetail",
  props: ["licenseID", "formMode", "licenseInfo"],
  components: {
    EditUpdateAssetDetail,
    SelectUpAssetDetail,
    MInput,
    ToastMessageException,
  },
  mounted() {
    /**
     * Kiểm tra form mode xem là thêm hay sửa
     */
    if (this.formMode == 1) {
      this.getNewCodeLicense();
    } else if (this.formMode == 2) {
      this.license = this.licenseInfo;
      this.getDataLicenseDetailByID();
    }
  },

  updated() {
    this.getCurrenDate();
  },

  methods: {
    /**
     * Lưu chứng từ
     */
    btnSaveLicense() {
      this.getAssetIDAvailable();
      this.sloveTotalCount();
      this.checkAssetList();
      if (this.checkValidate) {
        switch (this.formMode) {
          case 1:
            this.saveLicense();
            break;
          case 2:
            this.editLicense();
            break;
        }
      } else {
        this.ishowException = true;
        this.titleFormException = Resource.TitleToast.TitleExceptionLicense;
      }
    },

    /**
     * Kiểm tra xem có tài sản trong danh sách không
     */
    checkAssetList() {
      if (this.license.listAssetID == null) {
        this.checkValidate = false;
      } else if (this.license.listAssetID.length == 0) {
        this.checkValidate = false;
      }
    },

    /**
     * Hàm đóng form thông báo exception
     */
    closeToastException() {
      this.ishowException = false;
      this.checkValidate = true;
    },

    /**
     * Lấy id có sẵn từ thằng cha
     */
    getAssetIDAvailable() {
      for (let i = 0; i < this.assetListDetail.length; i++) {
        this.listAssetIDTmp.push(this.assetListDetail[i].fixed_asset_id);
      }
      this.license.listAssetID = this.listAssetIDTmp;
    },

    /**
     * Sử lý tổng tiền
     */
    sloveTotalCount() {
      for (let i = 0; i < this.assetListDetail.length; i++) {
        this.assetListID.push(this.assetListDetail[i].fixed_asset_id);
        this.totalCost = this.totalCost + this.assetListDetail[i].cost;
      }
      this.license.totalCost = this.totalCost;
    },

    /**
     * Hàm đóng form sửa tài sản
     */
    btnHideEditAsset() {
      this.ishowEditUpAsset = false;
    },

    /**
     * Hàm mở form sửa tài sản
     */
    btnShowEditAsset(valueID, value) {
      this.assetDetailID = valueID;
      this.assetValue = value;
      this.ishowEditUpAsset = true;
    },

    /**
     * Hàm lấy dữ liệu từ selectedupassetdetail chọn tài sản
     * @param {*} selectData
     */
    getAssetData(selectData) {
      this.assetListDetail = selectData;
      this.assetCount = selectData.length;
      this.license.listAssetID = this.assetListID;
    },

    /**
     * hàm mở form select tài sản
     */
    btnShowAsset() {
      this.isShowSelectedLicense = true;
    },

    /**
     * hàm đóng form select tài sản
     */
    btnHideAsset() {
      this.isShowSelectedLicense = false;
    },

    /**
     * Hàm đóng form chi tiết để thêm chứng từ tăng ghi
     */
    hideFormLisenceDetail() {
      this.$parent.hideAddLicense();
    },

    /**
     * Hàm lấy ngày hiện tại
     */
    getCurrenDate() {
      if (!BaseMethod.checkValidEmpty(this.license.licenseDay)) {
        this.license.licenseDay = BaseMethod.getCurrentDate(
          this.license.licenseDay
        );
      }
      if (!BaseMethod.checkValidEmpty(this.license.writeDay)) {
        this.license.writeDay = BaseMethod.getCurrentDate(
          this.license.writeDay
        );
      }
    },

    /**
     * Hàm lấy dữ liệu chi tiết cho từng chứng từ
     * @param {*} licenseID
     */
    getDataLicenseDetailByID() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(`https://localhost:44380/api/License/list-asset/${me.licenseID}`)
          .then((response) => {
            me.assetListDetail = response.data;
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lấy mã chứng từ mới nhất
     */
    getNewCodeLicense() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get("https://localhost:44380/api/License/new-code")
          .then((response) => {
            me.license.licenseCode = response.data;
            console.log(response.data);
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lưu chứng từ vào csdl
     */
    saveLicense() {
      let me = this;
      try {
        axios
          .post("https://localhost:44380/api/License", me.license)
          .then((response) => {
            console.log(response);

            //tải lại dữ liệu
            this.$parent.getDataLicense();

            // hiện thông báo thêm thành công
            ElNotification({
              duration: 1500,
              message: `Thêm chứng từ thành công`,
              position: "bottom-right",
              type: "success",
            });

            this.$parent.hideAddLicense();
          })
          .catch((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    editLicense() {
      let me = this;
      try {
        axios
          .put(
            `https://localhost:44380/api/License/${me.license.licenseID}`,
            me.license
          )
          .then((response) => {
            console.log(response);

            //tải lại dữ liệu
            this.$parent.getDataLicense();

            // hiện thông báo thêm thành công
            ElNotification({
              duration: 1500,
              message: `Thêm chứng từ thành công`,
              position: "bottom-right",
              type: "success",
            });

            this.$parent.hideAddLicense();
          })
          .catch((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm định dạng số
     * @param {*} number
     */
    formartNumber(number) {
      return BaseMethod.formartNumber(number);
    },
  },
  data() {
    return {
      isShowSelectedLicense: false,
      assetListDetail: [],
      assetListID: [],
      assetCount: 0,
      totalCost: 0,
      ishowEditUpAsset: false,
      assetDetailID: null,
      license: {},
      selectID: null,
      ishowException: false,
      listAssetIDTmp: [],
      checkValidate: true,

      options: [{ value: "10" }, { value: "20" }, { value: "50" }],
      value: "20",
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/writeUpAssetDetail.css);
</style>