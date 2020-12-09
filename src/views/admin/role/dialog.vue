<template>
  <el-dialog
    :title="operation === 'ADD'? '新增角色' : '编辑角色'"
    :visible="dialogVisible"
    width="60%"
    @close="cancle"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      size="small"
      :rules="rules"
      hide-required-asterisk
      status-icon
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input placeholder="不为空，16字以内" v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input placeholder="描述信息" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        @click="Add"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'ADD' || operation === ''"
      >确 定</el-button>
      <el-button
        type="primary"
        @click="updateRole"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'EDIT'"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddRole, UpdateRole } from "@/axios/api/Role";

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
    form: {
      type: Object,
      default: () => ({})
    },
    EditId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    cancle() {
      this.$refs.form.resetFields();
      this.$emit("reset");
    },
    async updateRole() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          UpdateRole(this.EditId, this.form).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.$emit("reset");
            } else {
              this.$message.error({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.$emit("reset");
            }
          });
        } else {
          this.$message.error("表格有错误信息啦~");
          return false;
        }
      });
    },
    async Add() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          AddRole(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.$emit("reset");
            } else {
              this.$message.error({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
            }
          });
        } else {
          this.$message.error("表格有错误信息啦~");
          return false;
        }
      });
    },
  },
  data() {
    return {
      rules: {
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
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
  padding: 16px;
  margin-top: 0px;
}

/deep/ .el-form-item {
  display: inline-block;
  margin-right: 70px;
}
/deep/ .el-form-item__label {
  color: #467fa7;
}

/deep/ .el-dialog__close {
  color: #ffffff;
}

/deep/ .el-input__inner {
  width: 240px;
}
/deep/ .el-textarea__inner {
  width: 400px;
}
</style>
