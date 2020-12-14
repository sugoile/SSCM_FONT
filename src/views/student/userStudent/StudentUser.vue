<template>
  <div>
    <div class="panel" style="display: block; width: auto;">
      <div class="panel-header" style="width: auto;">
        <div class="panel-title">个人校内信息</div>
        <div class="panel-tool"></div>
      </div>
      <div class="easyui-panel panel-body" style="padding: 10px; width: auto; height: auto;">
        <el-form ref="form" label-width="120px" size="mini">
          <el-col :span="8">
            <el-form-item label="学号：">{{ studentInfo.sno }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：">{{ studentInfo.name }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入学日期：">{{ studentInfo.admissionTime }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="院系名称：">{{ studentInfo.dname }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级：">{{ studentInfo.classes }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在年级：">{{ studentInfo.grade }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在校区：">{{ studentInfo.campus }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学生状态：">{{ studentInfo.studentStatus | studentStatusFilfter }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学籍状态：">{{ studentInfo.studyStatus | studyStatusFilfter }}</el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetStudentByID } from "@/axios/api/SORT"
export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      studentInfo: {},
    };
  },
  methods: {
    async Refresh() {
      await GetStudentByID(window.sessionStorage.getItem("id")).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.studentInfo = res.data.data;
        }
      });
    },
  },
  filters: {
    studentStatusFilfter(value) {
      if (value == 1) {
        return '在读';
      } else if (value == 2) {
        return '毕业';
      } else if (value == 0) {
        return '退学';
      } else {
        return '未知';
      }
    },
    studyStatusFilfter(value) {
      if (value == 1) {
        return '有学籍';
      } else if (value == 0) {
        return '无学籍';
      } else {
        return '未知';
      }
    },
  }
};
</script>

<style lang="less" scoped>
.panel {
  overflow: hidden;
  font-size: 12px;
  text-align: left;
}
.panel-header {
  background-color: #e0ecff;
  background: -webkit-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: -moz-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: -o-linear-gradient(top, #eff5ff 0, #e0ecff 100%);
  background: linear-gradient(to bottom, #eff5ff 0, #e0ecff 100%);
  background-repeat: repeat-x;
}
.panel-header,
.panel-body {
  border-color: #95b8e7;
}
.panel-header {
  padding: 5px;
  position: relative;
}
.panel-header,
.panel-body {
  border-width: 1px;
  border-style: solid;
}
.panel-body {
  background-color: #ffffff;
  color: #000000;
}
.panel-header,
.panel-body {
  border-color: #95b8e7;
}
.panel-body {
  overflow: auto;
  border-top-width: 0px;
}
.panel-header,
.panel-body {
  border-width: 1px;
  border-style: solid;
}
.panel-title {
  font-weight: bold;
  color: #0e2d5f;
  height: 16px;
  line-height: 16px;
}
.xjkp-table {
  min-width: 980px;
}
table {
  width: 100%;
}
.xjkp-table tr td {
  padding: 0.8em 0;
}
/deep/ .el-form-item__label {
  font-size: 12px;
}
/deep/ .el-input__inner {
  height: 24px;
  line-height: 24px;
}
/deep/ .el-form-item__content {
  font-size: 12px;
}
</style>