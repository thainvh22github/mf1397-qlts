<template>
    <div class="m-menu" :style="{ width: sidebarWidth }">
        <div class="m-sidebar">

            <div class="m-logo" style="margin-bottom: 15px;">
                <span v-if="collapsed" style="display: flex; align-items: center;">
                    <div class="m-icon-logo"></div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="m-icon-logo"></div>
                    <span style="color: #fff; font-size: 20px;margin-left: 11px; font-weight: 800;">MISA QLTS</span>
                </span>
            </div>
            <div class="m-option" @mouseover="overViewMouseOver" @mouseleave="overViewMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13"
                        :class="{miconoverview: miconoverview, miconoverviewactive: miconoverviewactive}">
                        <span class="tooltiptext-arrow">Tổng quan</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13"
                        :class="{miconoverview: miconoverview, miconoverviewactive: miconoverviewactive}"></div>
                    <div>Tổng quan</div>
                </span>
            </div>

            <div class="m-option active">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13 m-icon-prorety">
                        <span class="tooltiptext-arrow">Tài sản</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13 m-icon-prorety"></div>
                    <div>Tài sản</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option" @mouseover="ProretyhtdbMouseOver" @mouseleave="ProretyhtdbMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13"
                        :class="{miconproretyhtdb: miconproretyhtdb, miconproretyhtdbactive: miconproretyhtdbactive}">
                        <span class="tooltiptext-arrow">Tài sản hạ tầng đường bộ</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13"
                        :class="{miconproretyhtdb: miconproretyhtdb, miconproretyhtdbactive: miconproretyhtdbactive}">
                    </div>
                    <div>Tài sản HT-DB</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option" @mouseover="toolMouseOver" @mouseleave="toolMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13" :class="{micontool: micontool, micontoolactive: micontoolactive}">
                        <span class="tooltiptext-arrow">Công cụ dụng cụ</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13" :class="{micontool: micontool, micontoolactive: micontoolactive}"></div>
                    <div>Công cụ dụng cụ</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>

            <div class="m-option" @mouseover="categoryMouseOver" @mouseleave="categoryMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13"
                        :class="{miconcategory: miconcategory, miconcategoryactive: miconcategoryactive}">
                        <span class="tooltiptext-arrow">Danh mục</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13"
                        :class="{miconcategory: miconcategory, miconcategoryactive: miconcategoryactive}"></div>
                    <div>Danh mục</div>
                </span>
            </div>

            <div class="m-option" @mouseover="searchMouseOver" @mouseleave="searchMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13"
                        :class="{miconsearch: miconsearch, miconsearchactive: miconsearchactive}">
                        <span class="tooltiptext-arrow">Tra cứu</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13" :class="{miconsearch: miconsearch, miconsearchactive: miconsearchactive}"></div>
                    <div>Tra cứu</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>
            <div class="m-option" @mouseover="reportMouseOver" @mouseleave="reportMouseLeave">
                <span v-if="collapsed">
                    <div class="tooltip-arrow ml-13"
                        :class="{miconreport: miconreport, miconreportactive: miconreportactive}">
                        <span class="tooltiptext-arrow">Báo cáo</span>
                    </div>
                </span>
                <span v-else style="display: flex; align-items: center;">
                    <div class="ml-13" :class="{miconreport: miconreport, miconreportactive: miconreportactive}"></div>
                    <div>Báo cáo</div>
                    <div class="m-icon-dropdown-menu"></div>
                </span>
            </div>
        </div>

        <div class="m-btn-sidebar">

            <el-tooltip :disabled="disabled" :content="textTooltipSidebar" placement="top" show-after="400" effect="customized">
                <button class="btn-sidebar" @click="toggleSidebar">
                    <div class="m-icon-sidebar" style="width: 14px; height: 14px;" :class="{ 'rotate-180': collapsed }"></div>
                </button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from '../lib/state/state.js';
