<template>
  <div>
    <el-card>
      <div slot="header" class="card_header">
        <span>基本信息管理</span>
      </div>
      <div class="card_body">
        <div class="left_btn">
          <el-button type="success" icon="el-icon-circle-plus" @click="AddDialogView()">新增</el-button>
          <el-button type="danger" icon="el-icon-error" @click="delView">删除</el-button>
        </div>
        <div class="right_btn">
          <div class="top_state">
            <el-button-group>
              <el-button type="info" icon="el-icon-refresh" @click="Refresh">刷新</el-button>
              <el-button type="info" icon="el-icon-files" style="border-radius: 0px">导出数据</el-button>
            </el-button-group>
          </div>
          <div class="bottom_state">
            <el-input
              placeholder="课程名称/教学班/教师"
              size="small"
              style="width: 235px"
              v-model="query"
              @keyup.enter.native="fuzzySearch"
              @keyup.esc.native="resetSearch"
            ></el-input>
            <el-button icon="el-icon-search" @click="fuzzySearch">搜索</el-button>
            <el-button
              icon="el-icon-delete"
              style="border-radius: 0px 4px 4px 0px"
              @click="resetSearch"
            >重置</el-button>
          </div>
        </div>
      </div>
      <div class="container">
        <el-table
          border
          tooltip-effect="light"
          style="width: 100%;margin-top: 15px;"
          height="449"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="课程名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="教学班">
            <template slot-scope="scope">{{ scope.row.teachingClass }}</template>
          </el-table-column>
          <el-table-column label="教师" width="100px">
            <template slot-scope="scope">{{ scope.row.tname }}</template>
          </el-table-column>
          <el-table-column label="开班人数" width="100px">
            <template slot-scope="scope">{{ scope.row.classNumber }}</template>
          </el-table-column>
          <el-table-column label="已选人数" width="100px">
            <template slot-scope="scope">{{ scope.row.chooseNumber }}</template>
          </el-table-column>
          <el-table-column label="发布" width="70px">
            <template slot-scope="scope">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.states"
                @change="updateStates(scope.row.id, scope.row.states)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="EditDialogView(scope.row)">详情/编辑</el-button>
              <el-button type="text" @click="delOne(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[8 , 16 , 32]"
            :page-size="paginationParam.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationParam.total"
          ></el-pagination>
        </div>
      </div>
    </el-card>

    <Dialog
      :dialogVisible="Dialog"
      :form="form"
      :Teachers="Teachers"
      :operation="operation"
      @reset="Reset"
    ></Dialog>

    <el-dialog
      :visible="deleteVisible"
      width="25%"
      :show-close="false"
      style="margin-top: 18vh;"
      :close-on-click-modal="false"
    >
      <div class="deleteVisible">
        <div class="title">
          <span>删除数据</span>
        </div>
        <div class="content">
          <span v-if="deleteList">您确定要删除选中的数据吗</span>
          <span v-else>您确定要删除本数据吗</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="DelCourse()">我要删除</el-button>
        <el-button type="info" @click="cancleDel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetTeacherNoSelect } from "@/axios/api/Teacher"
import { GetCourse, DelCourseOne, DelCourseList, UpdateStates } from "@/axios/api/Course"
import Dialog from "./Dialog";
import { Nullexpress } from "@/utils/format";


const Form = {
  id: "",
  name: "",
  credit: 2,
  classHours: 2,
  planType: "通识课",
  teachingClass: "",
  tid: 4,
  limitedElection: 60,
  classNumber: 45
};

const QueryParam = {
  query: null,
  pageSize: 8,
  pageNum: 1,
};

