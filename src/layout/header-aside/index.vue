<template>
  <el-container>
    <el-header class="d-flex">
      <router-link to="/" class="logo-group">
        <img src="@/assets/image/sscm_logo.png" />
      </router-link>
      <div class="toggle-aside-btn" @click="changeButton(isOpen)">
        <FontIcon name="bars"></FontIcon>
      </div>
      <HeaderLeft @SelectIndex="SelectAsideIndex"></HeaderLeft>
      <HeaderRight></HeaderRight>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse? '64px' : '225px'">
        <ContainerAside :Collapse="this.isCollapse" @SelectIndex="SelectLeftIndex"></ContainerAside>
      </el-aside>
      <el-main>
        <Container @changeTag="changeTag"></Container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  setAsideIndex,
  setLeftIndex,
  setTabs,
  setActiveIndex,
  setAsideMenu,
} from "@/store/commit.js";
import HeaderRight from "./components/header-right";
import HeaderLeft from "./components/header-left";
import ContainerAside from "./components/aside";
import Container from "./components/container";
import { GetMenuList, GetMenuTree } from "@/axios/api/Admin";
import { setTreeMenus, setListMenus } from "@/store/commit.js";
export default {
  created() {
    let TreeMenus = JSON.parse(window.sessionStorage.getItem("TreeMenus"));
    let ListMenus = JSON.parse(window.sessionStorage.getItem("ListMenus"));
    if (TreeMenus != null || ListMenus != null) {
      if (TreeMenus.length != 0 && ListMenus.length != 0) {
        setListMenus(this, ListMenus);
        setTreeMenus(this, TreeMenus);
      } else {
        this.getMenuList();
        this.getMenuTree();
      }
    }
    else {
      this.getMenuList();
      this.getMenuTree();
    }
  },
  components: {
    HeaderRight,
    HeaderLeft,
    ContainerAside,
    Container,
  },
  computed: {
    ...mapGetters({
      AsideIndex: "AsideIndex",
      LeftIndex: "LeftIndex",
      Tabs: "Tabs",
      ActiveIndex: "ActiveIndex",
      ListMenus: "ListMenus",
      TreeMenus: "TreeMenus",
    }),
  },
  data() {
    return {
      isCollapse: false,
      isOpen: true,
      TagsIndex: false,
    };
  },
  methods: {
    changeButton(isopen) {
      this.isCollapse = !this.isCollapse;
    },
    SelectAsideIndex(key, keyPath) {
      setAsideIndex(this, keyPath);
      setLeftIndex(this, keyPath);
      let tabs = this.Tabs;
      this.TagsIndex = false;
      let newTabIndex = -1;
      setActiveIndex(this, key);
      if (keyPath[0] != "/index") {
        for (var i in this.TreeMenus) {
          if (this.TreeMenus[i].path === keyPath[0]) {
            setAsideMenu(this, this.TreeMenus[i]);
            break;
          }
        }
      } else {
        setAsideMenu(this, ["/index"]);
      }
      for (var i in tabs) {
        if (tabs[i].path === key) {
          this.TagsIndex = true;
          break;
        }
      }
      if (!this.TagsIndex) {
        for (var i in this.ListMenus) {
          if (this.ListMenus[i].path === key) {
            newTabIndex = i;
            break;
          }
        }
        tabs.push({
          title: this.ListMenus[newTabIndex].fontMenuName,
          path: this.ListMenus[newTabIndex].path,
        });
        setTabs(this, tabs);
      }
    },
    SelectLeftIndex(key, keyPath) {
      setLeftIndex(this, keyPath);
      setAsideIndex(this, keyPath);
      let tabs = this.Tabs;
      this.TagsIndex = false;
      let newTabIndex = -1;
      setActiveIndex(this, key);
      for (var i in tabs) {
        if (tabs[i].path === key) {
          this.TagsIndex = true;
          break;
        }
      }
      if (!this.TagsIndex) {
        for (var i in this.ListMenus) {
          if (this.ListMenus[i].path === key) {
            newTabIndex = i;
            break;
          }
        }
        tabs.push({
          title: this.ListMenus[newTabIndex].fontMenuName,
          path: this.ListMenus[newTabIndex].path,
        });
        setTabs(this, tabs);
      }
    },
    changeTag(changetag) {
      this.$router.push({ path: changetag[1] });
      if (changetag[0] != "/index") {
        for (var i in this.TreeMenus) {
          if (this.TreeMenus[i].path === changetag[0]) {
            setAsideMenu(this, this.TreeMenus[i]);
            break;
          }
        }
        setAsideIndex(this, changetag);
      } else {
        setAsideMenu(this, ["/index"]);
        setAsideIndex(this, ["/index"]);
      }
      setLeftIndex(this, changetag);
    },
    async getMenuList() {
      let username = window.sessionStorage.getItem("username");
      await GetMenuList({ username }).then((res) => {
        if (res.data.code == 200) {
          setListMenus(this, res.data.data);
        }
      });
    },
    async getMenuTree() {
      let username = window.sessionStorage.getItem("username");
      await GetMenuTree({ username }).then((res) => {
        if (res.data.code == 200) {
          setTreeMenus(this, res.data.data);
          //console.log(this.$store.state.AdminModule.TreeMenus)
        }
      });
    },
  },
};
</script>

<style lang="less">
.logo-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  img {
    width: 130px;
    height: 20px;
    margin: 20px 35px;
  }
}
.toggle-aside-btn {
  display: flex;
  float: left;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  color: #606266;
  cursor: pointer;
  &:hover {
    color: #2f74ff;
  }
  i {
    font-size: 20px;
    margin-top: 2px;
  }
}
</style>