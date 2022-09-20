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
            <button v-tooltip="{text:`${textTooltipSidebar}`}" class="btn-sidebar" @click="toggleSidebar">
                <div class="m-icon-sidebar" style="width: 14px; height: 14px;" :class="{ 'rotate-180': collapsed }">
                </div>
            </button>

        </div>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from '../state/state';

export default {
    name: "TheMenu",
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    },
    watch:{
        collapsed: function(value){
            console.log(value);
            if(value){
                this.textTooltipSidebar = 'Phóng to';
            }else{
                this.textTooltipSidebar = 'Thu nhỏ';
            }
        }
    },

    methods: {
        /**
         * 
         */
        overViewMouseOver() {
            this.miconoverviewactive = true;
            this.miconoverview = false;
        },
        overViewMouseLeave() {
            this.miconoverviewactive = false;
            this.miconoverview = true;
        },

        /**
         * 
         * 
         */
        ProretyhtdbMouseOver() {
            this.miconproretyhtdb = false;
            this.miconproretyhtdbactive = true;
        },
        ProretyhtdbMouseLeave() {
            this.miconproretyhtdb = true;
            this.miconproretyhtdbactive = false;
        },

        /**
        *
        */

        toolMouseOver() {
            this.micontool = false;
            this.micontoolactive = true;
        },
        toolMouseLeave() {
            this.micontool = true;
            this.micontoolactive = false;
        },

        /**
        
        */
        categoryMouseOver() {
            this.miconcategory = false;
            this.miconcategoryactive = true;
        },

        categoryMouseLeave() {
            this.miconcategory = true;
            this.miconcategoryactive = false;
        },

        /**
        
        */
        searchMouseOver() {
            this.miconsearch = false;
            this.miconsearchactive = true;
        },

        searchMouseLeave() {
            this.miconsearch = true;
            this.miconsearchactive = false;
        },
        /**
         * 
         */
        reportMouseOver() {
            this.miconreport = false;
            this.miconreportactive = true;
        },
        reportMouseLeave() {
            this.miconreport = true;
            this.miconreportactive = false;
        }
    },
    data() {
        return {
            textTooltipSidebar:'Thu nhỏ',
            //
            miconoverview: true,
            miconoverviewactive: false,

            //
            miconproretyhtdb: true,
            miconproretyhtdbactive: false,
            //

            micontool: true,
            micontoolactive: false,
            //
            miconcategory: true,
            miconcategoryactive: false,

            //
            miconsearch: true,
            miconsearchactive: false,

            //
            miconreport: true,
            miconreportactive: false,
        }
    },
}
</script>

<style scoped>
@import url(../css/components/menu.css);
@import url(../css/details/tooltiparow.css);
</style>