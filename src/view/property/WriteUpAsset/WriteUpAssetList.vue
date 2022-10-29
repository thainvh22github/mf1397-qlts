<template>
  <div class="m-up-asset">
    <div class="m-header-up-asset">
      <span>Ghi tăng tài sản</span>
      <div class="btn-toolbar-up">
        <div class="btn btn-add" @click="btnAddLicense">Thêm</div>
        <div class="btn__toolbar ml-20"  @click="showOptionLayout">
          <div class="m-icon-asset-up ml-10" v-if="zoom"></div>
          <div class="m-icon-asset-ngang ml-10" v-else></div>
          <div class="m-icon-asset-up-dropdown ml-10"></div>
        </div>
        <div class="option-layout" v-show="ishowOptionLayout">
          <div class="option option-first" @click="layoutFirst">
            <div class="m-icon-asset-ngang"></div>
            <div class="text">Giao diện ngang</div>
          </div>
          <div class="option option-second" @click="layoutSecond">
            <div class="m-icon-asset-up"></div>
            <div class="text">Giao diện dọc</div>
          </div>
        </div>

      </div>
    </div>
    <div class="tollbar-up-asset" v-show="zoom">
      <m-input
        type="text"
        className="input__icon m-icon-search-input input-serch-up-asset"
        placeholder="Tìm kiếm theo số chứng từ, nội dung"
        v-model="keword"
        @keydown.enter="searchLicense()"
        @keydown.delete="loadDataLicense()"
      >
      </m-input>

      <div class="btn-tollbar">
        <button class="btn__toolbar m-icon-print"></button>
        <button class="btn__toolbar m-icon-3dot"></button>
      </div>
    </div>
    <div class="table1" :style="sizeLicenseList" v-show="zoom">
      <div class="table-up-asset-list">
        <table>
          <thead>
            <tr>
              <th
                style="height: 37px; width: 85px"
                class="text-rigth m-boder-check"
              >
                <div class="m-check">
                  <input class="m-checkbox" type="checkbox" />
                </div>
                <div class="ml-17">
                  <span>STT</span>
                </div>
              </th>

              <th style="width: 120px" class="text-left">Số chứng từ</th>

              <th style="width: 200px" class="text-center">Ngày chứng từ</th>

              <th style="width: 200px" class="text-center">Ngày ghi tăng</th>

              <th style="width: 150px" class="text-rigth">Tổng nguyên giá</th>

              <th style="width: 600px; padding-left: 15px" class="text-left">
                Nội dung
              </th>
              <th style="width: 140px"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(license, index) in licenseList"
              :key="license.licenseID"
              @mouseup="showLicenseDetail(license.licenseID)"
              @dblclick="editLicenseDetail(license, license.licenseID)"
            >
              <td
                style="width: 100px; height: 39px"
                class="text-rigth m-boder-check"
              >
                <div class="m-check">
                  <input class="m-checkbox" type="checkbox" />
                </div>
                <span class="ml-24 text-center">{{ index + 1 }}</span>
              </td>
              <td class="text-left">
                <span
                  style="color: #1b9de8"
                  @click="editLicenseDetail(license, license.licenseID)"
                  >{{ license.licenseCode }}</span
                >
              </td>
              <td class="text-center">
                <span>{{ formartDate(license.licenseDay) }}</span>
              </td>
              <td class="text-center">
                <span>{{ formartDate(license.writeDay) }}</span>
              </td>

              <td class="text-rigth">
                <span>{{ formartNumber(license.totalCost) }}</span>
              </td>
              <td class="text-left" style="padding-left: 15px">
                {{ license.content }}
              </td>
              <td class="text-rigth">
                <button
                  class="m-icon-edit btn-edit"
                  @click="editLicenseDetail(license, license.licenseID)"
                ></button>
                <button
                  class="m-icon-delete-red btn-detele"
                  @click="deleteLicense(license.licenseID, license.licenseCode)"
                ></button>
              </td>
            </tr>
            <div></div>
          </tbody>
          <tfoot>
            <td colspan="5" class="text-rigth">{{ formartNumber(sumCost) }}</td>
            <td></td>
            <td></td>
          </tfoot>
        </table>
      </div>
      <div class="bottom-table-list">
        <div class="m-table__bottom">
          <div class="m-total-property">
            Tổng số: &nbsp;<span style="font-weight: 700">{{ totalCount }}</span
            >&nbsp; bản ghi
          </div>

          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
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
    </div>

    <div class="change-size" id="change" @mousedown="changSize()"></div>

    <div class="table-up-asset-detail" :style="sizeLicenseDetail">
      <div class="header-detail">
        <span>Thông tin tài sản</span>
        <button
          class="btn__toolbar m-icon-zoom" v-if="zoom"
          @click="resizeFormDetail"
        ></button>
        <button
          class="btn__toolbar m-icon-zoom-out" v-else
          @click="resizeFormDetail"
        ></button>
      </div>
      <div class="table-detail">
        <table>
          <thead>
            <tr>
              <th style="width: 80px" class="text-center">STT</th>

              <th style="width: 120px" class="text-left">Mã tài sản</th>

              <th style="width: 300px" class="text-left">Tên tài sản</th>

              <th style="width: 300px" class="text-left">Bộ phận sử dụng</th>

              <th style="width: 140px" class="text-rigth">Nguyên giá</th>

              <th style="width: 175px" class="text-rigth">Hao mòn năm</th>
              <th style="width: 175px; padding-right: 25px" class="text-rigth">
                Giá trị còn lại
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(licenseDetail, index) in licenseDetailList"
              :key="licenseDetail.licenseDetailID"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-left">{{ licenseDetail.fixed_asset_code }}</td>
              <td class="text-left">
                <span>{{ licenseDetail.fixed_asset_name }}</span>
              </td>
              <td class="text-left">
                <span>{{ licenseDetail.department_name }}</span>
              </td>
              <td class="text-rigth">
                <span>{{ formartNumber(licenseDetail.cost) }}</span>
              </td>
              <td class="text-rigth">
                {{ formartNumber(licenseDetail.loss_year) }}
              </td>
              <td style="padding-right: 25px" class="text-rigth">
                {{
                  formartNumber(licenseDetail.cost - licenseDetail.loss_year)
                }}
              </td>
            </tr>
            <div></div>
          </tbody>
        </table>
      </div>
    </div>
    <load-ding v-show="isShowLoading"></load-ding>
    <WirteUpAssetDetail
      v-if="isShowLicenseDetail"
      :licenseID="licenseID"
      :licenseInfo="licenseInfo"
      :formMode="formMode"
    />
    <toast-message-delete
      v-if="isShowToastDelete"
      :titleFormDelete="titleFormDelete"
      :isShowLicense="isShowLicense"
      :code="code"
      :id="id"
    ></toast-message-delete>
  </div>
