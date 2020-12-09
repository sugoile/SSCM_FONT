<template>
  <el-dialog
    :title="operation === 'ADD'? '新增用户' : '编辑用户'"
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
      <el-form-item label="用户账号" prop="username">
        <el-input
          placeholder="不为空，16字以内"
          v-model="form.username"
          :disabled="operation === 'ADD'? false : true"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" v-if="operation === 'ADD' || operation === ''">
        <el-input placeholder="不为空，16字以内" v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="nickName">
        <el-input placeholder="不为空，16字以内" v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" v-if="operation === 'EDIT'">
        <el-input placeholder="不为空，16字以内" v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="ConfirmPassword" v-if="operation === 'EDIT'">
        <el-input placeholder="不为空，16字以内" v-model="form.ConfirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱号" prop="email">
        <el-input placeholder="不为空" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="说明信息">
        <el-input
          type="textarea"
          placeholder="说明信息,可为空"
          v-model="form.note"
          maxlength="80"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        @click="register"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'ADD'"
      >确 定</el-button>
      <el-button
        type="primary"
        @click="updateAdmin"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'EDIT'"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Register, UpdateAdmin } from "@/axios/api/Admin";

export default {
  props: {
    operation: {
      type: String,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
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
    async updateAdmin() {
      console.log(this.form);
      await this.$refs.form.validate((valid) => {
        if (valid) {
          UpdateAdmin(this.EditId, this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.$emit("reset");
            }else {
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
    async register() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          Register(this.form).then((res) => {
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
  },
  data() {
    var confirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        username: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
        ConfirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
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
}

/deep/ .el-form-item {
  display: inline-block;
  margin-right: 70px;
  margin-bottom: 25px;
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
