

<template>
  <div class="firstCheckList public">
		<h2>放款终审任务列表</h2>
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
             <!-- <el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small'>
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
                <el-option :label="'外网审批中'" :value="'60'"></el-option>
                <el-option :label="'已打回'" :value="'70'"></el-option>
                <el-option :label="'外网审批未通过'" :value="'20'"></el-option>
                <el-option :label="'已完成'" :value="'90'"></el-option>
                <el-option :label="'已拒单'" :value="'99'"></el-option>
              </el-select>
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
         <el-table-column header-align="center" align="center" prop="proName" label="产品名称" min-width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="notarialPaperStatus" label="公证书状态" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="certificateStatus" label="他证状态" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="150"></el-table-column>
         <el-table-column header-align="center" align="center" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="btnClick(scope.row,'处理')" v-show="scope.row.taskStatus != '已打回' &&scope.row.taskStatus != '已通过' && scope.row.taskStatus != '已拒绝' && scope.row.taskStatus != '已完成'&& scope.row.taskStatus != '外网审批中' " v-if="currentUserPermissions.indexOf('business:loan:final:handle') != -1">处理</el-button>
              <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:loan:final:query') != -1">详情</el-button>
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
  name: "lastCheckList",
  data() {
    return {
      currentUserPermissions:this.currentUserPermissions,
      // 查询条件
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
      // 列表数据
      tableData: [{}],
      // 分页变量
      page: {
        currentPage: 1,
        numPerPage: 10,
        totalCount: 1
      },
      params: {},
      products:[],
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
    btnClick(row, type) {
      let path = "";
      if ("处理" == type) {
        $.post(this._path + '/loanFinalInfo/dealLoanFinalInfo',{bussNo:row.bussNo},res=>{
          if(res.resultCode == '0000'){
            this.$router.push({
              path:'/loanLastCheck',
              query: {
                bussNo: row.bussNo,
                inSurance:row.cooperationCode == '01'?1:0,
                areaCode:row.areaCode
              }
            });
          }else{
            this.requestError(res,this)
          }
        })

      }
      if ("详情" == type) {
        path = "/loanLastCheckDetails";
      }
      this.$router.push({
        path,
        query: {
          bussNo: row.bussNo,
          inSurance:row.cooperationCode == '01'?1:0,
          areaCode:row.areaCode
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
        proName:this.proName
      }
    },
    //ajax请求
    ajax() {
      $.post(
        this._path + "/loanFinalInfo/loanFinalInfoPageList",
        this.params,
        res => {
          if (res.resultCode == "0000") {
            this.tableData = res.data.busLoanFinalInfoVoArrayList;
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
    $.post(this._path + "/loanFinalInfo/loanFinalInfoPageList",{},res => {
        if (res.resultCode == "0000") {
          this.tableData = res.data.busLoanFinalInfoVoArrayList;
          this.page.totalCount = res.data.totalCount;
        }else{
          this.requestError(res,this)
        }
      }
    );
    $.post(this._path + "/business/getAreaCode", res => {
      this.condition.citys = res.data.permissionVoList;
    })
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
