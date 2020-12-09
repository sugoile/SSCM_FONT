<template>
  <div class="container-main">
    <!-- 菜单 -->
    <el-tabs type="card" v-model="activeTab" @tab-remove="removeTab" @tab-click="selectIndex">
      <el-tab-pane
        v-for="(item) in Tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="isTabClosable(item)"
      ></el-tab-pane>
    </el-tabs>

    <!-- 内容主体 -->
    <div class="container-main-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setTabs, setActiveIndex } from "@/store/commit.js";
export default {
  data() {
    return {};
  },
  computed: {
    activeTab: {
      set(val) {
        this.$store.commit("SET_ACTIVEINDEX", val);
      },
      get() {
        return this.ActiveIndex;
      },
    },
    ...mapGetters({
      Tabs: "Tabs",
      ActiveIndex: "ActiveIndex",
    }),
  },
  methods: {
    isTabClosable(page) {
      return page.path !== "/index";
    },
    selectIndex(tab, event) {
      let changetag = [];
      changetag[0] = "/" + tab.name.split("/")[1];
      changetag[1] = tab.name;
      this.$emit("changeTag", changetag);
    },
    removeTab(targetName) {
      let tabs = this.Tabs;
      let activeName = this.ActiveIndex;
      let originalActiveName = activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.path;
            }
          }
        });
      }
      setTabs(
        this,
        tabs.filter((tab) => tab.path !== targetName)
      );
      setActiveIndex(this, activeName);
      if (originalActiveName === targetName) {
        let changetag = [];
        changetag[0] = "/" + this.ActiveIndex.split("/")[1];
        changetag[1] = this.ActiveIndex;
        this.$emit("changeTag", changetag);
      }
    },
  },
};
</script>

<style lang="less">
.container-main {
  display: flex;
  padding-right: 20px;
  padding-top: 2px;
  flex-direction: column;
  .container-main-body {
    border: 1px solid#cfd7e5;
    border-radius: 5px;
    border-top: none;
    background: #fff;
    padding: 15px 15px 5px 15px;
  }
}
.el-tabs__item {
  color: #606266;
  background-color: rgba(0, 0, 0, 0.03);
}
.el-tabs__item.is-active {
  color: #2f74ff;
  background-color: #fff;
  border-bottom-color: #fff;
  border-radius: 4px 4px 0 0;
}
.el-tabs__header {
  margin: 0;
}
</style>