<template>
  <div>
    <input
      :type="type"
      class="input"
      :class="[className, { borderred: borderRed }]"
      :placeholder="placeholder"
      :tabindex="tabindex"
      :value="formartNumber(a)"
      @input="changeModelValue($event, modelValue)"
      @blur="validateInputBlur()"
      :style="style"
      :id="focusInput"
    />
    <div class="message">
      <span v-show="borderRed">Không được để trống ô này!</span>
    </div>
  </div>
</template>

<script>
import BaseMethod from "@/lib/baseMethod";
export default {
  name: "MInput",
  props: [
    "type",
    "className",
    "placeholder",
    "tabindex",
    "modelValue",
    "style",
    "checkInputValidate",
    "messageValid",
    "nameAsset",
    "checkSaveCbb",
  ],
  mounted() {
    this.a = this.modelValue;
  },
  updated() {
    /**
     * Khi điền thông tin vào input thì sẽ hết border đỏ
     * Author: NVHThai (21/09/2022)
     */
    if (this.modelValue) {
      this.borderRed = false;
    }

    if (BaseMethod.checkValidEmpty(this.modelValue)) {

      if (this.modelValue && typeof(this.modelValue) == "string") {
        this.a = this.modelValue.replace(/[^0-9]/g, "");
      } else {
        this.a = this.modelValue;
      }
    }
  },
  watch: {
    /**
     * Hàm theo dõi khi mà click vào nút lưu thì validate dữ liệu
     * @param {boolean} value: nếu value là true thì đã ấn lưu
     * Author: NVHThai (30/09/2022)
     */
    checkSaveCbb: function (value) {
      if (value == true && this.modelValue != "0") {
        if (this.modelValue == null || this.modelValue == "") {
          this.borderRed = true;
        }
      }
    },
  },
  methods: {
    changeModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    /**
     * Hàm formart số
     * Author: NVHTHai (12/09/2022)
     * @param {int} number
     */
    formartNumber(number) {
      return BaseMethod.formartNumber(number);
    },
    /**
     * validate dữ liệu
     * Author: NVHThai (21/09/2022)
     */
    validateInputBlur() {
      if (this.modelValue != "0") {
        if (this.modelValue == null || this.modelValue == "") {
          this.borderRed = true;
        }
      }
    },
  },

  data() {
    return {
      borderRed: false,
      a: null,
    };
  },
};
</script>

<style scoped>
</style>