</template>

<script>
import axios from "axios";
import Resource from "@/lib/resource";
import LoadDing from "@/view/loading/LoadDing.vue";
import BaseMethod from "@/lib/baseMethod";
import MInput from "../../../base/input/MInput.vue";
import WirteUpAssetDetail from "./WirteUpAssetDetail.vue";
import ToastMessageDelete from "@/view/toast/ToastMessageDelete.vue";
export default {
  components: {
    MInput,
    WirteUpAssetDetail,
    LoadDing,
    ToastMessageDelete,
  },
  created() {
    if (sessionStorage.getItem("checkSesstion") == null) {
      this.$router.push("/");
    }
  },

  mounted() {
    this.getDataLicense();
  },

  methods: { 
    /**
     * Hàm thay đổi bố cục trang thành ngang
     */
    layoutFirst(){
      this.zoom = false;
      this.sizeLicenseDetail = `height: calc(100% - 80px)`;
      this.ishowOptionLayout = false;
    },


     /**
     * Hàm thay đổi bố cục trang thành dọc
     */
     layoutSecond(){
      this.zoom = true;
      this.sizeLicenseDetail = `height: 240px`;
      this.ishowOptionLayout = false;
    },
    
    /**
     * Hàm mở form chọn layout cho trang
     */
    showOptionLayout(){
      this.ishowOptionLayout = !this.ishowOptionLayout;
    },

    /**
     * Hàm phóng to giao điện bảng chi tiết
     */
    resizeFormDetail() {
      this.zoom = !this.zoom;
      if(this.zoom == false){
        this.sizeLicenseDetail = `height: calc(100% - 80px)`;
      }
      else{
        this.sizeLicenseDetail = `height: 240px`;
      }
    },

    changSize() {
      let me = this;
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        me.sizeLicenseList = `height: ${240 + (e.pageY - 413)}px`;
        me.sizeLicenseDetail = `height: calc(100% - ${
          400 - (e.pageY - 413)
        }px)`;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
    /**
     * Hàm tải lại trang khi keword tìm kiếm trống
     */
    loadDataLicense() {
      if (this.keword == "") {
        this.getDataLicense();
      }
    },

    /**
     * Hàm tìm kiếm chứng từ theo mã và nội dung
     */
    searchLicense() {
      this.getDataLicense();
    },
    /**
     * Xóa chứng từ mở form thông báo
     */
    deleteLicense(licenseID, licenseCode) {
      this.titleFormDelete = Resource.TitleToast.titleFormDeleteLicense;
      this.isShowLicense = true;
      this.isShowToastDelete = true;
      this.code = licenseCode;
      this.id = licenseID;
    },

    hideToastDelete() {
      this.isShowToastDelete = false;
    },

    /**
     * Hàm sửa chứng từ
     */
    editLicenseDetail(license, licenseID) {
      this.formMode = 2;
      this.isShowLicenseDetail = true;
      this.licenseID = licenseID;
      this.licenseInfo = license;
    },
    /**
     * Hàm lấy dữ liệu chứng từ cho bảng chi tiết
     */
    showLicenseDetail(licenseID) {
      this.licenseID = licenseID;
      this.getDataLicenseDetailByID();
    },

    /**
     * Hàm mở form chi tiết để thêm chứng từ tăng ghi
     */
    btnAddLicense() {
      this.isShowLicenseDetail = true;
      this.licenseDetailList = {};
      this.formMode = 1;
    },

    /**
     * Hàm đóng form chi tiết để thêm chứng từ tăng ghi
     */
    hideAddLicense() {
      this.isShowLicenseDetail = false;
    },

    /**
     * lấy dữ liệu từ data thông qua be
     */
    getDataLicense() {
      let me = this;
      me.isShowLoading = true;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(
            `https://localhost:44380/api/License/filter?keword=${me.keword}&limit=20&offset=1`
          )
          .then((response) => {
            me.licenseList = response.data.data;
            me.totalCount = response.data.totalCount;
            me.sumCost = response.data.quantity;

            me.isShowLoading = false;
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lấy dữ liệu chi tiết cho từng chứng từ
     * @param {*} licenseID
     */
    getDataLicenseDetailByID() {
      let me = this;
      me.isShowLoading = true;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(`https://localhost:44380/api/License/list-asset/${me.licenseID}`)
          .then((response) => {
            me.licenseDetailList = response.data;

            //tắt trạng thái chờ
            setTimeout(() => {
              me.isShowLoading = false;
            }, 1000);
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm định dạng ngày tháng
     */
    formartDate(date) {
      return BaseMethod.formartDate(date);
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
      options: [
        {
          value: "10",
          label: "10",
        },
        {
          value: "20",
          label: "20",
        },
        {
          value: "50",
          label: "50",
        },
      ],
      value: "20",
      isShowLicenseDetail: false,
      licenseList: {},
      totalCount: 0,
      licenseDetailList: {},
      sumCost: null,
      assetList: {},
      licenseID: null,
      formMode: null,
      licenseInfo: {},
      isShowLoading: false,
      isShowToastDelete: false,
      keword: "",
      sizeLicenseList: "height: 250px",
      sizeLicenseDetail: "height: calc(100% - 400px)",
      zoom: true,
      ishowOptionLayout:false
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/writeUpAssetList.css);
</style>