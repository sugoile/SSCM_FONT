<template>
  <el-dialog
    :visible="dialogVisible"
    width="80%"
    :title="Department.dname + ' 人员信息'"
    close-on-press-escape
    :close-on-click-modal="false"
    @close="cancle"
  >
    <div class="card_body">
      <div class="left_btn">
        <el-button type="success" icon="el-icon-circle-plus">新增</el-button>
        <el-button type="danger" icon="el-icon-error">删除</el-button>
      </div>
      <div class="right_btn">
        <div class="top_state">
          <el-button-group>
            <el-button type="info" icon="el-icon-refresh">刷新</el-button>
            <el-button type="info" icon="el-icon-files" style="border-radius: 0px">导出数据</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <el-table
      border
      tooltip-effect="light"
      style="width: 100%;margin-top: 15px;"
      height="448"
      :data="Department.staff"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">{{ scope.row.dstaff.name }}</template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">{{ scope.row.dposition.name }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-edit-outline"
              class="el_btn"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete-solid"
              class="el_btn"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    Department: {
      type: Object,
    },
    EditId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    cancle() {
      this.$emit("reset");
    },
  }
}
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
  margin-right: 70px;
  margin-bottom: 25px;
}
/deep/ .el-form-item__label {
  color: #467fa7;
}

/deep/ .el-dialog__close {
  color: #ffffff;
}

.card_body {
  padding: 0;
  display: flex;
  justify-content: space-between;
  .left_btn {
    .el-button {
      padding: 7px 10px;
      margin-right: 2px;
    }
    .el-button + .el-button {
      margin: 0 2px !important;
    }
  }
  .right_btn {
    display: flex;
    flex-direction: column;
    .top_state {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      .el-button {
        background-color: #6c757d;
        border-color: #6c757d;
        padding: 7px 10px;
        color: #fff;
        &:hover {
          background-color: #5a6268;
          border-color: #545b62;
          color: #fff;
        }
      }
    }
    .bottom_state {
      display: flex;
      /deep/ .el-input__inner {
        padding: 0 10px;
        border-right: none;
        border-radius: 4px 0px 0px 4px;
      }
      .el-button {
        height: 32px;
        margin-left: 0;
        border-left: none;
        border-radius: 0px;
        background-color: #6c757d;
        border-color: #6c757d;
        color: #fff;
        padding: 7px 10px;
        &:hover {
          background-color: #5a6268;
          border-color: #545b62;
          color: #fff;
        }
      }
    }
  }
}
</style>