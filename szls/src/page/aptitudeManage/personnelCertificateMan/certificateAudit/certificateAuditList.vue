<template>
  <div class="certificate">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">发证时间：</span>
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable></el-date-picker>-
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable></el-date-picker>
      </div>
      <el-button type="primary" @click="query()" class="iconfont iconchaxun">查询</el-button>
      <el-button type="primary" class="iconfont icondaochu">导出</el-button>
      <div class="search-item chooseType">
        <span class="title-span">证书状态：</span>
        <el-select placeholder="请选择" v-model="searchData.taskType" style="width: 160px" clearable>
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
    <auditModel :auditModel="auditModel"></auditModel>
  </div>
</template>

<script>
import tableView from "../../../../components/table/el-index.vue";
import auditModel from "./component/auditModel.vue";
import {} from "../../../../api/aptitudeManage/personnelCertificateMan/index.js";
export default {
  components: {
    tableView,
    auditModel
  },
  data() {
    return {
      auditModel: {
        dialogVisible: false
      },
      searchData: {
        taskType: "" //任务类型
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
      list: [
        {
          id: "24",
          title: "编号3",
          state: 0
        },
        {
          id: "23",
          title: "编号3",
          state: 1
        },
        {
          id: "23",
          title: "编号3",
          state: 2
        },
        {
          id: "2",
          title: "编号3",
          state: 0
        },
        {
          id: "223",
          title: "编号3",
          state: 1
        },
        {
          id: "2444",
          title: "编号3",
          state: 1
        }
      ], // table数据
      tablePar: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        showIndex: true //是否显示选择框
      }, // table 的参数
      columns: [
        {
          prop: "title",
          label: "姓名",
          align: "center"
        },
        {
          prop: "title",
          label: "单位及职务",
          align: "center"
        },
        {
          prop: "title",
          label: "职务",
          align: "center"
        },
        {
          prop: "title",
          label: "执法有效期",
          align: "center"
        },
        {
          prop: "title",
          label: "执法证编号",
          align: "center"
        },
        {
          prop: "title",
          label: "证书状态",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  on: {
                    click: () => {
                      this.edit();
                    }
                  }
                },
                this.getText(1, params.row.state)
              )
            ]);
          }
        },
        {
          prop: "title",
          label: "状态",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  on: {
                    click: () => {
                      this.edit();
                    }
                  }
                },
                this.getText(2, params.row.state)
              )
            ]);
          }
        },
        {
          prop: "state",
          label: "操作",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("a", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.edit();
                    }
                  }
                },
                "审核"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.edit();
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      pageInfo: {
        currentPage: 2,
        pageSize: 10,
        total: 100,
        handleSizeChange: val => {
          console.log(val);
        },
        handleCurrentChange: val => {
          console.log(val);
        }
      }
    };
  },
  methods: {
    // 选中行
    handleSelectionChange(val) {
      console.log("val:", val);
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
        //状态
        if (value == 1) {
          return "通过";
        } else if (value == 2) {
          return "驳回";
        }
      }
    },
    //证书审核列表
    getCertificateAuditList() {
      let that = this;
      let data = {
        pageIndex: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
      };
      that.tablePar.loading = true;
      getCertificateAudit(data)
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
    //查询
    query() {},
    edit() {
      this.auditModel.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.certificate {
  padding-left: 15px;
}
.search-content {
  padding: 10px 28px 0;
  border: 1px solid #dedede;
  height: 60px;
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

.applyList-action {
  text-align: left;
  padding-top: 10px;
}

.table-view {
  margin-top: 10px;
}
</style>
