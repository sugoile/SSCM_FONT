<template>
  <div>
    <el-card>
      <div slot="header" class="card_header">
        <span>部门和院系信息管理</span>
      </div>
      <div class="card_body">
        <div class="left_btn">
          <el-button type="success" icon="el-icon-school">院系/部门</el-button>
          <el-button type="primary" icon="el-icon-office-building">机构</el-button>
          <el-button type="warning" icon="el-icon-user-solid">人员信息</el-button>
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
              placeholder="院系/部门"
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
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="院系/部门名称">
            <template slot-scope="scope">{{ scope.row.dname }}</template>
          </el-table-column>
          <el-table-column label="所属机构">
            <template slot-scope="scope">{{ scope.row.institution.name }}</template>
          </el-table-column>
          <el-table-column label="人员信息">
            <template slot-scope="scope">
              <el-button type="text" @click="StaffView(scope.row)">查看相关工作人员</el-button>
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

    <StaffDialog
      :dialogVisible="staffDialog"
      :Department="Department"
      @reset="Reset"
    ></StaffDialog>
  </div>
</template>

<script>
import { GetDepartment, } from "@/axios/api/Department";
import StaffDialog from "./staffDialog";
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
  },
  data() {
    return {
      tableData: [],
      queryParam: Object.assign({}, QueryParam),
      paginationParam: Object.assign({}, PaginationParam),
      query: "",
      staffDialog: false,
      Department: {},
    }
  },
  components: {
    StaffDialog,
  },
  methods: {
    async Refresh() {
      await GetDepartment(this.queryParam).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.lists;
          this.paginationParam.pageNum = res.data.data.pageNum;
          this.paginationParam.pageSize = res.data.data.pageSize;
          this.paginationParam.total = res.data.data.total;
          this.paginationParam.totalPage = res.data.data.totalPage;
          console.log(res.data.data);
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
    StaffView(item) {
      this.staffDialog = true;
      this.Department = item;
    },
    Reset() {
      this.staffDialog = false;
      this.Refresh();
    },
  }

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
</style>