<template>
  <div class="m-toast-main">
    <div class="m-dialog-toast-attention-edit">
      <div class="m-dialog-toast__attention-edit">
        <div class="m-dialog-toast__attention--content m-icon-warning">
          <span>{{text}}</span>
        </div>

        <div id="content-btn" class="m-dialog-toast__attention--btn">
          <div id="btnTmp" tabindex="206"></div>
          <div class="btn btn__outline" id="btnClose" tabindex="207" @keydown.enter="btnDetroyToastEdit()"
            v-on:click="btnDetroyToastEdit()">
            {{textBtnClose}}
          </div>
          <div class="ml-8 btn btn__sub" tabindex="208" @keydown.enter="btnNotSaveToastEdit()"
            v-on:click="btnNotSaveToastEdit()">
            {{textBtnNotSave}}
          </div>
          <div class="ml-8 btn" tabindex="209" @keydown.enter="btnSaveToastEdit()" @keydown.tab="loopTabIndex"
            v-on:click="btnSaveToastEdit()">
           {{textBtnSave}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Enum from "../../lib/enum.js";
import Resource from "@/lib/resource";
export default {
  name: "ToastMessageEdit",
  props: ["checkTitleForm"],
  mounted() {
    try {
      document.getElementById("btnClose").focus();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Focus vòng tròn để không ra khỏi component
     * Author: NVHThai (05/10/2022)
     */
    loopTabIndex() {
      try {
        document.getElementById("btnTmp").focus();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * click vào nút hủy bỏ trong toast thì đóng cả form add và toast
     * Author: NVHThai (19/09/2022)
     */
    btnDetroyToastEdit() {
      try {
        this.$parent.detroyToastAttentionEdit();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * click vào nút không lưu trong toast thì đóng toast
     * Author: NVHThai (19/09/2022)
     */
    btnNotSaveToastEdit() {
      try {
        this.$parent.closeToastAttentionEdit();
        this.$parent.changeCheckInputValidate();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm lưu dữ liệu vào db khi sửa dữ liệu từ form
     * Author: NVHThai (27/09/2022)
     */
    btnSaveToastEdit() {
      try {
        switch (this.checkTitleForm) {
          case Enum.FormMode.Edit:
            this.$parent.handleInsertData();
            this.$parent.putApiProperty();
            break;
          case Enum.FormMode.Duplicate:
            this.$parent.handleInsertData();
            this.$parent.postApiProperty();
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },


  data() {
    return {
      text:Resource.TitleToast.TitleFormEdit,
      textBtnClose:Resource.TitleToast.Detroy,
      textBtnNotSave:Resource.TitleToast.NotSave,
      textBtnSave:Resource.TitleToast.Save,

    }
  },
};
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>
