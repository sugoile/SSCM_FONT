<template>
  <el-dialog
    :visible="dialogVisible"
    :width="operation === 'assignUser'? '50%' : '40%' "
    @close="cancle"
    :close-on-click-modal="false"
  >
    <span slot="title" v-if="operation === 'assignUser'">
      <strong>
        <span style="color: #dba532">{{ this.rolename }}</span>
      </strong> - 分配用户
    </span>
    <span slot="title" v-if="operation === 'assignMenu'">
      <strong>
        <span style="color: #dba532">{{ this.rolename }}</span>
      </strong> - 分配菜单
    </span>
    <span slot="title" v-if="operation === 'assignApi'">
      <strong>
        <span style="color: #dba532">{{ this.rolename }}</span>
      </strong> - 分配权限
    </span>
    <div :class="operation === 'assignUser'?'' : 'diabody'">
      <el-checkbox-group v-model="checkedUser" v-if="operation === 'assignUser'">
        <el-checkbox v-for="item in assignData" :label="item.id" :key="item.id">{{item.username}}</el-checkbox>
      </el-checkbox-group>
      <el-tree
        v-if="operation === 'assignMenu'"
        :data="assignData"
        show-checkbox
        node-key="id"
        highlight-current
        :default-expand-all="true"
        :default-checked-keys="this.LinkLists"
        ref="Menutree"
      >
        <span slot-scope="{ data }" class="custom-tree-node">
          <span>
            <AliFontIcon :name="data.fontIcon" style="margin-right: 3px"></AliFontIcon>
            {{ data.fontMenuName }}
          </span>
          <span>
            <strong>
              <i class="dataSort">{{ data.sort }}</i>
            </strong>
          </span>
        </span>
      </el-tree>
      <el-tree
        v-if="operation === 'assignApi'"
        :data="assignData"
        show-checkbox
        node-key="id"
        highlight-current
        :default-expand-all="true"
        :default-checked-keys="this.LinkLists"
        ref="Apitree"
      >
        <span slot-scope="{ data }" class="custom-tree-node">
          <span>{{ data.apiName }}</span>
          <span>
            <strong>
              <i class="dataSort">{{ data.sort }}</i>
            </strong>
          </span>
        </span>
      </el-tree>
    </div>
    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'assignUser' || operation === ''"
        @click="AssignUser()"
      >确 定</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-receiving"
        v-if="operation === 'assignMenu'"
        @click="AssignMenu()"
      >保存</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-receiving"
        v-if="operation === 'assignApi'"
        @click="AssignApi()"
      >保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AssignRoleToAdmin, AssignRoleToMenu, AssignRoleToApi } from "@/axios/api/Role";
export default {
  props: {
    operation: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    roleID: {
      type: Number,
      default: 0,
    },
    rolename: {
      type: String,
      default: "",
    },
    assignData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    LinkLists: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      checkedUser: this.LinkLists,
      checkedMenu: this.LinkLists,
    };
  },
  watch: {
    LinkLists: {
      handler(newval) {
        if (this.operation === "assignUser") {
          this.checkedUser = this.LinkLists;
        }
      },
    },
  },
  methods: {
    cancle() {
      this.$emit("reset");
    },
    async AssignUser() {
      let data = new URLSearchParams();
      data.append("ids", this.checkedUser);
      await AssignRoleToAdmin(this.roleID, data).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "<strong>分配用户成功, 分配用户数 <i style='color: red'>" + res.data.data + "</i> ~</strong>",
            dangerouslyUseHTMLString: true,
          });
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
        this.$emit("reset");
      });
    },
    async AssignMenu() {
      let data = new URLSearchParams();
      data.append("ids", this.$refs.Menutree.getCheckedKeys());
      await AssignRoleToMenu(this.roleID, data).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "<strong>分配菜单成功, 分配菜单数 <i style='color: red'>" + res.data.data + "</i> ~</strong>",
            dangerouslyUseHTMLString: true,
          });
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
        this.$emit("reset");
      });
    },
    async AssignApi() {
      let data = new URLSearchParams();
      data.append("ids", this.$refs.Apitree.getCheckedKeys());
      await AssignRoleToApi(this.roleID, data).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "<strong>分配权限成功, 分配权限数 <i style='color: red'>" + res.data.data + "</i> ~</strong>",
            dangerouslyUseHTMLString: true,
          });
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
        this.$emit("reset");
      });
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  padding: 10px 15px;
  background-color: #5899c8;
  background-image: linear-gradient(to bottom, #5893be 0%, #63a6d7 100%);
  border-bottom: 1px solid #dee2e6;
  border-color: #3581b8;
}
/deep/ .el-dialog__body {
  padding: 12px 20px;
}
/deep/ .el-dialog__title {
  color: #ffffff;
}
/deep/ .el-dialog__footer {
  border-color: #3581b8;
  border-top: 1px solid #dee2e6;
  padding: 12px;
  margin-top: 0px;
}
/deep/ .el-dialog__close {
  color: #ffffff;
}
/deep/ .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-checkbox {
    height: 33px;
    line-height: 33px;
    width: calc((100% - 75px) / 4);
    color: #797979;
    margin: 0;
    padding: 0 5px;
    margin-bottom: 15px;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.diabody {
  height: 450px;
  overflow: overlay;
}

.dataSort {
  font-family: verdana;
  font-size: 15px;
  color: #e2231a;
  font-weight: 700;
  display: inline-block;
  margin-right: 15px;
}
</style>
