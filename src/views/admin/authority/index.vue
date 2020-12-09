<template>
  <div>
    <el-card>
      <div slot="header" class="card_header">
        <span style="padding: 2px 0">权限管理</span>
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          class="addBtn"
          @click="AddApiDialog()"
        ></el-button>
      </div>
      <div class="card_body collapse">
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in this.ApiTree" :key="index">
            <template slot="title">
              <span class="custom-tree-node">
                <span>
                  <strong>
                    <i class="fontName">{{ item.apiName }}</i>
                  </strong>
                </span>
                <span style="margin-left: 30px">
                  <el-button-group>
                    <el-button
                      size="mini"
                      icon="el-icon-success"
                      class="el_btn"
                      type="success"
                      @click.stop="EditPApiDialog(item)"
                    >编辑</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete-solid"
                      class="el_btn"
                      @click.stop="DelPApi(item)"
                    >删除</el-button>
                  </el-button-group>
                  <strong style="margin-left: 30px">
                    <i class="dataSort">{{ item.sort }}</i>
                  </strong>
                </span>
              </span>
            </template>
            <div class="Pchildrencollapse">
              <el-collapse accordion>
                <el-collapse-item v-for="(Pchildren, index) in item.children" :key="index">
                  <template slot="title">
                    <span class="custom-tree-node">
                      <span>
                        <strong>
                          <i class="fontPName">{{ Pchildren.apiName }}</i>
                        </strong>
                      </span>
                      <span style="margin-left: 30px">
                        <el-button-group>
                          <el-button
                            size="mini"
                            icon="el-icon-success"
                            class="el_btn"
                            type="success"
                            @click.stop="EditPApiDialog(Pchildren)"
                          >编辑</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete-solid"
                            class="el_btn"
                            @click.stop="DelPApi(Pchildren)"
                          >删除</el-button>
                        </el-button-group>
                        <strong style="margin-left: 40px">
                          <i class="dataSort">{{ Pchildren.sort }}</i>
                        </strong>
                      </span>
                    </span>
                  </template>
                  <div v-for="(children, index) in Pchildren.children" :key="index">
                    <span class="childrenTree">
                      <div style="display: flex; flex: 1;  justify-content: space-between;">
                        <div style="width: 450px">
                          <strong>
                            <i class="childrenName">{{ children.apiName }}</i>
                            <span>: {{ children.apiUrl }}</span>
                          </strong>
                        </div>
                        <span
                          class="apiMethod"
                          :style="children.apiMethod === 'POST'? 'color: #b7436c': ''"
                        >{{ children.apiMethod }}</span>
                        <div style="margin-right: 40px">
                          <el-button-group>
                            <el-button
                              size="mini"
                              icon="el-icon-question"
                              class="el_btn"
                              type="primary"
                              @click="assignView(children)"
                            >分配</el-button>
                            <el-button
                              size="mini"
                              icon="el-icon-success"
                              class="el_btn"
                              type="success"
                              @click="EditApiDialog(Pchildren, children)"
                            >编辑</el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              icon="el-icon-delete-solid"
                              class="el_btn"
                              @click="DelOne(children.id)"
                            >删除</el-button>
                          </el-button-group>
                        </div>
                      </div>
                      <span style="margin-left: 30px">
                        <strong>
                          <i class="dataSort">{{ children.sort }}</i>
                        </strong>
                      </span>
                    </span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <Dialog
      :dialogVisible="dialogVisible"
      :operation="operation"
      @reset="Reset"
      :form="form"
      :EditId="EditId"
      :ParentApis="ParentApis"
      :SelectedParentApi="SelectedParentApi"
    ></Dialog>

    <AssignDialog
      :dialogVisible="assignDialog"
      @reset="assignReset"
      :ApiID="ApiID"
      :Apiname="Apiname"
      :assignData="assignData"
      :LinkLists="LinkLists"
    ></AssignDialog>

    <el-dialog :visible="deleteVisible" width="25%" :show-close="false" style="margin-top: 18vh;" :close-on-click-modal="false">
      <div class="deleteVisible">
        <div class="title">
          <span>删除数据</span>
        </div>
        <div class="content">
          <span v-if="deleteP">您确定要删除该父类API吗</span>
          <span v-else>您确定要删除该API吗</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-popover placement="top-start" width="200" trigger="hover">
          <p v-if="deleteP">
            该父类
            <strong>
              <i style="color: red">{{ this.DeletePApis.apiName }}</i>
            </strong> API总共拥有
            <strong>
              <i style="color: red">{{ this.DeletePApis.children.length }}</i>
            </strong> 子API, 确认删除?
          </p>
          <p v-else>
            该API与
            <strong>
              <i style="color: red">{{ this.LinkRolesNumber }}</i>
            </strong> 角色连接, 确认删除?
          </p>
          <el-button slot="reference" type="danger" v-if="deleteP" @click="DelPRENTAPI()">我要删除</el-button>
          <el-button slot="reference" type="danger" @click="DEL()" v-else>我要删除</el-button>
        </el-popover>
        <el-button type="info" @click="cancleDel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetApiTree, CheckLinkRole, GetOneAndTwoApis, DelApi } from "@/axios/api/Api"
