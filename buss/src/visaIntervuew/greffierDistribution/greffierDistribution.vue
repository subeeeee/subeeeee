<template>
  <div class="contractPreparingList public">
    <h2>面签员分配</h2>
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
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"  class="condition">任务创建时间</el-col>
        <el-col :span="6">
          <el-date-picker :editable="false" size="small"  class="select_width" v-model="createTime"  type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="interviewStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''></el-option>
            <el-option key='05' label='待调度' value='05'></el-option>
            <el-option key='10' label='已分配' value='10'></el-option>
            <el-option key='90' label='已完成' value='90'></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">面签员</el-col><el-col :span="6"><el-input size='small'  v-model="interviewName"></el-input></el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center"  align="center"   label="订单编号" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
           {{scope.row.bussNo}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center"  align="center" label="借款人姓名" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.custName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="城市" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.areaName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="预约公证时间" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.interviewTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="任务创建时间" min-width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.createTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="任务结束时间" min-width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.finishTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="面签员" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.interviewName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center"  label="任务状态" width="200">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            {{scope.row.interviewStatus}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <div :class="scope.row.interviewStatus == '待调度'?'font_red':''">
            <el-button type="text" size="small"  v-show="scope.row.interviewStatus == '已分配'||scope.row.interviewStatus == '待调度'" v-if="currentUserPermissions.indexOf('business:contract:notarydistribution:break') != -1" @click="btnClick(scope.row,'爽约')" >爽约</el-button>
            <el-button type="text" size="small"  v-show="scope.row.interviewStatus == '已分配'||scope.row.interviewStatus == '待调度'"  v-if="currentUserPermissions.indexOf('business:contract:notarydistribution:dispatch') != -1" @click="btnClick(scope.row,'调度')" >调度</el-button>
            <el-button type="text" size="small" v-if="currentUserPermissions.indexOf('business:contract:notarydistribution:query') != -1"  @click="btnClick(scope.row,'详情')">详情</el-button>
          </div>
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
    name:'greffier-distribution',
    data () {
      return {
        currentUserPermissions:this.currentUserPermissions,
        condition:{},
        tableData:[{interviewStatus:'已分配'}],
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
        interviewStatus:'',
        interviewName:"",
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
          interviewStatus:this.interviewStatus,
          interviewName:this.interviewName,
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
        $.post(this._path + '/notaryDistribution/notaryDistributionPageList',this.params,res=>{
          if(res.resultCode == '0000'){
            this.tableData = res.data.notaryDistributionPageVOList;
            this.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick (row,url) {
        switch (url){
          case "爽约":
            this.$router.push({
              path:'/failAppointment',
              query:{
                // interviewFlowId:row.interviewFlowId,
                bussNo:row.bussNo,
                custName:row.custName
              }
            });
            break;
          case "调度":
            this.$router.push({
              path:'/dispatch',
              query:{
                // interviewFlowId:row.interviewFlowId,
                bussNo:row.bussNo,
                custName:row.custName
              }
            });
            break;
          case '详情':
            // greffierDistributionInfo
            this.$router.push({
              path:'/greffierDistributionInfo',
              query:{
                // interviewFlowId:row.interviewFlowId,
                bussNo:row.bussNo,
                custName:row.custName
              }
            });
            break
        }
      }
    },
    mounted () {
      this.inquire()
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

      /*$.post(this._path + '/contractReview/selectConReviewPageList',{},res=>{
        if(res.resultCode == '0000'){
          this.tableData = res.data.conReviewListVoList;
          this.totalCount = res.data.totalCount;
        }else{
          this.requestError(res,this)
        }
      })*/
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


