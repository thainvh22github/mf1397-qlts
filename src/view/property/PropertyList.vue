<template>
    <div class="m-content">
        <div class="m-toolbar">
            <div class="m-toolbar__search">

                <input type="text" class="input input__icon m-icon-search-input input--serch-proprety"
                    placeholder="Tìm kiếm tài sản">

                <div class="ml-11 m-combobox">
                    <input type="text" class="combobox combobox__icon m-icon-cbb m-property-type"
                        placeholder="Loại tài sản" :value="departmentName">
                    <button class="btn_combobox" @click="btnOpenShowCombobox">
                        <div class="m-icon-dropdown"></div>
                    </button>
                    <div class="m-combobox__content" :class="{ isShowmComboboxContent: isShowmComboboxContent }">
                        <div class="m-border">
                            <div v-for="department in departments" :key="department.departmentsID" class="m-option-cbb" 
                                v-on:click="onClickCbbAssetType(department.departmentsName)">
                                {{ department.departmentsName }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ml-11 m-combobox">
                    <input type="text" class="combobox combobox__icon m-icon-cbb m-property-type"
                        placeholder="Bộ phận sử dụng">
                    <button class="btn_combobox">
                        <div class="m-icon-dropdown"></div>
                    </button>
                </div>

            </div>


            <div class="m-toolbar__btn">
                <button id="btnadd" class="btn btn__icon m-icon-add-fff btn-add" @click="btnOpenFormAddOnclick">Thêm tài
                    sản</button>

                <div class="tooltip">
                    <span class="tooltiptext">Xuất khẩu</span>
                    <button class="ml-11 btn__toolbar m-icon-btn-export btn-export"></button>
                </div>
                <div class="tooltip">
                    <span class="tooltiptext">Xóa</span>
                    <button class="ml-11 btn__toolbar m-icon-btn-delete btn-delete"></button>
                </div>

            </div>
        </div>
        <div class="m-property-main-list">
            <div class="m-table">
                <div class="m-property-list">
                    <table>
                        <thead>
                            <tr>
                                <th style="height: 37px; width: 100px;" class="text-rigth m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox" checked/>
                                    </div>
                                    <span class="ml-17 text-center">STT</span>
                                </th>
                                <th style="width: 180px;" class="text-left">Mã tài sản</th>
                                <th style="width: 150px;" class="text-left">Tên tài sản</th>
                                <th style="width: 150px;" class="text-left">Loại tài sản</th>
                                <th style="width: 180px;" class="text-left">Bộ phận sử dụng</th>
                                <th style="width: 100px;" class="text-rigth">Số lượng</th>
                                <th style="width: 100px;" class="text-rigth">Nguyên giá</th>
                                <th style="width: 100px;" class="text-rigth">HM/KH lũy kế</th>
                                <th style="width: 100px;" class="text-rigth">Giá trị còn lại</th>
                                <th style="width: 95px;" class="text-center">Chức năng</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="property in propertys" :key="property.employeesID">
                                <td style="width: 100px;height: 39px;" class="text-rigth m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox"/>
                                    </div>
                                    <span class="ml-17 text-center">10</span>
                                </td>
                                <td class="text-left">{{ property.employeesName }}</td>
                                <td class="text-left">1</td>
                                <td class="text-left">1</td>
                                <td class="text-left">1</td>
                                <td class="text-rigth">1</td>
                                <td class="text-rigth">1</td>
                                <td class="text-rigth">1</td>
                                <td class="text-rigth">1</td>
                                <td class="text-center">
                                    <button class="m-icon-edit btn-edit"></button>
                                    <button class="m-icon-duplicate btn-duplicate"></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="m-table__bottom">
                    <div class="m-table__bottom--left">
                        <div class="m-total-property">
                            Tổng số: <span style="font-weight: 700;">200 </span> bản ghi
                        </div>
                        <div class="m-combobox">
                            <input type="text" class="combobox m-page">
                            <button class="btn_combobox">
                                <div class="m-icon-dropdown"></div>
                            </button>
                        </div>
                        <div class="m-table__bottom--pagenavi">
                            <button class="btn-pagenavi">
                                <div class="m-icon-prev"></div>
                            </button>
                            <button class="btn-pagenavi">
                                <span>1</span>
                            </button>
                            <button class="btn-pagenavi">
                                <span>2</span>
                            </button>
                            <div class="ml-12">...</div>
                            <button class="btn-pagenavi">
                                <span>10</span>
                            </button>
                            <button class="btn-pagenavi">
                                <div class="m-icon-next"></div>
                            </button>
                        </div>
                    </div>
                    <div class="m-table__bottom--rigth">
                        <div class="m-amount">
                            Số lương
                        </div>
                        <div class="m-cost">
                            Nguyên giá
                        </div>
                        <div class="m-accumulated">
                            Lũy kế
                        </div>
                        <div class="m-residual-value">
                            Giá trị còn lại
                        </div>
                    </div>
                </div>

            </div>
            <PropertyDetail :isShowDialog="isShowDialog" @isShowDialog="isShowFormAdd" />
            <ToastMessage />
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import PropertyDetail from './PropertyDetail.vue'
import ToastMessage from '../toast/ToastMessage.vue';
export default {
    name: "PropertyList",
    components: {
        PropertyDetail,
        ToastMessage
    },


    /**giai đoạn 1: beforeCreate ( setup() )
     * không thể truy cập vào data, Dom
     */
    beforeCreate() {
        console.log("beforeCreate");
    },
    /**giai đoạn 2: created
     * truy cập vào data, event, methos
        chưa thể truy cập vào trong dom

        dùng để load dữ liệu cho sớm
     */
    created() {
        let me = this;
        console.log("created");
        try {
            me.getDataAPI();
            me.getDataDepartment();

        } catch (error) {
            console.log(error);
        }

    },
    /**giai đoạn 3: beforeMount
     * truy cập vào data, element
        chưa thể truy cập vào trong dom
     */
    beforeMount() {
        console.log("beforeMount");
    },
    /**giai đoạn 4: mounted
     * truy cập vào data, element
       truy cập vào trong dom

     */
    mounted() {
        console.log("mounted");

    },
    /**giai đoạn 5: beforeUpdate
     * truy cập vào data, element
       truy cập vào trong dom

       nên làm validate dữ liệu hàm event.data lấy ra tưng dữ liệu
       lấy hết data thì event.curentTarget.value
     */
    beforeUpdate() {
        console.log("beforeUpdate");

    },
    /**giai đoạn 6: updated
     * truy cập vào data, element
       truy cập vào trong dom
     */
    updated() {
        console.log("updated");

    },
    /**giai đoạn 7: beforeUnmount
     * truy cập vào data, element
       truy cập vào trong dom
     */
    beforeUnmount() {
        console.log("beforeUnmount");

    },
    unmounted() {
        console.log("unmounted");

    },



    methods: {
        getDataAPI() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get("https://localhost:7285/api/v1/Employees?pageSize=20&pageNumber=1")
                    .then((response) => {
                        me.propertys = response.data.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Author: nvhthai (01/09/2022)
         * Lấy dữ liệu bảng phòng ban
         */
        getDataDepartment() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get("https://localhost:7285/api/Departments")
                    .then((response) => {
                        me.departments = response.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Author: nvhthai (31/08/2022)
         * click vào thì mở form thêm tài sản
         */
        btnOpenFormAddOnclick() {
            let me = this;
            me.isShowFormAdd(true);
        },

        isShowFormAdd(isShow) {
            this.isShowDialog = isShow;
        },

        btnOpenShowCombobox() {
            this.isShowmComboboxContent = !this.isShowmComboboxContent;
        },

        onClickCbbAssetType(dp){
            this.departmentName = dp;
            this.isShowmComboboxContent = false;
        }
    },


    // formatDate() {
    // },


    data() {
        return {
            propertys: null,
            departments: {},
            isShowDialog: false,
            isShowmComboboxContent: false,
            departmentName:'',
        };

    },
}
</script>

<style scoped>
@import url(../../css/details/propertylist.css);
</style>