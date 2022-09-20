<template>
    <div class="m-content">
        <div class="m-toolbar">
            <div class="m-toolbar__search">

                <input type="text" class="input input__icon m-icon-search-input input--serch-proprety"
                    placeholder="Tìm kiếm tài sản" tabindex="1">

                <div class="ml-11 m-combobox">
                    <div v-tooltip="{
                    text: `${positionName}`,
                    theme: {
                        placement: 'bottom',
                    },}">

                        <input type="text" class="combobox combobox__icon m-icon-cbb m-property-type"
                            placeholder="Loại tài sản" v-model="positionName" tabindex="2"
                            @click="btnOpenShowComboboxAssetType">
                    </div>

                    <button class="btn_combobox" @click="btnOpenShowComboboxAssetType">
                        <div class="m-icon-dropdown"></div>
                    </button>
                    <!-- nội dung cbb -->
                    <div class="m-combobox__content" v-show="isShowmComboboxContentAssetType">
                        <div class="m-border">
                            <span v-for="position in positions" :key="position.positionsID" class="m-option-cbb"
                                @click="onClickCbbAssetType(position.positionsName)"
                                :class="{active:position.positionsName == this.positionName}">
                                {{ position.positionsName }}
                            </span>
                        </div>
                    </div>

                </div>

                <div class="ml-11 m-combobox">
                    <div v-tooltip="{
                    text: `${departmentName}`,
                    theme: {
                        placement: 'bottom',
                    },}">
                        <input type="text" @click="btnOpenShowComboboxDepartment"
                            class="combobox combobox__icon m-icon-cbb m-property-type" placeholder="Bộ phận sử dụng"
                            v-model="departmentName" tabindex="3">
                    </div>
                    <!-- @blur="hideContentCbbBlur" -->
                    <button class="btn_combobox" @click="btnOpenShowComboboxDepartment">
                        <div class="m-icon-dropdown"></div>
                    </button>
                    <div class="m-combobox__content" v-show="isShowmComboboxContentDepartment">
                        <div class="m-border">
                            <span v-for="department in departments" :key="department.departmentsID" class="m-option-cbb"
                                @click="onClickCbbDepartment(department.departmentsName)"
                                :class="{active:department.departmentsName == this.departmentName}">
                                {{ department.departmentsName }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="m-toolbar__btn">
                <button id="btnadd" class="btn btn__icon m-icon-add-fff btn-add" @click="btnOpenFormAddOnclick"
                    tabindex="4">Thêm tài
                    sản</button>


                <div v-tooltip="{text:'Xuất khẩu',theme:{placement: 'bottom'},}">
                    <button class="ml-11 btn__toolbar m-icon-btn-export btn-export" tabindex="5"></button>
                </div>
                <div v-tooltip="{text:'Xóa',theme:{placement: 'bottom'},}">
                    <button class="ml-11 btn__toolbar m-icon-btn-delete btn-delete" @click="btnOpenToastDeleteOnclick()"
                        tabindex="6"></button>
                </div>
            </div>
        </div>

        <div class="m-property-main-list">
            <div class="m-table">
                <div class="m-property-list">
                    <table>
                        <thead>
                            <tr>
                                <th style="height: 37px; width: 85px;" class="text-rigth m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox" @click="selectAllOnClick()" />
                                    </div>
                                    <div class="ml-17" v-tooltip="{text:'Số thứ tự',theme:{placement: 'bottom',},}">
                                        <span style="font-weight: 700;">STT</span>
                                    </div>

                                </th>

                                <th style="width: 170px;" class="text-left">Mã tài sản</th>
                                <th style="width: 150px;" class="text-left">Tên tài sản</th>
                                <th style="width: 165px; color: #001031;" class="text-left">Loại tài sản</th>
                                <th style="width: 180px; color: #001031;" class="text-left">Bộ phận sử dụng</th>
                                <th style="width: 100px; color: #001031;" class="text-rigth">Số lượng</th>
                                <th style="width: 100px; color: #001031;" class="text-rigth">Nguyên giá</th>
                                <th style="width: 110px; color: #001031;" class="text-rigth">
                                    <div class="ml-17"
                                        v-tooltip="{text:'Hao mòn/ Khấu hao lũy kế',theme:{placement: 'bottom',},}">
                                        <span style="font-weight: 700;">HM/KH lũy kế</span>
                                    </div>
                                </th>
                                <th style="width: 95px; color: #001031;" class="text-rigth">Giá trị còn lại</th>
                                <th style="width: 100px; color: #001031;" class="text-center">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr :class="{active: filterCheckbox(property.employeesID)}"
                                v-for="(property, index) in propertys" :key="property.employeesID">

                                <td style="width: 100px;height: 39px;" class="text-rigth m-boder-check">
                                    <div class="m-check">
                                        <input class="m-checkbox" type="checkbox" :value="property.employeesID"
                                            v-model="checkboxList" />
                                    </div>
                                    <span class="ml-17 text-center">{{index+1}}</span>
                                </td>

                                <td class="text-left">{{ property.employeesName }}</td>
                                <td class="text-left">{{ property.employeesName }}</td>
                                <td class="text-left">{{ property.employeesName }}</td>
                                <td class="text-left">{{ property.employeesName }}</td>
                                <td class="text-rigth">{{ formartNumber(property.salary) }}</td>
                                <td class="text-rigth">{{ formartNumber(property.salary) }}</td>
                                <td class="text-rigth">{{ formartNumber(property.salary) }}</td>
                                <td class="text-rigth">{{ formartNumber(property.salary) }}</td>


                                <td class="text-center">
                                    <button v-tooltip="{text:'Sửa',theme:{placement: 'bottom',},}"
                                        class="m-icon-edit btn-edit" @click="editPropertyOnclick(property)"></button>

                                    <button
                                        v-tooltip="{text:'Nhân bản',theme:{placement: 'bottom',width: 'fit-content',},}"
                                        class="m-icon-duplicate btn-duplicate"
                                        @click="duplicatePropertyOnclick(property)"></button>
                                </td>
                            </tr>

                            <!-- .. -->
                            <div></div>
                        </tbody>
                        <tfoot class="m-bottom-table" style="position: sticky; bottom: 0; background-color: #fff;">
                            <td colspan="5">
                                <div class="m-table__bottom">
                                    <div class="m-total-property">
                                        Tổng số: &nbsp; <span style="font-weight: 700;">{{totalEmployees}}</span>&nbsp;
                                        bản ghi
                                    </div>
                                    <div class="m-combobox" style="margin-left: 15px;">
                                        <input type="text" class="combobox m-page" v-model="pagesize">
                                        <button v-tooltip="'số lượng bản ghi trong 1 trang'" class="btn_combobox"
                                            @click="showCBBClick()">
                                            <div class="m-icon-dropdown"></div>
                                        </button>
                                        <div class="m-combobox__content"
                                            style="bottom:100%; height: 90px;font-size: 11px;"
                                            v-show="isShowmComboboxPaging">
                                            <div class="m-border">
                                                <span v-for="(pagesize,index) in listOptionPageSize" :key="index"
                                                    class="m-option-cbb-paging" @click="pageSizeClick(pagesize)">
                                                    {{pagesize}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="m-table__bottom--pagenavi">

                                        <div v-tooltip="{text:'Trang trước',}">
                                            <button class="btn-pagenavi" @click="pageNumberPrevClick(this.pageNumber)">
                                                <div class="m-icon-prev"></div>
                                            </button>
                                        </div>

                                        <button class="btn-pagenavi" @click="pageNumberClick(1)"
                                            :class="{btnpagenaviactive: pageNumber==1}">
                                            <span>1</span>
                                        </button>
                                        <button class="btn-pagenavi" @click="pageNumberClick(2)"
                                            :class="{btnpagenaviactive: pageNumber==2}">
                                            <span>2</span>
                                        </button>

                                        <div class="ml-12">...</div>

                                        <button class="btn-pagenavi" @click="pageNumberClick(this.endPageNumber)"
                                            :class="{btnpagenaviactive: pageNumber==this.endPageNumber}">
                                            <span>{{this.endPageNumber}}</span>
                                        </button>

                                        <div v-tooltip="{text:'Trang kế tiếp',}">
                                            <button class="btn-pagenavi" @click="pageNumberNextClick(pageNumber)">
                                                <div class="m-icon-next"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-rigth">
                                <span v-tooltip="{text:'Số lượng',}">
                                    <span style="font-weight: 700;">{{formartNumber(13)}}</span>
                                </span>
                            </td>
                            <td class="text-rigth">
                                <span v-tooltip="{text:'Nguyên giá',}">
                                    <span style="font-weight: 700;">{{formartNumber(249000000)}}</span>
                                </span>
                            </td>
                            <td class="text-rigth">
                                <span v-tooltip="{text:'Hao mòn khấu hao lũy kế',}">
                                    <span style="font-weight: 700;">{{formartNumber(197160000)}}</span>
                                </span>
                            </td>
                            <td class="text-rigth">
                                <span v-tooltip="{text:'Giá trị còn lại',}">
                                    <span style="font-weight: 700;">{{formartNumber(229284000)}}</span>
                                </span>
                            </td>
                            <td></td>
                        </tfoot>

                    </table>
                </div>
            </div>


            <PropertyDetail v-if="isShowDialog" :propertyIDSelected="propertyIDSelected"
                :checkTitleForm="checkTitleForm" />


            <ToastMessageDelete :checkboxList="checkboxList" v-show="isDialogToastDelete" />
            <ToastMessageDone v-show="isShowToastDone" />
        </div>
        <LoadDing v-show="isShowLoading"/>
    </div>

</template>

<script>
import axios from 'axios'
import PropertyDetail from './PropertyDetail.vue';
import ToastMessageDelete from '../toast/ToastMessageDelete.vue';
import ToastMessageDone from '../toast/ToastMessageDone.vue';
import Enum from '../../assets/lib/enum.js';
import LoadDing from '../loading/LoadDing.vue';
export default {
    name: "PropertyList",

    components: {
    PropertyDetail,
    ToastMessageDelete,
    ToastMessageDone,
    LoadDing
},

    /**
     * created
     */
    created() {
        this.getDataAPI();
        this.getDataDepartment();
        this.getDataPosition();
        this.getTotal();


    },

    watch: {
        /**
         * hàm theo dõi pagesize: khi pagesize thay đổi thì phải tính toán lại trang cuối cùng
         * Author: NVHTHai (19/09/2022)
         * @param {int} pagesize
         */
        pagesize: function (value) {
            this.pagesize = value;
            let total = this.totalEmployees;
            if (total % value == 0) {
                this.endPageNumber = total / value;
            } else {
                this.endPageNumber = Math.floor(total / value) + 1;
            }
            this.getDataAPI();
        },

        /**
         * Hàm theo dõi pageNumber: nếu pageNumber thay đổi thì phải render lại dữ liệu trên table
         * Author: NVHTHai (19/09/2022)
         */
        pageNumber: function () {
            this.getDataAPI();
        },
    },

    methods: {
        /**
         * Hàm show thông báo thành công 
         * Author: NVHThai (20/09/2022)
         */
        showToastDone(){
            this.isShowToastDone = true;
        },

        /**
         * Hàm ẩn thông báo thành công 
         * Author: NVHThai (20/09/2022)
         */
        hideToastDone(){
            this.isShowToastDone = false;

            this.getTotal();
        },
        
        
        /**
         *
         *
         *
         */
        pageNumberPrevClick(pageNumber) {
            if (pageNumber > 1) {
                this.pageNumber = pageNumber - 1;
            }
        },

        /**
         * hàm tạo sự kiện cho nút next trang ở paging, khi click vào sẽ đến trang tiếp theo
         * Author: NVHTHai (19/09/2022)
         * @param {int} pageNumber
         */
        pageNumberNextClick(pageNumber) {
            if (pageNumber < this.endPageNumber) {
                this.pageNumber = pageNumber + 1;
            }
        },

        /**
         * Hàm chọn trang 1, 2
         * Author: NVHTHai (19/09/2022)
         * @param {int} pageNumber
         */
        pageNumberClick(pageNumber) {
            this.pageNumber = pageNumber;
            this.getDataAPI();
        },


        /**
         * Hàm nhập giá trị vào cbb paging để có số tài sản trong 1 trang
         * Author: NVHTHai (19/09/2022)
         *@param {int} pageSize 
         */
        pageSizeClick(pageSize) {
            this.pagesize = pageSize;
            this.isShowmComboboxPaging = false;
            this.pageNumber = 1;
        },

        /**
         * Hàm show cbb ở paging để chọn số tài sản trên 1 trang 
         * Author: NVHTHai (19/09/2022)
         */
        showCBBClick() {
            this.isShowmComboboxPaging = !this.isShowmComboboxPaging;
        },

        /**
         * kiểm tra xem id vừa chọn có ở trong mảng không, id là id của tài sản sau đó tr có brc
         * Nếu là false thì id không còn trong bảng
         * Nếu là true thì id có trong bảng giống id vừa được chọn
         * Author: NVHTHai (12/09/2022)
         * @param {id} guid 
         */
        filterCheckbox(id) {
            for (let idcheck of this.checkboxList) {
                if (idcheck == id) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Hàm formart số  
         * Author: NVHTHai (12/09/2022)
         * @param {int} number 
         */
        formartNumber(number) {
            if (number && !isNaN(number)) {
                return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
            } else {
                return number;
            }
        },
        /**
         * Hàm lấy id khi click vào check box
         * Author: NVHThai (09/09/2022)
         */
        checkBoxOnclick(id) {
            this.employeesID = id;
            console.log(this.checkboxList);
        },

        /**
         * Hàm để mở popup khi ấn vào nút xóa
         * Author: NVHThai (09/09/2022)
         */
        btnOpenToastDeleteOnclick() {
            this.isDialogToastDelete = true;
        },


        /**
         * Hàm để mở popup khi ấn vào nút xóa
         * Author: NVHThai (09/09/2022)
         */
        btnCloseToastDeleteOnclick() {
            this.isDialogToastDelete = false;
        },

        /** 
         * Hàm lấy dữ liệu vị trí: sau này là lấy dữ liệu mã tài sản
         * Author: nvhthai (19/09/2022)
         */
        getDataPosition() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get("https://localhost:7285/api/v1/Positions")
                    .then((response) => {
                        me.positions = response.data;
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
         * Hàm lấy dữ liệu tổng số bản ghi
         * Author: NVHThai (18/08/2022)
         */
        getTotal() {
            let me = this;
            try {
                axios
                    .get(`https://localhost:7285/api/v1/Employees/total`)
                    .then((response) => {
                        me.totalEmployees = response.data;
                        //lấy trang cuối cùng mặc định

                        if (me.totalEmployees % 20 == 0) {
                            this.endPageNumber = me.totalEmployees / 20;
                        } else {
                            this.endPageNumber = Math.floor(me.totalEmployees / 20) + 1;
                        }
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);

            }
        },

        


        /**
         * Hàm lấy dữ liệu api để render lên table
         * Author: nvhthai (01/09/2022)
         */
        getDataAPI() {
            let me = this;
            try {

                // trước khi load dữ liệu thì hiện trạng thái tải data
                this.isShowLoading = true;
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(`https://localhost:7285/api/v1/Employees?pageSize=${this.pagesize}&pageNumber=${this.pageNumber}`)
                    .then((response) => {
                        me.propertys = response.data.data;

                        // lấy dữ liệu xong tắt trạng thái tải data
                        this.isShowLoading = false;

                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * 
         * @param {*} property 
         */
        editPropertyOnclick(property) {
            console.log(property);
            this.propertyIDSelected = property.employeesID;
            this.isShowDialog = true;
            this.checkTitleForm = Enum.FormMode.Edit;

        },

        /**
         * Author: nvhthai (31/08/2022)
         * click vào thì mở form thêm tài sản
         */
        btnOpenFormAddOnclick() {
            this.isShowDialog = true;
            this.checkTitleForm = Enum.FormMode.Add;
            this.propertyIDSelected = null;
        },

        /**
         * click vào thì mở form nhân bản tài sản
         * Author: nvhthai (31/08/2022)
         */
        duplicatePropertyOnclick(property) {
            this.propertyIDSelected = property.employeesID;
            this.isShowDialog = true;
            this.checkTitleForm = Enum.FormMode.Duplicate;
        },

        /**
         * Hàm ẩn form add
         * Author NVHThai (09/09/2022)
         */
        hideFormAdd() {
            this.isShowDialog = false;
        },


        /**
         * Hàm dùng để click vào chek box tổng thì all check box đều checked
         *  Author: NVHThai (09/09/2022)
         */
        selectAllOnClick() {
            this.checkboxList = [];
            if (this.selectAll) {
                for (let i in this.propertys) {
                    this.checkboxList.push(this.propertys[i].employeesID);
                }
            }
            this.selectAll = !this.selectAll

        },


        /**
         * Hàm click vào btn thì content cbb hiện ra
         * Author: NVHThai (01/09/2022)
         */
        btnOpenShowComboboxDepartment() {
            this.isShowmComboboxContentDepartment = !this.isShowmComboboxContentDepartment;
        },
        /**
         * Hàm click vào btn thì content cbb hiện ra
         * Author: NVHThai (01/09/2022)
         */
        btnOpenShowComboboxAssetType() {
            this.isShowmComboboxContentAssetType = !this.isShowmComboboxContentAssetType;
        },

        /**
        * Hàm hiện dữ liệu ở cbb phòng ban
        * Author: NVHThai (01/09/2022)
        */
        onClickCbbDepartment(dp) {
            if (dp) {
                this.isShowTooltipDepartment = true;
                this.departmentName = dp;
                this.isShowmComboboxContentDepartment = false;
            }
        },

        /**
         * Hàm hiện dữ liệu ở cbb loại tài sản
         * Author: NVHThai (19/09/2022)
         */
        onClickCbbAssetType(assetType) {

            if (assetType) {
                this.isShowTooltipAssetType = true;
                this.positionName = assetType;
                this.isShowmComboboxContentAssetType = false;
            }
        },

        /**
         * Hàm blur thì sẽ ẩn form cbb
         * Author: NVHThai (14/09/2022)
         */
        // hideContentCbbBlur() {
        //     this.isShowmComboboxContent = false;
        // },
    },
    data() {
        return {

            // hiển thị combobox ở cuôi bảng
            isShowmComboboxPaging: false,

            // pagesize mặc định khi tải trang
            pagesize: 20,

            // trang mặc định khi tải trang
            pageNumber: 1,

            //Danh sách tài sản
            propertys: null,

            //Danh sách phòng ban
            departments: {},

            // Danh sách vị trí: sau này là danh sách mã tài sản
            positions: {},

            // Ẩn hiện form detail
            isShowDialog: false,

            // Ẩn hiện cbx phòng ban ỏ thanh toolbar
            isShowmComboboxContentDepartment: false,

            // Ẩn hiện cbx phòng ban ỏ thanh toolbar
            isShowmComboboxContentAssetType: false,

            // tên phòng ban
            departmentName: 'Bộ phận sử dụng',

            // tên vị trí: sau này tên mã loại tài sản
            positionName: 'Loại tài sản',
            // chọn tất cả cbbx
            selectAll: true,

            // id tài sản
            propertyIDSelected: '',

            // tiêu đề form details
            checkTitleForm: null,

            // loading khi tải dữ liệu
            isShowLoading: false,

            // biến để show popup khi click vào btn xóa
            isDialogToastDelete: false,

            // id để lấy id tài sản lớn nhất
            employeesID: null,

            // toast message khi thành công
            isShowToastDone: false,

            // mảng để lưu id tài sản
            checkboxList: [],

            // hiển thị tooltip ở cbb
            isShowTooltipDepartment: false,
            isShowTooltipAssetType: false,

            // mảng lựa chọn pagesize
            listOptionPageSize: [15, 20, 25, 30],

            // số bản ghi trong dữ liệu
            totalEmployees: null,

        };

    },
}
</script>

<style scoped>
@import url(../../css/details/propertylist.css);
</style>