<template>
  <div class="m-content" id="content">
    <div class="m-toolbar">
      <div class="m-toolbar__search">

        <m-input type="text" className="input__icon m-icon-search-input input--serch-proprety"
          :placeholder="textPInputSearch" v-model="keword" tabindex="1" @keydown.enter="searchInput(keword)"
          @input="searchInputEmpty(keword)" id="searchAsset">
        </m-input>
        <m-combobox css="ml-11" type="text" className="combobox__icon m-icon-cbb m-property-type"
          :placeholder="textPComboboxAssetCategory" v-model:fixed_asset_category_id="IDCategoryAsset" tabindex="2"
          :url="urlCategoryAsset" :itemID="ItemIDCategoryAsset" :itemCode="ItemNameCategoryAsset">
        </m-combobox>

        <m-combobox css="ml-11" type="text" className="combobox__icon m-icon-cbb m-property-type"
          :placeholder="textPComboboxDepartment" v-model:department_id="IDDepartment" tabindex="3" :url="urlDepartment"
          :itemID="ItemIDDepartment" :itemCode="ItemNameDepartment"></m-combobox>
      </div>

      <div class="m-toolbar__btn">
        <el-tooltip :disabled="disabled" :content="textTolltipBtnAdd" placement="top" show-after="400"
          effect="customized">
          <button id="btnadd" class="btn btn__icon m-icon-add-fff btn-add" @keyup.insert="btnOpenFormAddOnclick"
            @click="btnOpenFormAddOnclick" tabindex="4">
            {{textBtnAdd}}
          </button>
        </el-tooltip>

        <el-tooltip :disabled="disabled" :content="textTolltipBtnExport" placement="top" show-after="400"
          effect="customized">
          <button :class="{ disableBtn: disableBtn }" class="ml-11 btn__toolbar m-icon-btn-export btn-export"
            tabindex="5"></button>
        </el-tooltip>

        <el-tooltip :disabled="disabled" :content="textTolltipBtnDelete" placement="top" show-after="400"
          effect="customized">
          <button :class="{ disableBtn: disableBtn }" class="ml-11 btn__toolbar m-icon-btn-delete btn-delete"
            @click="btnOpenToastDeleteOnclick()" tabindex="6"></button>
        </el-tooltip>
      </div>
    </div>

    <div class="m-property-main-list">
      <div class="m-table">
        <div class="m-property-list" id="property-list">
          <table>
            <thead>
              <tr>
                <th style="height: 37px; width: 85px" class="text-rigth m-boder-check">
                  <el-tooltip :disabled="disabled" :content="textTolltipCheckboxAll" placement="bottom" show-after="400"
                    effect="customized">
                    <div class="m-check">
                      <input class="m-checkbox" type="checkbox" @click="selectAllOnClick()" />
                    </div>
                  </el-tooltip>

                  <el-tooltip :disabled="disabled" :content="textTolltipSTT" placement="bottom" show-after="400"
                    effect="customized">
                    <div class="ml-17">
                      <span>{{textSTT}}</span>
                    </div>
                  </el-tooltip>
                </th>

                <th style="width: 80px" class="text-left">{{textAssetCode}}</th>

                <th style="width: 15%; padding-left: 10px" class="text-left">
                  {{textAssetName}}
                </th>

                <th style="width: 175px; color: #001031; padding-left: 10px" class="text-left">
                  {{textAssetCategoryName}}
                </th>

                <th style="width: 140px; color: #001031; padding-left: 10px" class="text-left">
                  {{textAssetDepartmentName}}
                </th>

                <th style="width: 7%; color: #001031; padding-left: 10px" class="text-rigth">
                  {{textQuanlity}}
                </th>

                <th style="width: 12%; color: #001031" class="text-rigth">{{textCost}}</th>
                <th style="width: 10%; color: #001031" class="text-rigth">
                  <el-tooltip :disabled="disabled" :content="textTolltipLossCost" placement="bottom" show-after="400"
                    effect="customized">
                    <span style="font-weight: 700">{{textLossCost}}</span>
                  </el-tooltip>
                </th>
                <th style="width: 11%; color: #001031" class="text-rigth">
                  {{textRemaining}}
                </th>

                <th style="width: 10%; color: #001031" class="text-center">{{textTool}}</th>
              </tr>
            </thead>

            <tbody>
              <tr :id="asset + index" tabindex="4" @keydown.down="nextEleMoveFocus()" @keydown.up="prevEleMoveFocus()"
                @keydown.delete.exact="
                  deleteByKeyboard(
                    property.fixed_asset_id,
                    property.fixed_asset_code,
                    property.fixed_asset_name
                  )
                " @keydown.ctrl.delete="
                  deleteByKeyboard(
                    property.fixed_asset_id,
                    property.fixed_asset_code,
                    property.fixed_asset_name
                  )
                " @keydown.enter="
                  editPropertyOnclick(property.fixed_asset_id, property.fixed_asset_code)
                " @mousedown="selectedRow(property.fixed_asset_id)" @dblclick="
                  editPropertyOnclick(property.fixed_asset_id, property.fixed_asset_code)
                " @contextmenu="
                  showContextMenu(
                    $event,
                    property.fixed_asset_id,
                    property.fixed_asset_code,
                    property.fixed_asset_name
                  )
                " @blur="hideContextMenu()" :class="[
                  { active: filterCheckbox(property.fixed_asset_id) },

                  { active: property.fixed_asset_id == tmpID },
                ]" v-for="(property, index) in propertys" :key="property.fixed_asset_id">
                <td style="width: 100px; height: 39px" class="text-rigth m-boder-check">
                  <div class="m-check">
                    <input class="m-checkbox" type="checkbox" :value="property.fixed_asset_id" v-model="checkboxList"
                      @mousedown="
                        getNameProperty(
                          property.fixed_asset_code,
                          property.fixed_asset_name
                        )
                      " />
                  </div>
                  <span class="ml-24 text-center">{{ index + 1 }}</span>
                </td>
                <td class="text-left">{{ property.fixed_asset_code }}</td>
                <td class="text-left ellipsis">
                  <el-tooltip :disabled="disabled" :content="property.fixed_asset_name" show-after="400" placement="top"
                    effect="customized">
                    <span>{{ property.fixed_asset_name }}</span>
                  </el-tooltip>
                </td>
                <td class="text-left ellipsis">
                  <el-tooltip :disabled="disabled" :content="property.fixed_asset_category_name" show-after="400"
                    placement="top" effect="customized">
                    <span>{{ property.fixed_asset_category_name }}</span>
                  </el-tooltip>
                </td>

                <td class="text-left ellipsis">
                  <el-tooltip :disabled="disabled" :content="property.department_name" placement="top" show-after="400"
                    effect="customized">
                    <span>{{ property.department_name }}</span>
                  </el-tooltip>
                </td>
                <td class="text-rigth">
                  {{ formartNumber(property.quantity) }}
                </td>
                <td class="text-rigth">{{ formartNumber(property.cost) }}</td>

                <td class="text-rigth">
                  {{ formartNumber((property.cost * property.depreciation_rate) / 100) }}
                </td>
                <td class="text-rigth">
                  {{
                  formartNumber(
                  property.cost - (property.cost * property.depreciation_rate) / 100
                  )
                  }}
                </td>
                <td class="text-center">
                  <el-tooltip :disabled="disabled" :content="textTolltipEdit" placement="bottom" show-after="400"
                    effect="customized">
                    <button class="m-icon-edit btn-edit" @click="
                      editPropertyOnclick(
                        property.fixed_asset_id,
                    
                        property.fixed_asset_code
                      )
                    "></button>
                  </el-tooltip>
                  <el-tooltip :disabled="disabled" :content="textTolltipDuplicate" placement="bottom" show-after="400"
                    effect="customized">
                    <button class="m-icon-duplicate btn-duplicate"
                      @click="duplicatePropertyOnclick(property.fixed_asset_id)"></button>
                  </el-tooltip>
                </td>

                <context-menu v-show="property.fixed_asset_id == valueID" :tmpPropertyCode="tmpPropertyCode"
                  :assetIDContext="assetIDContext" :pageY="pageY" :pageX="pageX">
                </context-menu>
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

            <tfoot class="m-bottom-table" style="position: sticky; bottom: 0; background-color: #fff">
              <td colspan="5">
                <div class="m-table__bottom">
                  <div class="m-total-property">
                    {{textTotal}}: &nbsp;<span style="font-weight: 700">{{ totalCount }}</span>&nbsp; {{textRecord}}
                  </div>

                  <div class="m-combobox" style="margin-left: 15px">
                    <input type="text" class="combobox m-page" v-model="pageSize" readonly/>
                    <button class="btn_combobox" @click="showCBBClick()" @blur="hideContentCbbBlur">
                      <div class="m-icon-dropdown"></div>
                    </button>
                    <div class="m-combobox__content"
                      style=" bottom: 100%; height: 62px;font-size: 11px;margin-bottom: 2px;"
                      v-show="isShowmComboboxPaging">
                      <div class="m-border">
                        <span v-for="(pageSize, index) in listOptionPageSize" :key="index" class="m-option-cbb-paging"
                          @mousedown="pageSizeClick(pageSize)">
                          {{ pageSize }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="m-table__bottom--pagenavi">
                    <el-tooltip :disabled="disabled" :content="textPrev" placement="top" effect="customized"
                      show-after="400">
                      <button class="btn-pagenavi" @click="pageNumberClick(this.pageNumber,textPrev)">
                        <div class="m-icon-prev"></div>
                      </button>
                    </el-tooltip>

                    <button class="btn-pagenavi" @click="pageNumberClick(1,1)"
                      :class="{ btnpagenaviactive: pageNumber == 1 }">
                      <span>1</span>
                    </button>

                    <button v-if="isShowNextPage" class="btn-pagenavi" @click="pageNumberClick(page,1)"
                      :class="{ btnpagenaviactive: pageNumber == page }">
                      <span>{{ page }}</span>
                    </button>

                    <div class="ml-12" v-if="isShowThreeDot">...</div>

                    <button v-if="isShowEndPage" class="btn-pagenavi" @click="pageNumberClick(this.endPageNumber,1)"
                      :class="{
                        btnpagenaviactive: pageNumber == this.endPageNumber,
                      }">
                      <span>{{ endPageNumber }}</span>
                    </button>

                    <el-tooltip :disabled="disabled" :content="textNext" placement="top" effect="customized"
                      show-after="400">
                      <button class="btn-pagenavi" @click="pageNumberClick(pageNumber,textNext)">
                        <div class="m-icon-next"></div>
                      </button>
                    </el-tooltip>
                  </div>
                </div>
              </td>

              <td class="text-rigth">
                <el-tooltip :disabled="disabled" :content="textQuanlity" placement="top" effect="customized"
                  show-after="400">
                  <span style="font-weight: 700">{{ formartNumber(totalQuantity) }}</span>
                </el-tooltip>
              </td>

              <td class="text-rigth">
                <el-tooltip :disabled="disabled" :content="textCost" placement="top" effect="customized"
                  show-after="400">
                  <span style="font-weight: 700">{{ formartNumber(totalCost) }}</span>
                </el-tooltip>
              </td>

              <td class="text-rigth">
                <el-tooltip :disabled="disabled" :content="textLossCost" placement="top" effect="customized"
                  show-after="400">
                  <span style="font-weight: 700">{{ formartNumber(totalLoss) }}</span>
                </el-tooltip>
              </td>

              <td class="text-rigth">
                <el-tooltip :disabled="disabled" :content="textRemaining" placement="top" effect="customized"
                  show-after="400">
                  <span style="font-weight: 700">{{
                  formartNumber(totalCost - totalLoss)
                  }}</span>
                </el-tooltip>
              </td>

              <td></td>
            </tfoot>
          </table>
        </div>
      </div>

      <PropertyDetail v-if="isShowDialog" :propertyIDSelected="propertyIDSelected"
        :propertyCodeSelected="propertyCodeSelected" :propertyCodeList="propertyCodeList"
        :checkTitleForm="checkTitleForm" />

      <ToastMessageException v-if="isShowToastException" :titleFormException="titleFormException" />

      <ToastMessageDelete :titleFormDelete="titleFormDelete" :totalCountAsset="totalCountAsset"
        :tmpPropertyCode="tmpPropertyCode" :tmpPropertyName="tmpPropertyName" :checkboxList="checkboxList"
        :assetIDContextDelete="assetIDContextDelete" v-if="isDialogToastDelete" />
      <ToastMessageValid v-if="isShowDialogToastValid" :moreInfo="moreInfo" :titleFormValid="titleFormValid" />
    </div>

    <LoadDing v-show="isShowLoading" />
  </div>
