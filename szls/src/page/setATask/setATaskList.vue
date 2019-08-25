<template>
  <div class="setATask">
    <div class="search-content">
      <div class="search-item chooseType">
        <span class="title-span">任务类型：</span>
        <el-select placeholder="请选择" v-model="searchData.rwlxId" style="width: 160px" clearable>
          <el-option
            v-for="item in taskType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item chooseType">
        <span class="title-span">检查单位：</span>
        <el-select placeholder="请选择" v-model="searchData.jcdw_id" style="width: 160px" clearable>
          <el-option
            v-for="item in checkUnit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item chooseType">
        <span class="title-span">状态：</span>
        <el-select placeholder="请选择" v-model="searchData.jhzt" style="width: 160px" clearable>
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item" style="margin-top:10px">
        <span class="title-span">任务执行时间：</span>
        <el-date-picker type="date" v-model="searchData.rwqsr" placeholder="选择日期" style="width: 180px" clearable></el-date-picker>-
        <el-date-picker type="date" v-model="searchData.rwjsr" placeholder="选择日期" style="width: 180px" clearable></el-date-picker>
      </div>
      <el-button type="primary" class="iconfont iconchaxun">查询</el-button>
    </div>
    <div style="margin-top:10px">
      <el-Button type="primary" class="iconfont iconxinzeng" @click="addTask()">新增</el-Button>
    </div>
    <el-table
      ref="mutipleTable"
      :data="tableData"
      :border="true"
      highlight-current-row
      :header-cell-style="{'background':'#FAFAFA','color':'#333','font-weight':'600'}"
      style="width: 100%;margin-top:20px"
      :default-expand-all="true"
    >
      <el-table-column type="expand" width="60px" label="折叠" style="display:none">
        <template slot-scope="props" style="padding:0">
          <tableView
            v-if="props.row.children"
            :list="props.row.children"
            :options="tablePar"
            :columns="columns"
          ></tableView>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column property="name" label="任务编号" align="center"></el-table-column>
      <el-table-column property="name" label="任务名称" align="center"></el-table-column>
      <el-table-column property="name" label="任务类型" align="center"></el-table-column>
      <el-table-column property="name" label="任务执行时间" align="center"></el-table-column>
      <el-table-column property="name" label="被检单位类型" align="center"></el-table-column>
      <el-table-column property="name" label="检查单位" align="center"></el-table-column>
      <el-table-column property="name" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <taskModel :taskModel="taskModel"></taskModel>
    <subTaskModel :subTaskModel="subTaskModel"></subTaskModel>
  </div>
</template>
<script>
import taskModel from "./component/taskModel.vue";
import subTaskModel from "./component/subTaskModel.vue";
import tableView from "../../components/table/el-index";
import {getDictionaryList,getSetTask} from "../../api/setTask/index.js";
export default {
  components: {
    taskModel,
    subTaskModel,
    tableView
  },
  data() {
    return {
      taskModel: {
        dialogVisible: false
      },
      subTaskModel: {
        dialogVisible: false
      },
      tablePar: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        showIndex: true //是否显示序号
      }, // table 的参数
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              date: "2016-05-04",
              name: "王小虎孩子",
              address: "上海市普陀区金沙江路 1517 弄"
            },
            {
              date: "2016-05-04",
              name: "王小虎孩子",
              address: "上海市普陀区金沙江路 1517 弄"
            }
          ]
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      columns: [
        {
          prop: "name",
          label: "检查单位",
          align: "center"
        },
        {
          prop: "name",
          label: "检查组数量",
          align: "center",
          render: (h, params) => {
            // console.log(params.row.name)
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.childrenTable();
                    }
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          prop: "name",
          label: "完成数量",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.childrenTable();
                    }
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          prop: "name",
          label: "未完成数量",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.childrenTable();
                    }
                  }
                },
                params.row.name
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
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.childrenTable();
                    }
                  }
                },
                "催办"
              )
            ]);
          }
        }
      ],
      taskType: [
        {
          value: "选项1",
          label: "日常检查"
        },
        {
          value: "选项2",
          label: "库存检查"
        },
        {
          value: "选项3",
          label: "防汛检查"
        },
        {
          value: "选项4",
          label: "三防检查"
        },
        {
          value: "选项5",
          label: "专项检查"
        },
        {
          value: "选项6",
          label: "储备粮公司日常检查"
        }
      ],
      checkUnit: [
        {
          value: "选项1",
          label: "市粮食和物资储备局"
        },
        {
          value: "选项2",
          label: "区粮办"
        },
        {
          value: "选项3",
          label: "储备粮公司"
        }
      ],
      state: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "已提交"
        },
        {
          value: "选项3",
          label: "待提交"
        },
        {
          value: "选项4",
          label: "生效中"
        },
        {
          value: "选项5",
          label: "已驳回"
        }
      ],
      searchData: {
        rwlxId: "",//任务类型编号
        rwlxMc: "",//任务类型名称
        jcdw_name: "",//检查单位名称
        jcdw_id: "",//检查单位编号
        rwqsr: "",//任务起始日
        rwjsr:"",//任务结束日
        jhzt:"",//计划状态
      },
      currentPage: 1,
      pageSize: 10,
      total: 100
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    addTask() {
      this.taskModel.dialogVisible = true;
    },
    childrenTable() {
      this.subTaskModel.dialogVisible = true;
    },
    //字典列表
    dictionaryList(){
      let data = {
        rybh:"50001"
      }
      getDictionaryList(data)
        .then(actionMethod)
        .catch(actionMethod);
      function actionMethod(response) {
        if (response && response.infoCode === 200) {
          console.log(response.data);
        }
      }
    },
    //制定任务列表
    getSetTaskList(){
      getSetTask(data)
        .then(actionMethod)
        .catch(actionMethod);
      function actionMethod(response) {
        if (response && response.infoCode === 200) {
          console.log(response.data);
        }
      }
    }
  },
  mounted: function() {
    this.dictionaryList();
  }
};
</script>

<style scoped>
.setATask {
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
  width: 50%;
  height: 40px;
}

.chooseType {
  width: 26%;
}

.table-view {
  margin-top: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.setATask >>> .el-table__expanded-cell[class*="cell"] {
  padding: 0 0 0 60px;
}
</style>
