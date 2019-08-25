<template>
  <div class="certificate">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">发证时间：</span>
        <el-date-picker
          type="date"
          v-model="searchData.fzStartTime"
          placeholder="请选择日期"
          style="width: 180px"
          clearable
        ></el-date-picker>&nbsp;-
        <el-date-picker
          type="date"
          v-model="searchData.fzEndTime"
          placeholder="请选择日期"
          style="width: 180px"
          clearable
        ></el-date-picker>
      </div>
      <div class="search-item chooseType">
        <span class="title-span">姓名：</span>
        <el-input placeholder="请输入姓名" v-model="searchData.ryxm" style="width: 180px"></el-input>
      </div>
      <el-button type="primary" @click="query()" class="iconfont iconchaxun">查询</el-button>
      <el-button type="primary" @click="exportData()" class="iconfont icondaochu">导出</el-button>
      <div class="search-item chooseType" style="margin-top:10px">
        <span class="title-span">证书状态：</span>
        <el-select placeholder="请选择证书状态" v-model="searchData.zfzzt" style="width: 160px" clearable>
          <el-option
            v-for="item in certificateStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        @handleSelectionChange="handleSelectionChange"
        :options="tablePar"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <certificateModel :certificateModel="certificateModel" v-if="certificateModel.dialogVisible"></certificateModel>
  </div>
</template>

<script>
import tableView from "../../../../components/table/el-index.vue";
import certificateModel from "./component/certificateModel.vue";
import {
  getManagement,
  exportMessage
} from "../../../../api/aptitudeManage/personnelCertificateMan/index.js";
export default {
  components: {
    tableView,
    certificateModel
  },
  data() {
    return {
      certificateModel: {
        dialogVisible: false,
        id: ""
      },
      searchData: {
        fzStartTime: null, //发证开始日期
        fzEndTime: null, //发证结束日期
        ryxm: null, //姓名
        zfzzt: null //证件状态
      },
      //证书状态
      certificateStatus: [
        {
          value: "1",
          label: "注销"
        },
        {
          value: "2",
          label: "已过期"
        },
        {
          value: "3",
          label: "正常"
        },
        {
          value: "4",
          label: "延续"
        }
      ],
      list: [], // table数据
      tablePar: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        showIndex: true //是否显示选择框
      }, // table 的参数
      columns: [
        {
          prop: "ryxm",
          label: "姓名",
          align: "center"
        },
        {
          prop: "zzjgmc",
          label: "单位",
          align: "center"
        },
        {
          prop: "zwmc",
          label: "职务",
          align: "center"
        },
        {
          prop: "bmmc",
          label: "执法有效期",
          align: "center",
          width: "200px",
          render: (h, params) => {
            return h("div", [h("span", this.getValidity(params.row))]);
          }
        },
        {
          prop: "zfzbh",
          label: "执法证编号",
          width: "100px",
          align: "center"
        },
        {
          prop: "title",
          label: "证书状态",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", this.getText(1, params.row.zfzzt))]);
          }
        },
        {
          prop: "title",
          label: "数据状态",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", this.getText(2, params.row.state))]);
          }
        },
        {
          prop: "state",
          label: "操作",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.edit(params.row.rybh);
                    }
                  }
                },
                "延续申请"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.edit(params.row.rybh);
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.logoutClick(params.row.rybh);
                    }
                  }
                },
                "注销"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.submitClick(params.row.rybh);
                    }
                  }
                },
                "提交"
              )
            ]);
          }
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 100,
        handleSizeChange: val => {
          console.log(val);
        },
        handleCurrentChange: val => {
          console.log(val);
        }
      },
      selectList: []
    };
  },
  methods: {
    // 选中行
    handleSelectionChange(val) {
      console.log("val:", val.length);
      this.selectList = val;
    },
    //查询
    query() {
      this.pageInfo.currentPage = 1;
      this.getManagementList();
    },
    //导出
    exportData() {
      console.log(this.searchData);
      if (//检索框数据为空 复选框没有选择任何一条数据
        this.selectList.length === 0 &&
        !this.searchData.fzStartTime  &&
        !this.searchData.fzStartTime  &&
        !this.searchData.zfzzt  &&
        !this.searchData.ryxm 
      ) {
        this.$message({
          message: "请选择要导出的数据",
          type: "warning"
        });
        return;
      }
      let data = "";
      let params;
      if (this.selectList.length > 0) {
        //复选框勾选
        for (let item in this.selectList) {
          data += this.selectList[item].rybh + ",";
        }
        data = data.substring(0, data.length - 1);
        params={
          rybhs:data,
          fzStartTime:this.searchData.fzStartTime,
          fzEndTime:this.searchData.fzEndTime,
          ryxm:this.searchData.ryxm,
          zfzzt:this.searchData.zfzzt,
        }
      } else {
        //复选框没有勾选，检索项有输入数据
      }
      exportMessage(params)
        .then(actionMethod)
        .catch(actionMethod);
      function actionMethod(response) {
        console.log(typeof response)
        if (response && response.infoCode === 200) {

          
        }
      }
    },
    //编辑
    edit(id) {
      this.certificateModel.id = id;
      this.certificateModel.dialogVisible = true;
    },
    //注销
    logoutClick(id) {
      this.$confirm("注销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info", 
            message: "已取消注销"
          });
        });
    },
    submitClick(id) {
      this.$confirm("提交, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    },
    //执法证有效期
    getValidity(row) {
      return row.zfzyxksri + "至" + row.zfzyxjsri;
    },
    //证书管理列表
    getManagementList() {
      let that = this;
      let data = {
        pageIndex: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        zfzzt: this.searchData.zfzzt,
        ryxm: this.searchData.ryxm,
        fzEndTime: this.searchData.fzStartTime,
        fzStartTime: this.searchData.fzStartTime
      };
      that.tablePar.loading = true;
      getManagement(data)
        .then(actionMethod)
        .catch(actionMethod);
      function actionMethod(response) {
        that.tablePar.loading = false;
        if (response && response.infoCode === 200) {
          console.log(response.data);
          that.list = response.data.list;
          that.pageInfo.total = response.data.total || 0;
        }
      }
    },
    //证书状态
    /**
     * type : 1证书状态 2 数据状态
     */
    getText(type, value) {
      if (type == 1) {
        //证书状态
        if (value == 1) {
          return "正常";
        } else if (value == 2) {
          return "过期";
        }
      } else if (type == 2) {
        //数据状态
        if (value == 1) {
          return "通过";
        } else if (value == 2) {
          return "驳回";
        }
      }
    }
  },
  mounted: function() {
    this.getManagementList();
  },
  watch: {}
};
</script>

<style scoped>
.certificate {
  padding-left: 15px;
}
.search-content {
  padding: 10px 28px 0;
  border: 1px solid #dedede;
  height: 120px;
}

.search-item {
  float: left;
  margin-left: 10px;
  width: 48%;
  height: 40px;
}

.chooseType {
  width: 26%;
}
.table-view {
  margin-top: 10px;
}
</style>