</template>

<script>
import axios from "axios";
import PropertyDetail from "./PropertyDetail.vue";
import ToastMessageDelete from "../toast/ToastMessageDelete.vue";
import Enum from "../../lib/enum.js";
import Resource from "@/lib/resource";
import LoadDing from "../loading/LoadDing.vue";
import MInput from "../../base/input/MInput.vue";
import MCombobox from "@/base/combobox/MCombobox.vue";
import ToastMessageException from "../toast/ToastMessageException.vue";
import ToastMessageValid from "../toast/ToastMessageValid.vue";
import ContextMenu from "../contextmenu/ContextMenu.vue";
export default {
  name: "PropertyList",

  components: {
    PropertyDetail,
    ToastMessageDelete,
    LoadDing,
    MInput,
    MCombobox,
    ToastMessageException,
    ContextMenu,
    ToastMessageValid,
  },

  created() {
    this.getDataAPI();
  },

  updated() {
    this.addEventListener();
    this.contextMenu();
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
  watch: {
    /**
     * Hàm theo dõi pageSize: nếu pageNumber thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (19/09/2022)
     */
    pageSize: function () {
      this.page = 2;
      this.getDataAPI();
    },

    /**
     * Hàm theo dõi pageNumber: nếu pageNumber thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (19/09/2022)
     */
    pageNumber: function () {
      this.getDataAPI();
    },

    /**
     * Hàm theo dõi IDCategoryAsset: nếu IDCategoryAsset thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (25/09/2022)
     */
    IDCategoryAsset: function (value) {
      this.assetCategoryID = value;
      this.getDataAPI();
    },

    /**
     * Hàm theo dõi IDDepartment: nếu IDDepartment thay đổi thì phải render lại dữ liệu trên table
     * Author: NVHTHai (25/09/2022)
     */
    IDDepartment: function (value) {
      this.departmentID = value;
      this.getDataAPI();
    },
  },

  methods: {
    /**
     * Hàm delete khi dùng bàn phím click vào ctrl delete hoặc delete
     * @param {guid} valueID : id của tài sản
     * @param {string} valueCode : mã tài sản
     * @param {string} valueName : tên tài sản
     * Author: NVHTHai (29/09/2022)
     */
    deleteByKeyboard(valueID, valueCode, valueName) {
      this.assetIDContext = valueID;
      this.tmpPropertyCode = valueCode;
      this.tmpPropertyName = valueName;
      this.deleteByID(this.assetIDContext);
    },

    /**
     * Hàm ẩn context menu mặc định
     * Author: NVHThai (07/10/2022)
     */
    contextMenu() {
      document.getElementById("property-list").oncontextmenu = function () {
        return false;
      };
    },

    /**
     * Hàm ẩn context menu
     * Author: NVHThai (07/10/2022)
     */
    hideContextMenu() {
      this.valueID = null;
    },

    /**
     * Hàm hiện context menu
     * @param {guid} valueID: id tài sản
     * @param {string} valueCode: mã tài sản
     * @param {string} valueName: tên tài sản
     * Author: NVHThai (07/10/2022)
     */
    showContextMenu(e, valueID, valueCode, valueName) {
      this.assetIDContext = valueID;
      this.pageX = e.pageX;
      this.pageY = e.pageY;
      if (this.valueID == valueID) {
        this.valueID = null;
      } else {
        this.valueID = valueID;
      }
      this.tmpPropertyCode = valueCode;
      this.tmpPropertyName = valueName;
    },

    /**
     * Hàm lắng nghe sự kiện của bàn phím khi click vào nút insert
     * Author NVHThai(29/09/2022)
     */
    addEventListener() {
      try {
        let me = this;
        document.addEventListener("keydown", function (event) {
          if (event.code == "Insert") {
            me.btnOpenFormAddOnclick();
          }
          if (event.ctrlKey && event.code == "ArrowDown") {
            document.getElementById(`asset0`).focus();
          }
          if (event.ctrlKey && event.code == "F3") {
            document.getElementById("searchAsset").focus();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm blur thì sẽ ẩn form cbb
     * Author: NVHThai (14/09/2022)
     */
    hideContentCbbBlur() {
      this.isShowmComboboxPaging = false;
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
            if (pageNumber > 1) { this.pageNumber = pageNumber - 1; }
            if (pageNumber > 2) { this.page = pageNumber - 1; }
            break;
          case this.textNext:
            if (pageNumber < this.endPageNumber) {
              this.pageNumber = pageNumber + 1;
              this.page = pageNumber + 1;
            }
            break;
          case 1:
            this.pageNumber = pageNumber;
            if (pageNumber == 1) {this.page = 2;}
            if (pageNumber == this.endPageNumber) {this.page = this.endPageNumber - 1;}
            break;
        }
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

    /**
     * Hàm show cbb ở paging để chọn số tài sản trên 1 trang
     * Author: NVHTHai (19/09/2022)
     */
    showCBBClick() {
      this.isShowmComboboxPaging = !this.isShowmComboboxPaging;
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
        for (let idcheck of this.checkboxList) {
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
     * Hàm formart số
     * Author: NVHTHai (12/09/2022)
     * @param {int} number
     */
    formartNumber(number) {
      try {
        if (number && !isNaN(number)) {
          number = number.toFixed(0);
          return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        } else {
          return number;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     *  Hàm đóng popup nếu click vào nút hủy trên toast message Exception
     *  Author: NVHThai (26/09/2022)
     */
    closeToastException() {
      this.isShowToastException = false;
    },

    /**
     * Xóa tài sản bảng context menu
     * Author: NVHThai (07/10/2022)
     * @param {*} valueID
     */
    deleteByID(valueID) {
      this.assetIDContextDelete = valueID;
      this.isDialogToastDelete = true;
      this.titleFormDelete = Resource.TitleToast.titleFormDelete;
    },

    /**
     * Hàm để mở popup khi ấn vào nút xóa
     * Author: NVHThai (09/09/2022)
     */
    btnOpenToastDeleteOnclick() {
      try {
        if (this.checkDataNotNull) {
          if (this.checkboxList.length == 1) {
            this.totalCountAsset = 1;
            this.isDialogToastDelete = true;
            this.titleFormDelete = Resource.TitleToast.titleFormDelete;
          } else if (this.checkboxList.length == 0) {
            this.totalCountAsset = 0;
            this.isShowToastException = true;
            this.titleFormException = Resource.TitleToast.DeleteException;
          } else {
            this.totalCountAsset = this.checkboxList.length;
            this.isDialogToastDelete = true;
            this.titleFormDelete = Resource.TitleToast.titleFormDeletes;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa các phần tử trong mảng thông báo
     * Author: NVHThai (30/09/2022)
     */
    deleteDataInCheckboxList() {
      try {
        this.checkboxList.splice(0, 100);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm để đóng popup khi ấn vào nút đóng
     * Author: NVHThai (09/09/2022)
     */
    btnCloseToastDeleteOnclick() {
      this.isDialogToastDelete = false;
    },

    /**
     * Hàm lấy dữ liệu api để render lên table
     * Author: nvhthai (01/09/2022)
     */
    getDataAPI() {
      let me = this;
      try {
        // trước khi load dữ liệu thì hiện trạng thái tải data
        this.isShowLoading = true;
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(
            `${Resource.Url.Asset}/filter?keword=${this.keword}&assetCategoryID=${this.assetCategoryID}&departmentID=${this.departmentID}&limit=${this.pageSize}&offset=${this.pageNumber}`
          )
          .then((response) => {
            me.propertys = response.data.data;
            me.totalCount = response.data.totalCount;
            me.totalCost = response.data.cost;
            me.totalLoss = response.data.loss;
            me.totalQuantity = response.data.quantity;
            me.propertyCodeList = response.data.assetCodeList;

            if (me.totalCount == 0) {
              this.disableBtn = true;
              this.emptyTable = true;
              this.checkDataNotNull = false;
            } else {
              this.emptyTable = false;
              this.disableBtn = false;
            }
            // lấy dữ liệu xong tắt trạng thái tải data
            this.isShowLoading = false;
          })
          .catch((response) => {
            console.log("response: ", response.response.status);
            me.handleException( response.response.status,response.response.data.moreInfo,response.response.data.userMsg);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lấy id tài sản và hiện lên form chi tiết
     * Author: NVHThai (09/09/2022)
     * @param {guid} property: id tài sản
     */
    editPropertyOnclick(propertyID, propertyCode) {
      try {
        this.propertyIDSelected = propertyID;
        this.propertyCodeSelected = propertyCode;
        this.isShowDialog = true;
        this.checkTitleForm = Enum.FormMode.Edit;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Author: nvhthai (31/08/2022)
     * click vào thì mở form thêm tài sản và reset id tài sản
     */
    btnOpenFormAddOnclick() {
      try {
        this.isShowDialog = true;
        this.checkTitleForm = Enum.FormMode.Add;
        this.propertyIDSelected = null;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * click vào thì mở form nhân bản tài sản
     * Author: nvhthai (31/08/2022)
     */
    duplicatePropertyOnclick(property) {
      try {
        this.propertyIDSelected = property;
        this.isShowDialog = true;
        this.checkTitleForm = Enum.FormMode.Duplicate;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm ẩn form add
     * Author NVHThai (09/09/2022)
     */
    hideFormAdd() {
      this.isShowDialog = false;
    },

    /**
     * Hàm dùng để click vào chek box tổng thì all check box đều checked
     *  Author: NVHThai (09/09/2022)
     */
    selectAllOnClick() {
      try {
        this.checkboxList = [];
        if (this.selectAll) {
          for (let i in this.propertys) {
            this.checkboxList.push(this.propertys[i].fixed_asset_id);
          }
        }
        this.selectAll = !this.selectAll;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * hàm tìm kiếm theo keyword
     * Author: NVHThai (24/09/2022)
     * @param {string} keyword
     */
    searchInput(keyword) {
      try {
        this.keword = keyword;
        this.getDataAPI();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm tải lại trang khi chỗ tìm kiếm rỗng
     * Author: NVHThai (05/10/2022)
     * @param {string} keyword
     */
    searchInputEmpty(keyword) {
      try {
        if (keyword == "") {
          this.keword = "";
          this.getDataAPI();
        }
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
     * Hàm lấy tên và mã tài sản
     * @param {string} propertyCode: Mã tài sản
     * @param {string} propertyName: Tên tài sản
     */
    getNameProperty(propertyCode, propertyName) {
      this.tmpPropertyCode = propertyCode;
      this.tmpPropertyName = propertyName;
    },

    /**
     * Hàm focus vào thẻ tr khi ấn nút xuống
     * Author: NVHThai (24/09/2022)
     */
    nextEleMoveFocus() {
      try {
        if (this.focusName < this.pageSize) {
          this.focusName = this.focusName + 1;
          document.getElementById(`asset${this.focusName}`).focus();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm focus vào thẻ tr khi ấn nút lên
     * Author: NVHThai (24/09/2022)
     */
    prevEleMoveFocus() {
      try {
        if (this.focusName > 0) {
          this.focusName = this.focusName - 1;
          document.getElementById(`asset${this.focusName}`).focus();
        }
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

  },
  data() {
    return {
      //tổng số bản ghi đc chọn
      totalCountAsset: null,
      //tiêu đề popup exception
      titleFormException: null,
      // Mã tài sản lưu tạm
      tmpPropertyCode: null,

      //tên tài sản lưu tạm
      tmpPropertyName: null,

      // id lưu tạm
      tmpID: null,

      // titile của thông báo thành công
      titleToastDone: "",

      // hiển thị combobox ở cuôi bảng
      isShowmComboboxPaging: false,

      // pagesize mặc định khi tải trang
      pageSize: 20,

      // trang mặc định khi tải trang
      pageNumber: 1,

      keword: "",
      departmentID: "",
      assetCategoryID: "",

      //Danh sách tài sản
      propertys: null,

      // Ẩn hiện form detail
      isShowDialog: false,
      // isShowmComboboxContent:true,
      // Ẩn hiện cbx phòng ban ỏ thanh toolbar
      isShowmComboboxContentDepartment: false,

      // Ẩn hiện cbx phòng ban ỏ thanh toolbar
      isShowmComboboxContentAssetType: false,

      // chọn tất cả cbbx
      selectAll: true,

      // id tài sản
      propertyIDSelected: "",

      // tiêu đề form details
      checkTitleForm: null,

      // loading khi tải dữ liệu
      isShowLoading: false,

      // biến để show popup khi click vào btn xóa
      isDialogToastDelete: false,

      // id để lấy id tài sản lớn nhất
      employeesID: null,

      // mảng để lưu id tài sản
      checkboxList: [],

      propertyCodeList: [],

      // hiển thị tooltip ở cbb
      isShowTooltipDepartment: false,
      isShowTooltipAssetType: false,

      // mảng lựa chọn pagesize
      listOptionPageSize: [10, 20, 50],

      // số bản ghi trong dữ liệu
      totalCount: null,

      // tổng số tiền
      totalCost: null,

      // tổng số tài sản
      totalQuantity: null,

      // tổng số hao mòn khấu hao
      totalLoss: null,

      // link api mã loại tài sản
      urlCategoryAsset: Resource.Url.CategoryAsset,

      //link api phòng ban
      urlDepartment: Resource.Url.Department,

      // mã tài sản
      ItemCodeCategoryAsset: Resource.ItemCode.ItemCodeCategoryAsset,

      //id tài sản
      ItemIDCategoryAsset: Resource.ItemID.ItemIDCategoryAsset,

      //mã phòng ban
      ItemCodeDepartment: Resource.ItemCode.ItemCodeDepartment,

      // id phòng ban
      ItemIDDepartment: Resource.ItemID.ItemIDDepartment,

      // tên phòng ban
      ItemNameDepartment: Resource.ItemName.ItemNameDepartment,

      // tên mã loại tài sản
      ItemNameCategoryAsset: Resource.ItemName.ItemNameCategoryAsset,

      // biến để show chỗ phân trang
      isShowThreeDot: true,
      isShowNextPage: true,
      isShowEndPage: true,

      // id của mã loại tài sản
      IDCategoryAsset: null,

      //id phòng ban
      IDDepartment: null,

      // biến show popup exception
      isShowToastException: false,

      //page hiện tại
      page: 2,

      // bảng trắng dữ liệu
      emptyTable: false,

      focusName: 0,

      valueID: null,
      // biến show khi backend trả về lỗi 400
      isShowDialogToastValid: false,
      //id tài sản trong contextmenu
      assetIDContext: "",

      //id tài sản để xóa trong contextmenu
      assetIDContextDelete: "",

      // disable nút toolbar
      disableBtn: false,

      // biến check khi có dữ liệu mới click được vào xóa và xuất khẩu
      checkDataNotNull: true,

      // Tọa độ chuột
      pageY: null,
      pageX: null,
      //id để focus
      asset: "asset",

      //text sử dụng 
      textBtnAdd: Resource.TextVi.List.BtnAdd,
      textSTT: Resource.TextVi.List.STT,
      textAssetCode: Resource.TextVi.List.AssetCode,
      textAssetName: Resource.TextVi.List.AssetName,
      textAssetCategoryName: Resource.TextVi.List.AssetCategoryName,
      textAssetDepartmentName: Resource.TextVi.List.AssetDepartmentName,
      textQuanlity: Resource.TextVi.List.Quanlity,
      textCost: Resource.TextVi.List.Cost,
      textLossCost: Resource.TextVi.List.LossCost,
      textRemaining: Resource.TextVi.List.Remaining,
      textTool: Resource.TextVi.List.Tool,
      textEmply: Resource.TextVi.List.Emply,
      textTotal: Resource.TextVi.List.Total,
      textRecord: Resource.TextVi.List.Record,
      textTolltipBtnAdd: Resource.TextVi.Tooltip.BtnAdd,
      textTolltipBtnExport: Resource.TextVi.Tooltip.BtnToolbarExport,
      textTolltipBtnDelete: Resource.TextVi.Tooltip.BtnToolbarDelete,
      textTolltipCheckboxAll: Resource.TextVi.Tooltip.CheckBoxAll,
      textTolltipSTT: Resource.TextVi.Tooltip.STT,
      textTolltipLossCost: Resource.TextVi.Tooltip.LossCost,
      textTolltipEdit: Resource.TextVi.Tooltip.Edit,
      textTolltipDuplicate: Resource.TextVi.Tooltip.Duplicate,
      textNext: Resource.TextVi.Tooltip.Next,
      textPrev: Resource.TextVi.Tooltip.Prev,
      textPInputSearch: Resource.TextVi.PlaceHolder.InputSearch,
      textPComboboxAssetCategory: Resource.TextVi.PlaceHolder.ComboboxAssetCategory,
      textPComboboxDepartment: Resource.TextVi.PlaceHolder.ComboboxDepartment,

    };
  },
};
</script>

<style>
@import url(../../css/details/propertylist.css);
@import url(../../css/common/customdatepicker.css);

.el-empty {
  background-color: #fff !important;
}
.empty {
  background-color: #fff !important;
}
</style>
