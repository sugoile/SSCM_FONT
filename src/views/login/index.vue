<template>
  <div class="login">
    <div class="header-wrap">
      <div class="logo-l f-fl">
        <router-link to="/login">
          <img src="../../assets/image/sscm_logo.png" />
        </router-link>
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
            <input class="ui-form-input" placeholder="请输入用户账号" type="text" v-model="username" />
          </div>
          <div class="ui-form-item g-mt30">
            <span class="ui-form-txt">登录密码</span>
            <input class="ui-form-input" placeholder="请输入密码" type="password" v-model="password" />
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
import { GetMenuList, GetMenuTree } from "@/axios/api/Admin";
import { setTreeMenus, setListMenus } from "@/store/commit.js";
import {
  setAsideIndex,
  setLeftIndex,
  setTabs,
  setActiveIndex,
  setAsideMenu,
} from "@/store/commit.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      if (
        this.username === "" ||
        this.username === null ||
        this.password === "" ||
        this.password === null
      ) {
        this.$message.error({
          message:
            "<strong> 用户账号 </strong> 和<strong> 登录密码 </strong>不能为空~",
          dangerouslyUseHTMLString: true,
        });
      } else {
        await login(this.username, this.password).then((res) => {
          if (res.data.code == 200) {
            window.sessionStorage.clear();
            setAsideIndex(this, ["/index"]);
            setLeftIndex(this, ["/index"]);
            setAsideMenu(this, []);
            setTabs(this, [{
              title: "首页",
              path: "/index",
            }]);
            setActiveIndex(this, "/index");
            setTreeMenus(this, []);
            setTreeMenus(this, []);
            window.sessionStorage.setItem("ID", res.data.data.ID);
            window.sessionStorage.setItem(
              "Authorities",
              res.data.data.Authorities
            );
            window.sessionStorage.setItem("username", res.data.data.Username);
            window.sessionStorage.setItem("nickname", res.data.data.nickName);
            window.sessionStorage.setItem("token", res.data.data.token);

            GetMenuTree({ username: res.data.data.Username }).then((res) => {
              if (res.data.code == 200) {
                setTreeMenus(this, res.data.data);
                window.sessionStorage.setItem("TreeMenus", JSON.stringify(res.data.data));
              }
            });

            GetMenuList({ username: res.data.data.Username }).then((res) => {
              if (res.data.code == 200) {
                setListMenus(this, res.data.data);
                window.sessionStorage.setItem("ListMenus", JSON.stringify(res.data.data));
              }
            });

            this.$message.success(res.data.data.nickName + "登录成功");
            this.$router.push("/index");
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
