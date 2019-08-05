<template>
  <div class="contractPreparingList public">

    <h2>合同制作列表</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="city" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''> </el-option>
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
      <el-col :span="4" :offset="1" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="borrower"></el-input></el-col>
      <el-col :span="4"  class="condition">产品名称</el-col>
      <el-col :span="6">
        <el-input size='small'  v-model="proName"></el-input>
        <!--<el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small'>
          <el-option key='' label='全部' value=''> </el-option>
          <el-option v-for="item in products" :key="item.proCode" :label="item.proName" :value="item.proCode"> </el-option>
        </el-select>-->
      </el-col>
    </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">预约公证时间</el-col>
        <el-col :span="6">
          <el-date-picker :editable="false" size="small" class="select_width" v-model="interviewTime" type="datetimerange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @keyup.enter.native="inquire" @click="inquire" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
     <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="areaName" label="城市" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="proName" label="产品名称" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="interviewTime" label="预约公证时间" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" ></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click="btnClick(scope.row,'/contractMake')" v-if="currentUserPermissions.indexOf('business:contract:management:make') != -1">制作</el-button>
          <el-button type="text" size="small"  @click="btnClick(scope.row,'/contractMake_detail')" v-if="currentUserPermissions.indexOf('business:contract:management:query') != -1">详情</el-button>
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
        products:[],
        proName:'',
        interviewTime:[],
      }
    },
    methods: {
      productsListFn(){
        $.post(this._path + "/loanInfo/selectProductInfo",{cityCode:this.city},res => {
          if (res.resultCode == "0000") {
            this.products = res.data.productInfoVoList
          }else{
            this.requestError(res,this)
          }
        });
      },
      requestQuery() {
        let interviewBeginTime = Date.parse(this.interviewTime[0])?Date.parse(this.interviewTime[0]):'';
        let interviewEndTime = Date.parse(this.interviewTime[1])?Date.parse(this.interviewTime[1]):'';
        this.params = {
          currentPage:this.pagecurrentPage,
          numPerPage:this.pagenumPerPage,
          custName:this.borrower,
          areaCode:this.city,
          proName:this.proName,
          bussNo:this.bussNo,
          interviewBeginTime,
          interviewEndTime
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
        // /contractReview/selectConReviewPageList
        $.post(this._path + '/contractManagement/contractManagePageList',this.params,res=>{
          if(res.resultCode == '0000'){
            this.tableData = res.data.contractVoList;
            this.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick (row,url) {
        this.$router.push({
          path:url,
          query:{proCode:row.proCode,bussNo:row.bussNo}
        })
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
    mounted () {
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.inquire();
        }
      })
    },
    beforeCreate () {
      //列表
      $.post(this._path + '/contractManagement/contractManagePageList',{},res=>{
        if(res.resultCode == '0000'){
          this.tableData = res.data.contractVoList;
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
      //查询产品名称
     /* $.post(this._path + "/loanInfo/selectProductInfo",{},res => {
        if (res.resultCode == "0000") {
          this.products = res.data.productInfoVoList
        }else{
          this.requestError(res,this)
        }
      });*/
    }
  }
</script>


