<template>
    <div class="m-header">
        <div class="m-text-title">Danh sách tài sản</div>

        <div class="m-header__rigth">
            <div class="m-text-header">Sở tài chính</div>
            <div class="ml-20 m-combobox-year">
                <span>Năm</span>
                <input type="text" value="2021">
                <div class="m-drop">
                    <button class="btn__up">
                        <div class="m-icon-dropup"></div>
                    </button>
                    <button class="btn__down">
                        <div class="m-icon-down"></div>
                    </button>
                </div>
            </div>
            <div class="ml-20 m-icon-notification m-notification"></div>
            <div class="ml-20 m-icon-toggle m-toggle"></div>
            <div class="ml-20 m-icon-question m-question"></div>
            <div class="ml-20 m-icon-infomation m-infomation"></div>
            
            <button class="ml-8 btn-dropdown">
                <div class="m-icon-dropdown"></div>
            </button>
        </div>


    </div>
</template>

<script>
export default {
    methods: {
       
    },
}
</script>

<style scoped>
@import url(../css/components/header.css);
</style>