const PaginationParam = {
  pageNum: 0,
  pageSize: 0,
  total: 0,
  totalPage: 0,
};
export default {
  created() {
    this.Refresh();
    this.getTeacherNoSelect();
  },
  data() {
    return {
      tableData: [],
      queryParam: Object.assign({}, QueryParam),
      paginationParam: Object.assign({}, PaginationParam),
      query: "",
      Dialog: false,
      operation: "",
      Teachers: [],
      form: {},
      deleteVisible: false,
      deleteList: false,
      multipleSelection: [],
      DelOneId: 0,
    }
  },
  components: {
    Dialog,
  },
  methods: {
    async Refresh() {
      await GetCourse(this.queryParam).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.lists;
          this.paginationParam.pageNum = res.data.data.pageNum;
          this.paginationParam.pageSize = res.data.data.pageSize;
          this.paginationParam.total = res.data.data.total;
          this.paginationParam.totalPage = res.data.data.totalPage;
        }
      });
    },
    resetSearch() {
      this.query = "";
      this.queryParam.query = null;
      this.Refresh();
    },
    fuzzySearch() {
      this.queryParam.query = this.query;
      this.queryParam.pageNum = 1;
      this.Refresh();
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val;
      this.Refresh();
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val;
      this.Refresh();
    },
    EditDialogView(item) {
      this.operation = 'EDIT';
      this.Dialog = true;
      this.form = item;
    },
    AddDialogView() {
      this.operation = 'ADD';
      this.form = Object.assign({}, Form);
      this.Dialog = true;
    },
    Reset() {
      this.Dialog = false;
      this.operation = '';
      this.Department = {};
      this.Refresh(this.Departments);
    },
    async getTeacherNoSelect() {
      await GetTeacherNoSelect().then((res) => {
        if (res.data.code == 200) {
          this.Teachers = res.data.data;
        }
      })
    },
    cancleDel() {
      this.deleteVisible = false;
      this.deleteList = false;
    },
    delView() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          dangerouslyUseHTMLString: true,
          message: "<strong>至少选择一条数据删除</strong>",
        });
      } else {
        this.deleteVisible = true;
        this.deleteList = true;
      }
    },
    delOne(id) {
      this.deleteVisible = true;
      this.DelOneId = id;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async updateStates(id, state) {
      await UpdateStates(id, { states: state }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
          this.Refresh();
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
          this.Refresh();
        }
      });
    },
    async DelCourse() {
      if (this.deleteList) {
        //删除选中
        let ids = [];
        for (var i in this.multipleSelection) {
          ids[i] = this.multipleSelection[i].id;
        }
        let params = new URLSearchParams();
        params.append("ids", ids);
        await DelCourseList(params).then(
          (res) => {
            if (res.data.code == 200) {
              this.$message.success({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
            } else {
              this.$message.error({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
            }
            this.Refresh();
          }
        );
      } else {
        //删除id
        await DelCourseOne(this.DelOneId).then((res) => {
          if (res.data.code == 200) {
            this.$message.success({
              message: "<strong>" + res.data.message + "~</strong>",
              dangerouslyUseHTMLString: true,
            });
          } else {
            this.$message.error({
              message: "<strong>" + res.data.message + "~</strong>",
              dangerouslyUseHTMLString: true,
            });
          }
          this.Refresh();
        });
      }
      this.deleteVisible = false;
      this.deleteList = false;
    },
  },
  filters: {
    nullexpress(value) {
      return Nullexpress(value);
    },
  },
}
</script>

<style lang="less" scoped>
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
.container {
  .el_btn {
    padding: 4px 5px;
  }
  .pagination {
    float: right;
    display: block;
    margin: 10px 0;
  }
}
/deep/ .el-table td,
/deep/ .el-table th {
  text-align: center;
  padding-top: 6px;
  padding-bottom: 5.5px;
}
.deleteVisible {
  .title {
    span {
      display: block;
      padding: 0;
      color: #595959;
      font-weight: 600;
      text-align: center;
      font-size: 24px;
      margin-bottom: 16px;
    }
  }
  .content {
    span {
      display: block;
      text-align: center;
      margin: 0;
      padding: 0;
      color: #545454;
      font-weight: 300;
      line-height: normal;
      font-family: inherit;
      font-size: 18px;
    }
  }
}
/deep/ .el-dialog__footer {
  margin-top: 10px;
  text-align: center;
}
</style>