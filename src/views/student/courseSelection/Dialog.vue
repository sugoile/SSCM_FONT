<template>
  <el-dialog
    :title="operation === 'ADD'? '新增课程' : '课程详情/编辑'"
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
      <el-form-item label="课程名称" prop="name">
        <el-input placeholder="不为空" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input placeholder="不为空，且不超过 10 " v-model="form.credit"></el-input>
      </el-form-item>

      <el-form-item label="学时" prop="classHours">
        <el-input placeholder="不为空, 不超过 100 " v-model="form.classHours"></el-input>
      </el-form-item>
      <el-form-item label="教学班" prop="teachingClass">
        <el-input placeholder="不为空" v-model="form.teachingClass"></el-input>
      </el-form-item>
      <el-form-item label="计划类型">
        <el-select v-model="form.planType">
          <el-option
            v-for="item in planTypeOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教师" width="250px">
        <el-select v-model="form.tid">
          <el-option v-for="item in Teachers" :key="item.id" :label="item.tname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="限选人数" prop="limitedElection">
        <el-input placeholder="不为空, 不超过 300" v-model="form.limitedElection"></el-input>
      </el-form-item>
      <el-form-item label="开班人数" prop="classNumber">
        <el-input placeholder="不为空, 不超过 300" v-model="form.classNumber"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'ADD'"
        @click="addCourse()"
      >确 定</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'EDIT'"
        @click="updateCourse()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddCourse, UpdateCourse } from "@/axios/api/Course"
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
    Teachers: {
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
    async updateCourse() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          UpdateCourse(this.form.id, this.form).then((res) => {
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
    async addCourse() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          AddCourse(this.form).then((res) => {
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
    var lessthan10 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        if (isNaN(parseInt(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (parseInt(value) > 10) {
            callback(new Error('要在 10 以内'));
          } else {
            callback();
          }
        }
      }
    };

     var lessthan120 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        if (isNaN(parseInt(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (parseInt(value) > 120) {
            callback(new Error('要在 120 以内'));
          } else {
            callback();
          }
        }
      }
    };

     var lessthan80 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        if (isNaN(parseInt(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (parseInt(value) > 80) {
            callback(new Error('要在 80 以内'));
          } else {
            callback();
          }
        }
      }
    };
    return {
      planTypeOptions: [
        {
          value: '通识课',
        }, {
          value: '选修课',
        },
      ],

      rules: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" },
        ],
        teachingClass: [
          { required: true, message: "教学班不能为空", trigger: "blur" },
        ],
        credit: [
         { validator: lessthan10, trigger: 'blur' }
        ],
        classHours: [
          { validator: lessthan80, trigger: 'blur' }
        ],
        limitedElection: [
          { validator: lessthan120, trigger: 'blur' }
        ],
        classNumber: [
         { validator: lessthan120, trigger: 'blur' }
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