<template>
    <div class="m-content-main">
        <PropertyList />
    </div>
</template>

<script>
import PropertyList from '@/view/property/PropertyList.vue';

export default {
    components: { PropertyList,  },
}


</script>

<style scoped>
@import url(../css/components/content.css);
</style>