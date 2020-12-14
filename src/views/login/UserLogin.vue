<template>
  <div class="login">
    <div class="header-wrap">
      <div class="logo-l f-fl">
        <router-link to="/login"></router-link>
      </div>
    </div>
    <div class="bg-wrap">
      <div class="main-cont-wrap">
        <div class="pictop">
          <img src="../../assets/image/computer.png" />
        </div>

        <form class="loginForm">
          <div class="ui-form-item g-mt40">
            <span class="ui-form-txt">用户账号</span>
            <input
              class="ui-form-input"
              placeholder="请输入用户账号"
              type="text"
              v-model="Submitform.username"
            />
          </div>
          <div class="ui-form-item g-mt30">
            <span class="ui-form-txt">登录密码</span>
            <input
              class="ui-form-input"
              placeholder="请输入密码"
              type="password"
              v-model="Submitform.password"
            />
          </div>
          <div class="g-mt30">
            <a class="remeberpwd" href="#">忘记密码？</a>
          </div>
          <div class="ui-form-btn">
            <input class="ui-button login-btn" value="登录" @click="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/axios/api/Admin";
import { UserLogin } from "@/axios/api/SORT";
import { GetMenuList, GetMenuTree } from "@/axios/api/Admin";
import { setTreeMenus, setListMenus } from "@/store/commit.js";
import {
  setAsideIndex,
  setLeftIndex,
  setTabs,
  setActiveIndex,
  setAsideMenu,
} from "@/store/commit.js";
const form = {
  username: '',
  password: '',
}
export default {
  data() {
    return {
      Submitform: Object.assign({}, form),
    };
  },
  methods: {
    async submit() {
      if (
        this.Submitform.username === "" ||
        this.Submitform.username === null ||
        this.Submitform.password === "" ||
        this.Submitform.password === null
      ) {
        this.$message.error({
          message:
            "<strong> 用户账号 </strong> 和<strong> 登录密码 </strong>不能为空~",
          dangerouslyUseHTMLString: true,
        });
      } else {
        await UserLogin(this.Submitform).then((res) => {
          if (res.data.code == 200) {
            window.sessionStorage.clear();
            window.sessionStorage.setItem("id", res.data.data.RandID.id);
            window.sessionStorage.setItem("username", res.data.data.sortLogin.username);
            window.sessionStorage.setItem("type", res.data.data.RandID.type);
            if (res.data.data.RandID.type === 0) {
              this.$message.success(res.data.data.sortLogin.username + "登录成功");
              this.$router.push("/students");
            } else if (res.data.data.RandID.type === 1) {
              this.$message.success(res.data.data.sortLogin.username + "登录成功");
              this.$router.push("/teachers");
            } else {
              this.$message.error({
                message: "<strong>" + "发生了一些错误了也..." + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
            }
          } else {
            this.$message.error({
              message: "<strong>" + res.data.message + "~</strong>",
              dangerouslyUseHTMLString: true,
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.login {
  height: 770px;
  .bg-wrap {
    height: 100%;
    background: url(../../assets/image/login_bg.png) top left no-repeat;
    background-size: cover;
    overflow: hidden;
    .main-cont-wrap {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -190px;
      margin-top: -255px;
      box-sizing: border-box;
      width: 380px;
      height: 510px;
      padding: 30px 30px 40px;
      background: #fff;
      box-shadow: 0 20px 30px 0 rgba(63, 63, 65, 0.06);
      border-radius: 10px;
      .pictop {
        height: 80px;
        width: 180px;
        margin: 10px auto;
        img {
          height: 80px;
          width: 180px;
        }
      }
      .ui-form-item {
        position: relative;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e3e3e3;
        box-sizing: border-box;
        .ui-form-txt {
          display: inline-block;
          width: 70px;
          color: #595961;
          font-size: 14px;
          margin-right: 10px;
        }
        .ui-form-input {
          border: 0;
          outline: 0;
          font-size: 14px;
          color: #9797a1;
        }
      }
      .remeberpwd {
        color: #9797a1;
        font-size: 14px;
        float: right;
      }
      .remeberpwd:hover {
        color: #2589ff;
      }
      .ui-form-btn {
        position: absolute;
        bottom: 25px;
        margin-top: 40px;
        .ui-button {
          display: block;
          width: 320px;
          height: 50px;
          text-align: center;
          color: #fff;
          background: #2589ff;
          border-radius: 6px;
          font-size: 16px;
          border: 0;
          outline: 0;
        }
      }
      .ui-button:hover {
        cursor: pointer;
      }
    }
  }
  .header-wrap {
    position: absolute;
    width: 100%;
    top: 0;
    height: 50px;
    z-index: 9;
    overflow: hidden;
    .logo-l {
      margin-top: 25px;
      margin-left: 55px;
      float: left;
      .img {
        border: 0;
        vertical-align: middle;
        width: 135px;
        height: 23px;
      }
    }
  }
}
.g-mt30 {
  margin-top: 30px;
}
.g-mt40 {
  margin-top: 40px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #cccaca;
}
</style>
