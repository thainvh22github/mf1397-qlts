<template>
  <div class="m-up-asset">
    <div class="m-header-up-asset">
      <span>Ghi tăng tài sản</span>
      <div class="btn-toolbar-up">
        <div class="btn btn-add" @click="btnAddLicense">Thêm</div>
        <button
          class="btn__toolbar ml-20"
          @click="showOptionLayout"
          @blur="hideOptionLayout"
        >
          <div class="m-icon-asset-up ml-10" v-if="layout"></div>
          <div class="m-icon-asset-ngang ml-10" v-else></div>
          <div class="m-icon-asset-up-dropdown ml-10"></div>
        </button>
        <div class="option-layout" v-show="ishowOptionLayout">
          <div class="option option-first" @mousedown="layoutFirst">
            <div class="m-icon-asset-ngang"></div>
            <div class="text">Giao diện ngang</div>
          </div>
          <div class="option option-second" @mousedown="layoutSecond">
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
      >
      </m-input>

      <div class="btn-tollbar">
        <el-tooltip
          v-show="isShowDeleteMutil"
          content="Xóa"
          effect="customized"
        >
          <button
            class="btn__toolbar m-icon-delete-red2"
            v-show="isShowDeleteMutil"
            @click="DeleteMutil"
          ></button>
        </el-tooltip>
        <button class="btn__toolbar m-icon-print"></button>
        <button class="btn__toolbar m-icon-3dot"></button>
      </div>
    </div>
    <div class="table1" :style="sizeLicenseList" v-show="zoom">
      <div class="table-up-asset-list">
        <table>
          <thead>
            <tr>
              <th style="width: 30px" class="text-center">
                <el-checkbox
                  v-model="checked"
                  @click.prevent="selectAllOnClick()"
                ></el-checkbox>
              </th>
              <th style="width: 85px" class="text-center">
                <el-tooltip content="Số thứ tự" effect="customized">
                  <span>STT</span>
                </el-tooltip>
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
              :class="[
                { active: filterCheckbox(license.licenseID) },
                { active: license.licenseID == tmpID },
              ]"
            >
              <td class="text-center">
                <input
                  class="m-checkbox"
                  type="checkbox"
                  :value="license.licenseID"
                  v-model="licenseListID"
                />
              </td>
              <td class="text-center">
                {{ index + 1 }}
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
              <td class="text-rigth btn-tool">
                <el-tooltip content="Sửa" effect="customized">
                  <button
                    class="m-icon-edit btn-edit"
                    @click="editLicenseDetail(license, license.licenseID)"
                  ></button>
                </el-tooltip>
                <el-tooltip content="Xóa" effect="customized">
                  <button
                    class="m-icon-delete-red btn-detele"
                    @click="
                      deleteLicense(license.licenseID, license.licenseCode)
                    "
                  ></button>
                </el-tooltip>
              </td>
            </tr>
            <div></div>
          </tbody>
          <tbody v-if="emptyTable">
            <tr>
              <td colspan="10" class="text-center">Không có dữ liệu</td>
            </tr>
          </tbody>
          <tfoot>
            <td colspan="6" class="text-rigth">{{ formartNumber(sumCost) }}</td>
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
          <el-select v-model="limit">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <a-pagination
            v-model:current="current1"
            show-size-changer
            :total="total"
            @showSizeChange="onShowSizeChange"
          />
        </div>
      </div>
    </div>
    <div class="change-size" id="change" @mousedown="changSize()"></div>
    <div class="table-up-asset-detail" :style="sizeLicenseDetail" v-show="layout">
      <div class="header-detail">
        <span>Thông tin tài sản</span>

        <el-tooltip v-if="zoom" content="Phóng to" effect="customized">
          <button
            class="btn__toolbar m-icon-zoom"
            v-if="zoom"
            @click="resizeFormDetail"
          ></button>
        </el-tooltip>
        <el-tooltip v-if="!zoom" content="Thu nhỏ" effect="customized">
          <button
            class="btn__toolbar m-icon-zoom-out"
            v-if="!zoom"
            @click="resizeFormDetail"
          ></button>
        </el-tooltip>
      </div>
      <div class="table-detail">
        <table>
          <thead>
            <tr>
              <th style="width: 80px" class="text-center">
                <el-tooltip content="Số thứ tự" effect="customized">
                  <span>STT</span>
                </el-tooltip>
              </th>
              <th style="width: 120px" class="text-left">Mã tài sản</th>
              <th style="width: 400px" class="text-left">Tên tài sản</th>
              <th style="width: 200px" class="text-left">Bộ phận sử dụng</th>
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
              :class="{ active: licenseDetail.fixed_asset_id == tmpID }"
              @click="selectedRow(licenseDetail.fixed_asset_id)"
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

    <delete-license
      v-if="isShowToastDeleteMutil"
      :licenseListID="licenseListID"
      :id="id"
    ></delete-license>
  </div>
</template>

