<template>
    <div class="m-combobox" :class="css" >
        <el-tooltip :content="nameInputs" placement="top" show-after="400" effect="customized"
         :disabled="nameInputs == null">
            <input :type="type" class="combobox" :class="[className, {borderred: borderRed}]" :placeholder="placeholder"
                :value="nameInputs" :tabindex="tabindex" @click="btnOpenShowCombobox"
                @blur="validateInputBlur(nameInputs)">
        </el-tooltip>
        <button class="btn_combobox" @click="btnOpenShowCombobox" @blur=hideContentCbbBlur()>
            <div class="m-icon-dropdown"></div>
        </button>
        <!-- nội dung cbb -->
        <div class="m-combobox__content" :class="styleContent" v-show="isShowmComboboxContent">
            <div class="m-border">
                <div v-for="item in items" :key="item[itemID]" class="m-option-cbb max-line"
                    @mousedown="onClickCbb(item[itemID],item[itemCode],item[itemName],item.depreciation_rate,item.life_time)"
                    :class="{active:item[itemCode] == this.nameInputs}">
                    <el-tooltip :disabled="disabled" :content="item[itemCode]" placement="top" show-after="400" effect="customized">
                        <span>{{ item[itemCode] }}</span>
                    </el-tooltip>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MCombobox',
    props: ['type', 'className', 'placeholder', 'depreciation_rate','life_time',
    'url', 'itemID', 'itemName','itemCode', 'tabindex', 'css', 'styleContent','showValue'],
    created() {
        // lấy dữ liệu từ api cho cbx 
        this.getDataCombobox();
    },
    updated() {
        /**
         * Khi điền thông tin vào input thì sẽ hết border đỏ
         * Author: NVHThai (21/09/2022)
         */
        if (this.nameInputs) {
            this.borderRed = false;
        }
    },

    watch: {
        /**
         * Hàm theo dõi các mã: nếu thay đổi thì hiển thị lên input
         * Author: NVHThai (25/09/2022)
         * @param {string} value 
         */
        showValue: function(value){
            this.nameInputs = value;
        }
    },

    methods: {
        /**
        * validate dữ liệu
        * Author: NVHThai (21/09/2022)
        */
        validateInputBlur(nameInputs) {
            if(!nameInputs){
                this.borderRed = true;
            }
        },

        /**
        * Hàm hiện dữ liệu ở cbb loại tài sản
        * Author: NVHThai (19/09/2022)
        */
        onClickCbb(ID,code,name,depreciationRate,lifeTime) {
            this.nameInputs = code;
            this.$emit(`update:${this.itemID}`, ID);
            this.$emit(`update:${this.itemCode}`, code);
            this.$emit(`update:${this.itemName}`, name);
            this.$emit(`update:depreciation_rate`, depreciationRate);
            this.$emit(`update:life_time`, lifeTime);
        },
        /**
        * Hàm click vào thì nội dung cbx hiện ra
        *  Author: NVHThai (08/09/2022)
        */
        btnOpenShowCombobox() {
            this.isShowmComboboxContent = !this.isShowmComboboxContent;
        },

        /**
        * Hàm blur thì sẽ ẩn form cbb
        * Author: NVHThai (14/09/2022)
        */
        hideContentCbbBlur() {
            this.isShowmComboboxContent = false;
        },

        /**
        * Author: nvhthai (01/09/2022)
        * Lấy dữ liệu cbb
        */
        getDataCombobox() {
            let me = this;
            try {
                // gọi api để lấy dữ liệu sử dụng axios
                axios
                    .get(this.url)
                    .then((response) => {
                        me.items = response.data;
                    }).catch(error => {
                        console.log('Error: ', error)
                    });
            } catch (error) {
                console.log(error);
            }
        },
    },

    data() {
        return {
            isShowmComboboxContent: false,
            nameInputs: null,
            borderRed: false,
        }
    },
}
</script>

<style scoped>
.max-line {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-inline-box;
    -webkit-line-clamp: 1;
    /*số dòng muốn hiện */
    line-height: 36px;

}

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