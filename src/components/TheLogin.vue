<template>
  <div class="m-login m-image-background-login">
    <div class="form-login">
      <div class="message" v-show="isShowErorr">
        {{ text }}
      </div>
      <div class="form-login__image m-image-login"></div>
      <div class="form-login__input">
        <div class="main-login">
          <div class="main-login__header">
            <div class="logo-misa m-logo-login"></div>
          </div>
          <div class="logo-text">
            Đăng nhập để làm việc với <span>MISA QLTS</span>
          </div>

          <m-input
            v-model="userName"
            type="text"
            className="mt-16 w-100 height-44 user-name"
            :placeholder="playhoderUserName"
            :class="{ borders: bUserName }"
          ></m-input>
          <div class="input-password">
            <m-input
              v-model="passWord"
              :type="typePassWord"
              className="mt-16 w-100 height-44 pass-word"
              :placeholder="playhoderPassWord"
              @keydown.enter="checkUser"
              :class="{ borders: bPassWord }"
            ></m-input>
            <div
              v-if="checkType"
              class="hide-show m-icon-hide"
              @click="changeShow"
            ></div>
            <div v-else class="hide-show m-icon-show" @click="changeHide"></div>
          </div>
          <div @click="btnLogin" class="btn btn-login">Đăng nhập</div>
          <a class="forgot" href="">Quên mật khẩu?</a>
        </div>
      </div>
    </div>
    <LoadDing v-show="isShowLoading" />
  </div>
</template>

<script>
import axios from "axios";
import MInput from "../base/input/MInput.vue";
import BaseMethod from "@/lib/baseMethod";
import LoadDing from "@/view/loading/LoadDing.vue";
export default {
  name: "TheLogin",
  props: ["check"],
  components: {
    MInput,
    LoadDing,
  },

  updated() {
    this.addEventListener();
    if (BaseMethod.checkValidEmpty(this.userName)) {
      this.bUserName = false;
    }
    if (BaseMethod.checkValidEmpty(this.passWord)) {
      this.bPassWord = false;
    }
    if (this.isShowErorr) {
      setTimeout(() => {
        this.isShowErorr = false;
      }, 2000);
    }
  },

  methods: {
    /**
     * Hàm lắng nghe sự kiện của bàn phím
     * Author NVHThai(04/11/2022)
     */
     addEventListener() {
      try {
        let me = this;
        document.addEventListener("keydown", function (event) {
          if (event.code == "Enter") {
            me.btnLogin();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    changeShow() {
      if (BaseMethod.checkValidEmpty(this.passWord)) {
        this.typePassWord = "text";
        this.checkType = false;
      }
    },

    changeHide() {
      this.typePassWord = "passWord";
      this.checkType = true;
    },

    /**
     * Hàm đăng nhập
     * Author: NVHThai (18/10/2022)
     */
    btnLogin() {
      if (
        !BaseMethod.checkValidEmpty(this.userName) ||
        !BaseMethod.checkValidEmpty(this.passWord)
      ) {
        this.isShowErorr = true;
        this.text = "Vui lòng nhập đầy đủ thông tin đăng nhập";

        if (!BaseMethod.checkValidEmpty(this.userName)) {
          this.bUserName = true;
        }
        if (!BaseMethod.checkValidEmpty(this.passWord)) {
          this.bPassWord = true;
        }
      } else {
        this.checkUser();
      }
    },

    /**
     * Hàm kiểm tra điều kiện của người dùng để đăng nhập
     * Author: NVHThai (18/10/2022)
     */
    checkUser() {
      let me = this;
      me.user.userId = "";
      me.user.userName = me.userName;
      me.user.password = me.passWord;
      me.isShowLoading = true;
      try {
        axios
          .post("https://localhost:44380/api/User", me.user)
          .then((response) => {
            me.isShowLoading = false;
            me.$router.push("/property-list");
            sessionStorage.setItem("checkSesstion", response.data.userName);
          })
          .catch(() => {
            this.isShowErorr = true;
            this.text = "Tên tài khoản hoặc mật khẩu không đúng";
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      playhoderUserName: "Username, email hoặc số điện thoại",
      playhoderPassWord: "Mật khẩu",
      userName: "",
      passWord: "",
      user: {},
      path: "/",
      isShowErorr: false,
      bUserName: false,
      bPassWord: false,
      text: "",
      typePassWord: "passWord",
      checkType: true,
      isShowLoading: false,
    };
  },
};
</script>

<style scoped>
@import url(../css/components/login.css);
@import url(../css/common/customCombobox.css);

.borders {
  border: 1px solid red;
}
</style>