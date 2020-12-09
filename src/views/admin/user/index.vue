<template>
  <div>
    <el-card>
      <div slot="header" class="card_header">
        <span>用户管理</span>
      </div>
      <div class="card_body">
        <div class="left_btn">
          <el-button type="success" icon="el-icon-circle-plus" @click="AddUserDialog()">新增</el-button>
          <el-button type="danger" icon="el-icon-error" @click="delView">删除</el-button>
          <el-button type="warning" icon="el-icon-s-operation" @click="assignView">分配角色</el-button>
        </div>
        <div class="right_btn">
          <div class="top_state">
            <el-button-group>
              <el-button type="info" icon="el-icon-refresh" @click="Refresh">刷新</el-button>
              <el-dropdown :hide-on-click="false">
                <el-button type="info" icon="el-icon-menu">
                  列
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in checkBox"
                    :key="index"
                    style="padding: 0"
                  >
                    <el-checkbox
                      :label="item"
                      style="width: 100px; padding-left: 20px"
                      v-model="checkBoxOpen[index]"
                    ></el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="info" icon="el-icon-files" style="border-radius: 0px">导出数据</el-button>
            </el-button-group>
          </div>
          <div class="bottom_state">
            <el-input
              placeholder="账户/用户名"
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
          :data="tableData"
          tooltip-effect="light"
          style="width: 100%;margin-top: 15px;"
          height="449"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="账号" v-if="!checkBoxOpen[0]">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column label="用户名" v-if="!checkBoxOpen[1]">
            <template slot-scope="scope">{{ scope.row.nickName }}</template>
          </el-table-column>
          <el-table-column label="创建时间" width="160" v-if="!checkBoxOpen[2]">
            <template slot-scope="scope">{{ scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column label="登录时间" width="160" v-if="!checkBoxOpen[3]">
            <template slot-scope="scope">{{ scope.row.loginTime | nullexpress}}</template>
          </el-table-column>
          <el-table-column label="邮箱" show-overflow-tooltip width="220" v-if="!checkBoxOpen[4]">
            <template slot-scope="scope">{{ scope.row.email }}</template>
          </el-table-column>
          <el-table-column label="开启" width="70px" v-if="!checkBoxOpen[5]">
            <template slot-scope="scope">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
                @change="updateStatus(scope.row.id, scope.row.status)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" v-if="!checkBoxOpen[6]">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-edit-outline"
                  class="el_btn"
                  @click="EditUserDialog(scope.row.id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete-solid"
                  class="el_btn"
                  @click="delOne(scope.row.id)"
                >删除</el-button>
              </el-button-group>
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
      :dialogVisible="dialogVisible"
      :operation="operation"
      @reset="Reset"
      :form="form"
      :EditId="EditId"
    ></Dialog>

    <AssignDialog
      :dialogVisible="assignDialog"
      @reset="assignReset"
      :adminID="adminID"
      :adminname="adminname"
      :assignData="assignData"
      :LinkLists="LinkLists"
    ></AssignDialog>

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
        <el-button type="danger" @click="DelAdmin()">我要删除</el-button>
        <el-button type="info" @click="cancleDel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetAdminList,
  DelAdminOne,
  DelAdminList,
  GetEditAdmin,
  UpdateStatu,
  GetAssignRoleList,
  CheckLinkRole,
  AssignAdminToRole,
} from "@/axios/api/Admin";
import { Nullexpress } from "@/utils/format";
import Dialog from "./dialog";
import AssignDialog from "./assignDialog"

const EditForm = {
  username: "",
  password: "",
  nickName: "",
  ConfirmPassword: "",
  email: "",
  note: "",
};

const AddForm = {
  username: "",
  password: "",
  nickName: "",
  email: "",
  note: "",
};

export const QueryParam = {
  query: null,
  pageSize: 8,
  pageNum: 1,
};

export const PaginationParam = {
  pageNum: 0,
  pageSize: 0,
  total: 0,
  totalPage: 0,
};

export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      tableData: [],
      dialog: false,
      operation: "",
      dialogVisible: false,
      deleteVisible: false,
      deleteList: false,
      multipleSelection: [],
      DelOneId: 0,
      EditId: 0,
      queryParam: Object.assign({}, QueryParam),
      paginationParam: Object.assign({}, PaginationParam),
      query: "",
      checkBoxOpen: [false, false, false, false, false, false, false],
      checkBox: [
        "账号",
        "用户名",
        "创建时间",
        "登录时间",
        "邮箱",
        "开启",
        "操作",
      ],
      form: {},
      assignDialog: false,
      adminID: 0,
      adminname: "",
      assignData: [],
      LinkLists: [],
    };
  },
  components: {
    Dialog,
    AssignDialog,
  },
  methods: {
    AddUserDialog() {
      this.operation = "ADD";
      this.dialogVisible = true;
      this.form = Object.assign({}, AddForm);
    },
    EditUserDialog(ID) {
      this.operation = "EDIT";
      this.dialogVisible = true;
      this.EditId = ID;
      this.getEditAdmin(ID);
    },
    Reset() {
      if (this.operation === "ADD") {
        this.form = Object.assign({}, AddForm);
      } else if (this.operation === "EDIT") {
        this.form = Object.assign({}, EditForm);
      }
      this.operation = "";
      this.dialogVisible = false;
      this.Refresh();
    },
    assignReset() {
      this.assignDialog = false;
      this.adminID = 0;
      this.adminname = "";
      this.assignData = [];
      this.LinkLists = [];
    },
    async assignView() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          type: "warning",
          dangerouslyUseHTMLString: true,
          message: "<strong>只能选择一条数据删除</strong>",
        });
      } else {
        this.assignDialog = true;
        this.adminID = this.multipleSelection[0].id;
        this.adminname = this.multipleSelection[0].username;
        await GetAssignRoleList().then((res) => {
          if (res.data.code == 200) {
            this.assignData = res.data.data;
          } else {
            this.$message.error({
              message: "<strong>" + res.data.message + "~</strong>",
              dangerouslyUseHTMLString: true,
            });
          }
        });
        await CheckLinkRole(this.adminID).then((res) => {
          if (res.data.code == 200) {
            this.LinkLists = res.data.data;
          } else {
            this.$message.error({
              message: "<strong>" + res.data.message + "~</strong>",
              dangerouslyUseHTMLString: true,
            });
          }
        });
      }
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val;
      this.Refresh();
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val;
      this.Refresh();
    },
    fuzzySearch() {
      this.queryParam.query = this.query;
      this.queryParam.pageNum = 1;
      this.Refresh();
    },
    resetSearch() {
      this.query = "";
      this.queryParam.query = null;
      this.Refresh();
    },
    async updateStatus(id, statu) {
      await UpdateStatu(id, { status: statu }).then((res) => {
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
    async getEditAdmin(ID) {
      await GetEditAdmin(ID).then((res) => {
        let result;
        let ResultNULL = true;
        if (res.data.code == 200) {
          result = res.data.data;
          ResultNULL = false;
        } else {
          this.$message.error({
            message: "<strong>获取编辑用户失败啦~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
        if (!ResultNULL) {
          this.form = {
            username: result.username,
            password: "",
            nickName: result.nickName,
            ConfirmPassword: "",
            email: result.email,
            note: result.note,
          };
        } else {
          this.operation = "";
          this.dialogVisible = false;
          this.Refresh();
        }
      });
    },
    async Refresh() {
      const id = window.sessionStorage.getItem("ID");
      await GetAdminList(id, this.queryParam).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.lists;
          this.paginationParam.pageNum = res.data.data.pageNum;
          this.paginationParam.pageSize = res.data.data.pageSize;
          this.paginationParam.total = res.data.data.total;
          this.paginationParam.totalPage = res.data.data.totalPage;
        }
      });
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
    async DelAdmin() {
      if (this.deleteList) {
        //删除选中
        let ids = [];
        for (var i in this.multipleSelection) {
          ids[i] = this.multipleSelection[i].id;
        }
        let params = new URLSearchParams();
        params.append("ids", ids);
        await DelAdminList(window.sessionStorage.getItem("ID"), params).then(
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
        await DelAdminOne(window.sessionStorage.getItem("ID"), {
          id: this.DelOneId,
        }).then((res) => {
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
};
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
}

/deep/ .el-dialog__body {
  padding: 0;
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