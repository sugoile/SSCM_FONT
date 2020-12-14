<template>
  <div>
    <div class="panel layout-panel">
      <div class="panel-header">
        <div class="panel-title">课程列表</div>
      </div>
      <div class="datagrid-toolbar">
        <div style="float:right;display: flex">
          <i class="el-icon-search" style="margin-top: 5px;margin-right: 5px"></i>
          <el-input placeholder="课程名"></el-input>
        </div>
      </div>
      <div class="datagrid-view">
        <div class="panel-body-noheader">
          <el-table
            :data="tableData"
            :header-row-style="{height:'34px'}"
            :header-cell-style="{padding:'0px'}"
            :row-style="{height:'34px'}"
            :cell-style="{padding:'0px'}"
            style="width: 100%"
            height="174px"
          >
            <el-table-column label="课程名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="学分">
              <template slot-scope="scope">{{ scope.row.credit }}</template>
            </el-table-column>
            <el-table-column label="学时">
              <template slot-scope="scope">{{ scope.row.classHours }}</template>
            </el-table-column>
            <el-table-column label="计划类型">
              <template slot-scope="scope">{{ scope.row.planType }}</template>
            </el-table-column>
            <el-table-column label="教学班" width="200px">
              <template slot-scope="scope">{{ scope.row.teachingClass }}</template>
            </el-table-column>
            <el-table-column label="开班人数">
              <template slot-scope="scope">{{ scope.row.classNumber }}</template>
            </el-table-column>
            <el-table-column label="限选人数">
              <template slot-scope="scope">{{ scope.row.limitedElection }}</template>
            </el-table-column>
            <el-table-column label="已选人数">
              <template slot-scope="scope">{{ scope.row.chooseNumber }}</template>
            </el-table-column>
            <el-table-column label="查看该课程选课的学生">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="getChooseCourceByCID(scope.row.id, scope.row.name)"
                  :disabled="scope.row.chooseNumber == 0"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="panel" style="bottom: 0px">
      <div class="panel-header">
        <div class="panel-title">学生列表</div>
      </div>
      <div class="panel-body">
        <div class="panel">
          <div class="panel-body-noheader">
            <div class="datagrid-toolbar">
              <div style="float:right;display: flex">
                <i class="el-icon-search" style="margin-top: 5px;margin-right: 5px"></i>
                <el-input placeholder="学号/姓名/院系名称"></el-input>
              </div>
            </div>
            <div class="datagrid-view">
              <el-table
                :data="chooseCourses"
                :header-row-style="{height:'34px'}"
                :header-cell-style="{padding:'0px'}"
                :row-style="{height:'34px'}"
                :cell-style="{padding:'0px'}"
                style="width: 100%"
                height="410px"
              >
              <el-table-column label="课程名">
                  <template>{{ this.courseName }}</template>
                </el-table-column>
                <el-table-column label="学号">
                  <template slot-scope="scope">{{ scope.row.sno }}</template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="院系名称" width="250px">
                  <template slot-scope="scope">{{ scope.row.dname }}</template>
                </el-table-column>
                <el-table-column label="班级">
                  <template slot-scope="scope">{{ scope.row.classes }}</template>
                </el-table-column>
                <el-table-column label="所在年级">
                  <template slot-scope="scope">{{ scope.row.grade }}</template>
                </el-table-column>
                <el-table-column label="评分">
                  <template slot-scope="scope">
                    <input
                      class="ui-form-input"
                      style="width: 40px;height: 20px;text-align: center"
                      v-model="scope.row.score"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="确认该评分">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      @click="submit(scope.row.id, scope.row.score)"
                    >确认</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[11, 20, 30]"
              :page-size="11"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <div
            style="height: 22px; width: 100%;"
            class="panel-body panel-body-noheader layout-body"
          >
            <div
              style="font-family: sans-serif; font-size: 13px;color: red; margin-left:5px; letter-spacing:1.5px;"
            >评分提示：{{ Tips }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCourceByTID, ScoreToS, GetChooseCourceByCID, } from "@/axios/api/SORT"
export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      Tips: '需要填写完分数后，再按一下确认分数按钮',
      currentPage: 1,
      total: 0,
      tableData: [],
      chooseCourses: [],
      courseID: 0,
      courseName: '',
    }
  },
  methods: {
    Refresh() {
      this.getCourceByTID(window.sessionStorage.getItem("id"));
    },
    async getCourceByTID(id) {
      await GetCourceByTID(id).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.length;
        }
        else {
          this.$message.error({
            message: "<strong>" + res.data.data.message + "~</strong>",
            dangerouslyUseHTMLString: true,
          });
        }
      })
    },
    async getChooseCourceByCID(id, name) {
      await GetChooseCourceByCID(id, {tid: window.sessionStorage.getItem("id")}).then(res => {
        if (res.data.code == 200) {
          this.chooseCourses = res.data.data;
          this.courseID = id;
          this.courseName = name;
        }
      })
    },
    async submit(id, score) {
      if (isNaN(parseInt(score))) {
        this.$message.error({
          message: "<strong>输入整数类型的哇~</strong>",
          dangerouslyUseHTMLString: true,
        });
      } else {
        if (parseInt(score) > 100 || parseInt(score) < 0) {
          this.$message.error({
            message: "<strong>满分为100~</strong>",
            dangerouslyUseHTMLString: true,
          });
        } else {
          await ScoreToS({ Tid: window.sessionStorage.getItem("id"), Sid: id, Cid: this.courseID, score: parseInt(score) }).then(res => {
            if (res.data.code == 200) {
              this.$message.success({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.Refresh();
              this.getChooseCourceByCID(this.courseID);
            }
            else {
              this.$message.error({
                message: "<strong>" + res.data.message + "~</strong>",
                dangerouslyUseHTMLString: true,
              });
              this.Refresh();
              this.getChooseCourceByCID(this.courseID);
            }
          })
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.panel {
  left: 0px;
  position: absolute;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
  width: 100%;
}
.panel-header {
  border-color: #95b8e7;
  background-color: #e0ecff;
  background: -webkit-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: -moz-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: -o-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: linear-gradient(to bottom, #eff5ff 0, #e0ecff 100%);
  background-repeat: repeat-x;
  padding: 5px;
  position: relative;
  border-width: 1px;
  border-style: solid;
}
.panel-title {
  font-weight: bold;
  font-size: 12px;
  color: #0e2d5f;
  height: 12px;
  line-height: 12px;
}
.panel-body {
  overflow: auto;
  background-color: #ffffff;
  color: #000000;
  border-color: #95b8e7;
  border-width: 1px;
  border-style: solid;
  border-top-width: 0px;
  height: 502px;
}
.panel-body-noheader {
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  color: #000000;
  border-color: #95b8e7;
  border-top-width: 1px;
  border-width: 1px;
  border-style: solid;
}
.datagrid-toolbar {
  height: 24px;
  border-color: #dddddd;
  background: #f4f4f4;
  padding: 2px 5px;
  border-width: 0 0 1px 0;
  border-style: solid;
}
/deep/ .el-input__inner {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}
.datagrid-view {
  position: relative;
  overflow: hidden;
  font-size: 12px;
}
/deep/ .el-table td,
/deep/ .el-table th {
  text-align: center;
  font-size: 12px;
}
.layout-panel {
  left: 0px;
  overflow: hidden;
  font-size: 12px;
  text-align: left;
  z-index: 2;
}
/deep/ .el-pagination {
  padding: 5px 5px;
}
</style>