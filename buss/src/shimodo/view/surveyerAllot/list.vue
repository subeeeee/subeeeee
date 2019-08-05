<template>
  <div class="survey public">
    <h2>下户员分配列表</h2>
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
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="condition.cityCode" placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in areaCodes" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务创建时间</el-col>
        <el-col :span="6">
          <el-date-picker v-model="condition.createTime" class="select_width"  size='small' :editable="false" type="daterange"  placeholder="选择日期范围"></el-date-picker>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="condition.taskStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option :label="'待调度'" :value="'10'"> </el-option>
            <el-option :label="'已分配'" :value="'60'"> </el-option>
            <el-option :label="'已完成'" :value="'90'"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">下户员</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.returnPreName"></el-input>
        </el-col>
      </el-col>

      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">渠道简称</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.orgName"></el-input>
        </el-col>
        <el-col :span="4" class="condition">所在区域</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.areaName"></el-input>
        </el-col>
      </el-col>

      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="request">查询</el-button></el-col>
    </el-row>
    <!-- 列表展示 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>

    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center"  label="订单编号" min-width="150">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.bussNo}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="借款人姓名" min-width="120">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.custName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="渠道简称" min-width="120">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.orgName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="城市" min-width="120">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.cityName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="所在区域" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.areaName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="预约下户时间" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.orderTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="任务结束时间" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.finishTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="下户员" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.returnPreName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="状态" min-width="200">
        <template scope="scope">
          <span :class="scope.row.taskStatus == '待调度'?'importent':''" >{{scope.row.taskStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="btnClick(scope.row,'爽约')" v-if="currentUserPermissions.indexOf('business:survey:distribute:break') != -1" v-show="scope.row.taskStatus !== '已完成'">爽约</el-button>
          <el-button type="text" size="small" @click="btnClick(scope.row,'调度')" v-if="currentUserPermissions.indexOf('business:survey:distribute:dis') != -1" v-show="scope.row.taskStatus !== '已完成'">调度</el-button>
          <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:survey:distribute:query') != -1">详情</el-button>
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
        currentUserPermissions:this.currentUserPermissions,
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
          returnPreName:'',
        },
        // 列表数据
        tableData:[{num :1}],
        // 分页变量
        page:{
          currentPage:1,
          numPerPage:10,
          totalCount:0
        },
        areaCodes:[]
      }
    },
    methods : {
      btnClick(row,type){
        switch (type){
          case '调度':
            this.$http({
              url:'/busDistributionInfo/toDistribution',
              data:{bussNo:row.bussNo},
              callback:res=>{
                this.$router.push({
                  path:'/surveyerAllotDispatch',
                  query:{bussNo:row.bussNo,custName:row.custName,cityName:row.cityName}
                });
              }
            });
            break;
          case '爽约':
            this.$router.push({
              path:'/surveyerAllotBreakAppoint',
              query:{bussNo:row.bussNo,custName:row.custName,cityName:row.cityName}
            });
            break;
          case '详情':
            this.$router.push({
              path:'/surveyerAllotInfo',
              query:{bussNo:row.bussNo,custName:row.custName,cityName:row.cityName}
            });
            break;
        }
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

        let taskBeginTime = Date.parse(this.condition.createTime[0])?Date.parse(this.condition.createTime[0]):'';
        let taskEndTime = Date.parse(this.condition.createTime[1])?Date.parse(this.condition.createTime[1]):'';

        let data = {
          currentPage:this.currentPage,
          numPerPage:this.numPerPage,
          cityCode:this.condition.cityCode,
          custName:this.condition.custName,
          bussNo:this.condition.bussNo,
          orgName:this.condition.orgName,
          areaName:this.condition.areaName,
          taskStatus:this.condition.taskStatus,
          returnPreName:this.condition.returnPreName,
          taskBeginTime,
          taskEndTime
        };
        this.$http({
          url:'/busDistributionInfo/distributionPageList',
          data,
          callback:res=>{
            this.tableData = res.data.busDistributionInfoVOList;
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
      });
      this.request()
    }
  }
</script>