import Resource from '@/lib/resource';
export default {
    name: "TheMenu",
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    },
    watch: {
        collapsed: function (value) {
            console.log(value);
            if (value) {
                this.textTooltipSidebar = Resource.State.Zoom;
            } else {
                this.textTooltipSidebar = Resource.State.UnZoom;
            }
        }
    },

    methods: {
        /**
         * Hover vào thay đổi icon tổng quát 
         * Author NVHThai (14/09/2022)
         */
        overViewMouseOver() {
            this.miconoverviewactive = true;
            this.miconoverview = false;
        },

        /**
         * Hover vào thay đổi icon tổng quát trở về default
         * Author NVHThai (14/09/2022)
         */
        overViewMouseLeave() {
            this.miconoverviewactive = false;
            this.miconoverview = true;
        },

        /**
         * Hover vào thay đổi icon tài sản HTDB
         * Author NVHThai (14/09/2022)
         */
        ProretyhtdbMouseOver() {
            this.miconproretyhtdb = false;
            this.miconproretyhtdbactive = true;
        },

        /**
         * Hover vào thay đổi icon tài sản HTDB trở về default
         * Author NVHThai (14/09/2022)
         */
        ProretyhtdbMouseLeave() {
            this.miconproretyhtdb = true;
            this.miconproretyhtdbactive = false;
        },

        /**
        * Hover vào thay đổi icon công cụ dụng cụ
        * Author NVHThai (14/09/2022)
        */
        toolMouseOver() {
            this.micontool = false;
            this.micontoolactive = true;
        },

        /**
        * Hover vào thay đổi icon công cụ dụng cụ trở về default
        * Author NVHThai (14/09/2022)
        */
        toolMouseLeave() {
            this.micontool = true;
            this.micontoolactive = false;
        },

        /**
         * Hover vào thay đổi icon danh mục
         * Author NVHThai (14/09/2022)
         */
        categoryMouseOver() {
            this.miconcategory = false;
            this.miconcategoryactive = true;
        },

        /**
         * Hover vào thay đổi icon danh mục trở về default
         * Author NVHThai (14/09/2022)
         */
        categoryMouseLeave() {
            this.miconcategory = true;
            this.miconcategoryactive = false;
        },

        /**
         * Hover vào thay đổi icon tìm kiếm
         * Author NVHThai (14/09/2022)
         */
        searchMouseOver() {
            this.miconsearch = false;
            this.miconsearchactive = true;
        },

        /**
         * Hover vào thay đổi icon tìm kiếm trở về default
         * Author NVHThai (14/09/2022)
         */
        searchMouseLeave() {
            this.miconsearch = true;
            this.miconsearchactive = false;
        },


        /**
         * Hover vào thay đổi icon báo cáo
         * Author NVHThai (14/09/2022)
         */
        reportMouseOver() {
            this.miconreport = false;
            this.miconreportactive = true;
        },

        /**
         * Hover vào thay đổi icon báo cáo trở về default
         * Author NVHThai (14/09/2022)
         */
        reportMouseLeave() {
            this.miconreport = true;
            this.miconreportactive = false;
        }
    },
    data() {
        return {
            // toltip cơ bản là thu nhỏ 
            textTooltipSidebar: Resource.State.UnZoom,

            // icon tổng quan
            miconoverview: true,
            miconoverviewactive: false,

            // icon tài sản 
            miconproretyhtdb: true,
            miconproretyhtdbactive: false,

            // icon công cụ
            micontool: true,
            micontoolactive: false,

            //icon danh mục
            miconcategory: true,
            miconcategoryactive: false,

            // icon tìm kiếm
            miconsearch: true,
            miconsearchactive: false,

            // icon báo cáo
            miconreport: true,
            miconreportactive: false,
        }
    },
}
</script>

<style scoped>
@import url(../css/components/menu.css);
@import url(../css/details/tooltiparow.css);

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
</style>