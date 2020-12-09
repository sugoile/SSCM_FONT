<template>
  <div class="header-right">
    <div class="dropdown" v-for="(item, index) in dataList" :key="index">
      <!-- <el-badge :value="item.value">
        <router-link to="#">
          <FontIcon :name="item.icon"></FontIcon>
        </router-link>
      </el-badge> -->
    </div>
    <div class="user">
      <router-link to="#">
        <el-popover placement="bottom" :title="username" width="200" trigger="hover">
          <el-button type="primary" size="mini" plain round icon="el-icon-switch-button">注销</el-button>
          <el-button type="primary" size="mini" plain round icon="el-icon-user">个人中心</el-button>
          <el-button slot="reference">
            <img src="@/assets/image/computer.png" />
          </el-button>
        </el-popover>
      </router-link>
    </div>
  </div>
</template>

<script>
import { dataList } from "./dataList";
export default {
  name: "header-right",
  data() {
    return {
      dataList,
      username: "您好！Admin",
    };
  },
  methods: {
  },
};
</script>

<style lang="less">
.header-right {
  width: 406px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-left: auto;
  .dropdown {
    margin-top: 4px;
    cursor: pointer;
    padding: 0px 10px;
    a {
      display: flex;
      padding: 15px 16px;
      border-radius: 4px;
      margin: 0 !important;
      color: #606266;
      &:hover {
        color: #2f74ff;
        background-color: #fff;
      }
      i {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: 16px;
      }
    }
  }
  .user {
    cursor: pointer;
    margin: 0px 10px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    border-radius: 4px;
    margin: 0 !important;
    .el-button {
      background: transparent;
      border: none;
      padding: 0;
      width: 32px;
      height: 25px;
      img {
        width: 32px;
        height: 25px;
        border-radius: 4px;
        margin-right: 8px;
      }
      span {
        font-size: 15px;
        color: #606266;
      }
    }
  }
}
</style>