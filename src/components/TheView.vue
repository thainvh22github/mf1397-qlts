<template>
  <TheMenu/>
  <div class="m-view" :style="styleView">
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheMenu from "./TheMenu.vue";
import TheHeader from "./TheHeader.vue";
import TheContent from "./TheContent.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "../lib/state/state";

export default {
  name: "TheView",
  components: {
    TheMenu,
    TheHeader,
    TheContent,
  },

  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  watch: {
    collapsed: function () {
      if (this.sidebarWidth == "200px") {
        this.styleView = "width: calc(100% - 200px);";
      } else {
        this.styleView = "width: 100%";
      }
    },
  },


  data() {
    return {
      styleView: "",
    };
  },
};
</script>

<style scoped>
@import url(../css/common/common.css);
</style>