
<script>
import axios from "axios";
import { ElNotification } from "element-plus";
import Resource from "@/lib/resource";

export default {
  name: "ToastMessageDelete",
  props: ["checkboxList"],

  mounted() {
    for (let i of this.checkboxList) {
      this.listAsset.push(i.fixed_asset_id);
      if (i.active == 1) {
        this.checkDetele = false;
      }
    }
    if (this.checkDetele == true) {
      this.deleteMultiDataPropertyApi();
    } else {
      this.$alert("Không thể xóa tài sản vì có chứng từ phát sinh.", {
        confirmButtonText: "Đóng",
      });
    }
  },
  methods: {
    /**
     * Hàm xóa tài sản
     * Author: NVHThai (20/09/2022)
     */
    deleteMultiDataPropertyApi() {
      let me = this;
      try {
        // gọi api để lấy dữ liệu sử dụng axios
        axios
          .post(Resource.Url.Deletes, me.listAsset)
          .then((response) => {
            //tải lại trang
            me.$parent.getDataAPI();

            me.$parent.deleteDataInCheckboxList();

            // thông báo xóa thành công
            ElNotification({
              duration: 1500,
              message: `${response.data} tài sản xóa thành công`,
              position: "bottom-right",
              type: "success",
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      listAsset: [],
      checkDetele: true,
    };
  },
};
</script>

<style scoped>
.text {
  padding-left: 50px;
}

.text span {
  padding-left: 0 !important;
  font-weight: 700;
}

.m-dialog-toast__attention-delete {
  width: 450px;
  left: calc(50% - 225px);
}
</style>