import {
  GetAssignRoleList,
} from "@/axios/api/Admin";
import Dialog from "./dialog"
import AssignDialog from "./assignDialog"

const Form = {
  pid: 0,
  apiName: '',
  apiMethod: 'GET',
  apiUrl: '',
  description: '',
}

export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      ApiTree: [],
      operation: "",
      dialogVisible: false,
      form: Object.assign({}, Form),
      EditId: 0,
      assignDialog: false,
      ApiID: 0,
      Apiname: "",
      assignData: [],
      LinkLists: [],
      ParentApis: [],
      SelectedParentApi: [],
      deleteVisible: false,
      deleteP: false,
      DeletePApis: [],
      DeleteApiID: 0,
      LinkRolesNumber: 0,
    }
  },
  components: {
    Dialog,
    AssignDialog
  },
  methods: {
    async Refresh() {
      await GetApiTree().then((res) => {
        if (res.data.code == 200) {
          this.ApiTree = res.data.data;
        }
      });
    },
    Reset() {
      this.form = Object.assign({}, Form);
      this.operation = "";
      this.dialogVisible = false;
      this.Refresh();
    },
    assignReset() {
      this.assignDialog = false;
      this.ApiID = 0;
      this.Apiname = "";
      this.assignData = [];
      this.LinkLists = [];
    },
    AddApiDialog() {
      this.operation = "ADD";
      this.dialogVisible = true;
      this.SelectedParentApi = [0];
      this.getOneAndTwoApis();
    },
    EditApiDialog(Pchildren, item) {
      this.SelectedParentApi = [];
      this.operation = "EDIT";
      this.dialogVisible = true;
      this.form = item;
      this.SelectedParentApi[0] = Pchildren.pid;
      this.SelectedParentApi[1] = item.pid;
      this.getOneAndTwoApis();
    },
    EditPApiDialog(item) {
      this.SelectedParentApi = [];
      this.operation = "PEDIT";
      this.dialogVisible = true;
      this.form = item;
      this.SelectedParentApi[0] = item.pid;
      this.getOneAndTwoApis();
    },
    async getOneAndTwoApis() {
      await GetOneAndTwoApis().then(res => {
        if (res.data.code == 200) {
          const zeroApi = {
            value: 0,
            apiName: '0级菜单'
          }
          this.ParentApis = res.data.data;
          this.ParentApis.unshift(zeroApi);
        }
      })
    },
    async assignView(item) {
      this.assignDialog = true;
      this.ApiID = item.id;
      this.Apiname = item.apiName;
      await GetAssignRoleList().then(res => {
        if (res.data.code == 200) {
          this.assignData = res.data.data;
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
      })
      await CheckLinkRole(this.ApiID).then(res => {
        if (res.data.code == 200) {
          this.LinkLists = res.data.data;
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
      })
    },
    DelPApi(item) {
      this.DeletePApis = item;
      this.deleteVisible = true;
      this.deleteP = true;
    },
    async DelOne(id) {
      this.DeleteApiID = id;
      this.deleteVisible = true;
      this.deleteP = false;
      this.LinkRolesNumber = 0;
      await CheckLinkRole(id).then(res => {
        if (res.data.code == 200) {
          this.LinkRolesNumber = res.data.data.length;
        } else {
          this.$message.error({
            message: "<strong>" + res.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
      })
    },
    cancleDel() {
      this.DeletePApis = [];
      this.deleteVisible = false;
      this.deleteP = false;
      this.DeleteApiID = 0;
      this.LinkRolesNumber = 0;
    },
    DelPRENTAPI() {
      this.$message.warning({
        message: "<strong>最好还是不要删除父API啦！这里只是演示使用~</strong>",
        dangerouslyUseHTMLString: true,
      });
      this.cancleDel();
    },
    async DEL() {
      //删除id
      await DelApi(this.DeleteApiID).then((res) => {
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
      this.cancleDel();
    },
  }
}
</script>

<style lang="less" scoped>
.collapse {
  margin: 5px;
  margin-bottom: 3px;
}
.fontName {
  font-family: verdana;
  font-size: 16px;
  color: #2388ed;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
.fontPName {
  font-family: verdana;
  font-size: 14px;
  color: #4293d6;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
/deep/ .el-card__header {
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.card_header {
  color: #797979;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 8px;
}
.dataSort {
  font-family: verdana;
  font-size: 15px;
  color: #e2231a;
  font-weight: 700;
  display: inline-block;
  margin-right: 15px;
}
.childrenTree {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 15px;
}
.childrenName {
  font-family: verdana;
  color: #508aba;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
.card_body {
  height: 554px;
  overflow: overlay;
}
.Pchildrencollapse {
  padding: 0 20px;
  overflow: overlay;
}
.apiMethod {
  font-family: verdana;
  color: #6fba3d;
  font-weight: 700;
  display: inline-block;
  font-style: normal;
}
.el_btn {
  padding: 6px 8px;
}
.addBtn {
  height: 25px;
  width: 45px;
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
  /deep/ .el-button {
    margin-right: 10px;
  }
}
</style>