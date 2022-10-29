<template>
  <div class="m-dialog">
    <div class="select-form-detail">
      <div class="header">
        <span> Chọn tài sản ghi tăng </span>
        <button class="m-icon-xdetail"></button>
      </div>
      <div class="tool-bar">
        <input
          type="text"
          className="input input__icon m-icon-search-input input-serch-detail"
          v-model="keword"
          placeholder="Tìm kiếm theo mã, tên tài sản"
        />
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th
                style="height: 37px; width: 85px"
                class="text-rigth m-boder-check"
              >
                <div class="m-check">
                  <input
                    class="m-checkbox"
                    type="checkbox"
                    @click="selectAllOnClick()"
                  />
                </div>

                <div class="ml-17">
                  <span>STT</span>
                </div>
              </th>

              <th style="width: 80px" class="text-left">Mã tài sản</th>

              <th style="width: 120px" class="text-left">Tên tài sản</th>

              <th style="width: 175px" class="text-left">Bộ phận sử dụng</th>

              <th style="width: 140px" class="text-left">Nguyên giá</th>

              <th style="width: 150px" class="text-rigth">Hao mòn năm</th>

              <th style="width: 150px" class="text-rigth">Giá trị còn lại</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(asset, index) in assetList" :key="asset.fixed_asset_id">
              <td
                style="width: 100px; height: 39px"
                class="text-rigth m-boder-check"
              >
                <div class="m-check">
                  <input
                    class="m-checkbox"
                    type="checkbox"
                    :value="asset"
                    v-model="listAsset"
                  />
                </div>
                <span class="ml-24 text-center">{{ index + 1 }}</span>
              </td>
              <td class="text-left">{{ asset.fixed_asset_code }}</td>
              <td class="text-left">
                <span>{{ asset.fixed_asset_name }}</span>
              </td>
              <td class="text-left">
                <span>{{ asset.fixed_asset_category_name }}</span>
              </td>

              <td class="text-left">
                <span>{{ asset.cost }}</span>
              </td>
              <td class="text-rigth">{{ asset.loss_year }}</td>
              <td class="text-rigth">{{ asset.cost - asset.loss_year }}</td>
            </tr>

            <div></div>
          </tbody>

          <tbody v-if="emptyTable">
            <tr>
              <td class="empty" colspan="10">
                <el-empty :description="textEmply"></el-empty>
              </td>
            </tr>
          </tbody>

          <tfoot
            class="m-bottom-table"
            style="position: sticky; bottom: 0; background-color: #fff"
          >
            <td colspan="5">
              <div class="m-table__bottom">
                <div class="m-total-property">
                  Tổng số: &nbsp;<span style="font-weight: 700">{{
                    totalCount
                  }}</span
                  >&nbsp; bản ghi
                </div>

                <el-select v-model="pageSize">
                  <el-option
                    v-for="item in options"
                    :key="item.pageSize"
                    :value="item.pageSize"
                    @click="changePageSize(pageSize)"
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
                    <span>{{ page }}</span>
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
                    <span>{{ endPageNumber }}</span>
                  </button>

                  <button @click="pageNumberClick(pageNumber, textNext)" class="btn-pagenavi">
                    <div class="m-icon-next"></div>
                  </button>
                </div>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tfoot>
        </table>
      </div>
      <div class="bottom">
        <button class="btn btn-close" @click="btnCloseForm">Hủy bỏ</button>
        <button class="btn btn-save" @click="btnSaveForm">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Resource from "@/lib/resource";
