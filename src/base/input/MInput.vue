<template>
  <input :type="type" class="input" :class="[className, { borderred: borderRed }]" :placeholder="placeholder"
    :tabindex="tabindex" :value="modelValue" @input="(event) => $emit('update:modelValue', event.target.value)"
    @blur="validateInputBlur()" :style="style" :id="focusInput" />
</template>

<script>
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
    "focusInput"
  ],
  mounted() {
    this.focusInputs();
  },
  updated() {
    /**
     * Khi điền thông tin vào input thì sẽ hết border đỏ
     * Author: NVHThai (21/09/2022)
     */
    if (this.modelValue) {
      this.borderRed = false;
    }
  },
  watch: {
    /**
     * Hàm theo dõi khi mà click vào nút lưu thì validate dữ liệu
     * @param {boolean} value: nếu value là true thì đã ấn lưu
     * Author: NVHThai (30/09/2022)
     */
    checkInputValidate: function (value) {
      if (value == true && this.modelValue != "0") {
        if (this.modelValue == null || this.modelValue == "") {
          this.borderRed = true;
          
        }
      }

      this.focusInputs();
    },
  },
  methods: {
    /**
    * focus vào thẻ đầu tiên
    * Author: NVHThai (09/09/2022)
    */
    focusInputs() {
      if (this.focusInput) {
        document.getElementById(`${this.focusInput}`).focus();
      }
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
    };
  },
};
</script>

<style scoped>

</style>
