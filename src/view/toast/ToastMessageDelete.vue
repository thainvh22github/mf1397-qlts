<template>
  <div class="m-toast-main">
    <div class="m-dialog-toast-attention-delete">
      <div class="m-dialog-toast__attention-delete">
        <div
          v-if="isShowAsset"
          class="m-dialog-toast__attention--content m-icon-warning"
        >
          <div v-if="checkContextMenu" class="text">
            <span style="font-weight: 200" v-show="show">{{
              titleFormDelete
            }}</span>
            <span v-show="show">&nbsp;{{ assetCode }} - {{ assetName }}?</span>
            <span style="font-weight: 200" v-show="show">{{
              titleFormLicense
            }}</span>
          </div>

          <div v-else class="text">
            <span v-show="ishows">{{ total }}</span> {{ titleFormDelete }}
            <span v-show="ishow"> {{ assetCode }} - {{ assetName }}?</span>
            <span v-show="ishows"> </span>
          </div>
        </div>

        <div
          v-if="isShowLicense"
          class="m-dialog-toast__attention--content m-icon-warning"
        >
          <div class="text">
            <span style="font-weight: 200">{{ titleFormDelete }}</span>
            <span>&nbsp;{{ code }}</span
            >?
          </div>
        </div>
        <div class="m-dialog-toast__attention--btn">
          <div tabindex="203" id="tmp"></div>
          <div
            class="btn btn__outline"
            tabindex="204"
            id="btnClose"
            @keyup.enter="btnCloseToastDeleteOnclick()"
            @click="btnCloseToastDeleteOnclick()"
          >
            {{ textBtnClose }}
          </div>
          <div
            class="ml-8 btn"
            tabindex="205"
            @keydown.tab="loopFocus()"
            @keyup.enter="btnDelete()"
            @click="btnDelete()"
          >
            {{ textBtnDelete }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
import Resource from "@/lib/resource";

export default {
  name: "ToastMessageDelete",
  props: [
    "checkboxList",
    "tmpPropertyName",
    "tmpPropertyCode",
    "titleFormDelete",
    "totalCountAsset",
    "assetIDContextDelete",
    "checkContextMenu",
    "isShowAsset",
    "isShowLicense",
    "code",
    "id",
    "titleFormLicense"
  ],
  computed: {
    /**
     * Hàm kiểm tra totalCountAsset có < 10 không? nếu < 10 thì thêm số 0 ở trước
     * Author: NVHThai (27/09/2022)
     */
    total: function () {
      let total = this.totalCountAsset;
      total = total < 10 ? `0${total}` : total;
      return total;
    },

    /**
     * Hàm kiểm tra totalCountAsset = 1 không? nếu = 1 thì mở title xóa 1 tài sản
     * Author: NVHThai (27/09/2022)
     */
    ishow: function () {
      if (this.totalCountAsset == 1) {
        return true;
      }
      return false;
    },

    /**
     * Hàm kiểm tra totalCountAsset > 1 không? nếu > 1 thì mở title xóa nhiều tài sản
     * Author: NVHThai (27/09/2022)
     */
    ishows: function () {
      if (this.totalCountAsset > 1) {
        return true;
      }
      return false;
    },

    show: function () {
      if (this.checkContextMenu == true) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    this.assetCode = this.tmpPropertyCode;
    this.assetName = this.tmpPropertyName;
    /**
     * Focus vào btnClose khi mở form add
     * Author: NVHThai
     */
    try {
      document.getElementById("btnClose").focus();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Focus vòng tròn
     * Author: NVHThai (09/10/2022)
     */
    loopFocus() {
      try {
        document.getElementById("tmp").focus();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào nút hủy thì popup delete đóng form pop up
     * Author: NVHThai (09/09/2022)
     */
    btnCloseToastDeleteOnclick() {
      try {
        if (this.isShowAsset) {
          this.$parent.btnCloseToastDeleteOnclick();
          this.$parent.onChangeCheckContextMenu();
        } else if (this.isShowLicense) {
          this.$parent.hideToastDelete();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa tài sản
     * Author: NVHThai
     */
    btnDelete() {
      try {
        if (this.isShowAsset) {
          if (this.assetIDContextDelete) {
            this.deleteDataPropertyApi(this.assetIDContextDelete);
          } else if (this.totalCountAsset == 1) {
            let deleteID = this.checkboxList[0].fixed_asset_id;
            this.deleteDataPropertyApi(deleteID);
          } else {
            for (let i = 0; i < this.checkboxList.length; i++) {
              this.listAsset.push(this.checkboxList[i].fixed_asset_id);
            }
            this.deleteMultiDataPropertyApi();
          }
          this.$parent.deleteDataInCheckboxList(); // xóa hết dữ liệu trong mảng
          this.$parent.onChangeCheckContextMenu();
        } else if (this.isShowLicense) {
          this.deleteLicense();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa 1 chứng từ
     * Author: NVHThai (25/10/2022)
     */
    deleteLicense() {
      let me = this;
      me.isShowLoading = true;

      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .delete(`https://localhost:44380/api/License/${me.id}`)
          .then((response) => {
            console.log(response);

            this.$parent.hideToastDelete();

            //tải lại dữ liệu
            this.$parent.getDataLicense();

            me.isShowLoading = false;

            // hiện thông báo thêm thành công
            ElNotification({
              duration: 1500,
              message: `Xóa chứng từ thành công`,
              position: "bottom-right",
              type: "success",
            });
          })
          .catch((response) => {
            console.log("erorr: ", response);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa 1 tài sản
     * Author: NVHThai (20/09/2022)
     */
    deleteDataPropertyApi(deleteID) {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .delete(`${Resource.Url.Asset}/${deleteID}`)
          .then(() => {
            //tải lại trang
            me.$parent.getDataAPI();

            // đóng popup hỏi có xóa không?
            this.$parent.btnCloseToastDeleteOnclick();

            // thông báo xóa thành công
            ElNotification({
              duration: 1500,
              message: "Xóa dữ liệu thành công",
              position: "bottom-right",
              type: "success",
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xóa nhiều tài sản
     * Author: NVHThai (20/09/2022)
     */
    deleteMultiDataPropertyApi() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .post(Resource.Url.Deletes, me.listAsset)
          .then((response) => {
            //tải lại trang
            me.$parent.getDataAPI();

            // đóng popup hỏi có xóa không?
            this.$parent.btnCloseToastDeleteOnclick();

            // thông báo xóa thành công
            ElNotification({
              duration: 1500,
              message: `${response.data} tài sản xóa thành công`,
              position: "bottom-right",
              type: "success",
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      textBtnClose: Resource.TitleToast.No,
      textBtnDelete: Resource.TitleToast.Delete,
      assetCode: null,
      assetName: null,
      listAsset: [],
    };
  },
};
</script>

<style scoped>
.text {
  padding-left: 50px;
}

.text span {
  padding-left: 0 !important;
  font-weight: 700;
}

.m-dialog-toast__attention-delete {
  width: 450px;
  left: calc(50% - 225px);
}
</style>
