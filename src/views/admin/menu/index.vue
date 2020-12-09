<template>
  <div class="collapse">
    <el-card>
      <div slot="header" class="card_header">
        <span>菜单列表</span>
      </div>
      <div class="card_body">
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in this.MenuTree" :key="index">
            <template slot="title">
              <span class="custom-tree-node">
                <span>
                  <AliFontIcon :name="item.fontIcon" style="margin-right: 10px"></AliFontIcon>
                  <strong>
                    <i class="fontName">{{ item.fontMenuName }}</i>
                    <span>: {{ item.path }}</span>
                  </strong>
                </span>
                <span style="margin-left: 30px">
                  <strong>
                    <i class="dataSort">{{ item.sort }}</i>
                  </strong>
                </span>
              </span>
            </template>
            <div v-for="(children, index) in item.children" :key="index">
              <span class="childrenTree">
                <span>
                  <AliFontIcon :name="children.fontIcon" style="margin-right: 10px"></AliFontIcon>
                  <strong>
                    <i class="childrenName">{{ children.fontMenuName }}</i>
                    <span>: {{ children.path }}</span>
                  </strong>
                </span>
                <span style="margin-left: 30px">
                  <strong>
                    <i class="dataSort">{{ children.sort }}</i>
                  </strong>
                </span>
              </span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetMenuTree } from "@/axios/api/Menu"
export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      MenuTree: [],
    }
  },
  methods: {
    async Refresh() {
      await GetMenuTree().then((res) => {
        if (res.data.code == 200) {
          this.MenuTree = res.data.data;
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.collapse {
  margin: 5px;
  margin-bottom: 10px;
}
.fontName {
  font-family: verdana;
  font-size: 14px;
  color: #2388ed;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
/deep/ .el-card__header {
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.card_header {
  color: #797979;
  font-size: 14px;
  font-weight: 400;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.dataSort {
  font-family: verdana;
  font-size: 15px;
  color: #e2231a;
  font-weight: 700;
  display: inline-block;
  margin-right: 15px;
}
.childrenTree {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 15px;
}
.childrenName {
  font-family: verdana;
  color: #4284c7;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
.card_body {
  height: 554px;
  overflow: overlay;
}
</style>