<template>
  <div class="m-toast-main">
    <div class="m-dialog-toast-attention-add">
      <div class="m-dialog-toast__attention-add">
        <div class="m-dialog-toast__attention--content m-icon-warning">
          <span>{{text}}</span>
        </div>

        <div class="m-dialog-toast__attention--btn">
          <div id="btnTmp" tabindex="200"></div>
          <div class="btn btn__outline" id="btnClose" tabindex="201" @keydown.enter="btnCloseToastnAddOnclick"
            v-on:click="btnCloseToastnAddOnclick()">
            {{textBtnClose}}
          </div>
          <div class="ml-8 btn" @keydown.tab="loopFocus()" tabindex="202" @keydown.enter="btnDetroyToastAddOnclick"
            v-on:click="btnDetroyToastAddOnclick()">
            {{textBtnDetroy}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/lib/resource";
export default {
  name: "ToastMessageAdd",
  props: ["isDialogToastAttentionAdd", "isDialogToastAttentionEdit"],

  mounted() {
    /**
     * Focus vào nút close
     * Author: NVHThai (09/10/2022)
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
    loopFocus(){
      document.getElementById("btnTmp").focus();
    },

    /**
     * Hàm nếu click vào pupup hủy thì sẽ đóng cả form add
     * Author: NVHThai (09/09/2022)
     */
    btnDetroyToastAddOnclick() {
      try {
        this.$parent.btnDetroyToastAttentionAddOnclick();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu
     * Author: NVHThai (09/09/2022)
     */
    btnCloseToastnAddOnclick() {
      try {
        this.$parent.btnCloseToastAttentionAddOnclick();
        this.$parent.changeCheckInputValidate();
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      text:Resource.TitleToast.TitleFormAdd,
      textBtnClose:Resource.TitleToast.No,
      textBtnDetroy:Resource.TitleToast.Detroy
    }
  },
};
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>
