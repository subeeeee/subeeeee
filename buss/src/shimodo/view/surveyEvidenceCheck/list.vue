<template>
  <div class="survey public">
    <h2>下户费凭证审核</h2>
    <div class="show_list_title">
      <h3><img src="./../../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.bussNo"></el-input>
        </el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.custName"></el-input>
        </el-col>
      </el-col>

      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">渠道简称</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.orgName"></el-input>
        </el-col>
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="condition.taskStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option :label="'待调度'" :value="'10'"> </el-option>
            <el-option :label="'已分配'" :value="'30'"> </el-option>
            <el-option :label="'已完成'" :value="'90'"> </el-option>
          </el-select>
        </el-col>
      </el-col>

      <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="inquire">查询</el-button></el-col>
    </el-row>
    <!-- 列表展示 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>

    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="guaProper" label="城市" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="areaName" label="渠道简称" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orderTime" label="任务创建时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orderTime" label="任务完成时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orderTime" label="任务员姓名" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="affirm(scope.row)" v-if="scope.row.taskStatus === '待确认'">确认</el-button>
          <el-button type="text" size="small" @click="info(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="numPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"></el-pagination>
  </div>
</template>
<style scoped>
</style>
<script>
  export default {
    name:'survey',
    data () {
      return{
        areaCode:'',
        queryTime:[],
        investigatorNo:'',
        condition:{
          bussNo:'',
          custName:'',
          cityCode:'',
          areaCode:'',
          taskStatus:'',
          createTime:[],
          orgName:'',
          survey:'',
        },
        // 列表数据
        tableData:[{num :1}],
        // 分页变量
        page:{
          currentPage:1,
          numPerPage:10,
          totalCount:0
        }
      }
    },
    methods : {
      affirm(row){
        this.$http({
          url:"/busReCostApprovalInfo/toReCostApproval",
          data:{bussNo:row.bussNo},
          callback:res=>{
            this.$router.push({
              path:'/surveyEvidenceCheck',
              query:{bussNo:row.bussNo}
            })
          }
        })
      },
      info(row){
        this.$router.push({
          path:'/surveyEvidenceCheckInfo',
          query:{bussNo:row.bussNo}
        })
      },
      pageSizeChange (val) {
        this.numPerPage = val;
        this.request()
      },
      pageCurrentChange (val) {
        this.currentPage = val;
        this.request()
      },
      // 查询
      request () {
        let data = {
          currentPage:this.currentPage,
          numPerPage:this.numPerPage,
          cityCode:this.condition.areaCode,
          orgName:this.condition.orgName,
          taskStatus:this.condition.taskStatus,
          custName:this.condition.custName,
          bussNo:this.condition.bussNo,
        };
        this.$http({
          url:'/busReCostApprovalInfo/busReCostApprovalPageList',
          data,
          callback:res=>{
            this.tableData = res.data.busReCostApprovalInfoVOList;
            this.page.totalCount = res.data.totalCount;
          }
        });
      }
    },
    activated(){
      this.request()
    },
    created () {
    }
  }
</script>

