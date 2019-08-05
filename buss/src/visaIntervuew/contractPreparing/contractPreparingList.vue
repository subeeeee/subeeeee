<template>
  <div class="contractPreparingList public">

    <h2>合同准备列表 <a class="help" :href="pdf" target="_blank">查看系统操作手册</a></h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="borrower"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="city" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''> </el-option>
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务创建时间</el-col>
        <el-col :span="6">
          <el-date-picker :editable="false" size="small"  class="select_width" v-model="createTime"  type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''></el-option>
            <el-option key='10' label='待提交' value='10'></el-option>
            <el-option key='30' label='待预约' value='30'></el-option>
            <el-option key='50' label='已预约' value='50'></el-option>
            <el-option key='90' label='已完成' value='90'></el-option>
            <el-option key='101' label='已过期' value='101'></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">预约面签时间</el-col>
        <el-col :span="6"><el-date-picker :editable="false" size="small" class="select_width" v-model="appointmentTime" type="datetimerange" placeholder="选择时间范围" ></el-date-picker></el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="interviewTime" label="预约面签时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="任务流转时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="finishTime" label="任务结束时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="margin-left:0;" v-show="scope.row.taskStatus == '待提交'" @click="btnClick(scope.row,'/putInPoint')" v-if="currentUserPermissions.indexOf('business:contract:prepare:handle') != -1">提交</el-button>
          <el-button type="text" size="small" style="margin-left:0;"  v-show="scope.row.taskStatus == '已预约' " @click="btnClick(scope.row,'/putintAmend')" v-if="currentUserPermissions.indexOf('business:contract:prepare:update') != -1">修改</el-button>
          <el-button type="text" size="small" style="margin-left:0;"  v-show="scope.row.taskStatus == '待预约'" @click="btnClick(scope.row,'/putInPointMark')" v-if="currentUserPermissions.indexOf('business:contract:prepare:handle') != -1">预约</el-button>
          <el-button type="text" size="small" style="margin-left:0;"  @click="btnClick(scope.row,'/contractPreparingListDetails')" v-if="currentUserPermissions.indexOf('business:contract:prepare:query') != -1">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="pagecurrentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagenumPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:'contractPreparingList',
    data () {
      return {
        pdf:require('./../../assets/contractPreparing.pdf'),
        currentUserPermissions:this.currentUserPermissions,
        condition:{},
        tableData:[{}],
        pagecurrentPage:1,
        pagenumPerPage:10,
        totalCount:1,
        params:{},
        bussNo:'',
        borrower:'',
        city:'',
        citys:[],
        appointmentTime:'',
        createTime:'',
        taskStatus:'',
      }
    },
    methods: {
      requestQuery() {
        let interviewTime = Date.parse(this.appointmentTime[0])?Date.parse(this.appointmentTime[0]):'';
        let interviewTimeEnd = Date.parse(this.appointmentTime[1])?Date.parse(this.appointmentTime[1]):'';
        let createTime = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
        let createTimeEnd = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
        this.params = {
          currentPage:this.pagecurrentPage,
          numPerPage:this.pagenumPerPage,
          bussNo:this.bussNo,
          custName:this.borrower,
          areaCode:this.city,
          interviewTime,
          interviewTimeEnd,
          createTime,
          createTimeEnd,
          taskStatus:this.taskStatus
        }
      },
      inquire () {
        this.requestQuery();
        this.request()
      },
      pageSizeChange (val) {
        this.pagenumPerPage = val;
        this.requestQuery();
        this.request()
      },
      pageCurrentChange (val) {
        this.pagecurrentPage = val;
        this.requestQuery();
        this.request()
      },
      request () {
        $.post(this._path + '/visaInterview/selectcontractPreInfoPageList',this.params,res=>{
          if(res.resultCode == '0000'){
            this.tableData = res.data.contractPreInfoVoList;
            this.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick (row,url) {
        console.log(url);
        if(url == '/putInPointMark'){
          this.$router.push({
            path:'/putInPoint',
            query:{
              bussNo:row.bussNo,
              type:"mark"
            }
          })
        }
        if(url == '/putInPoint'){
          $.post(this._path + "/visaInterview/dealBusContractPreInfo",{bussNo:row.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.$router.push({
                path:url,
                query:{
                  bussNo:row.bussNo
                }
              })
            }else{
              this.requestError(res,this)
            }
          })
        }
        if(url == '/putintAmend'){
          this.$router.push({
            path:url,
            query:{
              bussNo:row.bussNo,
              taskStatus:row.taskStatus
            }
          });
          /*$.post(this._path + "/visaInterview/dealBusContractPreInfo",{bussNo:row.bussNo},res=>{
                      if(res.resultCode == '0000'){

                      }else{
                          this.requestError(res,this)
                      }
                  })*/
        }
        if(url == '/contractPreparingListDetails'){
          this.$router.push({
            path:url,
            query:{
              bussNo:row.bussNo
            }
          })
        }
      }
    },
    mounted () {
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.inquire()
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
          this.inquire()
        }
      })
      this.inquire()
    },
    beforeCreate () {
      $.post(this._path + '/visaInterview/selectcontractPreInfoPageList',{},res=>{
        if(res.resultCode == '0000'){

          this.tableData = res.data.contractPreInfoVoList;
          this.totalCount = res.data.totalCount;
        }else{
          this.requestError(res,this)
        }
      })
      $.post(this._path + '/business/getAreaCode',{},res=>{
        if(res.resultCode == '0000'){
          this.citys = res.data.permissionVoList
        }else{
          this.requestError(res,this)
        }
      })
    }
  }
</script>


