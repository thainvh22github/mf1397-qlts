<template>
    <div class="m-menu" :style="{ width: sidebarWidth }">
        <div class="m-sidebar">

            <div class="m-logo" style="margin-top: 11px; margin-bottom: 15px;">
                <span v-if="collapsed" style="display: flex; align-items: center;">
                    <div class="m-icon-logo"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="m-icon-logo"></div>
                    <span style="color: #fff; font-size: 20px;margin-left: 11px; font-weight: 800;">MISA QLTS</span>
                </span>
            </div>



            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-overview"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-overview"></div>
                    <div>Tổng quan</div>
                </span>
            </div>

            <div class="m-option active">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-prorety"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-prorety"></div>
                    <div>Tài sản</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-proretyhtdb"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-proretyhtdb"></div>
                    <div>Tài sản HT-DB</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-tool"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-tool"></div>
                    <div>Công cụ dụng cụ</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-category"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-category"></div>
                    <div>Danh mục</div>
                </span>
            </div>

            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-search"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-search"></div>
                    <div>Tra cứu</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>
            <div class="m-option">
                <span v-if="collapsed">
                    <div class="ml-13 m-icon-report"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-report"></div>
                    <div>Báo cáo</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>


        </div>
        <div class="m-btn-sidebar">
            <button class="btn-sidebar" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
                <div class="m-icon-sidebar"></div>
            </button>
        </div>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from '../state/state';

export default {

    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    }
}
</script>

<style scoped>
@import url(../css/components/menu.css);
</style>