<template>
    <div class="m-toast-main">
      <div class="m-dialog-toast-attention-delete">
        <div class="m-dialog-toast__attention-delete">
          <div class="m-dialog-toast__attention--content m-icon-warning">
            <div class="text">
              <span v-show="ishow"> {{ tmpPropertyCode }} - {{ tmpPropertyName }}?</span>
              <span v-show="ishows"> </span>
            </div>
          </div>
          <div class="m-dialog-toast__attention--btn">
            <div tabindex="203" id="tmp"></div>
            <div class="btn btn__outline" tabindex="204" id="btnClose" @keyup.enter="btnCloseToastDeleteOnclick()"
              @click="btnCloseToastDeleteOnclick()">{{textBtnClose}}</div>
            <div class="ml-8 btn" tabindex="205" @keydown.tab="loopFocus()" @keyup.enter="btnDelete()"
              @click="btnDelete()">
              {{textBtnDelete}}</div>
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
      "tmpContextPropertyName",
      "tmpContextPropertyCode",
      "titleContextFormDelete",
      "totalCContextountAsset",
      "assetIDContextDelete",
    ],
    computed: {
      /**
       * Hàm kiểm tra totalCountAsset = 1 không? nếu = 1 thì mở title xóa 1 tài sản
       * Author: NVHThai (27/09/2022)
       */
      ishow: function () {
        if (this.totalCountAsset == 1 || this.assetIDContextDelete) {
          return true;
        }
        return false;
      },
    },
    mounted() {
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
          this.$parent.btnCloseToastDeleteOnclick();
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
          if (this.assetIDContextDelete) {
            this.deleteDataPropertyApi(this.assetIDContextDelete);
          }
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
    },
  
    data() {
      return {
        textBtnClose: Resource.TitleToast.No,
        textBtnDelete: Resource.TitleToast.Delete
      }
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
  