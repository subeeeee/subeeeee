<template>
  <div class="survey public">
    <h2>下户员管理列表</h2>
    <div class="show_list_title">
      <h3><img src="./../../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">

      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="areaCode" placeholder="请选择" class="select_width"  size='small'>
            <el-option v-for="item in areaCodes" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">日期</el-col>
        <el-col :span="6">
          <el-date-picker v-model="queryTime" class="select_width"  size='small' :editable="false" type="daterange"  placeholder="选择日期范围"></el-date-picker>
        </el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="request">查询</el-button></el-col>
    </el-row>
    <!-- 列表展示 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>

    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="userName"  label="员工姓名" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="mobile" label="手机号" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="numCurrent" label="当前待下户单数" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="numNotInGua" label="未进入抵押物单数" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="numSubmit" label="下户成功单数" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="role" label="职务" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="140">
        <template scope="scope">
          <el-button type="text" size="small" v-show="scope.row.role == '调查员'" v-if="currentUserPermissions.indexOf('business:survey:returnmanage:time') != -1" @click="workload(scope.row)">工作量配置</el-button>
          <el-button type="text" size="small" v-show="scope.row.role == '调查员'" v-if="currentUserPermissions.indexOf('business:survey:returnmanage:leave') != -1" @click="workOut(scope.row)">出勤配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <workload ref="workload"></workload>
    <work-out ref="workOut" :bussData="bussData"></work-out>
  </div>
</template>
<style scoped>
</style>
<script>
  import Workload from "./workload";
  import WorkOut from "./workOut";

  export default {
    components: {
      WorkOut,
      Workload},
    name:'survey',
    data () {
      return{
        areaCode:'',
        queryTime:[],
        investigatorNo:'',
        currentUserPermissions:this.currentUserPermissions,
        // 列表数据
        tableData:[{num :1}],
        // 分页变量
        page:{
          currentPage:1,
          numPerPage:10,
          totalCount:0
        },
      }
    },
    methods : {
      workload(row){
        this.$refs.workload.isShow(row)
      },
      workOut(row){
        this.$refs.workOut.isShow(row)
      },
      // 查询
      request () {
        let beginTime = Date.parse(this.queryTime[0])?Date.parse(this.queryTime[0]):'';
        let endTime = Date.parse(this.queryTime[1])?Date.parse(this.queryTime[1]):'';
        let data = {
          cityCode:this.areaCode,
          beginTime,
          endTime
        };
        this.$http({
          url:'/returnManage/returnManagePageList',
          data,
          callback:res=>{
            this.tableData = res.data.returnManageVOList;
            this.page.totalCount = res.data.totalCount;
          }
        });
      }
    },
    activated(){
      this.request()
    },
    created () {
      $.post(this._path + "/business/getAreaCode", {}, res => {
        this.areaCodes = res.data.permissionVoList;
        this.areaCode = this.areaCodes[0].code;
        this.request()
      });
    }
  }
</script>

