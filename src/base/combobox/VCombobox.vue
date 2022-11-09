<template>
  <div class="m-combobox" :class="css">
    <el-tooltip
      :content="nameInputs"
      placement="top"
      show-after="400"
      effect="customized"
      :disabled="nameInputs == null || nameInputs.trim() == ''"
    >
      <input
        id="inputcombobox"
        :type="type"
        class="combobox"
        :class="[className, { borderred: borderRed }]"
        :placeholder="placeholder"
        :value="showValue"
        :tabindex="tabindex"
        @click="btnOpenShowCombobox"
        @blur="hideContentCbbBlur()"
        @keydown.enter="btnOpenShowCombobox"
        @input="filterData(nameInputs)"
        @keydown.down="nextEleMove()"
        maxlength="100"
      />
    </el-tooltip>
    <div class="m-icon-dropdown" @click="btnOpenShowCombobox"></div>
    <!-- nội dung cbb -->
    <div
      class="m-combobox__content"
      :class="styleContent"
      v-show="isShowmComboboxContent"
    >
      <div class="m-border">
        <div
          :id="itemCode + index"
          :tabindex="tabindex"
          v-for="(item, index) in items"
          :key="item[itemID]"
          class="m-option-cbb max-line"
          @mousedown="onClickCbb(item[itemID], item[itemCode], item[itemName])"
          :class="{ active: item[itemCode] == this.nameInputs }"
          @keydown.down="nextEleMoveFocus()"
          @keydown.up="prevEleMoveFocus()"
          @keydown.enter="
            onClickCbb(item[itemID], item[itemCode], item[itemName])
          "
        >
          <el-tooltip
            :content="item[itemCode]"
            placement="top"
            show-after="400"
            effect="customized"
          >
            <span>{{ item[itemCode] }}</span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="message">
      <span v-show="checkDuplicate">Nguồn chi phí đã tồn tại!</span>
      <span v-show="validateEmpty">Không được bỏ trống ô này!</span>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "MCombobox",
  props: [
    "type",
    "className",
    "placeholder",
    "url",
    "itemID",
    "itemName",
    "itemCode",
    "tabindex",
    "css",
    "styleContent",
    "showValue",
    "checkSaveCbb",
    "tmpCheck",
    "index",
    "checkSaveValidate",
  ],
  emits: ["changeFalse","changeTrue"],

  created() {
    this.getDataCombobox();
  },
  watch: {
    checkSaveCbb: function () {
      this.$emit("changeTrue");
      if (this.tmpCheck[this.index] == "") {
        this.validateEmpty = true;
        this.borderRed = true;
        this.$emit("changeFalse");
      }
      else if (this.index > 0) {
        for (let i = 0; i < this.index; i++) {
          if (this.index != i) {
            if (this.tmpCheck[this.index] == this.tmpCheck[i]) {
              this.borderRed = true;
              this.checkDuplicate = true;
              this.$emit("changeFalse");
            }
          }
        }
      }
      this.$parent.deleteArrTmpCheck();
    },
  },

  methods: {
    nextEleMove() {
      document.getElementById(`${this.itemCode}${this.focus}`).focus();
      this.isShowmComboboxContent = true;
    },
    nextEleMoveFocus() {
      this.focus = this.focus + 1;
      document.getElementById(`${this.itemCode}${this.focus}`).focus();
    },
    prevEleMoveFocus() {
      if (this.focus > 0) {
        this.focus = this.focus - 1;
        document.getElementById(`${this.itemCode}${this.focus}`).focus();
      }
    },

    // addValueNameInput(e) {
    //   if (e.keyCode == 32 && this.nameInputs.trim() != "") {
    //     this.nameInputs = this.nameInputs + " ";
    //   }
    // },

    // filterData(value) {
    //   this.keword = value;
    //   this.getDataCombobox();
    //   if (value == "") {
    //     this.$emit(`update:${this.itemID}`, value);
    //     this.$parent.getDataAPI();
    //   }
    // },

    /**
     * Hàm hiện dữ liệu ở cbb loại tài sản
     * Author: NVHThai (19/09/2022)
     */
    onClickCbb(ID, code, name) {
      this.isShowmComboboxContent = false;
      this.nameInputs = code;
      try {
        this.$emit(`update:${this.itemID}`, ID);
        this.$emit(`update:budget_name`, code);
        this.$emit(`update:${this.itemName}`, name);
        this.focus = 0;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Author: nvhthai (01/09/2022)
     * Lấy dữ liệu cbb
     */
    getDataCombobox() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get("https://localhost:44380/api/v1/Budget")
          .then((response) => {
            me.items = response.data;
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào thì nội dung cbx hiện ra
     *  Author: NVHThai (08/09/2022)
     */
    btnOpenShowCombobox() {
      this.isShowmComboboxContent = !this.isShowmComboboxContent;
    },

    /**
     * Hàm blur thì sẽ ẩn form cbb
     * Author: NVHThai (14/09/2022)
     */
    hideContentCbbBlur() {
      this.isShowmComboboxContent = false;
    },
  },

  data() {
    return {
      isShowmComboboxContent: false,
      nameInputs: null,
      nameInput: null,
      keword: "",
      focus: 0,
      tmpData: [],
      emptyList: false,
      items: {},
      borderRed: false,
      validateEmpty: false,
      checkDuplicate:false
    };
  },
};
</script>
  
  <style scoped>
.max-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  /*số dòng muốn hiện */
  line-height: 36px;
}

.el-popper.is-customized {
  padding: 4px 6px;
  background: #fff;
  border: 1px solid #bbb;
  box-shadow: 0px 2px 2.5px 2px rgba(0, 0, 0, 0.168);
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #fff;
  right: 0;
  border: 1px solid #bbb;
}

.borderred {
  border: red 1px solid;
}
</style>
  