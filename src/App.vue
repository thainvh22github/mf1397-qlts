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
  @import url(./css/common/common.css)
</style>
