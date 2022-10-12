<template>
  <div class="m-combobox" :class="css">
    <el-tooltip :content="nameInputs" placement="top" show-after="400" effect="customized"
      :disabled="nameInputs == null || nameInputs.trim() == ''">
      <input id="inputcombobox" :type="type" class="combobox" :class="[className, { borderred: borderRed }]"
        :placeholder="placeholder" v-model="nameInputs" :tabindex="tabindex" @click="btnOpenShowCombobox"
        @blur="validateInputBlur(nameInputs)" @keydown="addValueNameInput($event)" @keydown.enter="btnOpenShowCombobox"
        @input="filterData(nameInputs)" @keydown.down="nextEleMove()" />
    </el-tooltip>
    <div class="btn_combobox">
      <div class="m-icon-dropdown"></div>
    </div>
    <!-- nội dung cbb -->
    <div class="m-combobox__content" :class="styleContent" v-show="isShowmComboboxContent">
      <div class="m-border">
        <div :id="itemCode + index" :tabindex="tabindex" v-for="(item, index) in items" :key="item[itemID]"
          class="m-option-cbb max-line" @mousedown="
            onClickCbb(
              item[itemID],
              item[itemCode],
              item[itemName],
              item.depreciation_rate,
              item.life_time
            )
          " :class="{ active: item[itemCode] == this.nameInputs }" @keydown.down="nextEleMoveFocus()"
          @keydown.up="prevEleMoveFocus()" @keydown.enter="
            onClickCbb(
              item[itemID],
              item[itemCode],
              item[itemName],
              item.depreciation_rate,
              item.life_time
            )
          ">
          <el-tooltip :content="item[itemCode]" placement="top" show-after="400" effect="customized">
            <span>{{ item[itemCode] }}</span>
          </el-tooltip>
        </div>

        <div class="null" v-if="emptyList">
          <div class="description">Không có dữ liệu</div>
        </div>
      </div>
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
    "depreciation_rate",
    "life_time",
    "url",
    "itemID",
    "itemName",
    "itemCode",
    "tabindex",
    "css",
    "styleContent",
    "showValue",
    "checkInputValidate",
    "nameAsset",
  ],
  created() {
    // lấy dữ liệu từ api cho cbx
    this.getDataCombobox();
  },
  updated() {
    /**
     * Khi điền thông tin vào input thì sẽ hết border đỏ
     * Author: NVHThai (21/09/2022)
     */
    if (this.nameInputs) {
      this.borderRed = false;
    }
  },

  watch: {
    /**
     * Hàm theo dõi các mã: nếu thay đổi thì hiển thị lên input
     * Author: NVHThai (25/09/2022)
     * @param {string} value
     */
    showValue: function (value) {
      this.nameInputs = value;
    },

    /**
     * Hàm theo dõi khi mà click vào nút lưu thì validate dữ liệu
     * @param {boolean} value: nếu value là true thì đã ấn lưu
     * Author: NVHThai (30/09/2022)
     */
    checkInputValidate: function (value) {
      if (value == true && this.nameInputs != "0") {
        if (this.nameInputs == null || this.nameInputs == "") {
          this.borderRed = true;
        }
      }
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
    addValueNameInput(e) {
      if (e.keyCode == 32 && this.nameInputs.trim() != "") {
        this.nameInputs = this.nameInputs + " ";
      }
    },
    filterData(value) {
      this.keword = value;
      this.getDataCombobox();

      if (value == "") {
        this.$emit(`update:${this.itemID}`, value);
        this.$parent.getDataAPI();
      }
    },

    /**
     * validate dữ liệu
     * Author: NVHThai (21/09/2022)
     */
    validateInputBlur(nameInputs) {
      if (!nameInputs) {
        this.borderRed = true;
      }
      this.isShowmComboboxContent = false;
    },

    /**
     * Hàm hiện dữ liệu ở cbb loại tài sản
     * Author: NVHThai (19/09/2022)
     */
    onClickCbb(ID, code, name, depreciationRate, lifeTime) {
      this.isShowmComboboxContent = false;
      this.nameInputs = code;

      try {
        this.$emit(`update:${this.itemID}`, ID);
        this.$emit(`update:${this.itemCode}`, code);
        this.$emit(`update:${this.itemName}`, name);
        this.$emit(`update:depreciation_rate`, depreciationRate);
        this.$emit(`update:life_time`, lifeTime);
        this.$parent.changeValueLossYear();
        this.$parent.sloveDepreciationRateToString();
        this.focus = 0;
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

    /**
     * Author: nvhthai (01/09/2022)
     * Lấy dữ liệu cbb
     */
    getDataCombobox() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .get(`${this.url}?keyword=${me.keword}`)
          .then((response) => {
            me.items = response.data;
            me.dataList = response.data;
            if (me.dataList.length == 0) {
              this.emptyList = true;
            } else {
              this.emptyList = false;
            }
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
      isShowmComboboxContent: false,
      nameInputs: null,
      nameInput: null,
      borderRed: false,
      dataList: [],
      keword: "",
      focus: 0,
      tmpData: [],
      emptyList: false,
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

.null{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
