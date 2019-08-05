

<template>
  <div class="firstCheckList public">
		<h2>放款申请任务列表</h2>
    <div class="show_list_title">
			<h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
		</div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="condition.orderNum"></el-input></el-col>
          <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="condition.borrowerName"></el-input></el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">城市</el-col>
          <el-col :span="6">
              <el-select v-model="condition.city" placeholder="请选择" class="select_width" @change="productsListFn"  size='small'>
                  <el-option :key="''" :label="'全部'" :value="''"> </el-option>
                  <el-option v-for="item in condition.citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
              </el-select>
          </el-col>
          <el-col :span="4" class="condition">产品名称</el-col>
          <el-col :span="6">
              <el-input size='small'  v-model="proName"></el-input>
              <!--<el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small'>
                  <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,index) in products" :key="index" :label="item.proName" :value="item.proCode"></el-option>
              </el-select>-->
          </el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
          <el-col :span="6">
              <el-select v-model="condition.taskState" placeholder="请选择" class="select_width"  size='small'>
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'待处理'" :value="'10'"></el-option>
                <el-option :label="'进行中'" :value="'30'"></el-option>
                <el-option :label="'已通过'" :value="'90'"></el-option>
              </el-select>
          </el-col>
          <el-col :span="4" class="condition">渠道简称</el-col>
          <el-col :span="6">
            <el-input size='small'  v-model="orgName"></el-input>
          </el-col>
        </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">期望放款时间</el-col>
        <el-col :span="6">
          <el-date-picker :editable="false" size="small"  class="select_width" v-model="expectDate"  type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
        <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
      </el-row>
        <!-- 列表展示 -->
        <div class="show_list_title">
          <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
        </div>
        <el-table :data="tableData" border stripe class="table">
         <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="proName" label="产品名称" min-width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="expectGrantDate" label="期望放款时间" min-width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <!--<packageData :gridList="downloadData(scope.row)" :type="'text'" :taskType="'314'" :custName="scope.row.custName" :packageType="'02包'" v-if="currentUserPermissions.indexOf('business:loan:apply:download') != -1" :bussNo="scope.row.bussNo" ></packageData>-->
              <el-button type="text" size="small" @click="btnClick(scope.row,'处理')" v-show="scope.row.taskStatus != '已完成'&& scope.row.taskStatus != '已通过' && scope.row.taskStatus != '已拒绝'" v-if="currentUserPermissions.indexOf('business:loan:apply:handle') != -1">处理</el-button>
              <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:loan:apply:query') != -1">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页按钮 -->
        <el-pagination
        class="pageBtn"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.numPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"></el-pagination>

	</div>
</template>

<script>
export default {
  name: "loanApplyList",
  data() {
    return {
      currentUserPermissions:this.currentUserPermissions,
      // 查询条件
      orgName:'',
      expectDate:[],
      condition: {
        orderNum: "",
        borrowerName: "",
        city: "",
        citys: [],
        investigatorName: "",
        surveyTime: [],
        taskState: ""
      },
      proName:'',
      products:[],
      // 列表数据
      tableData: [{}],
      // 分页变量
      page: {
        currentPage: 1,
        numPerPage: 10,
        totalCount: 1
      },
      params: {}
    };
  },
  methods: {
    productsListFn(){
      $.post(this._path + "/loanInfo/selectProductInfo",{cityCode:this.condition.city},res => {
        if (res.resultCode == "0000") {
          this.products = res.data.productInfoVoList
        }else{
          this.requestError(res,this)
        }
      });
    },
    downloadData(row){
      let gridData  = [{
        proCode:row.proCode,
        proName:row.proName,
        size:'',
      }]
      return gridData
    },
    btnClick(row, type) {
      let path = "";
      if ("处理" == type) {
        $.post(this._path + '/busLoanApplyInfo/toBusLoanApplyInfo',{bussNo:row.bussNo},res=>{
          if(res.resultCode == '0000'){
            this.$router.push({
              path:'/loanApply',
              query: {
                bussNo: row.bussNo,
              }
            });
          }else{
            this.requestError(res,this)
          }
        })

      }
      if ("详情" == type) {
        path = "/loanApplyDetails";
      }
      this.$router.push({
        path,
        query: {
          bussNo: row.bussNo,
        }
      });
    },
    pageSizeChange(val) {
      this.page.numPerPage = val;
      this.ajaxData();
      this.ajax();
    },
    pageCurrentChange(val) {
      this.page.currentPage = val;
      this.ajaxData();
      this.ajax();
    },
    //请求参数
    ajaxData() {
      this.params = {
        currentPage: this.page.currentPage,
        numPerPage: this.page.numPerPage,
        bussNo: this.condition.orderNum,
        custName: this.condition.borrowerName,
        areaCode: this.condition.city,
        taskStatus: this.condition.taskState,
        proName:this.proName,
        orgName:this.orgName,
      }
      let expectDateBeginTime = Date.parse(this.expectDate[0])?Date.parse(this.expectDate[0]):'';
      let expectDateEndTime = Date.parse(this.expectDate[1])?Date.parse(this.expectDate[1]):'';
      this.params.taskBeginTime = expectDateBeginTime;
      this.params.taskEndTime = expectDateEndTime;

    },
    //ajax请求
    ajax() {
      $.post(
        this._path + "/busLoanApplyInfo/busLoanApplyInfoPageList",
        this.params,
        res => {
          if (res.resultCode == "0000") {
            this.tableData = res.data.busLoanApplyInfoVoList;
            this.page.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        }
      );
    },
    //查询
    inquire() {
      this.ajaxData();
      this.ajax();
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
  beforeCreate() {
    $.post(this._path + "/busLoanApplyInfo/busLoanApplyInfoPageList",{},res => {
        if (res.resultCode == "0000") {
          this.tableData = res.data.busLoanApplyInfoVoList;
          this.page.totalCount = res.data.totalCount;
        }else{
          this.requestError(res,this)
        }
      }
    );
    $.post(this._path + "/business/getAreaCode", res => {
      this.condition.citys = res.data.permissionVoList;
    });

    $.post(this._path + "/loanInfo/selectProductInfo",{},res => {
      if (res.resultCode == "0000") {
        this.products = res.data.productInfoVoList
      }else{
        this.requestError(res,this)
      }
    });
  }
};
</script>
