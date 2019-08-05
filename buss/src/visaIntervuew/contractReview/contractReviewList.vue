
<template>
  <div class="contractPreparingList public">

    <h2>合同复核列表</h2>
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
            <!--<el-col :span="4" class="condition">预约面签时间</el-col>-->
            <!--<el-col :span="6"><el-date-picker :editable="false" size="small" class="select_width" v-model="appointmentTime" type="datetimerange" placeholder="选择时间范围" ></el-date-picker></el-col>-->
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''></el-option>
            <el-option key='10' label='待处理' value='10'></el-option>
            <el-option key='30' label='进行中' value='30'></el-option>
            <el-option key='90' label='已完成' value='90'></el-option>
            <el-option key='99' label='已拒单' value='99'></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务创建时间</el-col>
        <el-col :span="6">
          <el-date-picker :editable="false" size="small"  class="select_width" v-model="createTime"  type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
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
      <!--<el-table-column prop="interviewTime" label="预约面签时间" width="200"></el-table-column>-->
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
            <el-button type="text" size="small" v-if="currentUserPermissions.indexOf('business:contract:recheck:handle') != -1" v-show="scope.row.taskStatus == '待处理'||scope.row.taskStatus == '进行中'" @click="btnClick(scope.row,'/contractReview')" >处理</el-button>
          <el-button type="text" size="small" v-if="currentUserPermissions.indexOf('business:contract:recheck:query') != -1" @click="btnClick(scope.row,'/contractReview_detail')">详情</el-button>
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
        let taskBeginTime = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
        let taskEndTime = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
        this.params = {
          currentPage:this.pagecurrentPage,
          numPerPage:this.pagenumPerPage,
          bussNo:this.bussNo,
          custName:this.borrower,
          areaCode:this.city,
          taskBeginTime,
          taskEndTime,
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
        $.post(this._path + '/contractReview/selectConReviewPageList',this.params,res=>{
          if(res.resultCode == '0000'){
            this.tableData = res.data.conReviewListVoList;
            this.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick (row,url) {
        if(url == '/contractReview'){
          $.post(this._path + '/contractReview/toConReview',{bussNo:row.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.$router.push({
                path:url,
                query:row
              })
            }else{
              this.requestError(res,this)
            }
          })
        }else{
          this.$router.push({
            path:url,
            query:row
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
      $.post(this._path + '/contractReview/selectConReviewPageList',{},res=>{
        if(res.resultCode == '0000'){
          this.tableData = res.data.conReviewListVoList;
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


