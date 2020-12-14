<template>
  <el-dialog
    :title="operation === 'ADD'? '新增教师' : '教师详情/编辑'"
    :visible="dialogVisible"
    width="80%"
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
      <el-form-item label="教工号" prop="sno">
        <el-input placeholder="不为空，4字" v-model="form.tno"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="tname">
        <el-input placeholder="不为空, 10 字以内" v-model="form.tname"></el-input>
      </el-form-item>

      <el-form-item label="学历" prop="education">
        <el-input placeholder="不为空, 10 字以内" v-model="form.education"></el-input>
      </el-form-item>
      <el-form-item label="主讲课程" prop="maincourse">
        <el-input placeholder="不为空, 16 字以内" v-model="form.maincourse"></el-input>
      </el-form-item>
      <el-form-item label="副讲课程" prop="secondcourse">
        <el-input placeholder="不为空, 16 字以内" v-model="form.secondcourse"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input placeholder="不为空, 10 字以内" v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex">
          <el-option
            v-for="item in sexsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在院系" width="250px">
        <el-select v-model="form.deptid">
          <el-option
            v-for="item in Departments"
            :key="item.id"
            :label="item.dName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在校区">
        <el-select v-model="form.campus">
          <el-option
            v-for="item in campusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录密码" prop="password" v-if="operation === 'ADD'">
        <el-input placeholder="不为空，16字以内" v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="ConfirmPassword" v-if="operation === 'ADD'">
        <el-input placeholder="不为空，16字以内" v-model="form.ConfirmPassword" type="password"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'ADD'"
        @click="addTeacher()"
      >确 定</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'EDIT'"
        @click="updateTeacher()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddTeacher, UpdateTeacher } from "@/axios/api/Teacher"
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
    Departments: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    cancle() {
      this.$refs.form.resetFields();
      this.$emit("reset");
    },
    async updateTeacher() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          UpdateTeacher(this.form.id, this.form).then((res) => {
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
    async addTeacher() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          AddTeacher(this.form).then((res) => {
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
    var confirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      campusOptions: [
        {
          value: '肇庆学院',
          label: '肇庆学院'
        }, {
          value: '肇庆学院星湖校区',
          label: '肇庆学院星湖校区'
        },
      ],
      sexsOptions: [
        {
          label: '男',
          value: 1,
        }, {
          label: '女',
          value: 0,
        },
      ],

      rules: {
        tno: [
          { required: true, message: "教工号不能为空", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度为4个字符",
            trigger: "blur",
          },
        ],
        tname: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        education: [
          { required: true, message: "学历不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        position: [
          { required: true, message: "职位不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        maincourse: [
          { required: true, message: "主讲课程不能为空", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        secondcourse: [
          { required: true, message: "副讲课程不能为空", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        ConfirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
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
}

/deep/ .el-form-item {
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 40px;
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
</style>