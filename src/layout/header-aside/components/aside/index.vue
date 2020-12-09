<template>
  <div class="aside-menu">
    <div v-if="AsideIndex == '/index' && Collapse == false" class="header-aside-menu-empty">
      <FontIcon name="inbox"></FontIcon>
      <span>没有侧栏菜单</span>
    </div>
    <el-menu
      :default-active="AsideIndex[1]"
      :collapse="isCollapse"
      :collapse-transition="false"
      :key="AsideIndex[1]"
      v-if="AsideIndex.length == 2"
      @select="handleSelect"
      router
    >
      <el-submenu :index="AsideMenu.path">
        <template slot="title">
          <AliFontIcon :name="AsideMenu.fontIcon"></AliFontIcon>
          <span>{{ AsideMenu.fontMenuName }}</span>
        </template>
        <el-menu-item :index="item.path" v-for="(item, index) in AsideMenu.children" :key="index">
          <AliFontIcon :name="item.fontIcon"></AliFontIcon>
          <span>{{ item.fontMenuName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    Collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      AsideIndex: "AsideIndex",
      AsideMenu: "AsideMenu",
    }),
  },
  watch: {
    Collapse: {
      handler(newval, oldVal) {
        this.isCollapse = this.Collapse;
      },
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.$emit("SelectIndex", key, keyPath);
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang="less" >
.aside-menu {
  height: 100%;
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
</style>