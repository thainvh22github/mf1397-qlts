<script>
import Resource from "@/lib/resource";
import axios from "axios";
import { ElNotification } from "element-plus";

export default {
  name: "DeleteLicense",
  props: ["licenseListID","id"],
  created() {
    if(this.id){
      this.deleteLicense();
    }else{
      this.deleteLicenseMutil();
    }
  },
  methods: {
    /**
     * Hàm lưu chứng từ vào csdl
     */
    deleteLicenseMutil() {
      let me = this;
      try {
        axios
          .post(
            "https://localhost:44380/api/License/batch-delete",
            me.licenseListID
          )
          .then((response) => {
            console.log(response);

            this.$parent.hideDeleteMutil();

            //tải lại dữ liệu
            this.$parent.getDataLicense();

            // hiện thông báo thêm thành công
            ElNotification({
              duration: 1500,
              message: `Xóa chứng từ thành công`,
              position: "bottom-right",
              type: "success",
            });

            //làm mới mảng chứa id chứng từ
            this.$parent.deleteDataLicenseIDArr();
          })
          .catch((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
        this.$parent.deleteDataLicenseIDArr();
      }
    },

    /**
     * Hàm lưu chứng từ vào csdl
     */
    deleteLicense() {
      let me = this;
      try {
        axios
          .delete(`https://localhost:44380/api/License/${me.id}`)
          .then((response) => {
            console.log(response);

            this.$parent.hideDeleteMutil();

            //tải lại dữ liệu
            this.$parent.getDataLicense();

            // hiện thông báo thêm thành công
            ElNotification({
              duration: 1500,
              message: `Xóa chứng từ thành công`,
              position: "bottom-right",
              type: "success",
            });
          })
          .catch((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },

  
  data() {
    return {
      textBtnClose: Resource.TitleToast.Close,
      count: null,
    };
  },
};
</script>

<style scoped>
@import url(../../css/details/toastdialog.css);
span {
  text-align: left;
}
</style>