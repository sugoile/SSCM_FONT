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
            <el-form-item label="教工号：">{{ teacherInfo.tno }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：">{{ teacherInfo.tname }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：">{{ teacherInfo.sex | sexFilfter }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历：">{{ teacherInfo.education }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在院系名称：">{{ teacherInfo.dname }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在校区：">{{ teacherInfo.campus }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位：">{{ teacherInfo.position }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主讲课程：">{{ teacherInfo.maincourse }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="副讲课程：">{{ teacherInfo.secondcourse }}</el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetTeacherByID } from "@/axios/api/SORT"
export default {
  created() {
    this.Refresh();
  },
  data() {
    return {
      teacherInfo: {},
    };
  },
  methods: {
    async Refresh() {
      await GetTeacherByID(window.sessionStorage.getItem("id")).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.teacherInfo = res.data.data;
        }
      });
    },
  },
  filters: {
    sexFilfter(value) {
      if (value == 1) {
        return '男';
      } else if (value == 0) {
        return '女';
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