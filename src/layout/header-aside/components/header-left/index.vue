<template>
  <div class="theme-header-menu">
    <div class="theme-header-menu__content">
      <div class="theme-header-menu__scroll">
        <el-menu
          mode="horizontal"
          :default-active="LeftIndex.length == 1? '/index' : LeftIndex[1]"
          @select="handleSelect"
          router
          :key="LeftIndex.length == 1? '/index' : LeftIndex[1]"
        >
          <el-menu-item index="/index">
            <FontIcon name="home"></FontIcon>
            <span>首页</span>
          </el-menu-item>
          <el-submenu :index="item.path" v-for="(item) in TreeMenus" :key="item.id">
            <template slot="title">
              <AliFontIcon :name="item.fontIcon" class="fontstyle"></AliFontIcon>
              <span>{{ item.fontMenuName }}</span>
            </template>
            <el-menu-item
              :index="children.path"
              v-for="(children) in item.children"
              :key="children.id"
            >
              <AliFontIcon :name="children.fontIcon"></AliFontIcon>
              {{ children.fontMenuName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      LeftIndex: "LeftIndex",
      TreeMenus: "TreeMenus",
    }),
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      this.$emit("SelectIndex", key, keyPath);
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
.theme-header-menu {
  display: flex;
  position: relative;
  padding: 0 20px;
  overflow: hidden;
  .theme-header-menu__content {
    overflow: hidden;
    .theme-header-menu__scroll {
      white-space: nowrap;
      position: relative;
      transition: transform 0.3s;
      float: left;
      ul {
        display: flex;
        float: left;
        background-color: transparent;
        .el-menu-item {
          line-height: 58px;
        }
        li {
          color: #404042;
          &:hover {
            background: hsla(0, 0%, 100%, 0.5);
          }
          &:hover i,
          &:hover span {
            color: #2f74ff;
          }
          .el-submenu__title {
            color: #404042;
            background-color: transparent;
          }
          i {
            color: #404042;
            font-size: 16px;
          }
        }
      }
    }
  }
}
.el-submenu.is-active .el-submenu__title {
  background: hsla(0, 0%, 100%, 0.5) !important;
  color: #2f74ff !important;
}
.el-submenu.is-active .fontstyle {
  color: #2f74ff !important;
}
.el-submenu__title {
  padding: 0 12px;
}
</style>