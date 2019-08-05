<template>
  <div class="contractPreparingList public">

    <h2>通道确认列表</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col>
        <el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col>
        <el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="cityCode"   placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"  class="condition">任务创建时间</el-col>
        <el-col :span="6">
          <el-date-picker  :editable="false" size="small" class="select_width" v-model="createTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="status"   placeholder="请选择" class="select_width"  size='small'>
            <el-option label="全部" :value="''"> </el-option>
            <el-option label="待处理" :value="'10'"> </el-option>
            <el-option label="打回待处理" :value="'20'"> </el-option>
            <el-option label="已打回" :value="'60'"> </el-option>
            <el-option label="进行中" :value="'30'"> </el-option>
            <el-option label="已完成" :value="'90'"> </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">

      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="request" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="cityName" label="城市" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="circulationTime" label="任务流转时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="状态" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dispose(scope.row)"  v-show="scope.row.status !== '已打回'&&scope.row.status !== '打回待处理'&&scope.row.status !== '已完成'&&scope.row.status !== '进行中'"  v-if="currentUserPermissions.indexOf('business:passage:list:handle') != -1">处理</el-button>
          <el-button type="text" size="small" @click="info(scope.row,'1')"  v-show="scope.row.status == '打回待处理'" v-if="currentUserPermissions.indexOf('business:passage:list:handle') != -1">打回</el-button>
          <el-button type="text" size="small" @click="info(scope.row,'0')" v-if="currentUserPermissions.indexOf('business:passage:list:query') != -1">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.numPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:'aisleAffirmList',
    data() {
      return {
        currentUserPermissions:this.currentUserPermissions,
        params:{},
        bussNo:'',
        status:'',
        orgName:'',
        custName:'',
        cityCode:'',
        citys:[],
        createTime:[],
        taskStateList:[],
        page:{
          currentPage:'1',
          totalCount:'',
          numPerPage:'',
        },
        tableData:[{bussNo:'1'}]
      };
    },
    methods: {
      dispose (row) {
        $.post(this._path + '/busPassageConfirm/toPassageConfirm',{bussNo:row.bussNo},res=>{
          if(res.resultCode === '0000'){
              this.$router.push({
                path:'/aisleAffirm',
                query:{
                  bussNo:row.bussNo,
                  custName:row.custName,
                  orgName:row.orgName,
                  id:row.id
                }
              })
          }else{
            this.requestError(res,this)
          }
        })
      },
      info (row,type) {
        this.$router.push({
          path:'/aisleAffirm_info',
          query:{
            bussNo:row.bussNo,
            id:row.id,
            custName:row.custName,
            orgName:row.orgName,
            backRisk:type
          }
        })
      },
      pageSizeChange(val) {
        this.page.numPerPage = val;
        this.paramsFn();
        this.requestFn();
      },
      pageCurrentChange(val) {
        this.page.currentPage = val;
        this.paramsFn();
        this.requestFn();
      },
      //请求参数
      paramsFn() {
        this.params = {
          currentPage: this.page.currentPage,
          numPerPage: this.page.numPerPage,
          bussNo: this.bussNo,
          custName: this.custName,
          cityCode: this.cityCode,
          status: this.status,
        };
        let beginTime = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
        let endTime = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
        this.params.createTimeBegin = beginTime;
        this.params.createTimeEnd = endTime;
      },
      //requestFn请求
      requestFn() {
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        $.post(
          this._path + "/busPassageConfirm/busPassageConfirmPageList",
          this.params,
          res => {
            if (res.resultCode == "0000") {
              loading.close();
              this.tableData = res.data.passageConfirmPageVOList;
              this.page.totalCount = res.data.totalCount;

            }else{
              this.requestError(res,this)
            }
          }
        );
      },
      //查询
      request() {
        this.paramsFn();
        this.requestFn();
      }
    },
    mounted () {
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.request()
        }
      })
    },
    watch:{
      $route () {
        $(document).off('keydown')
      }
    },
    activated(){
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.request()
        }
      })
      this.request()
    },
    created() {
      this.request()
      $.post(this._path + "/business/getAreaCode", {}, res => {
        this.citys = res.data.permissionVoList;
      });
    }
  }
</script>
<style scoped>

</style>


