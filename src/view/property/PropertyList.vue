<template>
    <div class="m-content">
        <div class="m-toolbar">
            <div class="m-toolbar__search">
                
                <input type="text" class="input input__icon m-icon-search-input input--serch-proprety" placeholder="Tìm kiếm tài sản">
                
                <div class="ml-11 m-combobox">
                    <div class="m-combobox__toolbar">
                        <input type="text" class="combobox combobox__icon m-icon-cbb m-property-type" readonly>
                        <button class="btn_combobox">
                            <div class="m-icon-dropdown"></div>
                        </button>
                    </div>
                </div>

                <div class="ml-11 m-combobox">
                    <div class="m-combobox__toolbar">
                        <input type="text" class="combobox combobox__icon m-icon-cbb m-property-type" readonly>
                        <button class="btn_combobox">
                            <div class="m-icon-dropdown"></div>
                        </button>
                    </div>
                </div>

            </div>


            <div class="m-toolbar__btn">
                <button id="btnadd" class="btn btn__icon m-icon-add-fff btn-add" @click = "btnOpenFormAddOnclick">Thêm tài sản</button>
                <button class="ml-11 btn__toolbar m-icon-btn-export btn-export"></button>
                <button class="ml-11 btn__toolbar m-icon-btn-delete btn-delete"></button>
            </div>
        </div>
        <div class="m-property-list">
            <div class="m-table">
                <div class="m-property-list">
                    <table>
                        <thead>
                            <tr>
                                <td class="text-center m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox" />
                                    </div>
                                </td>
                                <td class="text-center" style="width: 100px;">STT</td>
                                <td class="text-left" style="width: 150px;">Mã tài sản</td>
                                <td class="text-left" style="width: 150px;">Tên tài sản</td>
                                <td class="text-left" style="width: 150px;">Loại tài sản</td>
                                <td class="text-left" style="width: 160px;">Bộ phận sử dụng</td>
                                <td class="text-rigth" style="width: 120px;">Số lượng</td>
                                <td class="text-rigth" style="width: 120px;">Nguyên giá</td>
                                <td class="text-rigth" style="width: 150px;">HM/KH lũy kế</td>
                                <td class="text-rigth" style="width: 130px;">Giá trị còn lại</td>
                                <td class="text-center" style="width: 120px;">Chức năng</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="property in propertys" :key="property.employeesID">
                                <td class="text-center m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox" />
                                    </div>
                                </td>
                                <td class="text-center" style="width: 100px;">10</td>
                                <td class="text-left" style="width: 150px;">{{ property.employeesCode }}</td>
                                <td class="text-left" style="width: 150px;">1</td>
                                <td class="text-left" style="width: 150px;">1</td>
                                <td class="text-left" style="width: 160px;">1</td>
                                <td class="text-rigth" style="width: 120px;">1</td>
                                <td class="text-rigth" style="width: 120px;">1</td>
                                <td class="text-rigth" style="width: 150px;">1</td>
                                <td class="text-rigth" style="width: 130px;">1</td>
                                <td class="text-center" style="width: 120px;">
                                    <button class="m-icon-edit btn-edit"></button>
                                    <button class="m-icon-duplicate btn-duplicate"></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="m-table__bottom">
                    
                </div>

            </div>
            <PropertyDetail 
            :isShowDialog ="isShowDialog" 
            @isShowDialog="isShowFormAdd"
            />
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import PropertyDetail from './PropertyDetail.vue'
export default {
    name: "PropertyList",
    components: {
        PropertyDetail
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
        me.getDataAPI();

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
                        console.log(me.propertys.data);
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Author: nvhthai (31/08/2022)
         * click vào thì mở form thêm tài sản
         */
        btnOpenFormAddOnclick(){
            let me = this;
            me.isShowFormAdd(true);
        },

        isShowFormAdd(isShow){
            this.isShowDialog = isShow;
        }
    },


    // formatDate() {
    // },


    data() {
        return {
            propertys: null,
            // employeeSelected: {},
            // employeeSelectedId: null,
            // formMode: 0,
            // isShowContentCombobox: false,
            // checkCombobox: false,
            isShowDialog: false
        };

    },
}
</script>

<style scoped>
@import url(../../css/details/propertylist.css);
</style>