<template>
  <div class="m-dialog">
    <div class="m-detail-wirte-up">
      <div class="m-text">
        <span> Thêm chứng từ ghi tăng </span>
        <button class="m-icon-xdetail" @click="hideFormLisenceDetail" ref="xdetail" tabindex="100"></button>
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
            <input
              class="input mt-8 w-100"
              ref="licenseCode"
              :class="{ borderred: borderRed }"
              v-model="license.licenseCode"
              @blur="validateEmpty"
              tabindex="101"
            />
            <div class="text-validate">
              <span v-show="borderRed">Mã chứng từ không được để trống!</span>
            </div>
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
              tabindex="102"
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
              tabindex="103"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="m-note mt-15">
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
          @keydown.enter="search()"
          @keydown.delete="assetListDefault()"
          tabindex="104"
        />

        <button class="btn btn__outline" @click="btnShowAsset" tabindex="105">
          Chọn tài sản
        </button>
      </div>
      <div class="table-up-asset-detail">
        <table>
          <thead>
            <tr>
              <th style="width: 80px" class="text-center">
                <el-tooltip
                  :disabled="disabled"
                  content="Số thứ tự"
                  show-after="400"
                  placement="top"
                  effect="customized"
                >
                  <span>STT</span>
                </el-tooltip>
              </th>

              <th style="width: 150px" class="text-left">Mã tài sản</th>

              <th style="width: 250px" class="text-left">
                <span class="ml-10">Tên tài sản</span>
              </th>

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
              :class="{ active: assetDetail.fixed_asset_id == tmpID }"
              @dblclick="
                btnShowEditAsset(assetDetail.fixed_asset_id, assetDetail)
              "
              @click="selectedRow(assetDetail.fixed_asset_id)"
            >
              <td>
                <span class="ml-24 text-center">{{ index + 1 }}</span>
              </td>
              <td class="text-left ellipsis">
                {{ assetDetail.fixed_asset_code }}
              </td>
              <td class="text-left ellipsis">
                <el-tooltip
                  :disabled="disabled"
                  :content="assetDetail.fixed_asset_name"
                  show-after="400"
                  placement="top"
                  effect="customized"
                >
                  <span>{{ assetDetail.fixed_asset_name }}</span>
                </el-tooltip>
              </td>
              <td class="text-left">
                <el-tooltip
                  :disabled="disabled"
                  :content="assetDetail.department_name"
                  show-after="400"
                  placement="top"
                  effect="customized"
                >
                  <span>{{ assetDetail.department_name }}</span>
                </el-tooltip>
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

              <div class="btn-tool">
                <button
                  class="m-icon-edit btn-edit"
                  @click="
                    btnShowEditAsset(assetDetail.fixed_asset_id, assetDetail)
                  "
                ></button>
                <button
                  class="m-icon-delete-red btn-detele"
                  @click="btnDeleteAssetOfList(assetDetail)"
                ></button>
              </div>
            </tr>
            <div></div>
          </tbody>
          <tfoot>
            <td colspan="4"></td>
            <td class="text-rigth">{{ formartNumber(cost) }}</td>
            <td class="text-rigth">{{ formartNumber(loss) }}</td>
            <td class="text-rigth">{{ formartNumber(cost - loss) }}</td>
          </tfoot>
        </table>
      </div>
      <div class="bottom-detail">
        <button class="btn btn-close" @click="hideFormLisenceDetail" tabindex="107" @keydown.tab="loopIndex">
          Hủy
        </button>
        <button class="btn btn-save" @click="btnSaveLicense" tabindex="106">Lưu</button>
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
      :tmpAsset="tmpAsset"
    />
  </div>
</template>

<script>
import axios from "axios";
import BaseMethod from "@/lib/baseMethod";
import EditUpdateAssetDetail from "./EditUpdateAssetDetail.vue";
import SelectUpAssetDetail from "./SelectUpAssetDetail.vue";
// import Resource from "@/lib/resource";
import { ElNotification } from "element-plus";

export default {
  name: "WirteUpAssetDetail",
  props: ["licenseID", "formMode", "licenseInfo"],
  components: {
    EditUpdateAssetDetail,
    SelectUpAssetDetail,
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

    this.$refs.licenseCode.focus();
  },

  updated() {
    this.getCurrenDate();

    if (this.license.licenseCode) {
      this.borderRed = false;
      this.checkSave = true;
    }
  },
  watch: {
    assetListDetail: function () {
      this.cost = 0;
      this.loss = 0;
      for (let i of this.assetListDetail) {
        this.cost = this.cost + parseFloat(i.cost);
        this.loss = this.loss + parseFloat(i.loss_year);
      }
    },
  },
  methods: {
    /**
     * Khi focus hết vòng thì quay ngược lại
     * Author: NVHThai (04/11/2022)
     */
    loopIndex(){
      this.$refs.xdetail.focus();
    },
    /**
     * Hàm trả về giá trị mặc định của danh sách tài sản nếu keyword k có
     * Author: NVHThai (04/11/2022)
     */
    assetListDefault() {
      if(this.keword == ""){
        this.assetListDetail = this.assetListDetailTmp;
      }
    },

    /**
     * Hàm tìm kiếm theo từ mã tài sản
     * Author: NVHThai (04/11/2022)
     */
    search() {
      let me = this;
      me.assetListDetailTmp = [];
      me.assetListDetailTmp = me.assetListDetail;
      me.assetListDetail = me.assetListDetail.filter(
        (item) => item.fixed_asset_code == me.keword
      );
    },

    /**
     * Hàm khi click vào tr trong bảng thì tr có backgroud
     * Author: NVHThai (24/09/2022)
     * @param {guid} value : id của tài sản
     */
    selectedRow(value) {
      this.tmpID = value;
    },
    /**
     * Validate blur cho thẻ input
     */
    validateEmpty() {
      if (this.license.licenseCode.trim() == "") {
        this.borderRed = true;
        this.checkSave = false;
      }
    },

    /**
     * Hàm xóa tài sản tạm thời khỏi danh sách ghi tăng
     */
    btnDeleteAssetOfList(asset) {
      this.tmpAsset = asset;
      this.assetListDetail = this.assetListDetail.filter(function (element) {
        return element !== asset;
      });
    },

    /**
     * Lưu chứng từ
     */
    btnSaveLicense() {
      this.validateEmpty();

      if (this.checkSave) {
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
        }
      }
    },

    /**
     * Kiểm tra xem có tài sản trong danh sách không
     */
    checkAssetList() {
      if (
        this.license.listAssetID == null ||
        this.license.listAssetID.length == 0
      ) {
        this.$alert("Chọn ít nhất 1 tài sản", {
          confirmButtonText: "Đóng",
        });
        this.checkValidate = false;
      } else {
        this.checkValidate = true;
      }
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
      assetListDetailTmp: [],
      assetListID: [],
      totalCost: 0,
      ishowEditUpAsset: false,
      assetDetailID: null,
      license: {},
      selectID: null,
      listAssetIDTmp: [],
      checkValidate: true,

      tmpAsset: null,
      checkInputValidate: false,

      options: [{ value: "10" }, { value: "20" }, { value: "50" }],
      value: "20",
      borderRed: false,
      checkSave: true,
      cost: 0,
      loss: 0,
      tmpID: null,
      keword: "",
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/writeUpAssetDetail.css);
.text-validate span {
  color: red;
  font-size: 11px;
}
.text-validate {
  height: 5px;
}
.borderred {
  border: red 1px solid;
}
</style>