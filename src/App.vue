<template>
  <TheMenu />
  <div class="m-view" :style="styleView">
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheMenu from "../src/components/TheMenu.vue";
import TheHeader from "../src/components/TheHeader.vue";
import TheContent from "../src/components/TheContent.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./lib/state/state.js";
export default {
  name: "App",
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

<style>
@import url(./css/common/common.css);
</style>
