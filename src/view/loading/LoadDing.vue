<template>
    <div class="m-dialog-loading">
        <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-text">{{text}}</div>
        </div>
    </div>
</template>

<script>
import Resource from "@/lib/resource";
export default {
    name:'LoadDing',
    data() {
        return {
            text:Resource.TextVi.Loading,
        }
    },
}
</script>