<script>
import axios from "axios";
// import Resource from "@/lib/resource";
import LoadDing from "@/view/loading/LoadDing.vue";
import BaseMethod from "@/lib/baseMethod";
import MInput from "../../../base/input/MInput.vue";
import WirteUpAssetDetail from "./WirteUpAssetDetail.vue";
import ToastMessageDelete from "@/view/toast/ToastMessageDelete.vue";
import DeleteLicense from "@/view/toast/DeleteLicense.vue";
import { ref } from "vue";
export default {
  components: {
    MInput,
    WirteUpAssetDetail,
    LoadDing,
    ToastMessageDelete,
    DeleteLicense,
  },

  setup() {
    const current1 = ref(1);
    const onShowSizeChange = (current) => {
      console.log(current);
    };
    return {
      current1,
      onShowSizeChange,
    };
  },

  created() {
    if (!sessionStorage.getItem("session")) {
      this.$router.push("/");
    }
  },

  mounted() {
    this.getDataLicense();
  },

  watch: {
    licenseListID: function () {
      if (this.licenseListID.length > 1) {
        this.isShowDeleteMutil = true;
      } else {
        this.isShowDeleteMutil = false;
      }
      
    },

    current1: function (value) {
      this.pageSize = value;
      this.getDataLicense();
    },

    limit: function (value) {
      this.limit = value;
      this.getDataLicense();
    },
  },
  methods: {
    /**
     * Hàm dùng để click vào chek box tổng thì all check box đều checked
     *  Author: NVHThai (09/09/2022)
     */
    selectAllOnClick() {
      try {
        if (this.checked == false) {
          this.licenseListID = [];
          for (let i of this.licenseList) {
            this.licenseListID.push(i.licenseID);
          }
        }
        else{
          this.licenseListID = [];
        }
        this.checked = !this.checked;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * kiểm tra xem id vừa chọn có ở trong mảng không, id là id của tài sản sau đó tr có brc
     * Nếu là false thì id không còn trong bảng
     * Nếu là true thì id có trong bảng giống id vừa được chọn
     * Author: NVHTHai (12/09/2022)
     * @param {id} guid
     */
    filterCheckbox(id) {
      try {
        for (let idcheck of this.licenseListID) {
          if (idcheck == id) {
            return true;
          }
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa các phần tử trong mảng chứa id chứng từ
     */
    deleteDataLicenseIDArr() {
      this.licenseListID = [];
    },

    /**
     * Hàm đóng toast hỏi xóa nhiều chứng từ
     */
    hideDeleteMutil() {
      this.isShowToastDeleteMutil = false;
    },

    /**
     * Hàm thay đổi bố cục trang thành ngang
     */
    layoutFirst() {
      this.layout = false;
      this.zoom = true;
      this.sizeLicenseList = `height: calc(100% - 150px);`;
      this.ishowOptionLayout = false;
    },

    /**
     * Hàm thay đổi bố cục trang thành dọc
     */
    layoutSecond() {
      this.layout = true;
      this.sizeLicenseList = `height: 250px`;
      this.ishowOptionLayout = false;
    },

    /**
     * Hàm mở form chọn layout cho trang
     */
    showOptionLayout() {
      this.ishowOptionLayout = !this.ishowOptionLayout;
    },

    /**
     * Hàm ẩn form chọn layout cho trang
     */
    hideOptionLayout() {
      this.ishowOptionLayout = false;
    },

    /**
     * Hàm phóng to giao điện bảng chi tiết
     */
    resizeFormDetail() {
      this.zoom = !this.zoom;
      if (this.zoom == false) {
        this.sizeLicenseDetail = `height: calc(100% - 80px)`;
      } else {
        this.sizeLicenseDetail = `height: calc(100% - 400px)`;
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
     * Hàm tìm kiếm chứng từ theo mã và nội dung
     */
    searchLicense() {
      this.getDataLicense();
    },

    /**
     * Hàm xóa nhiều chứng từ
     */
    DeleteMutil() {
      let count =
        this.licenseListID.length < 10
          ? `0${this.licenseListID.length}`
          : this.licenseListID.length;
      this.$alert(
        `<span class="text"><span style="font-weight: 700">${count}</span> chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?</span>`,
        {
          confirmButtonText: "Xóa",
          showCancelButton: true,
          cancelButtonText: "Không",
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        this.id = null;
        this.isShowToastDeleteMutil = true;
      });
    },

    /**
     * Xóa chứng từ mở form thông báo
     */
    deleteLicense(licenseID, licenseCode) {
      this.id = licenseID;

      this.$alert(
        `<span class="text">Bạn có muốn xóa chứng từ có mã<span style="font-weight: 700"> ${licenseCode}?</span></span>`,
        {
          confirmButtonText: "Xóa",
          showCancelButton: true,
          cancelButtonText: "Không",
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        this.isShowToastDeleteMutil = true;
        this.id = licenseID;
      });
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
      this.tmpID = licenseID;
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
            `https://localhost:44380/api/License/filter?keword=${me.keword}&limit=${me.limit}&offset=${me.pageSize}`
          )
          .then((response) => {
            me.licenseList = response.data.data;
            me.totalCount = response.data.totalCount;
            me.sumCost = response.data.cost;

            if (me.licenseList.length > 0) {
              me.licenseID = me.licenseList[0].licenseID;
              me.getDataLicenseDetailByID();
              me.tmpID = me.licenseList[0].licenseID;
              me.emptyTable = false;
            } else {
              me.emptyTable = true;
              me.licenseDetailList = {};
            }

            if (me.totalCount % me.limit == 0) {
              me.total = Math.floor(me.totalCount / me.limit) * 10;
            } else {
              me.total = (Math.floor(me.totalCount / me.limit) + 1) * 10;
            }

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
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(`https://localhost:44380/api/License/list-asset/${me.licenseID}`)
          .then((response) => {
            me.licenseDetailList = response.data;
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
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
      options: [{ value: 10 }, { value: 20 }, { value: 50 }],
      limit: 20,
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
      layout:true,
      ishowOptionLayout: false,
      licenseListID: [],
      isShowDeleteMutil: false,
      isShowToastDeleteMutil: false,
      // id lưu tạm
      tmpID: null,
      pageSize: 1,
      total: null,
      selectAll: true,
      emptyTable: false,
      checked: false,
    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/writeUpAssetList.css);
</style>