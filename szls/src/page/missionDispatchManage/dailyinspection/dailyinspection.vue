<template>
  <div>
    <div class="dailyinspection_head">
      <br />
      <el-row>
        <el-col :span="6">
          <span class="span-inline-block">&nbsp;&nbsp;&nbsp;被检单位：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="6">
          <span class="span-inline-block">检查单位：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="5">
          <span class="span-inline-block">检查时间：</span>
          <el-date-picker type="date" style="width:130px;" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="4">
          <span>至&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-date-picker type="date" style="width:130px;" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="2">
           &nbsp;
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
      <br />
    </div>
    <div class="export">
      <el-button type="primary">导出</el-button>
    </div>
    <div class="dail_table">
      <tableView
        :list="list"
        @handleSelectionChange="handleSelectionChange"
        :options="tablePar"
        :columns="columns"
        :pageInfo="pageInfo"
        >
       </tableView>
    </div>
  </div>
</template>

<script>
  import tableView from "@/components/table/el-index"
  export default{
    components: {
      tableView,
    },
    data(){
      return{
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
        ],
        handleSelectionChange(val) {
          console.log("val:", val);
        },
        tablePar: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false, // 是否支持列表项选中功能
          showIndex: true //是否显示选择框
        },
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false // 是否支持列表项选中功能
        },
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
        },
        columns: [
          {
            prop: "title",
            label: "任务编号",
            align: "center"
          },
          {
            prop: "title",
            label: "任务类型",
            align: "center"
          },
          {
            prop: "title",
            label: "任务名称",
            align: "center"
          },
          {
            prop: "title",
            label: "检查单位",
            align: "center"
          },
          {
            prop: "title",
            label: "检查时间段",
            align: "center"
          },
          {
            prop: "title",
            label: "检查级别",
            align: "center"
          },
          {
            prop: "title",
            label: "状态",
            align: "center"
          },
          {
            prop: "state",
            label: "操作",
            align: "center",
            render: (h,params) => {
              return h("a" , [
                h(
                  "span",
                  {
                    on:{
                      click :() =>{
                      debugger
                      this.$router.push("/dailyinspectionDetail")
                        console.log("11")
                      }
                    },

                  },
                  " 查看"
                ),
                h(
                  "span",
                  {
                   on :{
                     click :() =>{
                       console.log("2")
                     }
                   }

                  },
                  " 分配"
                ),
                h(
                  "span",
                  {
                   on:{
                     click :() =>{
                       console.log("3")
                     }
                   }

                  },
                  " 编辑"
                ),
                h(
                  "span",
                  {
                   on:{
                     click :() =>{
                       console.log("4")
                       this.btnRecommend()
                     }
                   }

                  },
                  " 下发"
                ),
                h(
                  "span",
                  {
                   on:{
                     click :() =>{
                       console.log("5")
                       this.btnRecommend()
                     }
                   }

                  },
                  " 归档"
                ),
                h(
                  "span",
                  {
                   on:{
                     click :() =>{
                       console.log("6")
                       this.btnRecommend()
                     }
                   }

                  },
                  " 撤回"
                ),
              ])
            }
          }
        ],
      }
    },
    methods:{
      btnRecommend() {
        this.$confirm('是否将该人才推荐给市局?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '推荐成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推荐'
          });
        });
      },
      btnRecommend() {
        this.$confirm('是否将该人才推荐给市局?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '推荐成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推荐'
          });
        });
      },
      btnRecommend() {
        this.$confirm('是否将该人才推荐给市局?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '推荐成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推荐'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .dailyinspection_head {
    width: 100%;
    border: 1px solid #CCC;
  }
  .export{
    width: 100%;
    margin: 10px 0px;
  }
  .dail_table{
     margin: 10px 0px;
     border: 1px solid #ccc;
  }
 /* .span-inline-block {
    display: inline-block;
    float: left;
    width: 60px;
    text-align: right;
    margin-right: 5px;
    line-height: 30px;
  } */
   .inputWidth {
    width: 150px;
  }
</style>
