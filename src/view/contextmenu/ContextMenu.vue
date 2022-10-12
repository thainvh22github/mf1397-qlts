<template>
  <div class="context-menu" :style="styleContext">
    <div class="btn btn-context btn-context-add" @click="openAdd()">
      <div class="icon-context m-icon-add"></div>
      <div class="text">Thêm tài sản</div>
    </div>
    <div class="btn btn-context" @click="openEdit()">
      <div class="icon-context m-icon-edit"></div>
      <div class="text">Sửa tài sản</div>
    </div>
    <div class="btn btn-context" @click="openDulicate()">
      <div class="icon-context m-icon-duplicate"></div>
      <div class="text">Nhân bản tài sản</div>
    </div>
    <div class="btn btn-context btn-context-delelte" @click="deleteContext()">
      <div class="icon-context m-icon-delete"></div>
      <div class="text">Xóa tài sản</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: ["assetIDContext", "pageY", "pageX","tmpPropertyCode"],

  watch: {
    /**
     * Hàm tính toán tọa độ cho context menu
     * Author: NVHThai (08/10/2022)
     */
    pageX: function () {
      try {
        if (this.pageY > 430 && this.pageX < 1200) {
          this.styleContext = `top: ${this.pageY - 176}px; left:${this.pageX}px;`;
        } else if (this.pageY > 430 && this.pageX > 1200) {
          this.styleContext = `top: ${this.pageY - 176}px; left:${this.pageX - 160}px;`;
        } else if (this.pageY < 430 && this.pageX > 1200) {
          this.styleContext = `top: ${this.pageY}px; left:${this.pageX - 160}px;`;
        } else {
          this.styleContext = `top: ${this.pageY}px; left:${this.pageX}px;`;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    /**
     * Hàm click vào nút thêm tài sản ở contextmenu
     * Author: NVHThai (08/10/2022)
     */
    openAdd() {
      try {
        this.$parent.btnOpenFormAddOnclick();
        this.$parent.hideContextMenu();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào nút sửa tài sản ở contextmenu
     * Author: NVHThai (08/10/2022)
     */
    openEdit() {
      try {
        this.$parent.editPropertyOnclick(this.assetIDContext, this.tmpPropertyCode);
        this.$parent.hideContextMenu();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào nút nhân bản tài sản ở contextmenu
     * Author: NVHThai (08/10/2022)
     */
    openDulicate() {
      try {
        this.$parent.duplicatePropertyOnclick(this.assetIDContext);
        this.$parent.hideContextMenu();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm click vào nút xóa tài sản ở contextmenu
     * Author: NVHThai (08/10/2022)
     */
    deleteContext() {
      try {
        this.$parent.deleteByID(this.assetIDContext);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      styleContext: "",
    };
  },
};
</script>

<style scoped>
.context-menu {
  z-index: 1;
  position: fixed;
  left: 11px;
  width: 160px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.165);
  background-color: #fff;
  height: 176px;
  animation-name: example;
  animation-duration: 0.8s;
}
@keyframes example {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.icon-context {
  height: 17px;
  width: 24px;
}

.btn-context {
  height: 36px;
  background-color: #fff;
  color: black;
  justify-content: left !important;
  border-radius: 0px;
  box-shadow: none;
}

.btn-context-add {
  margin-top: 16px;
}

.btn-context-delete {
  margin-bottom: 16px;
}

.btn-context:hover {
  background-color: #d1edf4;
}
</style>
