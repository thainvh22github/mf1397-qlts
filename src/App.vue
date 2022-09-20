<template>
    <TheMenu />
    <div class="m-view">
        <TheHeader />
        <TheContent />
    </div>
</template>

<script>
import TheMenu from './components/TheMenu.vue';
import TheHeader from './components/TheHeader.vue';
import TheContent from './components/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    TheContent
}
}
</script>

<style>
  @import url(./css/common/common.css);
  @import url(../node_modules/@syncfusion/ej2-base/styles/material.css);
  @import url(../node_modules/@syncfusion/ej2-vue-popups/styles/material.css);
</style>
