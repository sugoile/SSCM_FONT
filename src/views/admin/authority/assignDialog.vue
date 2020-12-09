<template>
  <el-dialog :visible="dialogVisible" width="60%" @close="cancle" :close-on-click-modal="false">
    <span slot="title">
      <strong>
        <span style="color: #dba532">{{ this.Apiname }}</span>
      </strong> - 分配角色
    </span>
    <el-checkbox-group v-model="checkedRole">
      <el-checkbox v-for="item in assignData" :label="item.id" :key="item.id">{{item.roleName}}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button type="primary" size="small" icon="el-icon-success" @click="AssignRole()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AssignApiToRole } from "@/axios/api/Api";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    ApiID: {
      type: Number,
      default: 0,
    },
    Apiname: {
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
      checkedRole: this.LinkLists,
    };
  },
  watch: {
    LinkLists: {
      handler(newval) {
        this.checkedRole = this.LinkLists;
      },
    },
  },
  methods: {
    cancle() {
      this.$emit("reset");
    },
    async AssignRole() {
      let data = new URLSearchParams();
      data.append("ids", this.checkedRole);
      await AssignApiToRole(this.ApiID, data).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "<strong>分配Api成功, 分配给角色数 <i style='color: red'>" + res.data.data + "</i> ~</strong>",
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
  text-align: center;
}
/deep/ .el-dialog__close {
  color: #ffffff;
}
/deep/ .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-checkbox {
    width: calc((100% - 75px) / 3);
    color: #797979;
    margin: 0;
    padding: 0 5px;
    margin-bottom: 15px;
    height: 33px;
    line-height: 33px;
  }
}
</style>
