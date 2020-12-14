<template>
  <el-container>
    <el-aside width="200px">
      <div class="aside-menu">
        <el-menu :default-active="this.$route.path" router>
          <el-menu-item index="/students/StudentUser">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="/students/Course">
            <i class="el-icon-document"></i>
            <span slot="title">个人选课</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
</script>

<style lang="less" scoped>
.aside-menu {
  height: 100%;
  border-right: 1px solid #95b8e7;
  .el-menu {
    background-color: transparent !important;
    border-right: none !important;
    i {
      display: inline-block;
      font-size: 16px;
      width: 14px;
      margin-right: 4px;
    }
  }
}

.el-submenu.is-active .el-submenu__title,
.el-submenu.is-active .el-submenu__title i {
  background: none !important;
  color: #2f74ff;
}
.header-aside-menu-empty {
  display: flex;
  height: 160px;
  margin: 10px;
  margin-top: 0;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.03);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  i {
    font-size: 30px;
    margin-bottom: 10px;
    color: #606266;
  }
  span {
    font-size: 14px;
    color: #606266;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &:hover span,
  &:hover i {
    color: #404042;
  }
}
/deep/ .main {
  position: relative;
}
</style>