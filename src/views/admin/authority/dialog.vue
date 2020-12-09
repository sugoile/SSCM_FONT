<template>
  <el-dialog
    :title="operation === 'ADD'? '新增Api' : '编辑Api'"
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
      <el-form-item label="API名称" prop="apiName">
        <el-input placeholder="不为空，16字以内" v-model="form.apiName"></el-input>
      </el-form-item>
      <el-form-item label="API路径" prop="apiUrl">
        <el-input placeholder="40字以内" v-model="form.apiUrl" :disabled="operation === 'PEDIT'"></el-input>
      </el-form-item>
      <el-form-item label="API方式">
        <el-select v-model="form.apiMethod" :disabled="operation === 'PEDIT'">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父级API">
        <el-cascader
          :options="ParentApis"
          :props="optionProps"
          v-model="selectedParentApi"
          :disabled="operation === 'PEDIT'"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input
          type="textarea"
          placeholder="说明信息,可为空"
          v-model="form.description"
          maxlength="80"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="info" @click="cancle" size="small" icon="el-icon-error">取 消</el-button>
      <el-button
        type="primary"
        @click="addApi"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'ADD'"
      >确 定</el-button>
      <el-button
        type="primary"
        @click="updateApi"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'EDIT'"
      >确 定</el-button>
      <el-button
        type="primary"
        @click="updatePApi"
        size="small"
        icon="el-icon-success"
        v-if="operation === 'PEDIT'"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddApi, UpdateApi, UpdatePApi } from "@/axios/api/Api";

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
    ParentApis: {
      type: Array,
      default: () => {
        return [];
      },
    },
    SelectedParentApi: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    operation: {
      handler(newval) {
        this.selectedParentApi = this.SelectedParentApi;
      },
    },
  },
  methods: {
    cancle() {
      this.$refs.form.resetFields();
      this.selectedParentApi = [0];
      this.$emit("reset");
    },
    async updatePApi(){
      console.log(this.form);
      await this.$refs.form.validate((valid) => {
        if (valid) {
          UpdatePApi(this.form).then((res) => {
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
    async updateApi() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          let pid = 0;
          if (this.selectedParentApi.length == 1) {
            pid = this.selectedParentApi[0];
          } else {
            pid = this.selectedParentApi[1];
          }
          this.form.pid = pid;
          UpdateApi(this.form.id, this.form).then((res) => {
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
    async addApi() {
      await this.$refs.form.validate((valid) => {
        if (valid) {
          let pid = 0;
          if (this.selectedParentApi.length == 1) {
            pid = this.selectedParentApi[0];
          } else {
            pid = this.selectedParentApi[1];
          }
          this.form.pid = pid;
          AddApi(this.form).then((res) => {
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
              this.selectedParentApi = [0];
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
    return {
      rules: {
        apiName: [
          { required: true, message: "Api名称不能为空", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
        apiUrl: [
          {
            max: 40,
            message: "长度不超过 40 个字符",
            trigger: "blur",
          },
        ],
      },
      optionProps: {
        checkStrictly: true,
        value: 'value',
        label: 'apiName',
        children: 'children'
      },
      selectedParentApi: [0],
      options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }],
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
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  height: 204px;
}
</style>