export default {
  name: "SelectUpAssetDetail",
  props: ["assetListDetail"],
  created() {
    this.getDataAsset();
  },
  watch: {
    assetListDetail: function (value) {
      this.listAsset = value;
    },

    /**
     * Hàm theo dõi pageNumber: nếu pageNumber thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (19/09/2022)
     */
    pageNumber: function () {
      this.getDataAsset();
    },
    /**
     * Hàm theo dõi pageSize: nếu pageNumber thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (19/09/2022)
     */
    pageSize: function () {
      this.page = 2;
      this.getDataAsset();
    },
  },
  updated() {
    /**
     * nếu page chỉ có 1 trang hoặc không có trang nào thì ẩn hết nút còn lại chỉ hiện trang 1
     * nếu page chỉ có 2 trang thì ẩn hết nút còn lại chỉ hiện trang 1 và 2
     * nếu page chỉ có 3 trang thì ẩn hết nút còn lại chỉ hiện trang 1, 2 và 3 không hiện ...
     * nếu page chỉ có 4 trang trở lên thì hiện hết
     * Author: NVHThai (19/09/2022)
     */
    if (this.endPageNumber == 0 || this.endPageNumber == 1) {
      this.isShowThreeDot = false;
      this.isShowNextPage = false;
      this.isShowEndPage = false;
    } else if (this.endPageNumber == 2) {
      this.isShowThreeDot = false;
      this.isShowNextPage = false;
      this.isShowEndPage = true;
    } else if (this.endPageNumber == 3) {
      this.isShowThreeDot = false;
      this.isShowNextPage = true;
      this.isShowEndPage = true;
    } else {
      this.isShowThreeDot = true;
      this.isShowNextPage = true;
      this.isShowEndPage = true;
    }
  },

  computed: {
    /**
     * khi pagesize thay đổi thì phải tính toán lại trang cuối cùng
     * Author: NVHTHai (19/09/2022)
     */
    endPageNumber: function () {
      let total = this.totalCount;
      let pageSize = this.pageSize;
      if (total % pageSize == 0) {
        let endPageNumber = total / pageSize;
        return endPageNumber;
      } else {
        let endPageNumber = Math.floor(total / pageSize) + 1;
        return endPageNumber;
      }
    },
  },
  methods: {
    /**
     * Hàm lưu asset đã chọn
     */
    btnSaveForm() {
      this.$parent.btnHideAsset();
      this.$parent.getAssetData(this.listAsset);
    },

    /**
     * Hàm đóng form select tài sản
     */
    btnCloseForm() {
      this.$parent.btnHideAsset();
    },

    /**
     * hàm tạo sự kiện cho nút ở paging
     * Author: NVHTHai (19/09/2022)
     * @param {int} pageNumber : trang hiện tại
     * @param {string} check : kiểm tra xem đang click vào đâu
     */
    pageNumberClick(pageNumber, check) {
      try {
        switch (check) {
          case this.textPrev:
            if (pageNumber > 1) {
              this.pageNumber = pageNumber - 1;
            }
            if (pageNumber > 2) {
              this.page = pageNumber - 1;
            }
            break;
          case this.textNext:
            if (pageNumber < this.endPageNumber) {
              this.pageNumber = pageNumber + 1;
              this.page = pageNumber + 1;
            }
            break;
          case 1:
            this.pageNumber = pageNumber;
            if (pageNumber == 1) {
              this.page = 2;
            }
            if (pageNumber == this.endPageNumber) {
              this.page = this.endPageNumber - 1;
            }
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy những tài sản chưa được ghi tăng
     */
    getDataAsset() {
      let me = this;
      try {
        // trước khi load dữ liệu thì hiện trạng thái tải data
        this.isShowLoading = true;
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(
            `https://localhost:44380/api/License/filter/asset?keword=${me.keword}&limit=${me.pageSize}&offset=${me.pageNumber}`
          )
          .then((response) => {
            me.assetList = response.data.data;
            me.totalCount = response.data.totalCount;
            me.totalCost = response.data.cost;
            me.totalLoss = response.data.loss;
            me.totalQuantity = response.data.quantity;
            // lấy dữ liệu xong tắt trạng thái tải data
            this.isShowLoading = false;
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm nhập giá trị vào cbb paging để có số tài sản trong 1 trang
     * Author: NVHTHai (19/09/2022)
     *@param {int} pageSize
     */
    pageSizeClick(pageSize) {
      try {
        this.pageSize = pageSize;
        this.isShowmComboboxPaging = false;
        this.pageNumber = 1;
      } catch (error) {
        console.log(error);
      }
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },
  },

  data() {
    return {
      options: [
        {
          pageSize: 10,
        },
        {
          pageSize: 20,
        },
        {
          pageSize: 50,
        },
      ],
      pageSize: 20,

      listAsset: [],
      assetList: {},
      keword: "",
      pageNumber: 1,
      // biến để show chỗ phân trang
      isShowThreeDot: true,
      isShowNextPage: true,
      isShowEndPage: true,
      // số bản ghi trong dữ liệu
      totalCount: null,
      //page hiện tại
      page: 2,
      textNext: Resource.TextVi.Tooltip.Next,
      textPrev: Resource.TextVi.Tooltip.Prev,

    };
  },
};
</script>

<style scoped>
@import url(../../../css/details/property/selectUpAssetDetail.css);
</style>