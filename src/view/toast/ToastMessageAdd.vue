<template>
  <div class="m-toast-main">
    <div class="m-dialog-toast-attention-add">
      <div class="m-dialog-toast__attention-add">
        <div class="m-dialog-toast__attention--content m-icon-warning">
          <span>Bạn có muốn hủy bỏ khai báo tài sản này?</span>
        </div>

        <div class="m-dialog-toast__attention--btn">
          <div
            class="btn btn__outline"
            id="btnClose"
            tabindex="201"
            @keydown.enter="btnCloseToastnAddOnclick"
            v-on:click="btnCloseToastnAddOnclick()"
          >
            Không
          </div>
          <div
            class="ml-8 btn"
            tabindex="202"
            @keydown.enter="btnDetroyToastAddOnclick"
            v-on:click="btnDetroyToastAddOnclick()"
          >
            Hủy bỏ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastMessageAdd",
  props: ["isDialogToastAttentionAdd", "isDialogToastAttentionEdit"],

  mounted() {
    document.getElementById("btnClose").focus();
  },

  methods: {
    /**
     * Hàm nếu click vào pupup hủy thì sẽ đóng cả form add
     * Author: NVHThai (09/09/2022)
     */
    btnDetroyToastAddOnclick() {
      this.$parent.btnDetroyToastAttentionAddOnclick();
    },

    /**
     * Hàm đóng popup nhưng vẫn giữ lại form add để tiếp tục nhập dữ liệu
     * Author: NVHThai (09/09/2022)
     */
    btnCloseToastnAddOnclick() {
      this.$parent.btnCloseToastAttentionAddOnclick();
      this.$parent.inputFocus();
    },
  },
};
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
</style>
